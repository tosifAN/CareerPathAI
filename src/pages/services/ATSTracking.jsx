import React, { useState, useCallback } from 'react';
import {
  FileText,
  Link2,
  Upload,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

function ATSTracking() {
  const [jobDescription, setJobDescription] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [resume, setResume] = useState(null);
  const [resumeLink, setResumeLink] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState(null);
  const [activeTab, setActiveTab] = useState('text');
  const [resumeTab, setResumeTab] = useState('file');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const analyzeMatch = useCallback(() => {
    setIsAnalyzing(true);
    // Simulate analysis with a random score
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 41) + 60); // Random score between 60-100
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const isFormValid = () => {
    if (activeTab === 'text' && !jobDescription) return false;
    if (activeTab === 'link' && !jobLink) return false;
    if (resumeTab === 'file' && !resume) return false;
    if (resumeTab === 'link' && !resumeLink) return false;
    return true;
  };

  return (
    <div className="mt-9 min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="mt-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all hover:scale-[1.02]">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Sparkles className="text-purple-500" />
            Resume Match Analyzer
          </h1>
          <p className="text-gray-600 mb-8">
            Let's analyze how well your resume matches the job requirements
          </p>

          {/* Job Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Job Description</h2>
            <div className="flex gap-4 mb-4">
              <button
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'text'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('text')}
              >
                <FileText size={20} />
                Text Input
              </button>
              <button
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'link'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('link')}
              >
                <Link2 size={20} />
                URL Input
              </button>
            </div>

            {activeTab === 'text' ? (
              <textarea
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                rows={6}
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            ) : (
              <input
                type="url"
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                placeholder="Enter job posting URL..."
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
              />
            )}
          </div>

          {/* Resume Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Resume</h2>
            <div className="flex gap-4 mb-4">
              <button
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  resumeTab === 'file'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setResumeTab('file')}
              >
                <Upload size={20} />
                Upload PDF
              </button>
              <button
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  resumeTab === 'link'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setResumeTab('link')}
              >
                <Link2 size={20} />
                Resume URL
              </button>
            </div>

            {resumeTab === 'file' ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <span className="text-gray-600">
                    {resume ? resume.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-gray-400 text-sm">PDF files only</span>
                </label>
              </div>
            ) : (
              <input
                type="url"
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                placeholder="Enter resume URL..."
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
              />
            )}
          </div>

          <button
            onClick={analyzeMatch}
            disabled={!isFormValid() || isAnalyzing}
            className={`w-full py-4 rounded-lg font-semibold transition-all ${
              isFormValid() && !isAnalyzing
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                Analyzing...
              </span>
            ) : (
              'Analyze Match'
            )}
          </button>
        </div>

        {/* Results Section */}
        {score !== null && (
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="text-purple-500" />
              Analysis Results
            </h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Match Score:</span>
              <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  score >= 80
                    ? 'bg-green-500'
                    : score >= 70
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              {score >= 80 ? (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-700">Excellent Match!</h3>
                    <p className="text-gray-600">
                      Your resume aligns very well with the job requirements. Consider applying
                      right away!
                    </p>
                  </div>
                </div>
              ) : score >= 70 ? (
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-700">Good Match</h3>
                    <p className="text-gray-600">
                      Your resume matches most requirements. Consider highlighting relevant
                      experience more prominently.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-red-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-700">Needs Improvement</h3>
                    <p className="text-gray-600">
                      Consider tailoring your resume more specifically to this role's
                      requirements.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSTracking;