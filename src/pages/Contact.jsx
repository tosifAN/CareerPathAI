import React from 'react';

function Contact() {
  return (
    <div id="contact" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">Contact Us</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We’d love to hear from you! Whether you have questions, feedback, or just want to say hi, feel free to reach out.
          </p>
        </div>

        <div className="mt-10">
          <img 
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80" 
            alt="Contact Us Illustration" 
            className="w-full h-60 rounded-lg object-cover mb-10"
          />
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            <p className="mt-2 text-gray-600">
              Email: <a href="mailto:info@careerpathai.com" className="text-blue-600">info@careerpathai.com</a>
            </p>
            <p className="mt-2 text-gray-600">Phone: +1 (123) 456-7890</p>
            <p className="mt-2 text-gray-600">Address: 123 AI Way, Tech City, CA 94016</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900">Send Us a Message</h3>
            <form className="mt-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
