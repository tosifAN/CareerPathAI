import React from 'react';

function ATSTracking() {
  return (
    <div id="atstracking" className="py-16 bg-gradient-to-r from-green-400 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">
          Welcome to ATSTracking
        </h2>
        <p className="text-lg text-gray-200">
          Track your assets efficiently and gain valuable insights with our powerful system.
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
            Start Tracking
          </button>
        </div>
      </div>
    </div>
  );
}

export default ATSTracking;
