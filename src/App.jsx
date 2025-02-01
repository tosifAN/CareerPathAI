import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import AICareerChatbot from './pages/services/AICareerChatbot';
import ATSTracking from './pages/services/ATSTracking';
import CareerRoadmap from './pages/services/CareerRoadmap';
import RemoteJobListings from './pages/services/RemoteJobListings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Careers from './pages/Career';
import Blog from './pages/blog';

function App(){
  return (
    <Router>
      <Analytics />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} />
      
          <Route path="/services/aicareerchatbot" element={<AICareerChatbot />} />
          <Route path="/services/atstracking" element={<ATSTracking />} />
          <Route path="/services/careerroadmap" element={<CareerRoadmap />} />
          <Route path="/services/remotejoblistings" element={<RemoteJobListings />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
