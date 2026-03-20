export interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  liveLink: string;
  githubLink: string;
}

export interface Skill {
  category: string;
  items: { name: string; level: number }[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  responsibilities: string[];
  skills: string[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Fallback data for production (when backend is not deployed)
const fallbackProjects: Project[] = [
  {
    id: 1,
    name: "Python Automation Tool",
    description: "Automates email, WhatsApp, and security tasks with Python scripts",
    tech: ["Python", "Automation", "API Integration"],
    liveLink: "#",
    githubLink: "https://github.com/TheNikhilLuhach"
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Modern portfolio with Next.js, Tailwind CSS, and Framer Motion",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://nikhil-portfolio.vercel.app",
    githubLink: "https://github.com/TheNikhilLuhach/Nikhil"
  }
];

const fallbackSkills: Skill[] = [
  {
    category: "Programming",
    items: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 75 }
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 70 },
      { name: "Linux", level: 75 },
      { name: "Docker", level: 60 }
    ]
  }
];

const fallbackExperience: Experience[] = [
  {
    id: 1,
    role: "Generative AI Trainee",
    company: "LinuxWorld Informatics Pvt Ltd",
    location: "Remote",
    duration: "May 2025 – Aug 2025",
    description: "Worked on Generative AI concepts and automation-based solutions using Python.",
    responsibilities: [
      "Developed AI-based automation systems",
      "Worked with Python for implementing AI use cases",
      "Built prompt-based and logic-driven solutions"
    ],
    skills: ["Generative AI", "Python", "Automation"]
  },
  {
    id: 2,
    role: "Frontend Developer Intern",
    company: "1Stop.ai",
    location: "Remote",
    duration: "Mar 2024 – Apr 2024",
    description: "Worked on frontend development, building responsive and user-friendly web interfaces.",
    responsibilities: [
      "Developed responsive websites using HTML, CSS, JavaScript",
      "Designed UI components and layouts",
      "Improved user experience and visual structure"
    ],
    skills: ["HTML", "CSS", "JavaScript", "UI Design"]
  },
  {
    id: 3,
    role: "Linux & AWS Intern",
    company: "Tech Organization",
    location: "Remote",
    duration: "2024",
    description: "Gained hands-on experience with AWS services including EC2, S3, and IAM.",
    responsibilities: [
      "Managed AWS EC2 instances and S3 buckets",
      "Implemented IAM policies and security groups",
      "Automated deployment workflows with Bash scripting"
    ],
    skills: ["AWS", "Linux", "EC2", "S3", "IAM"]
  }
];

export async function getProjects(): Promise<Project[]> {
  if (!API_BASE_URL) {
    console.warn('No API URL configured, using fallback data');
    return fallbackProjects;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.warn('API fetch failed, using fallback projects:', error);
    return fallbackProjects;
  }
}

export async function getSkills(): Promise<Skill[]> {
  if (!API_BASE_URL) {
    console.warn('No API URL configured, using fallback data');
    return fallbackSkills;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/skills`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) throw new Error('Failed to fetch skills');
    return await response.json();
  } catch (error) {
    console.warn('API fetch failed, using fallback skills:', error);
    return fallbackSkills;
  }
}

export async function getExperience(): Promise<Experience[]> {
  if (!API_BASE_URL) {
    console.warn('No API URL configured, using fallback data');
    return fallbackExperience;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/experience`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) throw new Error('Failed to fetch experience');
    return await response.json();
  } catch (error) {
    console.warn('API fetch failed, using fallback experience:', error);
    return fallbackExperience;
  }
}
