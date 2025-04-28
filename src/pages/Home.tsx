
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import { FileText, User, Star, Award, BriefcaseIcon } from 'lucide-react';
import './hhh.css'
const Home = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-50 py-20 hhh2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-950 mb-4">
                Build Your Professional Identity & Resume
              </h1>
              <p className="text-lg text-brand-700 mb-8">
                Create your professional profile, showcase your skills, and generate
                targeted resumes for your dream jobs in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/profile">Create Your Profile</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/resume-builder">Build a Resume</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://avatars.githubusercontent.com/u/144231613?s=400&u=13e31c05b10075d150c49c65ac6779058f9e93c6&v=4"
                alt="Professional Profile"
               
                className="rounded-lg  hhh"
                
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition">
              <div className="bg-brand-100 p-4 rounded-full mb-4">
                <User size={32} className="text-brand-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Your Profile</h3>
              <p className="text-gray-600">
                Create a comprehensive professional profile with your experience, education, skills, and projects.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition">
              <div className="bg-brand-100 p-4 rounded-full mb-4">
                <Star size={32} className="text-brand-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Highlight Your Skills</h3>
              <p className="text-gray-600">
                Showcase your skills with proficiency levels and organize them by categories.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition">
              <div className="bg-brand-100 p-4 rounded-full mb-4">
                <FileText size={32} className="text-brand-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Targeted Resumes</h3>
              <p className="text-gray-600">
                Build tailored resumes for specific job profiles using your stored information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ApniProfile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0">
                <Award size={24} className="text-brand-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
                <p className="text-gray-600">
                  Choose from a variety of professionally designed resume templates.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0">
                <BriefcaseIcon size={24} className="text-brand-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Job-Specific Targeting</h3>
                <p className="text-gray-600">
                  Generate resumes that highlight the most relevant skills for each job application.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0">
                <User size={24} className="text-brand-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Complete Profile Management</h3>
                <p className="text-gray-600">
                  Store all your professional information in one place for easy access and updates.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0">
                <FileText size={24} className="text-brand-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy Resume Generation</h3>
                <p className="text-gray-600">
                  Create, preview, and download professional resumes in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Professional Profile?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your profile today and start generating targeted resumes for your dream jobs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/profile">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </PageContainer>
  );
};

export default Home;
