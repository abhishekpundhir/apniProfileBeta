
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-700">
        
          ApniProfle
        </Link>
        
        <div className="flex space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/profile" className="flex items-center gap-2">
              <User size={18} />
              <span>Profile</span>
            </Link>
          </Button>
          
          <Button variant="ghost" asChild>
            <Link to="/resume-builder" className="flex items-center gap-2">
              <FileText size={18} />
              <span>Resume</span>
            </Link>
          </Button>
          
          {/* <Button variant="default">
            Sign In
          </Button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
