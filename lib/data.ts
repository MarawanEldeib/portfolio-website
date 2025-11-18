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

const projectsData = [
  {
    id: "1",
    title: "MangoVision - Mango Fruit Detection from Aerial Images",
    description: "Award-winning deep learning computer vision system for precision agriculture developed as Final Year Project. Developed and trained YOLO and Faster R-CNN models using PyTorch on drone images, achieving 98.5% accuracy with YOLO, outperforming Detectron2. Created MangoVision, a bilingual GUI with image/video processing and GPS-integrated map, enhancing smart farming by reducing labour and improving detection accuracy.",
    image: "", // No image yet
    tech: ["Python", "PyTorch", "YOLO", "Faster R-CNN", "Detectron2", "Computer Vision", "Deep Learning", "GUI Development"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined, // Add video demo link here
    status: "completed" as const,
    startDate: "2023-11",
    endDate: "2024-07",
    highlights: [
      "98.5% detection accuracy with YOLO model",
      "Awarded Best Research Project at MMU",
      "Bilingual GUI with GPS-integrated mapping",
      "Outperformed Detectron2 in accuracy benchmarks"
    ],
  },
  {
    id: "2",
    title: "Good-Shape-Fitness-Center App",
    description: "Advanced Microprocessors Course Project. Engineered an EMU8086 assembly language-based interactive fitness application, focusing on user-friendly class enrollment features. Programmed automated pricing calculations within the app, strengthened operational efficiency and user experience.",
    image: "",
    tech: ["Assembly Language", "EMU8086", "Microprocessors", "System Programming"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    startDate: "2023-05",
    endDate: "2023-06",
    highlights: [
      "Assembly language programming with EMU8086",
      "Interactive user-friendly class enrollment system",
      "Automated pricing calculations",
      "Enhanced operational efficiency"
    ],
  },
  {
    id: "3",
    title: "RainRoot IoT Watering System",
    description: "Embedded IoT Systems and Applications Course Project. Automated an IoT-based plant watering system, incorporating advanced technology for efficient irrigation management. Integrated ThingsBoard for system monitoring, utilising three distinct sensors for precise soil moisture and water level monitoring.",
    image: "",
    tech: ["IoT", "ThingsBoard", "Arduino", "Sensors", "Embedded Systems", "Automation"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    startDate: "2023-04",
    endDate: "2023-06",
    highlights: [
      "Automated irrigation management system",
      "ThingsBoard integration for monitoring",
      "Three-sensor system for precision",
      "Real-time soil moisture and water level tracking"
    ],
  },
  {
    id: "4",
    title: "IoT-Based Smart Door Lock System (Cypher)",
    description: "Capstone Project. Led a 3-member team to customise a PCB-based smart door lock system using Arduino, integrated motion detection notification for enhancing security and emergency call functionality. Introduced the 'Cypher', a mobile app in Flutter with Firebase backend, enabling remote door lock control and real-time motion monitoring. Focused on a user-friendly interface across four main pages, including fingerprint management, history record, and a settings guide, ensuring an optimal user experience.",
    image: "",
    tech: ["Arduino", "Flutter", "Firebase", "IoT", "PCB Design", "Mobile Development"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    startDate: "2022-10",
    endDate: "2023-01",
    highlights: [
      "Led 3-member team on IoT security project",
      "PCB-based smart lock with motion detection",
      "Flutter mobile app with Firebase backend",
      "Remote control and real-time monitoring"
    ],
  },
  {
    id: "5",
    title: "BodyMath App",
    description: "Software Engineering Course Project. Coded a Flutter-based fitness app integrating four calculators: BMI, calorie intake, body fat, and ideal weight, using Firebase for backend support and designed a user-friendly admin mode for adding or removing users. Illustrated two user engagement elements health advice and GIF images, increased user satisfaction and interactivity within the app.",
    image: "",
    tech: ["Flutter", "Firebase", "Mobile Development", "UI/UX Design"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    startDate: "2022-10",
    endDate: "2022-12",
    highlights: [
      "Four fitness calculators (BMI, calorie, body fat, ideal weight)",
      "Firebase backend with admin management",
      "Enhanced user engagement with health advice and GIF images",
      "User-friendly interface design"
    ],
  },
  {
    id: "6",
    title: "Bookstore Database",
    description: "Database Systems Course Project. Created a MySQL bookstore database using PhpMyAdmin, streamlined inventory management with real-time visibility into book quantities. Implemented advanced filtering capabilities to search by author, publisher using SQL coding and PhpMyAdmin's UI, enhanced data accessibility.",
    image: "",
    tech: ["MySQL", "PhpMyAdmin", "SQL", "Database Design", "Inventory Management"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    startDate: "2022-01",
    endDate: "2022-03",
    highlights: [
      "MySQL database for bookstore inventory",
      "Real-time book quantity tracking",
      "Advanced filtering by author and publisher",
      "Enhanced data accessibility with SQL queries"
    ],
  },
  {
    id: "7",
    title: "Smart Parking System",
    description: "Microcontroller and Microprocessor Systems Course Project. Visualized a keypad for secure password entry and four sensors, represented by switches in the simulation, at each of the two entrances and exits. Systemized a 7-segment display to show available parking spaces in Zones A and B, enhancing the system's user interface and parking efficiency.",
    image: "",
    tech: ["Microcontrollers", "Embedded Systems", "Sensors", "7-Segment Display", "System Simulation"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    startDate: "2021-08",
    endDate: "2021-11",
    highlights: [
      "Keypad-based secure password entry system",
      "Four-sensor parking detection system",
      "7-segment display for real-time space availability",
      "Two-zone parking management (Zone A & B)"
    ],
  },
  {
    id: "8",
    title: "Plagiarism Checker",
    description: "Object-Oriented C++ Course Project. Software that assists lecturers in identifying source code that has been copied or cloned from another student's source code.",
    image: "",
    tech: ["C++", "Object-Oriented Programming", "Algorithm Design", "Code Analysis"],
    github: "https://github.com/MarawanEldeib",
    live: undefined,
    video: undefined,
    status: "completed" as const,
    startDate: "2022-02",
    endDate: "2022-03",
    highlights: [
      "Source code plagiarism detection system",
      "Object-oriented design in C++",
      "Assists lecturers in academic integrity",
      "Clone detection algorithms"
    ],
  },
];

// Sort projects by startDate descending (most recent first), then by endDate descending
// Ongoing projects (endDate = null) come first when startDate is the same
export const projects = projectsData.sort((a, b) => {
  const startCompare = b.startDate.localeCompare(a.startDate);
  if (startCompare !== 0) return startCompare;

  // If startDate is the same, sort by endDate (ongoing projects first)
  if (a.endDate === null) return -1;
  if (b.endDate === null) return 1;
  return b.endDate.localeCompare(a.endDate);
});

const timelineData: Array<{
  id: string;
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
    id: "1",
    type: "work",
    title: "Software Engineer (Working Student)",
    organization: "Fraunhofer IOSB",
    location: "Karlsruhe, Germany",
    startDate: "2025-04",
    endDate: null,
    description: "Developed comprehensive test suites for LLM-based AI data extraction system, ensuring ≥90% accuracy threshold across evaluation metrics. Implemented automated testing frameworks in Java to validate AI model performance and reliability. Refactored backend workflows and enhanced frontend design to improve system performance and user experience of the Digital Product Passport demonstrator.",
    skills: ["Java", "Testing", "LLM", "AI Evaluation", "Backend Development", "Frontend Design"],
    achievements: [
      "Developed automated testing framework for AI evaluation",
      "Maintained ≥90% AI extraction accuracy through comprehensive testing",
      "Refactored backend workflows and enhanced frontend UX"
    ],
    certificateUrl: "", // Replace with your actual certificate/reference letter URL
  },
  {
    id: "2",
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
    id: "3",
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
    id: "4",
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
      "Specializing in Security & Cloud Infrastructure, Software Engineering, Service Management"
    ],
    certificateUrl: "", // Replace with your actual enrollment certificate/transcript URL
  },
  {
    id: "5",
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
    id: "6",
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

// Sort timeline by startDate descending (most recent first), then by endDate descending
// Ongoing items (endDate = null) come first when startDate is the same
export const timeline = timelineData.sort((a, b) => {
  const startCompare = b.startDate.localeCompare(a.startDate);
  if (startCompare !== 0) return startCompare;

  // If startDate is the same, sort by endDate (ongoing items first)
  if (a.endDate === null) return -1;
  if (b.endDate === null) return 1;
  return b.endDate.localeCompare(a.endDate);
});

const certificationsData: Array<{
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}> = [
  {
    id: "1",
    title: "Front-End Web Development with React",
    issuer: "The Hong Kong University of Science and Technology",
    date: "2022-03",
    image: "", // Add your certificate image path here
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/YOUR_CERT_ID", // Replace with your actual certificate URL
  },
  {
    id: "2",
    title: "Six Sigma Certification",
    issuer: "The Council for Six Sigma Certification (CSSC)",
    date: "2023-10",
    image: "", // Add your certificate image path here
    credentialUrl: "https://example.com/certificates/six-sigma", // Replace with your actual certificate URL
  },
  {
    id: "3",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024-05",
    image: "", // Add your certificate image path here
    credentialUrl: "https://example.com/certificates/aws-architect", // Replace with your actual certificate URL
  },
  {
    id: "4",
    title: "Machine Learning Specialization",
    issuer: "Stanford University & DeepLearning.AI",
    date: "2023-08",
    image: "", // Add your certificate image path here
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/YOUR_CERT_ID", // Replace with your actual certificate URL
  },
  {
    id: "5",
    title: "Python for Data Science and AI",
    issuer: "IBM",
    date: "2023-02",
    image: "", // Add your certificate image path here
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/YOUR_CERT_ID", // Replace with your actual certificate URL
  },
];

// Sort certifications by date in descending order (most recent first)
export const certifications = certificationsData.sort((a, b) => b.date.localeCompare(a.date));

const awardsData = [
  {
    id: "1",
    title: "First Class Honors",
    issuer: "Multimedia University",
    date: "2024-11",
    description: "Graduated with First Class Honors, CGPA: 3.7/4.0",
    image: "", // No image yet
    certificateUrl: "https://mmu.edu.my/transcripts/honors-2024", // Replace with your actual certificate URL
  },
  {
    id: "2",
    title: "Best Research Project",
    issuer: "Multimedia University",
    date: "2024-10",
    description: "Awarded for MangoVision - deep learning model achieving 98.5% accuracy in mango fruit detection from aerial images",
    image: "", // No image yet
    certificateUrl: "https://mmu.edu.my/awards/best-research-2024", // Replace with your actual award certificate URL
  },
  {
    id: "3",
    title: "2nd Place - VLSI Design Challenge",
    issuer: "Intel Corporation",
    date: "2024-01",
    description: "Won 2nd place in the University VLSI Virtual Bootcamp - Introduction to VLSI Design Challenge",
    image: "", // No image yet
    certificateUrl: "https://intel.com/vlsi-challenge-2024", // Add your actual certificate URL here
  },
];

// Sort awards by date in descending order (most recent first)
export const awards = awardsData.sort((a, b) => b.date.localeCompare(a.date));

export const recommendations: Array<{
  id: string;
  name: string;
  title: string;
  company: string;
  image?: string;
  text: string;
  linkedin?: string;
  profileUrl?: string;
  email?: string;
}> = [
  {
    id: "1",
    name: "Muhammad Hafiz Bin Khairudin",
    title: "Head of Technology & Product",
    company: "Ikhlas Com Travel Sdn Bhd (AirAsia)",
    image: "", // Add profile image URL here
    text: "Marawan is a sterling communicator, adept at conveying complex technical ideas clearly and persuasively. His adaptability to diverse technical challenges is impressive - he demonstrated remarkable versatility in mobile software development, adapting to new programming languages and technologies with ease. His work ethics and discipline are exemplary, consistently meeting tight deadlines while maintaining the highest quality of work. Marawan is an amazing team player whose supportive nature and ability to motivate others have been crucial in high-pressure situations.",
    linkedin: "https://www.linkedin.com/in/muhammad-hafiz-khairudin/", // Add actual LinkedIn URL
    profileUrl: "https://www.linkedin.com/in/muhammad-hafiz-khairudin/", // Add actual profile URL (LinkedIn or company profile)
    email: "hafiz@airasia.com",
  },
  {
    id: "2",
    name: "Mohd Haris Lye Abdullah",
    title: "Lecturer, Faculty of Engineering",
    company: "Multimedia University",
    image: "", // Add profile image URL here
    text: "Marawan is among the most hardworking, independent, and proactive students I have come across. During his final year project on Mango detection using object detection methods under my supervision, he proved to be bright, inquisitive, and diligent, obtaining grade A (excellent). His collaboration skills are impressive, and he consistently demonstrated initiative to improve his academic work. Beyond academics, his active participation as a Facilitator for the AI & Machine Learning Workshop under the Smart Farming Program showcased his clear communication and networking abilities, earning positive feedback from over 20 international participants.",
    linkedin: "https://www.linkedin.com/in/haris-lye/", // Add actual LinkedIn URL
    profileUrl: "https://mmu.edu.my/faculty/haris-lye", // Add actual university profile URL
    email: "haris.lye@mmu.edu.my",
  },
];

const volunteeringData: Array<{
  id: string;
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
    id: "1",
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
    id: "2",
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

// Sort volunteering by startDate descending (most recent first), then by endDate descending
// Ongoing items (endDate = null) come first when startDate is the same
export const volunteering = volunteeringData.sort((a, b) => {
  const startCompare = b.startDate.localeCompare(a.startDate);
  if (startCompare !== 0) return startCompare;

  // If startDate is the same, sort by endDate (ongoing items first)
  if (a.endDate === null) return -1;
  if (b.endDate === null) return 1;
  return b.endDate.localeCompare(a.endDate);
});
