from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import os
import tempfile
import docx2txt
import PyPDF2
import google.generativeai as genai
import re
import json
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import normalize


load_dotenv()

model = SentenceTransformer('all-MiniLM-L6-v2')


app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from your frontend
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Model configuration and safety settings
generation_config = {
    "temperature": 0,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

safety_settings = [
    {"category": f"HARM_CATEGORY_{category}", "threshold": "BLOCK_MEDIUM_AND_ABOVE"}
    for category in ["HARASSMENT", "HATE_SPEECH", "SEXUALLY_EXPLICIT", "DANGEROUS_CONTENT"]
]

def generate_response_from_gemini(input_text):
    llm = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        safety_settings=safety_settings,
    )
    output = llm.generate_content(input_text)
    return output.text

skill_extraction_prompt = """
Extract ONLY technical skills from below text. Return STRICTLY as JSON array format:
["skill1", "skill2", ...]
Include:
- Programming languages
- Frameworks/Libraries
- Tools/Platforms
- Technical methodologies
- Certifications
- Databases
- Cloud services

Text: {text}
"""
def extract_skills(text):
    try:
        # First try Gemini extraction
        response = generate_response_from_gemini(skill_extraction_prompt.format(text=text))
        
        # Clean and parse response
        response = re.sub(r"[^\[\]\w,\s\"'\-+#\./]", "", response)  # Preserve special chars
        response = re.sub(r"(json|array|skills?|technical|:|-)", "", response, flags=re.IGNORECASE)
        response = response.replace("'", '"').strip()
        
        # Handle malformed JSON
        if not response.startswith("["):
            response = re.findall(r'\[.*?\]', response, re.DOTALL)
            response = response[0] if response else '[]'
            
        skills = json.loads(response)
        
        # Validate extracted skills
        if not skills or not isinstance(skills, list):
            raise ValueError("Invalid skills format from Gemini")

    except Exception as e:
        # Fallback to technical skills section extraction
        skills_section = re.search(
            r'(?i)(?:Technical\s+Skills|Skills\s+&\s+Expertise|Technical\s+Proficiency)[:\n]*(.*?)(?=\n\s*\n|\Z)',
            text, 
            re.DOTALL
        )
        
        if skills_section:
            # Dynamic skill extraction from bullet points/commas
            skills_text = skills_section.group(1)
            skills = re.findall(
                r'\b([A-Za-z0-9+#\./]+(?:\s+[A-Za-z0-9+#\./]+)*)\b(?=\s*(?:,|•|\||\n|$))', 
                skills_text
            )
            # Filter out non-skill words
            skills = [skill.strip() for skill in skills if len(skill) > 2 and not skill.isnumeric()]
        else:
            # Final fallback - extract ALL CAPS and Title Case technical terms
            skills = re.findall(
                r'\b([A-Z][a-z0-9+#\./]+(?:\s+[A-Z][a-z0-9+#\./]+)*)\b|([A-Z0-9+#/]{2,})\b', 
                text
            )
            skills = [f"{a}{b}".strip() for a, b in skills if a or b]

    # Final cleaning and deduplication
    skills = list(set([
        skill.strip().title() 
        for skill in skills 
        if 2 < len(skill) < 50 and not re.match(r'^(http|www|page|section)$', skill, re.I)
    ]))
    
    return " ".join(skills) if skills else text

def extract_text_from_file(file_path):
    """Extracts text from PDF or DOCX files."""
    _, ext = os.path.splitext(file_path)
    text = ""
    if ext.lower() == ".pdf":
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            text = " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
    elif ext.lower() == ".docx":
        text = docx2txt.process(file_path)
    return text.strip()

def count_skills(skills_text):
    return len(re.findall(r'\b[\w+]+\b', skills_text))


input_prompt_template = """
As an experienced Applicant Tracking System (ATS) analyst,
your role involves evaluating resumes against job descriptions.
Analyze the resume against the given job description,
pinpoint missing keywords (hard skills only), identify strengths, 
and suggest areas for improvement. Provide a candidate summary.

resume:{text}
description:{job_description}
I want the response in one single string having the structure
{{"Missing Keywords":"[list]", "Candidate Summary":"", "Strengths":"[list]", "Areas for Improvement":"[list]"}}
"""

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    if "file" not in request.files or "job_description" not in request.form:
        return jsonify({"error": "Missing file or job description"}), 400
    
    file = request.files["file"]
    job_description = request.form["job_description"]
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[-1]) as temp_file:
      temp_file.close()  # Close the file before further operations
      file.save(temp_file.name)
      resume_text = extract_text_from_file(temp_file.name)

    # Now, safely delete the file
    os.unlink(temp_file.name)
    
    if not resume_text:
        return jsonify({"error": "Could not extract text from resume"}), 400
    
    resume_skills_text = extract_skills(resume_text)
    job_skills_text = extract_skills(job_description)

    # Add after skill extraction
    min_skills_threshold = 3  # Minimum skills needed for meaningful comparison
   
    
    if count_skills(resume_skills_text) < min_skills_threshold:
      abort(400, "Resume skills extraction failed - please check formatting")

    if count_skills(job_skills_text) < min_skills_threshold:
      abort(400, "Job description skills extraction failed - please check formatting")

    # Generate embeddings from skills-only text
    resume_embedding = model.encode(resume_skills_text)
    job_desc_embedding = model.encode(job_skills_text)
        
    resume_embedding = normalize([resume_embedding])[0]
    job_desc_embedding = normalize([job_desc_embedding])[0]

    # Calculate cosine similarity
    similarity_score = cosine_similarity([resume_embedding], [job_desc_embedding])[0][0]
    normalized_score = (similarity_score + 1) / 2  # Force to [0,1]
    match_percentage = round(normalized_score * 100, 2)

    # Get analysis from Gemini (modified prompt without percentage)
    response_text = generate_response_from_gemini(input_prompt_template.format(text=resume_skills_text, job_description=job_skills_text))
    print(response_text)

    try:
        response_text = re.sub(r"^```json\s*|\s*```$", "", response_text.strip())
        response_json = json.loads(response_text)
        response_json["Job Description Match"] = f"{match_percentage}%"
        match_percentage_str = response_json.get("Job Description Match", "0%")
        match_percentage = float(match_percentage_str.strip("%"))                
        missing_keywords = response_json.get("Missing Keywords", [])
        strengths = response_json.get("Strengths", [])
        improvements = response_json.get("Areas for Improvement", [])
        summary = response_json.get("Candidate Summary", "")

    except (json.JSONDecodeError, ValueError, AttributeError) as e:
        abort(400,"Error : " + e)

    return jsonify({
        "matchPercentage": match_percentage,
        "missingKeywords": missing_keywords,
        "strengths": strengths,
        "areasForImprovement": improvements,
        "candidateSummary": summary,
    })

if __name__ == "__main__":
    app.run(debug=True)
