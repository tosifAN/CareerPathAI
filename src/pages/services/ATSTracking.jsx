import React, { useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  AlertCircle,
  Loader2,
  ChevronDown,
  CheckCircle2,
  Target,
  Award,
  AlertTriangle,
  FileSearch,
  Sparkles,
  Rocket,
  Zap,
} from 'lucide-react';
import Background from '../../components/Background';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const FileUploaderComponent = ({ onFileChange }) => (
  <motion.div 
    className="w-full"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <FileUploader
      handleChange={onFileChange}
      name="file"
      types={['PDF', 'DOCX']}
      classes="w-full"
      maxSize={10}
      minSize={0}
    >
      <div className="flex flex-col items-center text-center cursor-pointer p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all">
        <Upload className="w-12 h-12 text-blue-400 mb-4" />
        <p className="text-lg text-white/90 font-medium">
          Drag & drop your resume or click to browse
        </p>
        <p className="text-sm text-white/60 mt-2">
          Supported formats: PDF, DOCX (max 10MB)
        </p>
      </div>
    </FileUploader>
  </motion.div>
);

const StatsCard = ({ icon: Icon, title, value, color }) => (
  <motion.div 
    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center gap-3 mb-3">
      <Icon className={`w-6 h-6 ${color}`} />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="text-3xl font-bold text-white/90">{value}</p>
  </motion.div>
);

const AnalysisResults = ({ result, expanded, onToggle }) => {
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className="border-t border-white/10"
    >
      <div className="p-6">
        <motion.button
          onClick={onToggle}
          className="flex items-center justify-between w-full"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                  icon={Target}
                  title="Match Score"
                  value={`${result.matchPercentage}%`}
                  color={getMatchColor(result.matchPercentage)}
                />
                <StatsCard
                  icon={Sparkles}
                  title="Key Strengths"
                  value={result.strengths?.length || 0}
                  color="text-green-400"
                />
                <StatsCard
                  icon={Zap}
                  title="Areas to Improve"
                  value={result.areasForImprovement?.length || 0}
                  color="text-yellow-400"
                />
              </div>

              <div className="space-y-6">
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">Missing Keywords</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords?.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-white/5 rounded-full text-white/80">
                        {keyword}
                      </span>
                    )) || 'None'}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl font-semibold text-white">Key Strengths</h3>
                  </div>
                  <ul className="space-y-3">
                    {result.strengths?.map((strength, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-white/80"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        {strength}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Rocket className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Candidate Summary</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {result.candidateSummary || 'No summary available.'}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function ATSTracking() {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(true);

  const handleChange = (file) => {
    setFile(file);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setError('Please provide a job description');
      return;
    }
    if (!file) {
      setError('Please upload a resume');
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('https://careerpathai-1.onrender.com/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysisResult(response.data);
      setExpanded(true);
    } catch (error) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Error analyzing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Background />
      <div className="relative min-h-screen py-12 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600/80 to-indigo-600/80 p-8">
              <motion.div 
                className="flex items-center gap-4"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
              >
                <FileSearch className="w-12 h-12 text-white" />
                <div>
                  <h1 className="text-4xl font-bold text-white">ATS Resume Analyzer</h1>
                  <p className="mt-2 text-xl text-white/80">
                    Optimize your resume for Applicant Tracking Systems
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="p-8 space-y-8">
              <motion.div variants={fadeIn} initial="initial" animate="animate">
                <label className="block text-lg font-medium text-white mb-3">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full min-h-[150px] p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Paste the job description here..."
                />
              </motion.div>

              <motion.div variants={fadeIn} initial="initial" animate="animate">
                <label className="block text-lg font-medium text-white mb-3">
                  Resume Upload
                </label>
                <FileUploaderComponent onFileChange={handleChange} />
                {file && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-3 text-green-400"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{file.name}</span>
                  </motion.div>
                )}
              </motion.div>

              {error && (
                <motion.div 
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                >
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-3 ${
                  loading
                    ? 'bg-blue-600/50 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6" />
                    Analyze Resume
                  </>
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {analysisResult && (
                <AnalysisResults
                  result={analysisResult}
                  expanded={expanded}
                  onToggle={() => setExpanded(!expanded)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
