import React, { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 pr-4 md:pr-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">CareerPathAI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
            <a href="/services" className="text-gray-700 hover:text-indigo-600">Services</a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600">About</a>
            <a href="/contact" className="text-gray-700 hover:text-indigo-600">Contact</a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-md absolute w-full left-0 pr-4 md:pr-8"
          >
            <div className="px-4 pt-2 pb-3 space-y-2 sm:px-6">
              <a href="/" className="block px-4 py-2 text-gray-700 hover:text-indigo-600">Home</a>
              <a href="/services" className="block px-4 py-2 text-gray-700 hover:text-indigo-600">Services</a>
              <a href="/about" className="block px-4 py-2 text-gray-700 hover:text-indigo-600">About</a>
              <a href="/contact" className="block px-4 py-2 text-gray-700 hover:text-indigo-600">Contact</a>
              <button className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;