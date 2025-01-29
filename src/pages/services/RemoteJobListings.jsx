import React from 'react';

function RemoteJobListings() {
  return (
    <div id="remotejoblistings" className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">
          Welcome to RemoteJobListings
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          Explore the best remote job opportunities and take your career to the next level from anywhere in the world.
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 text-white bg-green-400 hover:bg-green-500 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoteJobListings;
