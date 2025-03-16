import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="font-bold text-xl text-indigo-600">
              Kickflip Funnels
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              Build high-converting marketing funnels with AI
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Kickflip Funnels. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
