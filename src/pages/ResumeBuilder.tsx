
import React, { useState } from 'react';
import { useUser, UserProfile } from '@/contexts/UserContext';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Define job profile types
type JobProfile = {
  id: string;
  name: string;
  description: string;
  keySkills: string[];
};

// Sample job profiles
const jobProfiles: JobProfile[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    description: 'Develops applications and systems using programming languages and software development practices.',
    keySkills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Database', 'Git', 'Problem Solving']
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Analyzes and interprets complex data to help organizations make better decisions.',
    keySkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Big Data']
  },
  {
    id: 'ux-designer',
    name: 'UX Designer',
    description: 'Creates intuitive, user-friendly interfaces and experiences for applications and websites.',
    keySkills: ['UI Design', 'User Research', 'Wireframing', 'Prototyping', 'Figma', 'Adobe XD', 'Usability Testing']
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Oversees product development from ideation to launch, aligning with business goals and user needs.',
    keySkills: ['Product Strategy', 'Roadmapping', 'Market Research', 'User Stories', 'Agile', 'Communication', 'Analytics']
  },
  {
    id: 'marketing-specialist',
    name: 'Marketing Specialist',
    description: 'Develops and implements marketing strategies to promote products and services.',
    keySkills: ['Digital Marketing', 'Content Creation', 'Social Media', 'SEO', 'Analytics', 'Campaign Management', 'Branding']
  },
  {
    id: 'cloud-architect',
    name: 'Cloud Architect',
    description: 'Designs and manages scalable, secure cloud infrastructure solutions for businesses.',
    keySkills: ['AWS', 'Azure', 'Cloud Security', 'DevOps', 'Networking', 'Infrastructure as Code', 'Docker', 'Kubernetes']
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    description: 'Protects systems and networks from cyber threats and vulnerabilities through monitoring and risk management.',
    keySkills: ['Network Security', 'Penetration Testing', 'Incident Response', 'SIEM', 'Firewalls', 'Ethical Hacking', 'Risk Assessment']
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    description: 'Bridges the gap between business needs and technology solutions by analyzing processes and systems.',
    keySkills: ['Requirements Gathering', 'Data Analysis', 'Process Mapping', 'SQL', 'Stakeholder Communication', 'Problem Solving', 'Agile']
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI/ML Engineer',
    description: 'Builds machine learning models and AI systems to automate processes and enhance decision-making.',
    keySkills: ['TensorFlow', 'PyTorch', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Python', 'Model Deployment']
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    description: 'Facilitates collaboration between development and operations teams to automate and streamline software delivery.',
    keySkills: ['CI/CD', 'Docker', 'Kubernetes', 'AWS', 'Monitoring Tools', 'Scripting', 'Infrastructure Automation']
  }
];

// Define resume templates
type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  previewImage: string;
};

// Sample resume templates
const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and formal design suitable for corporate environments.',
    previewImage: 'https://i.etsystatic.com/12645044/r/il/6794d0/4091452028/il_fullxfull.4091452028_dbs1.jpg'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary layout with a creative touch. and modern looks.',
    previewImage: 'https://static.rfstat.com/gm-media/template/371/slider-images/1184/34533cbc8bef_1x.jpeg'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple, elegant design focusing on content with elegant graphics and finest desgine.',
    previewImage: 'https://cdn-images.zety.com/pages/minimalist_resume_templates_1.jpg'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique layout to help you stand out and shin with Your Uniqe resume template',
    previewImage: 'https://s3u.tmimgcdn.com/u1573393/gJWHzoxWtf22pUkaS9ku.jpg'
  },
  {
    id: 'Classic',
    name: 'Classic',
    description: 'A timeless layout designed for elegance and simplicity.',
    previewImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTsoU9Q-cNAtOFZVjWkij3_ExeCpbhsMeUlg&s'
  },
  {
    id: 'Desgining',
    name: 'Desgining',
    description: 'A bold and creative layout perfect for showcasing your style.',
    previewImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRra_3vsUtAGoePoEMRJ_4fQtjjMUlwAGy4EQ&s'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Simpe Elegant and Smooth Templates for Tech Specifice jobs',
    previewImage: 'https://resumekraft.com/wp-content/uploads/edd/2019/08/ace-word-resume-template-free-download-1.jpg'
  },
  {
    id: 'Artistic',
    name: 'Artistic',
    description: 'A visually rich template for artists and designers.',
    previewImage: 'https://i.etsystatic.com/16997728/r/il/601880/5283735677/il_570xN.5283735677_rqgv.jpg'
  },
];

// Resume preview component
const ResumePreview: React.FC<{ 
  profile: UserProfile; 
  jobProfile: JobProfile | null;
  selectedTemplate: string;
  customizations: {
    includeSummary: boolean;
    showAllSkills: boolean;
    includeProjects: boolean;
  };
  customTitle: string;
}> = ({ profile, jobProfile, selectedTemplate, customizations, customTitle }) => {
  // Simplified implementation - in a real app, each template would have its own styling
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm min-h-[800px]">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {profile.personalInfo.firstName} {profile.personalInfo.lastName}
        </h2>
        <p className="text-gray-600">{customTitle || profile.personalInfo.title}</p>
        <div className="flex justify-center items-center space-x-4 mt-2 text-sm text-gray-500">
          {profile.personalInfo.email && (
            <span>{profile.personalInfo.email}</span>
          )}
          {profile.personalInfo.phone && (
            <span>{profile.personalInfo.phone}</span>
          )}
          {profile.personalInfo.location && (
            <span>{profile.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {customizations.includeSummary && profile.personalInfo.about && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h3>
          <p className="text-sm">{profile.personalInfo.about}</p>
        </div>
      )}

      

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills
              .filter(skill => 
                customizations.showAllSkills || 
                (jobProfile && jobProfile.keySkills.some(
                  key => skill.name.toLowerCase().includes(key.toLowerCase()))
                )
              )
              .map(skill => (
                <span 
                  key={skill.id}
                  className="bg-gray-100 px-2 py-1 rounded text-sm"
                >
                  {skill.name} ({skill.proficiency})
                </span>
              ))
            }
          </div>
        </div>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h3>
          <div className="space-y-4">
            {profile.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h4 className="font-medium">{exp.position}</h4>
                  <span className="text-sm text-gray-500">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                    {exp.current ? 
                      ' Present' : 
                      (exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}` : '')}
                  </span>
                </div>
                <p className="text-sm">{exp.company}</p>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1 ml-4">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Education</h3>
          <div className="space-y-4">
            {profile.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                  <span className="text-sm text-gray-500">
                    {edu.startDate && new Date(edu.startDate).getFullYear()} - 
                    {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </span>
                </div>
                <p className="text-sm">{edu.institution}</p>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {customizations.includeProjects && profile.projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Projects</h3>
          <div className="space-y-4">
            {profile.projects.map(project => (
              <div key={project.id}>
                <h4 className="font-medium">{project.name}</h4>
                {project.description && <p className="text-sm mt-1">{project.description}</p>}
                
                {project.skills && project.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 px-1.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ResumeBuilder = () => {
  const { profile } = useUser();
  const { toast } = useToast();
  const [selectedJobProfile, setSelectedJobProfile] = useState<JobProfile | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [activeTab, setActiveTab] = useState('job-selection');
  const [customizations, setCustomizations] = useState({
    includeSummary: true,
    showAllSkills: false,
    includeProjects: true
  });
  const [customTitle, setCustomTitle] = useState('');

  const isProfileComplete = () => {
    const { personalInfo, skills, education, experience } = profile;
    
    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
      return false;
    }
    
    if (skills.length === 0) {
      return false;
    }
    
    if (education.length === 0 && experience.length === 0) {
      return false;
    }
    
    return true;
  };

  const handleJobProfileSelect = (profileId: string) => {
    const selected = jobProfiles.find(profile => profile.id === profileId);
    if (selected) {
      setSelectedJobProfile(selected);
      toast({
        title: "Job Profile Selected",
        description: `Resume will be optimized for ${selected.name} roles.`
      });
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template Selected",
      description: `${resumeTemplates.find(t => t.id === templateId)?.name} template applied.`
    });
  };

  const handleCustomizationChange = (key: keyof typeof customizations, value: boolean) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your resume is being prepared for download."
    });
    
    // In a real implementation, this would trigger HTML-to-PDF conversion
    setTimeout(() => {
      toast({
        title: "Resume Downloaded",
        description: "Your resume has been successfully downloaded."
      });
    }, 1500);
  };

  if (!isProfileComplete()) {
    return (
      <PageContainer>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Complete Your Profile First</h2>
                  <p className="text-gray-600">
                    To build a resume, you need to complete your profile with personal information, skills, and either education or work experience.
                  </p>
                  <Button asChild>
                    <a href="/profile">Go to Profile</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="job-selection">Job Type</TabsTrigger>
                <TabsTrigger value="template">Template</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
              </TabsList>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <TabsContent value="job-selection" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Select Job Profile</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Choose a job profile to optimize your resume for that specific role.
                      </p>
                      
                      <Select 
                        value={selectedJobProfile?.id} 
                        onValueChange={handleJobProfileSelect}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job profile" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobProfiles.map(profile => (
                            <SelectItem key={profile.id} value={profile.id}>
                              {profile.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedJobProfile && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-md">
                          <h4 className="font-medium">{selectedJobProfile.name}</h4>
                          <p className="text-sm mt-1">{selectedJobProfile.description}</p>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Key Skills:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedJobProfile.keySkills.map((skill, index) => (
                                <span 
                                  key={index}
                                  className="text-xs bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => setActiveTab('template')}
                      disabled={!selectedJobProfile}
                      className="w-full"
                    >
                      Continue to Templates
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="template" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Select Template</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Choose a design template for your resume.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {resumeTemplates.map(template => (
                          <div 
                            key={template.id}
                            className={`border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition ${
                              selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => handleTemplateSelect(template.id)}
                          >
                            <img 
                              src={template.previewImage} 
                              alt={template.name}
                              className="w-full h-auto object-cover rounded mb-2"
                            />
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <p className="text-xs text-gray-500">{template.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setActiveTab('customize')}
                      className="w-full"
                    >
                      Continue to Customize
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="customize" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Customize Resume</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Adjust settings to customize your resume.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="includeSummary" 
                            checked={customizations.includeSummary}
                            onCheckedChange={(checked) => 
                              handleCustomizationChange('includeSummary', checked as boolean)
                            }
                          />
                          <Label htmlFor="includeSummary">Include summary</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="showAllSkills" 
                            checked={customizations.showAllSkills}
                            onCheckedChange={(checked) => 
                              handleCustomizationChange('showAllSkills', checked as boolean)
                            }
                          />
                          <Label htmlFor="showAllSkills">Show all skills (not just relevant ones)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="includeProjects" 
                            checked={customizations.includeProjects}
                            onCheckedChange={(checked) => 
                              handleCustomizationChange('includeProjects', checked as boolean)
                            }
                          />
                          <Label htmlFor="includeProjects">Include projects</Label>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="customTitle">Custom Job Title (optional)</Label>
                          <Input 
                            id="customTitle" 
                            value={customTitle} 
                            onChange={(e) => setCustomTitle(e.target.value)}
                            placeholder={profile.personalInfo.title}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleDownload}
                      className="w-full"
                    >
                      Download Resume
                    </Button>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>
          
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-4 bg-gray-50 h-full overflow-auto">
              <h3 className="text-lg font-semibold mb-4 text-center">Resume Preview</h3>
              <ResumePreview 
                profile={profile} 
                jobProfile={selectedJobProfile} 
                selectedTemplate={selectedTemplate}
                customizations={customizations}
                customTitle={customTitle}
              />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ResumeBuilder;
