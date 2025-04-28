
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define our data types
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  skills: string[];
}

export interface UserProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    about: string;
    skills: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

// Create initial state
const initialUserProfile: UserProfile = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    about: '',
    skills: ''
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
};

// Helper to generate unique IDs
export const generateId = () => Math.random().toString(36).substring(2, 11);

// Create context
interface UserContextType {
  profile: UserProfile;
  updatePersonalInfo: (info: Partial<UserProfile['personalInfo']>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Omit<Skill, 'id'>>) => void;
  removeSkill: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Omit<Education, 'id'>>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Omit<Experience, 'id'>>) => void;
  removeExperience: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Omit<Project, 'id'>>) => void;
  removeProject: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load existing data from localStorage
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : initialUserProfile;
  });
  
  // Save to localStorage when profile changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);
  
  // Update functions
  const updatePersonalInfo = (info: Partial<UserProfile['personalInfo']>) => {
    setProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info
      }
    }));
  };
  
  // Skills
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: generateId() };
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };
  
  const updateSkill = (id: string, skill: Partial<Omit<Skill, 'id'>>) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.map(s => 
        s.id === id ? { ...s, ...skill } : s
      )
    }));
  };
  
  const removeSkill = (id: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };
  
  // Education
  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: generateId() };
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };
  
  const updateEducation = (id: string, education: Partial<Omit<Education, 'id'>>) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map(e => 
        e.id === id ? { ...e, ...education } : e
      )
    }));
  };
  
  const removeEducation = (id: string) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };
  
  // Experience
  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience = { 
      ...experience, 
      id: generateId(),
      achievements: experience.achievements || [] 
    };
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };
  
  const updateExperience = (id: string, experience: Partial<Omit<Experience, 'id'>>) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map(e => 
        e.id === id ? { ...e, ...experience } : e
      )
    }));
  };
  
  const removeExperience = (id: string) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };
  
  // Projects
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: generateId() };
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };
  
  const updateProject = (id: string, project: Partial<Omit<Project, 'id'>>) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === id ? { ...p, ...project } : p
      )
    }));
  };
  
  const removeProject = (id: string) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const value = {
    profile,
    updatePersonalInfo,
    addSkill,
    updateSkill,
    removeSkill,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
