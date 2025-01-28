import React from 'react';

function CareerRoadmap() {
  return (
    <div id="careerroadmap" className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">
          Welcome to CareerRoadmap
        </h2>
        <p className="text-lg text-gray-200">
          Discover your path to success with a personalized career roadmap powered by AI.
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 text-white bg-teal-400 hover:bg-teal-500 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareerRoadmap;
