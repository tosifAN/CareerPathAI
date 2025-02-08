import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';

function CodingContests() {
  return (
    <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/50 mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-2 bg-indigo-50 rounded-2xl mb-3 dark:bg-indigo-900/30">
            <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Upcoming Coding Contests & Hackathons
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Stay ahead in your coding journey with our curated list of upcoming competitions
          </p>
        </div>

        <div className="text-center">
          <a
            href="/services/upcoming-coding-contests"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 group dark:shadow-indigo-500/50"
          >
            View All Contests
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CodingContests;