import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Your AI-Powered</span>
              <span className="block text-indigo-600">Career Companion</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Navigate your career journey with confidence using our AI-driven career counseling platform. Get personalized guidance, skill assessments, and job recommendations tailored to your unique profile.
            </p>
            <div className="mt-8 sm:mt-10">
              <button
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform duration-200"
              >
              <Link to={'/services/assessment'} className="flex items-center space-x-2">
                <Bot className="w-5 h-5 mr-2" />
                Start Career Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              </button>
              <p className="mt-3 text-sm text-gray-500">
                Free assessment • 10 minutes • Personalized report
              </p>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                alt="AI Career Guidance"
              />
              <div className="absolute -bottom-8 -right-8 w-40 h-40">
                <img
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80"
                  alt="Career Planning"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;