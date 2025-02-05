import React from 'react';
import { Home } from 'lucide-react';

export function HomeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 p-3 glass-effect rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
      title="Return to Home"
    >
      <Home className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
    </button>
  );
}