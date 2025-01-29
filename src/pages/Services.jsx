import React from 'react';
import { FileSearch, MessageSquare, Map, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'ATS Tracking',
    description: 'Optimize your resume with our AI-powered ATS tracking system. Get real-time feedback and improve your chances of landing interviews.',
    icon: FileSearch,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80',
    features: ['Real-time ATS Score', 'Keyword Analysis', 'Format Optimization', 'Industry Benchmarks'],
    link: '/services/atstracking'
  },
  {
    title: 'AI Career Chatbot',
    description: 'Get instant answers to your career questions with our emotionally intelligent AI chatbot available 24/7.',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80',
    features: ['24/7 Availability', 'Personalized Advice', 'Interview Practice', 'Skill Recommendations'],
    link: '/services/aicareerchatbot'
  },
  {
    title: 'Career Roadmap',
    description: 'Receive personalized career development paths based on your skills, interests, and market trends.',
    icon: Map,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
    features: ['Custom Learning Paths', 'Skill Gap Analysis', 'Industry Insights', 'Progress Tracking'],
    link: '/services/careerroadmap'
  },
  {
    title: 'Remote Job Listings',
    description: 'Access curated remote job opportunities matched to your profile and preferences.',
    icon: Briefcase,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&q=80',
    features: ['AI-Matched Jobs', 'Salary Insights', 'Company Research', 'Application Tracking'],
    link: '/services/remotejoblistings'
  },
];
import Navbar from '../components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
            </div>
        </div>
    </div>
  );
}

export default App;
