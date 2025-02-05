import React, { useState } from 'react';
import { Send, RotateCcw, Loader2, Brain, MessageSquare, Award, Star, Lightbulb, ArrowRight } from 'lucide-react';
import { HomeButton } from './HomeButton';

export function Interview({
  questions,
  currentQuestion,
  onSubmitAnswer,
  onNextQuestion,
  onComplete,
  loading,
  onHome,
}) {
  const [answer, setAnswer] = useState('');
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      onNextQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <HomeButton onClick={onHome} />
      <div className="max-w-4xl mx-auto p-6">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <p className="text-gray-600">Think carefully about your response</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium shadow-md">
                Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl mb-6 transform hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Challenge</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{question.question}</p>
          </div>
        </div>

        {/* Answer Section */}
        {!question.userAnswer ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Your Response</h3>
            </div>
            
            <div className="relative">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-48 p-6 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 text-lg leading-relaxed"
                disabled={loading}
              />
              <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                {answer.length} characters
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!answer.trim() || loading}
              className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none"
            >
              <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              <div className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Evaluating your answer...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    <span>Submit Answer</span>
                  </>
                )}
              </div>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 transform hover:shadow-2xl transition-all duration-300">
            {/* User's Answer */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
              <h3 className="flex items-center gap-3 font-semibold text-gray-800 mb-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                Your Answer
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">{question.userAnswer}</p>
            </div>

            {/* Feedback Section */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-3 font-semibold text-gray-800">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  Feedback
                </h3>
                <div className="flex items-center gap-2 bg-white px-6 py-2 rounded-xl shadow-sm">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-800">Score: {question.score}/100</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{question.feedback}</p>
            </div>

            {/* Next Question Button */}
            <button
              onClick={handleNext}
              className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              <div className="flex items-center justify-center gap-3">
                {isLastQuestion ? (
                  <>
                    <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Complete Interview</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    <span>Next Question</span>
                  </>
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}