import React from 'react';
import { CheckCircle, RefreshCw, Brain, MessageSquare, Award, Star } from 'lucide-react';
import { HomeButton } from './HomeButton';

export function Report({ questions, onRestart, onHome }) {
  const averageScore =
    questions.reduce((sum, q) => sum + (q.score || 0), 0) / questions.length;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <HomeButton onClick={onHome} />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
              <h1 className="text-4xl font-bold text-gray-800">Interview Complete!</h1>
              <Award className="w-12 h-12 text-blue-600" />
            </div>
            <div className="inline-flex items-center gap-2 text-xl font-semibold bg-blue-100 text-blue-800 px-8 py-3 rounded-full">
              <Star className="w-6 h-6" />
              Average Score: {averageScore.toFixed(1)}/100
            </div>
          </div>

          <div className="space-y-8">
            {questions.map((q, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 transform transition-all hover:shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-800">Question {index + 1}</h2>
                  </div>
                  <span className={`flex items-center gap-2 bg-white px-6 py-2 rounded-full text-lg font-semibold ${getScoreColor(q.score || 0)}`}>
                    <Star className="w-5 h-5" />
                    Score: {q.score}/100
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                      <Brain className="w-5 h-5 text-blue-600" />
                      Question
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{q.question}</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      Your Answer
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{q.userAnswer}</p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                      <Award className="w-5 h-5 text-blue-600" />
                      Feedback
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{q.feedback}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onRestart}
              className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-200 hover:shadow-lg"
            >
              <RefreshCw className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start New Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}