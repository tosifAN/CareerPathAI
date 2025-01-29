import React from 'react';

function AICareerChatbot() {
  return (
    <div id="aicareerchatbot" className="py-16 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">
          Welcome to AICareerChatbot
        </h2>
        <p className="text-lg text-gray-200">
          Discover the future of your career with AI-powered guidance and insights.
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default AICareerChatbot;
