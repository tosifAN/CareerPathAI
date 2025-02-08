import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CodingContests from '../components/CodingContests';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Services />
      <CodingContests/>
    </div>
  );
}

export default App;