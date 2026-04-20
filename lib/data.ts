// Portfolio Data - Marawan Eldeib's Professional Profile
import type { Project, PersonalInfo, TimelineItem, Certification, Award, Recommendation } from './types';
import { sortByDateDescending, sortBySimpleDateDescending } from './utils/date';

export const personalInfo: PersonalInfo = {
  name: "Marawan Eldeib",
  title: "M.Sc. Software Engineering Student",
  email: "marawandeep13@gmail.com",
  phone: "+49 178 2374198",
  linkedin: "https://www.linkedin.com/in/marawan-el-deib/",
  github: "https://github.com/MarawanEldeib",
  youtube: "https://www.youtube.com/@marawaneldeib",
  instagram: "https://www.instagram.com/marawan.eldeib/",
  orcid: "https://orcid.org/0009-0008-5285-424X",
  location: "Baden-Württemberg, Germany | Kuwait",
  image: "/images/Marawan.jpeg",
  summary: "Software Engineering master's student with development experience at Fraunhofer IOSB and AirAsia. Foundation in AI and Cybersecurity. Seeking working student positions or research opportunities.",
  workPermit: {
    hasPermit: true,
    details: "Working Student - Available on Request",
  },
};

export const skills = {
  languages: ["Python", "Java", "C/C++", "SQL", "PHP", "HTML", "CSS", "Assembly"],
  dataScience: ["PyTorch", "Detectron2", "scikit-learn", "pandas", "NumPy"],
  frameworks: ["Spring Boot", "Flutter", "GraphQL"],
  cloudDevOps: ["AWS", "Firebase", "Docker", "Git"],
  projectManagement: ["Jira", "Confluence", "Agile/Scrum"],
  tools: ["REST APIs", "Insomnia", "GitHub Copilot", "Claude", "MCP Server"],
  cybersecurity: ["Burp Suite", "Nmap", "SQLmap", "OWASP", "picoCTF"],
  systems: ["Kali Linux", "Ubuntu", "Windows"],
};

export const languages = {
  native: ["Arabic"],
  proficient: ["English (C1)"],
  intermediate: ["German (B1)"],
  beginner: ["Turkish"],
};

const projectsData: Project[] = [
  {
    id: "new-1",
    title: "Knowledge Graph Models for Universal Database Reasoning",
    description: "Extended ULTRA foundation models to create schema-agnostic knowledge graphs capable of complex reasoning across unseen databases. Evaluated performance on F1 Formula 1 data using RelBench framework.",
    image: "",
    tech: ["Knowledge Graphs", "Machine Learning", "Python", "Graph Neural Networks"],
    github: "https://github.com/MarawanEldeib/kgfm-universal-db-learning",
    video: undefined,
    report: "/documents/KGFM-Report.pdf",
    status: "completed" as const,
    startDate: "2025-11",
    endDate: "2026-02",
    course: "Research Project",
    highlights: [
      "Converting RelBench datasets to knowledge graphs",
      "Zero-shot and fine-tuned link prediction using KGFMs",
      "Extending KGFMs for entity classification/regression tasks",
      "Building plug-and-play database intelligence framework"
    ],
  },
  {
    id: "new-3",
    title: "Cloud-Native Architecture for an Emerging Online Retail Business",
    description: "Designed scalable 3-tier AWS infrastructure for e-commerce platform with VPC security, load balancing, auto-scaling, and RDS transaction management for high-availability retail workloads.",
    image: "",
    tech: ["AWS", "Cloud Architecture", "VPC", "Auto Scaling", "Load Balancer"],
    github: "",
    video: undefined,
    pdf: "/documents/cloud-computing-report.pdf",
    status: "completed" as const,
    startDate: "2025-02",
    endDate: "2025-02",
    course: "Cloud Computing",
    highlights: [
      "3-Tier Architecture with Public/Private Subnets",
      "High Availability via Auto Scaling & Load Balancing",
      "Secure Network Design with NAT Gateways"
    ],
  },
  {
    id: "new-2",
    title: "Decentralized P2P Chat System",
    description: "Implemented fault-tolerant P2P messaging using Causal and Total Ordering via Vector Clocks. Built Bully Algorithm for dynamic leader election and reliable multicast delivery. Designed to handle asynchronous communication and node crash failures.",
    image: "",
    tech: ["Distributed Systems", "Python", "P2P", "Fault Tolerance"],
    github: "https://github.com/ayushmittalde/chat_app_DS",
    video: undefined,
    pdf: "/documents/distributed-systems-chat-report.pdf",
    status: "completed" as const,
    startDate: "2024-11",
    endDate: "2025-02",
    course: "Distributed Systems",
    highlights: [
      "Decentralized P2P architecture with causal ordering",
      "Leader election using Bully Algorithm",
      "Reliable multicast and fault detection",
      "Vector clocks for message synchronization",
      "Team Project (Group 6)"
    ],
  },
  {
    id: "1",
    title: "MangoVision: AI-Powered Mango Detection System",
    description: "Award-winning deep learning system achieving 98.5% accuracy in mango fruit detection from aerial drone imagery. Trained YOLO and Faster R-CNN models on 5,500+ curated images, built bilingual GUI with GPS-integrated mapping for precision agriculture applications.",
    image: "",
    tech: ["PyTorch", "Computer Vision", "YOLO", "Deep Learning", "Python"],
    github: "https://github.com/MarawanEldeib/MangoVision",
    video: "https://youtu.be/zmQG7ATSuj8",
    report: "/documents/mango-vision-report.pdf",
    status: "completed" as const,
    startDate: "2023-11",
    endDate: "2024-07",
    course: "Final Year Project",
    highlights: [
      "98.5% detection accuracy with YOLO model",
      "Awarded Best Research Project at MMU",
      "Bilingual GUI with GPS-integrated mapping",
      "Outperformed Detectron2 in accuracy benchmarks"
    ],
  },
  {
    id: "3",
    title: "Automated IoT Plant Watering System",
    description: "Built IoT irrigation system using ThingsBoard and three sensors for real-time soil moisture and water level monitoring, automating efficient plant watering.",
    image: "/images/projects/rainroot-iot-watering-system.jpg",
    tech: ["IoT", "Arduino", "ThingsBoard", "Sensors", "Automation"],
    github: "https://github.com/MarawanEldeib/Plant_IOT",
    video: "https://youtu.be/vtknLIb3L0c",
    status: "completed" as const,
    startDate: "2023-04",
    endDate: "2023-06",
    course: "Embedded IoT Systems and Applications",
    highlights: [
      "Automated irrigation management system",
      "ThingsBoard integration for monitoring",
      "Three-sensor system for precision",
      "Real-time soil moisture and water level tracking"
    ],
  },
  {
    id: "4",
    title: "Smart Door Lock: IoT Security System",
    description: "Led 3-member team to build Arduino-based smart lock with motion detection and emergency alerts. Developed Flutter mobile app for remote control, fingerprint management, and real-time monitoring using Firebase backend.",
    image: "",
    tech: ["IoT", "Arduino", "Flutter", "Firebase", "Mobile Development"],
    github: "https://github.com/MarawanEldeib/Cypher",
    video: undefined,
    report: "/documents/cypher-smart-lock-report.pdf",
    status: "completed" as const,
    startDate: "2022-10",
    endDate: "2023-01",
    course: "Capstone Project",
    highlights: [
      "Led 3-member team on IoT security project",
      "PCB-based smart lock with motion detection",
      "Flutter mobile app with Firebase backend",
      "Remote control and real-time monitoring"
    ],
  },
  {
    id: "5",
    title: "BodyMath: Health & Fitness Tracker",
    description: "Flutter mobile app with BMI, calorie, body fat, and ideal weight calculators using Firebase backend. Includes admin mode for user management and health advice with GIF demonstrations.",
    image: "/images/projects/bodymath-app.jpg",
    tech: ["Flutter", "Firebase", "Mobile Development", "UI/UX Design"],
    github: "https://github.com/yys-yss/bmi-calculator-software",
    video: "https://youtu.be/HmthO_2cQKM",
    report: "/documents/bodymath-app-report.pdf",
    status: "completed" as const,
    startDate: "2022-10",
    endDate: "2022-12",
    course: "Software Engineering",
    highlights: [
      "Four fitness calculators (BMI, calorie, body fat, ideal weight)",
      "Firebase backend with admin management",
      "Enhanced user engagement with health advice and GIF images",
      "User-friendly interface design"
    ],
  },
];

export const projects = sortByDateDescending(projectsData);

const timelineData: TimelineItem[] = [
  {
    id: "6",
    type: "work",
    title: "Student Research Assistant",
    organization: "Institute of Space Systems (IRS), University of Stuttgart",
    organizationLogo: "/images/logos/logo_irs_stuttgart.png.png",
    location: "Stuttgart, Germany (Hybrid)",
    startDate: "2026-04",
    endDate: null,
    description: "Analyzing and optimizing a Python-based data processing pipeline for the SOFIA infrared astronomy archive (joint DLR–NASA airborne observatory, 750+ flights, 2010–2022), reviewing the scientific codebase to identify memory bottlenecks and improve resource efficiency",
    skills: ["Python"],
    achievements: [],
  },
  {
    id: "1",
    type: "work",
    title: "Student Research Assistant",
    organization: "Fraunhofer IOSB",
    organizationLogo: "/images/logos/Logo_fraunhofer_IOSB.webp",
    location: "Karlsruhe, Germany (Hybrid)",
    startDate: "2025-04",
    endDate: "2025-12",
    description: "• Developed Java and Spring Boot backend for LLM-based data extraction evaluating 6 models in Asset Administration Shell (AAS) digital twin applications\n• Implemented automated end-to-end tests and prepared 30+ test datasets for model evaluation",
    skills: ["Java", "Spring Boot", "LLM", "Digital Twins", "End-to-End Testing"],
    achievements: [],
    certificateUrl: "/certificates/Fraunhofer IOSB Certificate.pdf",
  },
  {
    id: "3",
    type: "work",
    title: "Software Engineer Intern",
    organization: "AirAsia",
    organizationLogo: "/images/logos/logo_AirAsia.png",
    location: "Kuala Lumpur, Malaysia (Hybrid)",
    startDate: "2023-07",
    endDate: "2023-10",
    description: "• Debugged 14 software bugs and implemented 5 checkout calculation features, enhancing app stability for 10,000+ users\n• Refactored 2 app pages and integrated GraphQL APIs for bilingual content management in Agile sprints",
    skills: ["Flutter", "GraphQL", "Firebase", "API Integration", "Agile"],
    achievements: [],
    certificateUrl: "/certificates/EPD_Intern_Certificate_Marawan.pdf",
  },
  {
    id: "4",
    type: "education",
    title: "Master of Science - Software Engineering",
    organization: "Stuttgart University",
    organizationLogo: "/images/logos/logo_stuttgart.png",
    location: "Stuttgart, Germany",
    startDate: "2024-10",
    endDate: null,
    dateString: "Oct 2024 - March 2027 (Expected)",
    description: "Minor: Information Technology",
    skills: ["Distributed Systems", "Cloud Computing", "Operating Systems", "Security"],
    achievements: [],
    certificateUrl: "/certificates/Enrollment s26.pdf",
  },
  {
    id: "5",
    type: "education",
    title: "Bachelor of Engineering (Hons.) - Computer Engineering",
    organization: "Multimedia University",
    organizationLogo: "/images/logos/logo-mmu.png",
    location: "Cyberjaya, Malaysia",
    startDate: "2020-07",
    endDate: "2024-10",
    description: "CGPA: 3.7/4.0 (First Class Honors 🎖️)",
    skills: [],
    achievements: [
      "Best Research Project Award (MangoVision, 98.5% accuracy)",
      "Gold Medal - INVENTX Invention Exhibition 2024",
      "2nd Place - Intel VLSI Design Challenge",
      "Merit International Scholarship (50%)"
    ],
    certificateUrl: "/certificates/Bachelor Certificate.pdf",
    transcriptUrl: "/certificates/Bachelor Transcript.pdf",
  },

];

export const timeline = sortByDateDescending(timelineData);

const certificationsData: Certification[] = [

];

export const certifications = sortBySimpleDateDescending(certificationsData);

const awardsData: Award[] = [

  {
    id: "3",
    title: "Gold Medal - iNVENTX Invention Exhibition",
    issuer: "iNVENTX 2024, Multimedia University",
    date: "2024-10",
    description: "Awarded Gold Medal at iNVENTX Invention, Innovation & Technology Exhibition for innovative technology solution",
    image: "",
    certificateUrl: "",
  },
  {
    id: "2",
    title: "Best Research Project",
    issuer: "Multimedia University",
    date: "2024-10",
    description: "MangoVision bachelor thesis project awarded as best project in the Engineering category",
    image: "/images/awards/best-research-project.jpg",
    certificateUrl: "/certificates/Best Research Project Certificate.pdf",
  },
  {
    id: "4",
    title: "2nd Place - VLSI Design Challenge",
    issuer: "Intel Corporation",
    date: "2024-01",
    description: "Won 2nd place in the University VLSI Virtual Bootcamp",
    image: "/images/awards/intel-vlsi-challenge.png",
    certificateUrl: "/certificates/Intel VLSI Challenge Certificate.pdf",
  },

  {
    id: "6",
    title: "Merit International Scholarship",
    issuer: "Multimedia University",
    date: "2020-11",
    description: "Awarded Merit International Scholarship (50%) for Bachelor's degree studies (Oct 2020 - June 2021)",
    image: "",
    certificateUrl: "", // Add certificate URL if available
  },

];

export const awards = sortBySimpleDateDescending(awardsData);

export const recommendations: Recommendation[] = [
  {
    id: "1",
    name: "Muhammad Hafiz Bin Khairudin",
    title: "Head of Technology & Product",
    company: "Ikhlas Com Travel Sdn Bhd (AirAsia)",
    image: "/images/recommendations/hafiz.jpeg", // Add profile image URL here
    text: "Marawan is a sterling communicator, adept at conveying complex technical ideas clearly and persuasively. His adaptability to diverse technical challenges is impressive - he demonstrated remarkable versatility in mobile software development, adapting to new programming languages and technologies with ease. His work ethics and discipline are exemplary, consistently meeting tight deadlines while maintaining the highest quality of work. Marawan is an amazing team player whose supportive nature and ability to motivate others have been crucial in high-pressure situations.",
    linkedin: "https://www.linkedin.com/in/hafizkhairudin/",
    email: "hafiz@airasia.com",
  },
  {
    id: "2",
    name: "Mohd Haris Lye Abdullah",
    title: "Lecturer, Faculty of Engineering",
    company: "Multimedia University",
    image: "/images/recommendations/haris.jpg", // Add profile image URL here
    text: "Marawan is among the most hardworking, independent, and proactive students I have come across. During his final year project on Mango detection using object detection methods under my supervision, he proved to be bright, inquisitive, and diligent, obtaining grade A (excellent). His collaboration skills are impressive, and he consistently demonstrated initiative to improve his academic work. Beyond academics, his active participation as a Facilitator for the AI & Machine Learning Workshop under the Smart Farming Program showcased his clear communication and networking abilities, earning positive feedback from over 20 international participants.",
    linkedin: "https://www.linkedin.com/in/harislye/",
    email: "haris.lye@mmu.edu.my",
  },
  {
    id: "3",
    name: "Maximilian Kühn",
    title: "Supervisor",
    company: "Fraunhofer IOSB",
    image: "/images/recommendations/maximilian.jpg",
    text: "Marawan demonstrated exemplary initiative and identified fully with his tasks and our institute, showing great dedication. Even under difficult working conditions and increased pressure, he reliably completed all tasks. He worked consistently fast, prudent, careful, and precise. Trustworthiness and great reliability always characterized his work style. He possesses solid technical knowledge, which he applied confidently and purposefully in practice. His quick comprehension enabled him to overview difficult situations and recognize what is essential. We were always very satisfied with his performance.",
    profileUrl: "/certificates/Fraunhofer IOSB Certificate.pdf",
    linkedin: "https://www.linkedin.com/in/maximilian-kühn-6668b6269",
  },
];

interface VolunteeringItem {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  skills?: string[];
  organizationLogo?: string;
  websiteUrl?: string;
}

const volunteeringData: VolunteeringItem[] = [
  {
    id: "1",
    organization: "Ministry of Foreign Affairs Malaysia - MTCP Programme",
    role: "AI Workshop Facilitator (Contract)",
    location: "Cyberjaya, Malaysia",
    startDate: "2024-06-24",
    endDate: "2024-06-28",
    description: [
      "Facilitated AI and machine learning workshops for 20+ international participants from developing countries",
      "Delivered technical sessions on AI applications in smart farming, receiving positive feedback for clear communication"
    ],
    skills: ["Machine Learning", "Public Speaking", "International Collaboration"],
    organizationLogo: "/images/logos/logo-mmu.png",
    websiteUrl: "https://drive.google.com/drive/folders/1-DDlWCXV9CBZuhQ2tYiuPf0l091TBUqI?usp=drive_link",
  },
  {
    id: "2",
    organization: "IEEE Multimedia University Student Branch",
    role: "Head of Membership & Student Affairs",
    location: "Cyberjaya, Malaysia",
    startDate: "2022-12",
    endDate: "2023-12",
    description: [
      "Founded IEEE Power & Energy Society chapter and increased membership by 30+ students",
      "Coordinated robotics workshop for 30 primary school students and coached team of 6 children"
    ],
    skills: ["Leadership", "Event Management", "Mentoring"],
    organizationLogo: "/images/logos/ieee_mmu.jpg",
    websiteUrl: "",
  },

];

export const volunteering = sortByDateDescending(volunteeringData);
