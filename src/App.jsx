import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Services from './pages/Services';
import JobListingPage from './services/RemoteJobs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<div>About Page</div>} /> {/* Example */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
          <Route path="/services/joblisting" element={<JobListingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
