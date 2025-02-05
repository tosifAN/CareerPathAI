import React from 'react';
import { Brain, GraduationCap, Loader2, BookOpen, Target, Award, Hash } from 'lucide-react';
import { rolesAndTopics, levels, questionDifficulty, aiModels } from '../../data/roles';

export function InterviewSetup({
  selectedRole,
  selectedTopic,
  selectedLevel,
  selectedDifficulty,
  selectedModel,
  numQuestions,
  onRoleChange,
  onTopicChange,
  onLevelChange,
  onDifficultyChange,
  onModelChange,
  onNumQuestionsChange,
  onStartInterview,
  loading,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Interview Practice Bot</h1>
            <GraduationCap className="w-12 h-12 text-blue-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prepare for your next interview with our AI-powered practice platform. Select your preferences below to begin.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  Select AI Model
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                  value={selectedModel}
                  onChange={(e) => onModelChange(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Model</option>
                  {aiModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  <Target className="w-4 h-4" />
                  Select Role
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                  value={selectedRole}
                  onChange={(e) => onRoleChange(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Role</option>
                  {Object.keys(rolesAndTopics).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  Select Topic
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                  value={selectedTopic}
                  onChange={(e) => onTopicChange(e.target.value)}
                  disabled={!selectedRole || loading}
                >
                  <option value="">Select Topic</option>
                  {selectedRole &&
                    rolesAndTopics[selectedRole].map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  <Award className="w-4 h-4" />
                  Level of Understanding
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                  value={selectedLevel}
                  onChange={(e) => onLevelChange(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Level</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  <Target className="w-4 h-4" />
                  Question Difficulty
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                  value={selectedDifficulty}
                  onChange={(e) => onDifficultyChange(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Difficulty</option>
                  {questionDifficulty.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  <Hash className="w-4 h-4" />
                  Number of Questions
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={numQuestions}
                  onChange={(e) => onNumQuestionsChange(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onStartInterview}
              disabled={!selectedRole || !selectedTopic || !selectedLevel || !selectedDifficulty || !selectedModel || loading}
              className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg disabled:hover:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Start Interview
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}