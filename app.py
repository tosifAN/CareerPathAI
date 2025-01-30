import streamlit as st
import google.generativeai as genai
import os
import docx2txt 
import PyPDF2 as pdf
from dotenv import load_dotenv
import json
import re
import plotly.graph_objects as go
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import normalize

load_dotenv()

model = SentenceTransformer('all-MiniLM-L6-v2')

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

def extract_text_from_pdf_file(upload_file):
    pdf_reader = pdf.PdfReader(upload_file)
    text_content = "".join([str(page.extract_text()) for page in pdf_reader.pages])
    return text_content

def extract_text_from_docx_file(upload_file):
    return docx2txt.process(upload_file)

# input_prompt_template = """
# As an experienced Applicant Tracking System (ATS) analyst,
# with profound knowledge in technology, software engineering, data science, data analysis,
# AI architect, AI engineer, and big data engineering, your role involves evaluating resumes against job descriptions.
# Recognizing the competitive job market, provide top-notch assistance for resume improvement.
# Your goal is to analyze the resume against the given job description,
# assign a percentage match based on key criteria, and pinpoint missing keywords accurately which are skills only.
# Area of Improvement are only hard skills. And explain each in one line.
# Treat the resume as per the required experience level.

# resume:{text}
# description:{job_description}
# I want the response in one single string having the structure
# {{"Job Description Match":"%", "Missing Keywords":"[list of missing keywords]", "Candidate Summary":"", "Strengths":"[list of strengths]", "Areas for Improvement":"[list of areas]"}}
# """

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

# Streamlit app
st.set_page_config(page_title="ATS - Enhance Your Resume", page_icon="📄", layout="wide")

# Custom CSS
st.markdown("""
<style>
    .main {
        padding: 2rem;
    }
    .stButton > button {
        width: 100%;
    }
    .result-card {
        background-color: #f0f2f6;
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .success-text { color: #28a745; font-weight: bold; }
    .warning-text { color: #ffc107; font-weight: bold; }
    .error-text { color: #dc3545; font-weight: bold; }
    .keyword-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 0;
    }
    .keyword-chip {
        background-color: #e9ecef;
        border-radius: 16px;
        padding: 4px 12px;
        font-size: 14px;
        font-weight: bold;
    }
    .strength-item { color: #28a745; }
    .improvement-item { color: #dc3545; }
</style>
""", unsafe_allow_html=True)

# App Header
st.title("🚀 ATS - Enhance Your Resume")
st.markdown("---")

# Job Description Input
st.subheader("📝 Job Description")
job_description = st.text_area("Paste the Job Description", height=300)

# Resume Upload
st.subheader("📄 Your Resume")
uploaded_file = st.file_uploader("Upload your resume", type=["pdf", "docx"], help="Please upload your resume as PDF or DOCX file")

# Submit Button
submit_button = st.button("Analyze Resume")

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


def create_gauge_chart(match_percentage):
    fig = go.Figure(go.Indicator(
        mode = "gauge+number",
        value = match_percentage,
        domain = {'x': [0, 1], 'y': [0, 1]},
        title = {'text': "Match Percentage"},
        gauge = {
            'axis': {'range': [0, 100]},
            'bar': {'color': "darkblue"},
            'steps' : [
                {'range': [0, 40], 'color': "lightgray"},
                {'range': [40, 70], 'color': "gray"}],
            'threshold' : {
                'line': {'color': "red", 'width': 4},
                'thickness': 0.75,
                'value': 70}}))
    fig.update_layout(height=300)
    return fig

# Add after skill extraction
min_skills_threshold = 3  # Minimum skills needed for meaningful comparison

def count_skills(skills_text):
    return len(re.findall(r'\b[\w+]+\b', skills_text))

if submit_button and uploaded_file and job_description:
    with st.spinner("Analyzing your resume..."):
        if uploaded_file.type == "application/pdf":
            resume_text = extract_text_from_pdf_file(uploaded_file)
        elif uploaded_file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            resume_text = extract_text_from_docx_file(uploaded_file)
        
        # Extract skills from both texts
        with st.spinner("Identifying key skills..."):
            resume_skills_text = extract_skills(resume_text)
            job_skills_text = extract_skills(job_description)

        st.write(resume_skills_text)

        if count_skills(resume_skills_text) < min_skills_threshold:
            st.error("Resume skills extraction failed - please check formatting")
            st.stop()

        if count_skills(job_skills_text) < min_skills_threshold:
            st.error("Job description skills extraction failed - please check formatting")
            st.stop()

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

        try:
            response_text = re.sub(r"^```json\s*|\s*```$", "", response_text.strip())
            response_json = json.loads(response_text)

            response_json["Job Description Match"] = f"{match_percentage}%"
            match_percentage_str = response_json.get("Job Description Match", "0%")
            match_percentage = float(match_percentage_str.strip("%"))

            
            st.markdown("## 📊 ATS Evaluation Results")
            
            # Match Percentage Gauge
            st.plotly_chart(create_gauge_chart(match_percentage), use_container_width=True)
            
            if match_percentage >= 80:
                st.success("Your resume is a great match for the job description!")
            elif match_percentage >= 60:
                st.warning("Your resume is a good match, but there's room for improvement.")
            else:
                st.error("Your resume needs significant improvement to match the job description better.")
            
            # Results in tabs
            tab1, tab2, tab3, tab4 = st.tabs(["📌 Missing Keywords", "💪 Strengths", "🔧 Areas for Improvement", "📝 Candidate Summary"])
            
            with tab1:
                st.subheader("Missing Keywords")
                missing_keywords = response_json.get("Missing Keywords", [])
                if missing_keywords:
                    keyword_chips = "".join([f'<span class="keyword-chip">{keyword}</span>' for keyword in missing_keywords])
                    st.markdown(f'<div class="keyword-container">{keyword_chips}</div>', unsafe_allow_html=True)
                else:
                    st.write("No missing keywords found.")
            
            with tab2:
                st.subheader("Strengths")
                strengths = response_json.get("Strengths", [])
                for strength in strengths:
                    st.markdown(f'<p class="strength-item">✅ {strength}</p>', unsafe_allow_html=True)
            
            with tab3:
                st.subheader("Areas for Improvement")
                improvements = response_json.get("Areas for Improvement", [])
                for area in improvements:
                    st.markdown(f'<p class="improvement-item">🔨 {area}</p>', unsafe_allow_html=True)
            
            with tab4:
                st.subheader("Candidate Summary")
                st.write(response_json.get("Candidate Summary", "No summary available."))
            
            # Tips for improvement
            st.markdown("## 💡 Tips for Improvement")
            st.info("""
            1. Tailor your resume to include more of the missing keywords.
            2. Quantify your achievements to make them more impactful.
            3. Use action verbs to describe your experiences.
            4. Ensure your resume is well-formatted and easy to read.
            5. Consider getting a professional review of your resume.
            """)

        except (json.JSONDecodeError, ValueError, AttributeError) as e:
            st.error(f"Error processing response: {e}")
            st.code(response_text)  # Display raw response for debugging

else:
    if submit_button:
        st.warning("Please upload a resume and provide a job description before submitting.")
    else:
        st.info("Upload your resume and paste the job description to get started!")
