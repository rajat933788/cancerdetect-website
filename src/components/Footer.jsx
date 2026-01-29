// src/components/Footer.jsx

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Cancer & Thyroid Awareness. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6 text-sm">
          <a href="/" className="hover:text-red-600 transition-colors">Home</a>
          <a href="#resources" className="hover:text-red-600 transition-colors">Resources</a>
          <a href="#faq" className="hover:text-red-600 transition-colors">FAQ</a>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-red-600 transition-colors">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="hover:text-red-600 transition-colors">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="hover:text-red-600 transition-colors">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="hover:text-red-600 transition-colors">
            <FaLinkedinIn size={18} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
