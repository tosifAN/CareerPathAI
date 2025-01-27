import React from 'react';
import { FileSearch, MessageSquare, Map, Briefcase } from 'lucide-react';

const services = [
  {
    title: 'ATS Tracking',
    description: 'Optimize your resume with our AI-powered ATS tracking system. Get real-time feedback and improve your chances of landing interviews.',
    icon: FileSearch,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'AI Career Chatbot',
    description: 'Get instant answers to your career questions with our emotionally intelligent AI chatbot available 24/7.',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Career Roadmap',
    description: 'Receive personalized career development paths based on your skills, interests, and market trends.',
    icon: Map,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Remote Job Listings',
    description: 'Access curated remote job opportunities matched to your profile and preferences.',
    icon: Briefcase,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
];

const Services = () => {
  return (
    <div id="services" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive career guidance powered by advanced AI technology
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <span
                    className={`inline-flex p-3 rounded-lg ${service.bgColor}`}
                  >
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className={`text-base font-medium ${service.color} hover:underline`}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;