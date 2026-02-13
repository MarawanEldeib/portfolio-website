/**
 * Content translations for portfolio data
 * All user-facing content in English and German
 */

export const contentTranslations = {
  // Personal Info
  personalInfo: {
    title: {
      en: "Software Engineering Student & Developer",
      de: "Student der Softwaretechnik & Entwickler"
    },
    summary: {
      en: "Software Engineering master's student with development experience at Fraunhofer IOSB and AirAsia. Foundation in AI and Cybersecurity. Seeking working student positions or research opportunities.",
      de: "Masterstudent der Softwaretechnik mit Entwicklungserfahrung bei Fraunhofer IOSB und AirAsia. Fundament in KI und Cybersicherheit. Suche Werkstudentenstellen oder Forschungsmöglichkeiten."
    },
    workPermitDetails: {
      en: "Working Student - Available on Request",
      de: "Werkstudent - Auf Anfrage verfügbar"
    }
  },

  // Projects - All project translations
  projects: {
    "new-2": {
      title: {
        en: "Decentralized Public Chat Room",
        de: "Dezentraler öffentlicher Chatraum"
      },
      description: {
        en: "Engineered a resilient, decentralized P2P chat ecosystem. Implements Causal and Total Ordering via Vector Clocks to guarantee message consistency across concurrent events. Features robust fault-tolerance utilizing the Bully Algorithm for dynamic leader election and reliable multicast to ensure delivery during node failures. Architected to handle asynchronous communication and crash failures in distributed environments.",
        de: "Entwickelte ein widerstandsfähiges, dezentrales P2P-Chat-Ökosystem. Implementiert kausale und totale Ordnung über Vector Clocks zur Gewährleistung der Nachrichtenkonsistenz bei nebenläufigen Ereignissen. Bietet robuste Fehlertoleranz durch den Bully-Algorithmus für dynamische Leader-Wahl und zuverlässigen Multicast zur Sicherstellung der Zustellung bei Knotenausfällen. Architektur für asynchrone Kommunikation und Crash-Fehler in verteilten Umgebungen."
      },
      course: {
        en: "Distributed Systems",
        de: "Verteilte Systeme"
      },
      highlights: {
        en: [
          "Decentralized P2P architecture with causal ordering",
          "Leader election using Bully Algorithm",
          "Reliable multicast and fault detection",
          "Vector clocks for message synchronization",
          "Team Project (Group 6)"
        ],
        de: [
          "Dezentrale P2P-Architektur mit kausaler Ordnung",
          "Leader-Wahl mit Bully-Algorithmus",
          "Zuverlässiger Multicast und Fehlererkennung",
          "Vector Clocks für Nachrichtensynchronisierung",
          "Teamprojekt (Gruppe 6)"
        ]
      }
    },
    "new-3": {
      title: {
        en: "Cloud-Native Architecture for an Emerging Online Retail Business",
        de: "Cloud-Native-Architektur für ein aufstrebendes Online-Einzelhandelsgeschäft"
      },
      description: {
        en: "Designed a robust cloud-native architecture tailored for an emerging online retail platform. The solution leverages a 3-tier AWS infrastructure to ensure high availability and scalability for e-commerce workloads. Key components include a VPC with isolated subnets for security, Application Load Balancers to manage customer traffic, and Auto Scaling Groups to handle retail demand spikes. Integrated RDS for secure transaction management and NAT Gateways for protected backend connectivity.",
        de: "Entwarf eine robuste Cloud-Native-Architektur für eine aufstrebende Online-Einzelhandelsplattform. Die Lösung nutzt eine 3-Tier-AWS-Infrastruktur für hohe Verfügbarkeit und Skalierbarkeit bei E-Commerce-Workloads. Schlüsselkomponenten umfassen ein VPC mit isolierten Subnetzen für Sicherheit, Application Load Balancer zur Verwaltung des Kundenverkehrs und Auto Scaling Groups zur Bewältigung von Nachfragespitzen. Integriert RDS für sichere Transaktionsverwaltung und NAT Gateways für geschützte Backend-Konnektivität."
      },
      course: {
        en: "Cloud Computing",
        de: "Cloud Computing"
      },
      highlights: {
        en: [
          "3-Tier Architecture with Public/Private Subnets",
          "High Availability via Auto Scaling & Load Balancing",
          "Secure Network Design with NAT Gateways"
        ],
        de: [
          "3-Tier-Architektur mit öffentlichen/privaten Subnetzen",
          "Hohe Verfügbarkeit durch Auto Scaling & Load Balancing",
          "Sicheres Netzwerkdesign mit NAT Gateways"
        ]
      }
    },
    "new-1": {
      title: {
        en: "Foundation Knowledge Graph Models for Universal Database Learning",
        de: "Foundation Knowledge Graph Models für universelles Datenbank-Lernen"
      },
      description: {
        en: "Extending cutting-edge Knowledge Graph Foundation Models (ULTRA) to create a unified framework for universal database reasoning. Developing schema-agnostic models that can perform complex reasoning tasks across unseen databases without task-specific fine-tuning, enabling transferable intelligence across domains (e.g., finance to healthcare) with minimal adaptation.",
        de: "Erweiterung modernster Knowledge Graph Foundation Models (ULTRA) zur Schaffung eines einheitlichen Frameworks für universelles Datenbank-Reasoning. Entwicklung schema-agnostischer Modelle für komplexe Reasoning-Aufgaben über ungesehene Datenbanken ohne aufgabenspezifisches Fine-Tuning, wodurch übertragbare Intelligenz über Domänen (z.B. Finanzen zu Gesundheitswesen) mit minimaler Anpassung ermöglicht wird."
      },
      course: {
        en: "Research Project",
        de: "Forschungsprojekt"
      },
      highlights: {
        en: [
          "Converting RelBench datasets to knowledge graphs",
          "Zero-shot and fine-tuned link prediction using KGFMs",
          "Extending KGFMs for entity classification/regression tasks",
          "Building plug-and-play database intelligence framework"
        ],
        de: [
          "Konvertierung von RelBench-Datensätzen in Knowledge Graphs",
          "Zero-Shot- und Fine-Tuned-Link-Vorhersage mit KGFMs",
          "Erweiterung von KGFMs für Entity-Klassifikation/Regression",
          "Aufbau eines Plug-and-Play-Datenbank-Intelligenz-Frameworks"
        ]
      }
    },
    "1": {
      title: {
        en: "MangoVision - Mango Fruit Detection from Aerial Images",
        de: "MangoVision - Mangofruchterkennung aus Luftbildern"
      },
      description: {
        en: "Award-winning deep learning computer vision system for precision agriculture. Developed and trained YOLO and Faster R-CNN models using PyTorch on drone images, achieving 98.5% accuracy with YOLO, outperforming Detectron2. Created MangoVision, a bilingual GUI with image/video processing and GPS-integrated map, enhancing smart farming by reducing labour and improving detection accuracy.",
        de: "Preisgekröntes Deep-Learning-Computer-Vision-System für Präzisionslandwirtschaft. Entwickelte und trainierte YOLO- und Faster R-CNN-Modelle mit PyTorch auf Drohnenbildern, erzielte 98,5% Genauigkeit mit YOLO und übertraf Detectron2. Erstellte MangoVision, eine zweisprachige GUI mit Bild-/Videobearbeitung und GPS-integrierter Karte, die Smart Farming durch Reduzierung von Arbeitskräften und Verbesserung der Erkennungsgenauigkeit verbessert."
      },
      course: {
        en: "Final Year Project",
        de: "Abschlussprojekt"
      },
      highlights: {
        en: [
          "98.5% detection accuracy with YOLO model",
          "Awarded Best Research Project at MMU",
          "Bilingual GUI with GPS-integrated mapping",
          "Outperformed Detectron2 in accuracy benchmarks"
        ],
        de: [
          "98,5% Erkennungsgenauigkeit mit YOLO-Modell",
          "Bestes Forschungsprojekt an der MMU ausgezeichnet",
          "Zweisprachige GUI mit GPS-integrierter Kartierung",
          "Übertraf Detectron2 in Genauigkeits-Benchmarks"
        ]
      }
    },
    "2": {
      title: {
        en: "Good-Shape-Fitness-Center App",
        de: "Good-Shape-Fitness-Center-App"
      },
      description: {
        en: "Engineered an EMU8086 assembly language-based interactive fitness application, focusing on user-friendly class enrollment features. Programmed automated pricing calculations within the app, strengthened operational efficiency and user experience.",
        de: "Entwickelte eine interaktive Fitness-Anwendung basierend auf EMU8086-Assemblersprache mit benutzerfreundlichen Kursanmeldefunktionen. Programmierte automatisierte Preisberechnungen in der App, verstärkte operative Effizienz und Benutzererfahrung."
      },
      course: {
        en: "Advanced Microprocessors",
        de: "Fortgeschrittene Mikroprozessoren"
      },
      highlights: {
        en: [
          "Assembly language programming with EMU8086",
          "Interactive user-friendly class enrollment system",
          "Automated pricing calculations",
          "Enhanced operational efficiency"
        ],
        de: [
          "Assemblersprache-Programmierung mit EMU8086",
          "Interaktives benutzerfreundliches Kursanmeldesystem",
          "Automatisierte Preisberechnungen",
          "Verbesserte operative Effizienz"
        ]
      }
    },
    "3": {
      title: {
        en: "RainRoot IoT Watering System",
        de: "RainRoot IoT-Bewässerungssystem"
      },
      description: {
        en: "Automated an IoT-based plant watering system, incorporating advanced technology for efficient irrigation management. Integrated ThingsBoard for system monitoring, utilising three distinct sensors for precise soil moisture and water level monitoring.",
        de: "Automatisierte ein IoT-basiertes Pflanzenbewässerungssystem mit fortschrittlicher Technologie für effizientes Bewässerungsmanagement. Integrierte ThingsBoard für Systemüberwachung mit drei verschiedenen Sensoren für präzise Bodenfeuchte- und Wasserstandsüberwachung."
      },
      course: {
        en: "Embedded IoT Systems and Applications",
        de: "Eingebettete IoT-Systeme und Anwendungen"
      },
      highlights: {
        en: [
          "Automated irrigation management system",
          "ThingsBoard integration for monitoring",
          "Three-sensor system for precision",
          "Real-time soil moisture and water level tracking"
        ],
        de: [
          "Automatisiertes Bewässerungsmanagementsystem",
          "ThingsBoard-Integration für Überwachung",
          "Drei-Sensor-System für Präzision",
          "Echtzeit-Bodenfeuchte- und Wasserstandsverfolgung"
        ]
      }
    },
    "4": {
      title: {
        en: "Cypher IoT-Based Smart Door Lock System",
        de: "Cypher IoT-basiertes intelligentes Türschlosssystem"
      },
      description: {
        en: "Led a 3-member team to customise a PCB-based smart door lock system using Arduino, integrated motion detection notification for enhancing security and emergency call functionality. Introduced the 'Cypher', a mobile app in Flutter with Firebase backend, enabling remote door lock control and real-time motion monitoring. Focused on a user-friendly interface across four main pages, including fingerprint management, history record, and a settings guide, ensuring an optimal user experience.",
        de: "Leitete ein 3-köpfiges Team zur Anpassung eines PCB-basierten intelligenten Türschlosssystems mit Arduino, integrierte Bewegungserkennungsbenachrichtigung für verbesserte Sicherheit und Notrufffunktionalität. Führte 'Cypher' ein, eine mobile App in Flutter mit Firebase-Backend, die Fernsteuerung des Türschlosses und Echtzeit-Bewegungsüberwachung ermöglicht. Fokussierte auf eine benutzerfreundliche Oberfläche über vier Hauptseiten, einschließlich Fingerabdruck-Management, Verlaufsdatensatz und Einstellungsanleitung."
      },
      course: {
        en: "Capstone Project",
        de: "Capstone-Projekt"
      },
      highlights: {
        en: [
          "Led 3-member team on IoT security project",
          "PCB-based smart lock with motion detection",
          "Flutter mobile app with Firebase backend",
          "Remote control and real-time monitoring"
        ],
        de: [
          "Leitete 3-köpfiges Team bei IoT-Sicherheitsprojekt",
          "PCB-basiertes intelligentes Schloss mit Bewegungserkennung",
          "Flutter-Mobile-App mit Firebase-Backend",
          "Fernsteuerung und Echtzeit-Überwachung"
        ]
      }
    },
    "5": {
      title: {
        en: "BodyMath App",
        de: "BodyMath-App"
      },
      description: {
        en: "Coded a Flutter-based fitness app integrating four calculators: BMI, calorie intake, body fat, and ideal weight, using Firebase for backend support and designed a user-friendly admin mode for adding or removing users. Illustrated two user engagement elements health advice and GIF images, increased user satisfaction and interactivity within the app.",
        de: "Programmierte eine Flutter-basierte Fitness-App mit vier Rechnern: BMI, Kalorienaufnahme, Körperfett und Idealgewicht, nutzte Firebase für Backend-Unterstützung und entwarf einen benutzerfreundlichen Admin-Modus zum Hinzufügen oder Entfernen von Benutzern. Implementierte zwei Benutzerengagement-Elemente: Gesundheitsratschläge und GIF-Bilder, erhöhte Benutzerzufriedenheit und Interaktivität in der App."
      },
      course: {
        en: "Software Engineering",
        de: "Softwaretechnik"
      },
      highlights: {
        en: [
          "Four fitness calculators (BMI, calorie, body fat, ideal weight)",
          "Firebase backend with admin management",
          "Enhanced user engagement with health advice and GIF images",
          "User-friendly interface design"
        ],
        de: [
          "Vier Fitness-Rechner (BMI, Kalorien, Körperfett, Idealgewicht)",
          "Firebase-Backend mit Admin-Verwaltung",
          "Verbessertes Benutzerengagement mit Gesundheitsratschlägen und GIF-Bildern",
          "Benutzerfreundliches Interface-Design"
        ]
      }
    },
    "6": {
      title: {
        en: "Bookstore Database",
        de: "Buchhandlungs-Datenbank"
      },
      description: {
        en: "Created a MySQL bookstore database using PhpMyAdmin, streamlined inventory management with real-time visibility into book quantities. Implemented advanced filtering capabilities to search by author, publisher using SQL coding and PhpMyAdmin's UI, enhanced data accessibility.",
        de: "Erstellte eine MySQL-Buchhandlungsdatenbank mit PhpMyAdmin, optimierte Bestandsverwaltung mit Echtzeit-Sichtbarkeit der Buchmengen. Implementierte erweiterte Filterfunktionen zur Suche nach Autor und Verlag mit SQL-Programmierung und PhpMyAdmin-UI, verbesserte Datenzugänglichkeit."
      },
      course: {
        en: "Database Systems",
        de: "Datenbanksysteme"
      },
      highlights: {
        en: [
          "MySQL database for bookstore inventory",
          "Real-time book quantity tracking",
          "Advanced filtering by author and publisher",
          "Enhanced data accessibility with SQL queries"
        ],
        de: [
          "MySQL-Datenbank für Buchhandlungsbestand",
          "Echtzeit-Buchmengen-Verfolgung",
          "Erweiterte Filterung nach Autor und Verlag",
          "Verbesserte Datenzugänglichkeit mit SQL-Abfragen"
        ]
      }
    },
    "7": {
      title: {
        en: "Smart Parking System",
        de: "Intelligentes Parksystem"
      },
      description: {
        en: "Visualized a keypad for secure password entry and four sensors, represented by switches in the simulation, at each of the two entrances and exits. Systemized a 7-segment display to show available parking spaces in Zones A and B, enhancing the system's user interface and parking efficiency.",
        de: "Visualisierte ein Tastenfeld für sichere Passworteingabe und vier Sensoren, dargestellt durch Schalter in der Simulation, an jeweils zwei Ein- und Ausgängen. Systematisierte eine 7-Segment-Anzeige zur Anzeige verfügbarer Parkplätze in Zonen A und B, verbesserte Benutzeroberfläche und Parkeffizienz des Systems."
      },
      course: {
        en: "Microcontroller and Microprocessor Systems",
        de: "Mikrocontroller- und Mikroprozessorsysteme"
      },
      highlights: {
        en: [
          "Keypad-based secure password entry system",
          "Four-sensor parking detection system",
          "7-segment display for real-time space availability",
          "Two-zone parking management (Zone A & B)"
        ],
        de: [
          "Tastenfeld-basiertes sicheres Passworteingabesystem",
          "Vier-Sensor-Parkerkennungssystem",
          "7-Segment-Anzeige für Echtzeit-Platzverfügbarkeit",
          "Zwei-Zonen-Parkverwaltung (Zone A & B)"
        ]
      }
    },
    "8": {
      title: {
        en: "Plagiarism Checker",
        de: "Plagiatsprüfer"
      },
      description: {
        en: "Software that assists lecturers in identifying source code that has been copied or cloned from another student's source code.",
        de: "Software zur Unterstützung von Dozenten bei der Identifizierung von Quellcode, der von einem anderen Student kopiert oder geklont wurde."
      },
      course: {
        en: "Object-Oriented C++",
        de: "Objektorientiertes C++"
      },
      highlights: {
        en: [
          "Source code plagiarism detection system",
          "Object-oriented design in C++",
          "Assists lecturers in academic integrity",
          "Clone detection algorithms"
        ],
        de: [
          "Quellcode-Plagiaterkennungssystem",
          "Objektorientiertes Design in C++",
          "Unterstützt Dozenten bei akademischer Integrität",
          "Klon-Erkennungsalgorithmen"
        ]
      }
    }
  },

  // Experience & Education
  timeline: {
    "1": {
      title: {
        en: "Research Assistant (Working Student)",
        de: "Wissenschaftliche Hilfskraft (Werkstudent)"
      },
      description: {
        en: "• Developed Java and Spring Boot backend for LLM-based data extraction evaluating 6 models in Asset Administration Shell (AAS) digital twin applications\n• Implemented automated end-to-end tests and prepared 30+ test datasets for model evaluation",
        de: "• Entwickelte Java- und Spring Boot-Backend für LLM-basierte Datenextraktion zur Evaluierung von 6 Modellen in Asset Administration Shell (AAS) Digital-Twin-Anwendungen\n• Implementierte automatisierte End-to-End-Tests und erstellte über 30 Testdatensätze für Modellevaluierung"
      }
    },
    "2": {
      title: {
        en: "Teaching Assistant",
        de: "Lehrassistent"
      },
      description: {
        en: "• Organized targeted revision sessions on digital logic concepts, resulting in improved exam performance for attendees\n• Assisted professor in providing academic support to students\n• Ensured students effectively applied theoretical knowledge to practical circuit design tasks",
        de: "• Organisierte gezielte Wiederholungssitzungen zu digitalen Logikkonzepten, was zu verbesserter Prüfungsleistung der Teilnehmer führte\n• Unterstützte Professor bei der akademischen Betreuung von Studenten\n• Stellte sicher, dass Studenten theoretisches Wissen effektiv auf praktische Schaltungsentwurfsaufgaben anwendeten"
      }
    },
    "3": {
      title: {
        en: "Software Engineer Intern",
        de: "Software Engineer Praktikant"
      },
      description: {
        en: "• Debugged 14 software bugs and implemented 5 checkout calculation features, enhancing app stability for 10,000+ users\n• Refactored 2 app pages and integrated GraphQL APIs for bilingual content management in Agile sprints",
        de: "• Behob 14 Software-Bugs und implementierte 5 Checkout-Berechnungsfunktionen, verbesserte App-Stabilität für über 10.000 Benutzer\n• Refaktorierte 2 App-Seiten und integrierte GraphQL-APIs für zweisprachiges Content-Management in Agile-Sprints"
      }
    },
    "4": {
      title: {
        en: "Master of Science",
        de: "Master of Science"
      },
      description: {
        en: "Major in Software Engineering/Computer Hardware; Minor in Information Technology. Expected graduation: March 2027. Relevant Coursework: Distributed Systems (TCP/IP), Operating Systems (Linux), Cloud Computing (AWS), Real-Time Systems.",
        de: "Hauptfach Software Engineering/Computerhardware; Nebenfach Informationstechnologie. Erwarteter Abschluss: März 2027. Relevante Kurse: Verteilte Systeme (TCP/IP), Betriebssysteme (Linux), Cloud Computing (AWS), Echtzeitsysteme."
      },
      achievements: {
        en: [
          "Expected graduation: March 2027",
          "Specializing in Security & Cloud Infrastructure, Software Engineering, Service Management"
        ],
        de: [
          "Erwarteter Abschluss: März 2027",
          "Spezialisierung auf Sicherheit & Cloud-Infrastruktur, Software Engineering, Service Management"
        ]
      }
    },
    "5": {
      title: {
        en: "Bachelor of Engineering (Hons.)",
        de: "Bachelor of Engineering (Hons.)"
      },
      description: {
        en: "Major in Computer; Minors in Electronics. First Class Honors. Final Year Project: Developed MangoVision, a deep learning model for mango fruit detection from aerial images, achieving 98.5% accuracy (Awarded Best Research Project). Relevant Coursework: Software Engineering; Operating Systems; Artificial Intelligence; Embedded IoT; Networking Protocols; Database Systems; Cybersecurity.",
        de: "Hauptfach Computer; Nebenfach Elektronik. First Class Honors. Abschlussprojekt: Entwickelte MangoVision, ein Deep-Learning-Modell zur Mangofruchterkennung aus Luftbildern mit 98,5% Genauigkeit (ausgezeichnet als bestes Forschungsprojekt). Relevante Kurse: Software Engineering; Betriebssysteme; Künstliche Intelligenz; Eingebettetes IoT; Netzwerkprotokolle; Datenbanksysteme; Cybersicherheit."
      },
      achievements: {
        en: [
          "First Class Honors (CGPA: 3.7/4.0)",
          "Gold Medal at iNVENTX Invention Exhibition 2024",
          "Best Project at MMU Career Fair 2024",
          "Best Research Project Award",
          "Book Award",
          "Merit International Scholarship (50%)",
          "Dean's List"
        ],
        de: [
          "First Class Honors (CGPA: 3,7/4,0)",
          "Goldmedaille bei iNVENTX Erfindungsausstellung 2024",
          "Bestes Projekt bei MMU Career Fair 2024",
          "Bestes Forschungsprojekt-Preis",
          "Buchpreis",
          "Merit International Scholarship (50%)",
          "Dean's List"
        ]
      }
    },
    "6": {
      title: {
        en: "Foundation in Engineering",
        de: "Foundation in Engineering"
      },
      description: {
        en: "Foundation program providing essential engineering fundamentals and preparing students for degree-level engineering studies.",
        de: "Foundation-Programm mit wesentlichen Ingenieurgrundlagen zur Vorbereitung auf ingenieurwissenschaftliche Studiengänge."
      },
      achievements: {
        en: [
          "CGPA: 3.31/4.0",
          "Dean's List",
          "Merit International Scholarship (25%)"
        ],
        de: [
          "CGPA: 3,31/4,0",
          "Dean's List",
          "Merit International Scholarship (25%)"
        ]
      }
    }
  },

  // Awards
  awards: {
    "1": {
      description: {
        en: "Graduated top class with CGPA: 3.7/4.0",
        de: "Abschluss mit Bestnote CGPA: 3,7/4,0"
      }
    },
    "2": {
      description: {
        en: "MangoVision bachelor thesis project awarded as best project in the Engineering category",
        de: "MangoVision-Bachelorarbeit als bestes Projekt in der Ingenieurkategorie ausgezeichnet"
      }
    },
    "3": {
      description: {
        en: "Awarded Gold Medal at iNVENTX Invention, Innovation & Technology Exhibition for innovative technology solution",
        de: "Goldmedaille bei iNVENTX Erfindungs-, Innovations- und Technologieausstellung für innovative Technologielösung verliehen"
      }
    },
    "4": {
      description: {
        en: "Won 2nd place in the University VLSI Virtual Bootcamp",
        de: "2. Platz im University VLSI Virtual Bootcamp gewonnen"
      }
    },
    "5": {
      description: {
        en: "Achieved Dean's List recognition for academic excellence throughout Bachelor's degree (July 2020 - Oct 2024)",
        de: "Dean's List-Anerkennung für akademische Exzellenz während des Bachelorstudiums erreicht (Juli 2020 - Okt 2024)"
      }
    },
    "6": {
      description: {
        en: "Awarded Merit International Scholarship (50%) for Bachelor's degree studies (Oct 2020 - June 2021)",
        de: "Merit International Scholarship (50%) für Bachelorstudium verliehen (Okt 2020 - Juni 2021)"
      }
    },
    "7": {
      description: {
        en: "Awarded Merit International Scholarship (25%) for Foundation studies (2018 - 2019)",
        de: "Merit International Scholarship (25%) für Foundation-Studium verliehen (2018 - 2019)"
      }
    }
  },

  // Volunteering
  volunteering: {
    "1": {
      role: {
        en: "Facilitator for AI & Machine Learning Workshop",
        de: "Facilitator für KI & Machine Learning Workshop"
      },
      description: {
        en: [
          "Facilitated AI and machine learning workshops for the Malaysia Technical Cooperation Programme (MTCP) Smart Farming & Precision Agriculture Program",
          "Organized by the Ministry of Foreign Affairs Malaysia and Multimedia University",
          "Delivered technical sessions on AI applications in smart farming to 20+ international participants from developing countries",
          "Received positive feedback for clear communication, technical expertise, and effective networking"
        ],
        de: [
          "Leitete KI- und Machine-Learning-Workshops für das Malaysia Technical Cooperation Programme (MTCP) Smart Farming & Precision Agriculture Program",
          "Organisiert vom Außenministerium Malaysia und der Multimedia University",
          "Führte technische Sitzungen zu KI-Anwendungen im Smart Farming für über 20 internationale Teilnehmer aus Entwicklungsländern durch",
          "Erhielt positives Feedback für klare Kommunikation, technische Expertise und effektives Networking"
        ]
      }
    },
    "2": {
      role: {
        en: "Head of Membership & Student Affairs",
        de: "Leiter für Mitgliedschaft & Studentenangelegenheiten"
      },
      description: {
        en: [
          "Founded the IEEE Power & Energy Society (PES) MMU Student Branch, establishing the first PES chapter at the university",
          "Launched campaigns that increased IEEE club membership by over 30 members",
          "Enhanced student engagement in professional growth and networking opportunities",
          "Coordinated a workshop for 30 primary school students on building and controlling robot cars",
          "Coached a team of 6 children in robotics"
        ],
        de: [
          "Gründete die IEEE Power & Energy Society (PES) MMU Student Branch und etablierte das erste PES-Kapitel an der Universität",
          "Startete Kampagnen, die die IEEE-Club-Mitgliedschaft um über 30 Mitglieder erhöhten",
          "Verbesserte das Engagement der Studenten in beruflicher Entwicklung und Networking-Möglichkeiten",
          "Koordinierte einen Workshop für 30 Grundschüler zum Bau und zur Steuerung von Roboter-Autos",
          "Coachte ein Team von 6 Kindern in Robotik"
        ]
      }
    },
    "3": {
      role: {
        en: "Founder & Operator",
        de: "Gründer & Betreiber"
      },
      description: {
        en: [
          "Founded and operated Skippy Snacks, a food and drinks business for Business Management course",
          "Donated part of profits to dog shelter, combining entrepreneurship with animal welfare support"
        ],
        de: [
          "Gründete und betrieb Skippy Snacks, ein Lebensmittel- und Getränkegeschäft für den Business-Management-Kurs",
          "Spendete Teil der Gewinne an Tierheim, verband Unternehmertum mit Tierschutz-Unterstützung"
        ]
      }
    }
  },

  // Recommendations
  recommendations: {
    "1": {
      text: {
        en: "Marawan is a sterling communicator, adept at conveying complex technical ideas clearly and persuasively. His adaptability to diverse technical challenges is impressive - he demonstrated remarkable versatility in mobile software development, adapting to new programming languages and technologies with ease. His work ethics and discipline are exemplary, consistently meeting tight deadlines while maintaining the highest quality of work. Marawan is an amazing team player whose supportive nature and ability to motivate others have been crucial in high-pressure situations.",
        de: "Marawan ist ein hervorragender Kommunikator, geschickt darin, komplexe technische Ideen klar und überzeugend zu vermitteln. Seine Anpassungsfähigkeit an vielfältige technische Herausforderungen ist beeindruckend - er zeigte bemerkenswerte Vielseitigkeit in der mobilen Softwareentwicklung und passte sich mühelos an neue Programmiersprachen und Technologien an. Seine Arbeitsethik und Disziplin sind vorbildlich, er erfüllt konsequent enge Fristen bei höchster Arbeitsqualität. Marawan ist ein großartiger Teamplayer, dessen unterstützende Art und Fähigkeit, andere zu motivieren, in Drucksituationen entscheidend waren."
      }
    },
    "2": {
      text: {
        en: "Marawan is among the most hardworking, independent, and proactive students I have come across. During his final year project on Mango detection using object detection methods under my supervision, he proved to be bright, inquisitive, and diligent, obtaining grade A (excellent). His collaboration skills are impressive, and he consistently demonstrated initiative to improve his academic work. Beyond academics, his active participation as a Facilitator for the AI & Machine Learning Workshop under the Smart Farming Program showcased his clear communication and networking abilities, earning positive feedback from over 20 international participants.",
        de: "Marawan gehört zu den fleißigsten, unabhängigsten und proaktivsten Studenten, denen ich begegnet bin. Während seines Abschlussprojekts zur Mangoerkennung mittels Objekterkennungsmethoden unter meiner Betreuung erwies er sich als intelligent, wissbegierig und gewissenhaft und erhielt die Note A (ausgezeichnet). Seine Zusammenarbeitsfähigkeiten sind beeindruckend, und er zeigte konsequent Initiative zur Verbesserung seiner akademischen Arbeit. Über das Akademische hinaus zeigte seine aktive Teilnahme als Facilitator für den KI & Machine Learning Workshop im Smart Farming Program seine klare Kommunikation und Networking-Fähigkeiten, wofür er positives Feedback von über 20 internationalen Teilnehmern erhielt."
      }
    },
    "3": {
      text: {
        en: "Marawan demonstrated exemplary initiative and identified fully with his tasks and our institute, showing great dedication. Even under difficult working conditions and increased pressure, he reliably completed all tasks. He worked consistently fast, prudent, careful, and precise. Trustworthiness and great reliability always characterized his work style. He possesses solid technical knowledge, which he applied confidently and purposefully in practice. His quick comprehension enabled him to overview difficult situations and recognize what is essential. We were always very satisfied with his performance.",
        de: "Herr Eldeib zeigte jederzeit vorbildliche Eigeninitiative und identifizierte sich immer voll mit seinen Aufgaben und unserem Institut, wobei er auch durch große Einsatzfreude überzeugte. Auch unter schwierigen Arbeitsbedingungen und erhöhter Belastung bewältigte er alle Aufgaben stets zuverlässig. Er arbeitete durchweg zügig, umsichtig, sorgfältig und genau. Vertrauenswürdigkeit und große Zuverlässigkeit zeichneten stets den Arbeitsstil von Herrn Eldeib aus. Er besitzt solide Fachkenntnisse, die er jederzeit sicher und zielgerichtet in der Praxis einsetzte. Seine schnelle Auffassungsgabe ermöglichte es ihm, auch schwierige Situationen zu überblicken und dabei stets das Wesentliche zu erkennen. Wir waren mit den Leistungen von Herrn Eldeib stets sehr zufrieden."
      }
    }
  }
};

export type Locale = 'en' | 'de';

export function getLocalizedContent<T>(content: { en: T; de: T }, locale?: Locale): T {
  const safeLocale = locale || 'en';
  return content[safeLocale] || content.en;
}
