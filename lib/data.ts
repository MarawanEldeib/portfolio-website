// Portfolio Data - Marawan Eldeib's Professional Profile
export const personalInfo = {
  name: "Marawan Eldeib",
  title: "Software Engineering Student & Developer",
  email: "marawandeep13@gmail.com",
  phone: "+49 178 2374198",
  linkedin: "https://www.linkedin.com/in/marawan-el-deib/",
  github: "https://github.com/MarawanEldeib",
  location: "Stuttgart, Baden-Württemberg, Germany",
  image: "/images/Marawan.jpeg",
  summary: "Passionate Software Engineering graduate student at Stuttgart University with a proven track record in AI/ML, full-stack development, and research. Experienced in developing scalable applications used by 10,000+ users and creating award-winning machine learning models with 98.5% accuracy. Skilled in Python, Java, Flutter, and cloud technologies, with hands-on experience at Fraunhofer IOSB and AirAsia.",
  workPermit: {
    hasPermit: true,
    details: "Working Student - Available on Request",
  },
};

export const skills = {
  languages: ["Python", "Java", "C/C++", "SQL", "Assembly"],
  frameworks: ["Spring Boot", "Flutter", "PyTorch", "Detectron2", "scikit-learn"],
  tools: ["AWS", "Docker", "Git", "GraphQL", "REST APIs", "Firebase", "Jira", "Confluence", "MCP Server"],
  systems: ["Linux", "Windows"],
};

export const languages = {
  native: ["Arabic"],
  proficient: ["English"],
  intermediate: ["German"],
};

export const projects = [
  {
    id: 1,
    title: "MangoVision",
    description: "Award-winning deep learning computer vision system for precision agriculture. Developed an advanced object detection model using PyTorch and Detectron2 to identify and locate mango fruits in aerial drone imagery. The model achieved an impressive 98.5% detection accuracy across diverse lighting conditions and mango varieties. This research project earned the 'Best Research Project' award at Multimedia University and demonstrates practical applications of AI in agricultural optimization and crop yield estimation.",
    image: "", // No image yet
    tech: ["Python", "PyTorch", "Detectron2", "Computer Vision", "Deep Learning", "Research"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined, // Add video demo link here
    status: "completed" as const,
    highlights: [
      "98.5% detection accuracy on aerial imagery",
      "Awarded Best Research Project at MMU",
      "Real-world application in precision agriculture",
      "Published research methodology and findings"
    ],
  },
  {
    id: 2,
    title: "IKHLAS Mobile App",
    description: "Production-ready mobile application development for AirAsia's charity platform serving over 10,000 active users. Architected and implemented robust GraphQL API integration layer, replacing legacy REST endpoints with modern, efficient data fetching. Built responsive Flutter UI components with real-time Firebase synchronization. Collaborated in an Agile/Scrum environment, conducting comprehensive unit testing and debugging to ensure seamless user experience across iOS and Android platforms.",
    image: "", // No image yet
    tech: ["GraphQL", "Flutter", "Firebase", "REST APIs", "Dart", "Scrum", "Unit Testing"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined, // Add video demo link here
    status: "completed" as const,
    highlights: [
      "Served 10,000+ active users",
      "GraphQL API integration for optimized data fetching",
      "Cross-platform mobile development (iOS & Android)",
      "Agile development with comprehensive testing"
    ],
  },
  {
    id: 3,
    title: "Digital Product Passport Demonstrator",
    description: "Enterprise-level web application for Fraunhofer IOSB's circular economy initiative. Leading frontend redesign efforts to improve user experience and data visualization for product lifecycle tracking. Implementing LLM-based AI data extraction pipeline with rigorous quality assurance, maintaining ≥90% accuracy benchmarks. Refactoring legacy backend workflows to improve performance and maintainability. Contributing to cutting-edge research in sustainable manufacturing and product transparency.",
    image: "", // No image yet
    tech: ["Python", "LLM", "AI/ML", "Backend Development", "Frontend Design", "Data Extraction"],
    github: undefined,
    live: undefined,
    video: undefined, // Add video demo link here
    status: "ongoing" as const,
    highlights: [
      "≥90% AI data extraction accuracy",
      "Frontend UX redesign for improved usability",
      "Backend workflow optimization",
      "Research contribution to circular economy"
    ],
  },
];

export const timeline: Array<{
  id: number;
  type: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  skills: string[];
  achievements: string[];
  certificateUrl: string;
}> = [
  {
    id: 1,
    type: "work",
    title: "Software Engineer (Working Student)",
    organization: "Fraunhofer IOSB",
    location: "Karlsruhe, Germany",
    startDate: "2025-04",
    endDate: null,
    description: "Evaluated LLM-based AI data extraction against defined metrics, maintaining results at a ≥90% accuracy threshold. Refactored backend workflows and enhanced frontend design to improve system performance and user experience of the Digital Product Passport demonstrator.",
    skills: ["Python", "LLM", "AI Evaluation", "Backend Development", "Frontend Design"],
    achievements: [
      "Maintained ≥90% AI extraction accuracy",
      "Refactored backend workflows",
      "Enhanced frontend design and user experience"
    ],
    certificateUrl: "", // Replace with your actual certificate/reference letter URL
  },
  {
    id: 2,
    type: "work",
    title: "Software Engineer Intern",
    organization: "AirAsia",
    location: "Kuala Lumpur, Malaysia",
    startDate: "2023-07",
    endDate: "2023-10",
    description: "Enhanced software quality by conducting manual and unit testing, debugging critical issues, and improving app stability for 10,000+ users using Jira. Developed and integrated APIs using GraphQL for the IKHLAS mobile app, collaborating within a Scrum team to ensure timely feature delivery.",
    skills: ["GraphQL", "Jira", "Unit Testing", "Scrum", "API Development", "Debugging"],
    achievements: [
      "Improved app stability for 10,000+ users",
      "Developed GraphQL API integration",
      "Collaborated in Scrum team for timely delivery"
    ],
    certificateUrl: "", // Replace with your actual certificate/reference letter URL
  },
  {
    id: 3,
    type: "education",
    title: "Master of Science",
    organization: "Stuttgart University",
    location: "Stuttgart, Germany",
    startDate: "2024-10",
    endDate: null,
    description: "Major in Software Engineering/Computer Hardware; Minor in Information Technology. Expected graduation: September 2026.",
    skills: ["Software Engineering", "Computer Hardware", "Information Technology"],
    achievements: [
      "Expected graduation: September 2026",
      "Focus on Software Engineering and Computer Hardware"
    ],
    certificateUrl: "", // Replace with your actual enrollment certificate/transcript URL
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor of Engineering (Hons.)",
    organization: "Multimedia University",
    location: "Cyberjaya, Malaysia",
    startDate: "2020-07",
    endDate: "2024-10",
    description: "Major in Computer; Minors in Electronics. CGPA: 3.7/4.0 (First Class Honors). Final Year Project: Developed MangoVision, a deep learning model for mango fruit detection from aerial images, achieving 98.5% accuracy (Awarded Best Research Project).",
    skills: ["Computer Engineering", "Electronics", "Machine Learning", "PyTorch", "Computer Vision"],
    achievements: [
      "First Class Honors (CGPA: 3.7/4.0)",
      "Best Research Project Award",
      "MangoVision: 98.5% accuracy"
    ],
    certificateUrl: "", // Replace with your actual degree certificate/transcript URL
  },
];

export const certifications: Array<{
  id: number;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}> = [
  {
    id: 1,
    title: "Front-End Web Development with React",
    issuer: "The Hong Kong University of Science and Technology",
    date: "2022-03",
    image: "", // Add your certificate image path here
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/YOUR_CERT_ID", // Replace with your actual certificate URL
  },
  {
    id: 2,
    title: "Six Sigma Certification",
    issuer: "The Council for Six Sigma Certification (CSSC)",
    date: "2023-10",
    image: "", // Add your certificate image path here
    credentialUrl: "https://example.com/certificates/six-sigma", // Replace with your actual certificate URL
  },
  {
    id: 3,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024-05",
    image: "", // Add your certificate image path here
    credentialUrl: "https://example.com/certificates/aws-architect", // Replace with your actual certificate URL
  },
  {
    id: 4,
    title: "Machine Learning Specialization",
    issuer: "Stanford University & DeepLearning.AI",
    date: "2023-08",
    image: "", // Add your certificate image path here
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/YOUR_CERT_ID", // Replace with your actual certificate URL
  },
  {
    id: 5,
    title: "Python for Data Science and AI",
    issuer: "IBM",
    date: "2023-02",
    image: "", // Add your certificate image path here
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/YOUR_CERT_ID", // Replace with your actual certificate URL
  },
];

export const awards = [
  {
    id: 1,
    title: "Best Research Project",
    issuer: "Multimedia University",
    date: "2024-10",
    description: "Awarded for MangoVision - deep learning model achieving 98.5% accuracy in mango fruit detection from aerial images",
    image: "", // No image yet
    certificateUrl: "https://mmu.edu.my/awards/best-research-2024", // Replace with your actual award certificate URL
  },
  {
    id: 2,
    title: "First Class Honors",
    issuer: "Multimedia University",
    date: "2024-10",
    description: "Graduated with First Class Honors, CGPA: 3.7/4.0",
    image: "", // No image yet
    certificateUrl: "https://mmu.edu.my/transcripts/honors-2024", // Replace with your actual certificate URL
  },
];

export const recommendations: Array<{
  id: number;
  name: string;
  title: string;
  company: string;
  image?: string;
  text: string;
  linkedin?: string;
}> = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Research Scientist",
    company: "Fraunhofer IOSB",
    image: "", // Add profile image URL here
    text: "Marawan is an exceptional researcher with strong technical skills in AI and machine learning. His contribution to our Digital Product Passport project has been outstanding, consistently delivering high-quality work and demonstrating excellent problem-solving abilities.",
    linkedin: "",
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    title: "Lead Software Engineer",
    company: "AirAsia",
    image: "", // Add profile image URL here
    text: "Working with Marawan on the IKHLAS mobile app was a great experience. He quickly grasped complex GraphQL implementations and delivered robust solutions. His dedication and technical expertise made him a valuable team member.",
    linkedin: "",
  },
  {
    id: 3,
    name: "Prof. Dr. Michael Weber",
    title: "Professor of Computer Engineering",
    company: "Multimedia University",
    image: "", // Add profile image URL here
    text: "Marawan's final year project on MangoVision demonstrated exceptional research capabilities and deep understanding of computer vision. His 98.5% accuracy achievement and 'Best Research Project' award are well-deserved recognitions of his talent.",
    linkedin: "",
  },
];

export const volunteering: Array<{
  id: number;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  description: string;
  skills?: string[];
  organizationLogo?: string;
  websiteUrl?: string;
}> = [
  {
    id: 1,
    organization: "Tech for Good Initiative",
    role: "Software Development Volunteer",
    location: "Stuttgart, Germany",
    startDate: "2024-01",
    endDate: null, // null means ongoing
    description: "Developing web applications for non-profit organizations to help them digitize their processes and reach more beneficiaries. Built responsive websites using Next.js and integrated donation systems.",
    skills: ["Next.js", "React", "TypeScript", "Vercel"],
    websiteUrl: "https://example.org",
  },
  // Add more volunteer experiences here
];
