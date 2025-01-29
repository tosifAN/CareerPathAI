import React from "react";

const Careers = () => {
  return (
    <div className="mt-10 container mx-auto p-6 text-gray-700">
      <h1 className="mt-10 text-3xl font-bold text-center mb-6">Join Our Team</h1>
      
      <img 
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Careers at CareerPathAI" 
        className="w-full h-64 object-cover mb-6"
      />
      
      <p className="mb-4 text-lg text-center">
        At CareerPathAI, we're revolutionizing career counseling with AI-driven insights. Join us to make a real impact!
      </p>
      
      <h2 className="text-xl font-semibold mt-4">Why Work With Us?</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Innovative AI-driven career solutions</li>
        <li>Collaborative and inclusive work environment</li>
        <li>Opportunities for growth and learning</li>
        <li>Flexible work arrangements</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-4">Current Openings</h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold">Software Engineer (React & Node.js)</h3>
        <p>Develop and optimize our platform’s frontend and backend.</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Apply Now</button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold">Machine Learning Engineer</h3>
        <p>Work on AI models to enhance career recommendations.</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Apply Now</button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold">Product Manager</h3>
        <p>Lead product development and strategy.</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Apply Now</button>
      </div>
      
      <h2 className="text-xl font-semibold mt-4">How to Apply?</h2>
      <p className="mb-4">
        Interested candidates can send their resume to <a href="mailto:careers@careerpathai.com" className="text-blue-500">careers@careerpathai.com</a> with the job title in the subject line.
      </p>
    </div>
  );
};

export default Careers;
