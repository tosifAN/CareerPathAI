import React from 'react';
import { Milestone, Clock, BookOpen, ChevronRight } from 'lucide-react';

function RoadmapDisplay({ steps, jobTitle }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Path to Becoming a {jobTitle}
        </h2>
        <p className="text-lg text-gray-600">
          Follow these steps to achieve your career goals
        </p>
      </div>

      <div className="space-y-8 relative">
        <div className="absolute left-[27px] top-[40px] bottom-8 w-0.5 bg-gradient-to-b from-blue-600 to-indigo-600 opacity-20"></div>
        
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex gap-6 group"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <Milestone className="w-6 h-6 text-white" />
            </div>

            <div className="flex-grow bg-white/80 backdrop-blur rounded-xl shadow-md p-8 transform transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  Step {index + 1}: {step.title}
                  <ChevronRight className="w-5 h-5 text-indigo-600 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                {step.timeframe && (
                  <span className="flex items-center text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-1" />
                    {step.timeframe}
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {step.description}
              </p>

              {step.resources && step.resources.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-indigo-600" />
                    Learning Resources
                  </h4>
                  <ul className="space-y-2">
                    {step.resources.map((resource, idx) => (
                      <li
                        key={idx}
                        className="text-gray-700 flex items-center before:content-['•'] before:mr-2 before:text-indigo-600"
                      >
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapDisplay;