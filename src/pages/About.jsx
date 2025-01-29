import React from 'react';

function About() {
  return (
    <div id="about" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">About CareerPathAI</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            CareerPathAI is your ultimate companion for career growth, combining the power of advanced AI technology with personalized insights to help you achieve your professional goals. Whether you’re navigating job searches, building new skills, or planning your career path, we’ve got you covered.
          </p>
        </div>

        <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80" 
              alt="AI Guidance" 
              className="w-full h-40 rounded-lg object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">AI-Powered Guidance</h3>
            <p className="mt-2 text-gray-600">
              Our intelligent algorithms provide data-driven insights to guide you in making informed career decisions tailored to your aspirations.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1484910292437-025e5d13ce87?auto=format&fit=crop&q=80" 
              alt="Personalized Roadmaps" 
              className="w-full h-40 rounded-lg object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Personalized Roadmaps</h3>
            <p className="mt-2 text-gray-600">
              Get customized career development plans designed to bridge skill gaps, explore opportunities, and track your progress effectively.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
              alt="Expert Resources" 
              className="w-full h-40 rounded-lg object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Expert Resources</h3>
            <p className="mt-2 text-gray-600">
              Access a rich library of resources, including industry insights, resume tips, interview guidance, and much more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;