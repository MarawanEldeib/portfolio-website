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
  summary: "Sedulous Computer Engineer with hands-on experience in software development and AI, gained through practical roles at AirAsia, a leading Malaysian multinational and academic projects. Eager to solve real-world problems using cutting-edge technology solutions.",
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
  intermediate: ["German (B1)"],
};

export const projects = [
  {
    id: 1,
    title: "MangoVision - Mango Fruit Detection from Aerial Images",
    description: "Award-winning deep learning computer vision system for precision agriculture developed as Final Year Project (Nov 2023 - Jul 2024). Developed and trained YOLO and Faster R-CNN models using PyTorch on drone images, achieving 98.5% accuracy with YOLO, outperforming Detectron2. Created MangoVision, a bilingual GUI with image/video processing and GPS-integrated map, enhancing smart farming by reducing labour and improving detection accuracy.",
    image: "", // No image yet
    tech: ["Python", "PyTorch", "YOLO", "Faster R-CNN", "Detectron2", "Computer Vision", "Deep Learning", "GUI Development"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined, // Add video demo link here
    status: "completed" as const,
    highlights: [
      "98.5% detection accuracy with YOLO model",
      "Awarded Best Research Project at MMU",
      "Bilingual GUI with GPS-integrated mapping",
      "Outperformed Detectron2 in accuracy benchmarks"
    ],
  },
  {
    id: 2,
    title: "Good-Shape-Fitness-Center App",
    description: "Advanced Microprocessors Course Project (May 2023 - Jun 2023). Engineered an EMU8086 assembly language-based interactive fitness application, focusing on user-friendly class enrollment features. Programmed automated pricing calculations within the app, strengthened operational efficiency and user experience.",
    image: "",
    tech: ["Assembly Language", "EMU8086", "Microprocessors", "System Programming"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    highlights: [
      "Assembly language programming with EMU8086",
      "Interactive user-friendly class enrollment system",
      "Automated pricing calculations",
      "Enhanced operational efficiency"
    ],
  },
  {
    id: 3,
    title: "RainRoot IoT Watering System",
    description: "Embedded IoT Systems and Applications Course Project (Apr 2023 - Jun 2023). Automated an IoT-based plant watering system, incorporating advanced technology for efficient irrigation management. Integrated ThingsBoard for system monitoring, utilising three distinct sensors for precise soil moisture and water level monitoring.",
    image: "",
    tech: ["IoT", "ThingsBoard", "Arduino", "Sensors", "Embedded Systems", "Automation"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    highlights: [
      "Automated irrigation management system",
      "ThingsBoard integration for monitoring",
      "Three-sensor system for precision",
      "Real-time soil moisture and water level tracking"
    ],
  },
  {
    id: 4,
    title: "IoT-Based Smart Door Lock System (Cypher)",
    description: "Capstone Project (Oct 2022 - Jan 2023). Led a 3-member team to customise a PCB-based smart door lock system using Arduino, integrated motion detection notification for enhancing security and emergency call functionality. Introduced the 'Cypher', a mobile app in Flutter with Firebase backend, enabling remote door lock control and real-time motion monitoring. Focused on a user-friendly interface across four main pages, including fingerprint management, history record, and a settings guide, ensuring an optimal user experience.",
    image: "",
    tech: ["Arduino", "Flutter", "Firebase", "IoT", "PCB Design", "Mobile Development"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    highlights: [
      "Led 3-member team on IoT security project",
      "PCB-based smart lock with motion detection",
      "Flutter mobile app with Firebase backend",
      "Remote control and real-time monitoring"
    ],
  },
  {
    id: 5,
    title: "BodyMath App",
    description: "Software Engineering Course Project (Oct 2022 - Dec 2022). Coded a Flutter-based fitness app integrating four calculators: BMI, calorie intake, body fat, and ideal weight, using Firebase for backend support and designed a user-friendly admin mode for adding or removing users. Illustrated two user engagement elements health advice and GIF images, increased user satisfaction and interactivity within the app.",
    image: "",
    tech: ["Flutter", "Firebase", "Mobile Development", "UI/UX Design"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    highlights: [
      "Four fitness calculators (BMI, calorie, body fat, ideal weight)",
      "Firebase backend with admin management",
      "Enhanced user engagement with health advice and GIF images",
      "User-friendly interface design"
    ],
  },
  {
    id: 6,
    title: "Bookstore Database",
    description: "Database Systems Course Project (Jan 2022 - Mar 2022). Created a MySQL bookstore database using PhpMyAdmin, streamlined inventory management with real-time visibility into book quantities. Implemented advanced filtering capabilities to search by author, publisher using SQL coding and PhpMyAdmin's UI, enhanced data accessibility.",
    image: "",
    tech: ["MySQL", "PhpMyAdmin", "SQL", "Database Design", "Inventory Management"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    highlights: [
      "MySQL database for bookstore inventory",
      "Real-time book quantity tracking",
      "Advanced filtering by author and publisher",
      "Enhanced data accessibility with SQL queries"
    ],
  },
  {
    id: 7,
    title: "Smart Parking System",
    description: "Microcontroller and Microprocessor Systems Course Project (Aug 2021 - Nov 2021). Visualized a keypad for secure password entry and four sensors, represented by switches in the simulation, at each of the two entrances and exits. Systemized a 7-segment display to show available parking spaces in Zones A and B, enhancing the system's user interface and parking efficiency.",
    image: "",
    tech: ["Microcontrollers", "Embedded Systems", "Sensors", "7-Segment Display", "System Simulation"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    highlights: [
      "Keypad-based secure password entry system",
      "Four-sensor parking detection system",
      "7-segment display for real-time space availability",
      "Two-zone parking management (Zone A & B)"
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
    title: "Teaching Assistant",
    organization: "Faculty of Engineering, Multimedia University",
    location: "Cyberjaya, Malaysia",
    startDate: "2024-08",
    endDate: "2024-10",
    description: "Organized a targeted revision session on digital logic concepts, resulting in improved exam performance for attendees. Assisted the professor in providing academic support, ensuring students effectively applied theoretical knowledge to practical circuit design tasks.",
    skills: ["Digital Logic", "Circuit Design", "Teaching", "Academic Support", "Communication"],
    achievements: [
      "Improved student exam performance through targeted revision",
      "Enhanced student understanding of digital logic concepts",
      "Supported practical application of theoretical knowledge"
    ],
    certificateUrl: "", // Replace with your actual certificate/reference letter URL
  },
  {
    id: 3,
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
    id: 4,
    type: "education",
    title: "Master of Science",
    organization: "Stuttgart University",
    location: "Stuttgart, Germany",
    startDate: "2024-10",
    endDate: null,
    description: "Major in Software Engineering/Computer Hardware; Minor in Information Technology. Expected graduation: March 2027. Relevant Coursework: Distributed Systems (TCP/IP), Operating Systems (Linux), Cloud Computing (AWS), Real-Time Systems.",
    skills: ["Software Engineering", "Computer Hardware", "Information Technology", "Distributed Systems", "Operating Systems", "Cloud Computing"],
    achievements: [
      "Expected graduation: March 2027",
      "Focus on Software Engineering and Computer Hardware"
    ],
    certificateUrl: "", // Replace with your actual enrollment certificate/transcript URL
  },
  {
    id: 5,
    type: "education",
    title: "Bachelor of Engineering (Hons.)",
    organization: "Multimedia University",
    location: "Cyberjaya, Malaysia",
    startDate: "2020-07",
    endDate: "2024-10",
    description: "Major in Computer; Minors in Electronics. CGPA: 3.7/4.0 (First Class Honors). Final Year Project: Developed MangoVision, a deep learning model for mango fruit detection from aerial images, achieving 98.5% accuracy (Awarded Best Research Project). Relevant Coursework: Software Engineering; Operating Systems; Artificial Intelligence; Embedded IoT; Networking Protocols; Database Systems; Cybersecurity.",
    skills: ["Computer Engineering", "Electronics", "Machine Learning", "PyTorch", "Computer Vision", "Software Engineering", "Operating Systems", "Artificial Intelligence", "Embedded IoT"],
    achievements: [
      "First Class Honors (CGPA: 3.7/4.0)",
      "Gold Medal at iNVENTX Invention Exhibition 2024",
      "Best Project at MMU Career Fair 2024",
      "Best Research Project Award",
      "Merit International Scholarship",
      "Dean's List"
    ],
    certificateUrl: "", // Replace with your actual degree certificate/transcript URL
  },
  {
    id: 6,
    type: "education",
    title: "Foundation in Engineering",
    organization: "Multimedia University",
    location: "Cyberjaya, Malaysia",
    startDate: "2018-11",
    endDate: "2020-06",
    description: "CGPA: 3.31/4.0. Foundation program providing essential engineering fundamentals and preparing students for degree-level engineering studies.",
    skills: ["Engineering Fundamentals", "Mathematics", "Physics", "Chemistry"],
    achievements: [
      "CGPA: 3.31/4.0",
      "Merit International Scholarship"
    ],
    certificateUrl: "", // Replace with your actual certificate/transcript URL
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
    organization: "Smart Farming & Precision Agriculture Program",
    role: "Facilitator for AI & Machine Learning Workshop",
    location: "Cyberjaya, Malaysia",
    startDate: "2024-06",
    endDate: "2024-06",
    description: "Supported in delivering AI and machine learning sessions on smart farming to 20+ international participants. Received positive feedback for clear communication and networking with participants.",
    skills: ["AI", "Machine Learning", "Smart Farming", "Public Speaking", "Networking"],
    websiteUrl: "",
  },
  {
    id: 2,
    organization: "IEEE Multimedia University Student Branch",
    role: "Head of Membership & Student Affairs",
    location: "Cyberjaya, Malaysia",
    startDate: "2022-12",
    endDate: "2023-12",
    description: "Launched campaigns that increased IEEE club membership by over 30 and enhanced student engagement in professional growth and networking. Coordinated a workshop for 30 primary school students on building and controlling robot cars and coached a team of 6 children.",
    skills: ["Leadership", "Event Management", "Student Engagement", "Robotics", "Mentoring"],
    websiteUrl: "",
  },
];
