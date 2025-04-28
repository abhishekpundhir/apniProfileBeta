
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">ApniProfile</h3>
            <p className="text-gray-600 text-sm">
              Build your professional profile and create targeted resumes with ease.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-primary text-sm">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="text-gray-600 hover:text-primary text-sm">
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-gray-600 text-sm">
              Questions or feedback? Feel free to reach out.
            </p>
            <a href="mailto:contact@skillresume.app" className="text-primary text-sm hover:underline">
              contact@ApniProfile.app
            </a>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ApniProfile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
