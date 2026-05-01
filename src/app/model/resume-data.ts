export interface ResumeData {
  description: string;
  city: string;
  phoneNumber: string;
  email: string;
  socialLinks: SocialLinkData[];
  experiences: ExperienceData[];
  education: EducationData[];
  skills: SkillData[];
  workflows: string[];
  interests: string[];
  courses: CourseData[];
  portfolio: PortfolioData[];
  languages: string[];
}

export interface SocialLinkData {
  icon: string;
  url: string;
}

export interface ExperienceData {
  role: string;
  company: string;
  dateFrom: string;
  dateTo: string;
  description: string;
  responsibilities: string[];
}

interface EducationData {
  school: string;
  dateFrom: string;
  dateTo: string;
  degree: string;
  description: string;
}

export interface SkillData {
  name: string;
  category: string;
  icon: string;
  experience: number;
}

export interface CourseData {
  name: string;
  issuingOrganization: string;
  issued: string;
  credentialUrl: string;
}

export interface PortfolioData {
  name: string;
  description: string;
  category: PortfolioCategory;
  demoPath: string;
  imagePath: string;
}

export enum PortfolioCategory {
  'All' = 'All',
  'Games' = 'Games',
  'Unity Learn' = 'Unity Learn'
}
