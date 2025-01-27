import React, { useState, useEffect } from 'react';
import { FileSearch, MessageSquare, Map, Briefcase, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'ATS Tracking',
    description: 'Optimize your resume with our AI-powered ATS tracking system. Get real-time feedback and improve your chances of landing interviews.',
    icon: FileSearch,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80',
    features: ['Real-time ATS Score', 'Keyword Analysis', 'Format Optimization', 'Industry Benchmarks']
  },
  {
    title: 'AI Career Chatbot',
    description: 'Get instant answers to your career questions with our emotionally intelligent AI chatbot available 24/7.',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80',
    features: ['24/7 Availability', 'Personalized Advice', 'Interview Practice', 'Skill Recommendations']
  },
  {
    title: 'Career Roadmap',
    description: 'Receive personalized career development paths based on your skills, interests, and market trends.',
    icon: Map,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
    features: ['Custom Learning Paths', 'Skill Gap Analysis', 'Industry Insights', 'Progress Tracking']
  },
  {
    title: 'Remote Job Listings',
    description: 'Access curated remote job opportunities matched to your profile and preferences.',
    icon: Briefcase,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&q=80',
    features: ['AI-Matched Jobs', 'Salary Insights', 'Company Research', 'Application Tracking']
  },
];

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div id="services" className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive career guidance powered by advanced AI technology
          </p>
        </div>

        <div className="mt-16 relative">
          <div 
            className="overflow-hidden rounded-2xl shadow-xl bg-white"
            onMouseEnter={() => {
              setIsPaused(true);
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsPaused(false);
              setIsHovered(false);
            }}
          >
            <div className="relative h-[600px]">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`absolute w-full h-full transition-all duration-700 ease-in-out transform ${
                    index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                  }`}
                  style={{ zIndex: index === currentSlide ? 1 : 0 }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-3xl mx-auto">
                      <div className={`inline-flex p-3 rounded-lg ${service.bgColor} mb-4 transform transition-transform hover:scale-110`}>
                        <service.icon className={`h-6 w-6 ${service.color}`} />
                      </div>
                      <h3 className="text-4xl font-bold mb-4">{service.title}</h3>
                      <p className="text-lg text-gray-200 mb-6">{service.description}</p>
                      
                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {service.features.map((feature, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
                          >
                            <ArrowRight className="h-4 w-4" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button 
                        className={`group px-8 py-4 rounded-lg bg-white font-semibold ${service.color} transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2`}
                      >
                        <span>Explore {service.title}</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-lg transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            } hover:bg-white hover:scale-110 z-10`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow-lg transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            } hover:bg-white hover:scale-110 z-10`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-6 gap-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-indigo-600 w-20' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;