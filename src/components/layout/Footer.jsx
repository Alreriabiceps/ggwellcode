import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Rekomendito</h3>
              <p className="text-gray-400 text-sm">Smart Provider Discovery</p>
            </div>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-gray-300 hover:text-white transition-colors">
              Explore
            </Link>
            <Link to="/auth" className="text-gray-300 hover:text-white transition-colors">
              Sign Up
            </Link>
            <Link to="/register-provider" className="text-gray-300 hover:text-white transition-colors">
              Become Provider
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Rekomendito. All rights reserved. Built for Bataan Province.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 