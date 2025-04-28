
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import PageContainer from '@/components/layout/PageContainer';
import { useToast } from '@/hooks/use-toast';

const PersonalInfoForm = () => {
  const { profile, updatePersonalInfo } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ ...profile.personalInfo });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            placeholder="John"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            placeholder="Doe"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange} 
            placeholder="john.doe@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="+1 123 456 7890"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="New York, NY"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Senior Software Engineer"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="about">About</Label>
        <Textarea 
          id="about" 
          name="about" 
          value={formData.about} 
          onChange={handleChange} 
          placeholder="A short bio about yourself"
          rows={4}
        />
      </div>


      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            name="website" 
            value={formData.website || ''} 
            onChange={handleChange} 
            placeholder="https://yoursite.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input 
            id="linkedin" 
            name="linkedin" 
            value={formData.linkedin || ''} 
            onChange={handleChange} 
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input 
            id="github" 
            name="github" 
            value={formData.github || ''} 
            onChange={handleChange} 
            placeholder="https://github.com/username"
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full">Save Personal Information</Button>
    </form>
  );
};

const SkillsForm = () => {
  const { profile, addSkill, updateSkill, removeSkill } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    proficiency: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      toast({
        title: "Error",
        description: "Skill name and category are required.",
        variant: "destructive"
      });
      return;
    }
    
    addSkill(formData);
    setFormData({
      name: '',
      category: '',
      proficiency: 'Intermediate'
    });
    
    toast({
      title: "Skill Added",
      description: `${formData.name} has been added to your skills.`
    });
  };

  const handleRemove = (id: string) => {
    removeSkill(id);
    toast({
      title: "Skill Removed",
      description: "The skill has been removed from your profile."
    });
  };

  // Group skills by category
  const skillsByCategory: Record<string, typeof profile.skills> = {};
  profile.skills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="JavaScript"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              placeholder="Programming Languages"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proficiency">Proficiency</Label>
            <select
              id="proficiency"
              name="proficiency"
              value={formData.proficiency}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
        
        <Button type="submit" className="w-full">Add Skill</Button>
      </form>
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Your Skills</h3>
        
        {Object.keys(skillsByCategory).length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            You haven't added any skills yet. Add some skills to showcase your expertise.
          </p>
        ) : (
          Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="space-y-2">
              <h4 className="font-medium text-lg">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <div 
                    key={skill.id}
                    className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2"
                  >
                    <span>{skill.name}</span>
                    <span className="text-xs text-gray-500">({skill.proficiency})</span>
                    <button 
                      onClick={() => handleRemove(skill.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const EducationForm = () => {
  const { profile, addEducation, removeEducation } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.institution || !formData.degree) {
      toast({
        title: "Error",
        description: "Institution and degree are required.",
        variant: "destructive"
      });
      return;
    }
    
    addEducation(formData);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    
    toast({
      title: "Education Added",
      description: `Education at ${formData.institution} has been added to your profile.`
    });
  };

  const handleRemove = (id: string) => {
    removeEducation(id);
    toast({
      title: "Education Removed",
      description: "The education entry has been removed from your profile."
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input 
              id="institution" 
              name="institution" 
              value={formData.institution} 
              onChange={handleChange} 
              placeholder="Harvard University"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input 
              id="degree" 
              name="degree" 
              value={formData.degree} 
              onChange={handleChange} 
              placeholder="Bachelor of Science"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input 
              id="field" 
              name="field" 
              value={formData.field} 
              onChange={handleChange} 
              placeholder="Computer Science"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input 
              id="startDate" 
              name="startDate" 
              type="date"
              value={formData.startDate} 
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input 
              id="endDate" 
              name="endDate" 
              type="date"
              value={formData.endDate} 
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Courses, achievements, activities, etc."
            rows={3}
          />
        </div>
        
        <Button type="submit" className="w-full">Add Education</Button>
      </form>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Education</h3>
        
        {profile.education.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            You haven't added any education yet. Add your educational background.
          </p>
        ) : (
          <div className="space-y-4">
            {profile.education.map(edu => (
              <Card key={edu.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{edu.institution}</h4>
                      <p>{edu.degree} in {edu.field}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-sm text-gray-500">
                          {edu.startDate && new Date(edu.startDate).getFullYear()} - 
                          {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                        </p>
                      )}
                      {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemove(edu.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceForm = () => {
  const { profile, addExperience, removeExperience } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ['']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAchievementChange = (index: number, value: string) => {
    setFormData(prev => {
      const newAchievements = [...prev.achievements];
      newAchievements[index] = value;
      return { ...prev, achievements: newAchievements };
    });
  };

  const addAchievementField = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievementField = (index: number) => {
    setFormData(prev => {
      const newAchievements = [...prev.achievements];
      newAchievements.splice(index, 1);
      return { ...prev, achievements: newAchievements.length ? newAchievements : [''] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.position) {
      toast({
        title: "Error",
        description: "Company and position are required.",
        variant: "destructive"
      });
      return;
    }
    
    // Filter out empty achievements
    const cleanedAchievements = formData.achievements.filter(a => a.trim() !== '');
    
    addExperience({
      ...formData,
      achievements: cleanedAchievements
    });
    
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    });
    
    toast({
      title: "Experience Added",
      description: `Experience at ${formData.company} has been added to your profile.`
    });
  };

  const handleRemove = (id: string) => {
    removeExperience(id);
    toast({
      title: "Experience Removed",
      description: "The experience entry has been removed from your profile."
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input 
              id="company" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              placeholder="Google"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input 
              id="position" 
              name="position" 
              value={formData.position} 
              onChange={handleChange} 
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input 
              id="startDate" 
              name="startDate" 
              type="date"
              value={formData.startDate} 
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <div className="flex flex-col space-y-2">
              <Input 
                id="endDate" 
                name="endDate" 
                type="date"
                value={formData.endDate} 
                onChange={handleChange}
                disabled={formData.current}
              />
              <div className="flex items-center space-x-2">
                <input
                  id="current"
                  name="current"
                  type="checkbox"
                  checked={formData.current}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="current" className="text-sm font-normal">
                  I currently work here
                </Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Describe your role and responsibilities"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Key Achievements</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addAchievementField}
            >
              Add Achievement
            </Button>
          </div>
          
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                placeholder="Increased sales by 20%..."
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeAchievementField(index)}
                disabled={formData.achievements.length === 1}
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
        
        <Button type="submit" className="w-full">Add Experience</Button>
      </form>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Experience</h3>
        
        {profile.experience.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            You haven't added any experience yet. Add your work experience.
          </p>
        ) : (
          <div className="space-y-4">
            {profile.experience.map(exp => (
              <Card key={exp.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{exp.position}</h4>
                      <p>{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                        {exp.current ? 
                          ' Present' : 
                          (exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}` : '')}
                      </p>
                      {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Key Achievements:</p>
                          <ul className="list-disc list-inside text-sm">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemove(exp.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsForm = () => {
  const { profile, addProject, removeProject } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    skills: ['']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index: number, value: string) => {
    setFormData(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = value;
      return { ...prev, skills: newSkills };
    });
  };

  const addSkillField = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkillField = (index: number) => {
    setFormData(prev => {
      const newSkills = [...prev.skills];
      newSkills.splice(index, 1);
      return { ...prev, skills: newSkills.length ? newSkills : [''] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Project name is required.",
        variant: "destructive"
      });
      return;
    }
    
    // Filter out empty skills
    const cleanedSkills = formData.skills.filter(s => s.trim() !== '');
    
    addProject({
      ...formData,
      skills: cleanedSkills
    });
    
    setFormData({
      name: '',
      description: '',
      link: '',
      skills: ['']
    });
    
    toast({
      title: "Project Added",
      description: `Project ${formData.name} has been added to your profile.`
    });
  };

  const handleRemove = (id: string) => {
    removeProject(id);
    toast({
      title: "Project Removed",
      description: "The project has been removed from your profile."
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="E-Commerce Website"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Describe your project, its purpose, and your role"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="link">Project Link</Label>
          <Input 
            id="link" 
            name="link" 
            value={formData.link} 
            onChange={handleChange} 
            placeholder="https://github.com/yourusername/project"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Skills Used</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addSkillField}
            >
              Add Skill
            </Button>
          </div>
          
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="React, Node.js, etc."
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeSkillField(index)}
                disabled={formData.skills.length === 1}
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
        
        <Button type="submit" className="w-full">Add Project</Button>
      </form>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Projects</h3>
        
        {profile.projects.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            You haven't added any projects yet. Add your portfolio projects.
          </p>
        ) : (
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.projects.map(project => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{project.name}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemove(project.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    {project.description && (
                      <p className="mt-2 text-sm">{project.description}</p>
                    )}
                    
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-2 inline-block"
                      >
                        View Project
                      </a>
                    )}
                    
                    {project.skills && project.skills.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Professional Profile</h1>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            <Card className="mt-6">
              <CardContent className="pt-6">
                <TabsContent value="personal">
                  <PersonalInfoForm />
                </TabsContent>
                
                <TabsContent value="skills">
                  <SkillsForm />
                </TabsContent>
                
                <TabsContent value="education">
                  <EducationForm />
                </TabsContent>
                
                <TabsContent value="experience">
                  <ExperienceForm />
                </TabsContent>
                
                <TabsContent value="projects">
                  <ProjectsForm />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
