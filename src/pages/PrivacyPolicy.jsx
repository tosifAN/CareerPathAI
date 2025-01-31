import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="mt-6 container mx-auto p-6 text-gray-700">
      <h1 className="mt-10 text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      
      <img 
        src="https://images.unsplash.com/photo-1613987750911-f768497fb94b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Privacy Policy" 
        className="w-full h-64 object-cover mb-6"
      />
      
      <p className="mb-4">
        Welcome to CareerPathAI! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
      </p>
      
      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <p className="mb-2">We collect the following types of information:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal Information: Name, email, and contact details.</li>
        <li>Career Data: Resumes, job preferences, and skills.</li>
        <li>Usage Data: Interactions with our platform, IP address, and device information.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
      <p className="mb-2">We use your information to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide personalized career recommendations.</li>
        <li>Improve our AI-driven guidance and services.</li>
        <li>Enhance user experience and platform performance.</li>
        <li>Comply with legal and regulatory requirements.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-4">3. Data Security</h2>
      <p className="mb-4">
        We take reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.
      </p>
      
      <h2 className="text-xl font-semibold mt-4">4. Sharing of Information</h2>
      <p className="mb-4">
        We do not sell or rent your personal data. We may share information with trusted partners for service enhancements, legal compliance, or if required by law.
      </p>
      
      <h2 className="text-xl font-semibold mt-4">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your data. Contact us at support@careerpathai.com to manage your preferences.
      </p>
      
      <h2 className="text-xl font-semibold mt-4">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy periodically. Any significant changes will be communicated to users.
      </p>
      
      <h2 className="text-xl font-semibold mt-4">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@careerpathai.com" className="text-blue-500">support@careerpathai.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
