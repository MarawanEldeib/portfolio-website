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
      en: "Software Engineering master's student and HiWi at SOFIA Data Center (IRS/DLR–NASA), with development experience at Fraunhofer IOSB and AirAsia. Foundation in AI and Cybersecurity.",
      de: "Masterstudent der Softwaretechnik und HiWi am SOFIA Data Center (IRS/DLR–NASA), mit Entwicklungserfahrung bei Fraunhofer IOSB und AirAsia. Fundament in KI und Cybersicherheit."
    },
    workPermitDetails: {
      en: "Working Student - Available on Request",
      de: "Werkstudent - Auf Anfrage verfügbar"
    }
  },

  // Projects - All project translations
  projects: {
    "new-4": {
      title: {
        en: "Measuring Data Exposure in LLM-Integrated Productivity Tools",
        de: "Datenweitergabe in LLM-integrierten Produktivitätswerkzeugen"
      },
      description: {
        en: "Systematic comparison of user data exposure across LLM-integrated productivity tools (browser-based, editor-based, and web interfaces) during controlled use. Outbound network traffic is captured with mitmproxy and analyzed against baseline runs to assess what user data is transmitted, to how many domains, and in what volume.",
        de: "Systematischer Vergleich der Benutzerdatenexposition über LLM-integrierte Produktivitätswerkzeuge (browserbasiert, editorbasiert und Web-Interfaces) unter kontrollierten Bedingungen. Ausgehender Netzwerkverkehr wird mit mitmproxy erfasst und gegen Baseline-Läufe analysiert, um zu bewerten, welche Nutzerdaten übertragen werden, an wie viele Domains und in welchem Umfang."
      },
      course: {
        en: "Research Project",
        de: "Forschungsprojekt"
      },
      highlights: {
        en: [
          "Controlled experimental setup with identical tasks per tool",
          "Outbound traffic interception and analysis using mitmproxy",
          "Exposure indicators: data content, volume, requests, domains",
          "Per-tool exposure assessment with confidence level"
        ],
        de: [
          "Kontrolliertes Versuchsdesign mit identischen Aufgaben pro Werkzeug",
          "Abfangen und Analyse ausgehenden Traffics mit mitmproxy",
          "Expositionsindikatoren: Dateninhalt, Volumen, Anfragen, Domains",
          "Expositionsbewertung pro Werkzeug mit Konfidenzniveau"
        ]
      }
    },
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
        en: "Designed scalable 3-tier AWS infrastructure for e-commerce platform with VPC security, load balancing, auto-scaling, and RDS transaction management for high-availability retail workloads.",
        de: "Entwarf skalierbare 3-Tier-AWS-Infrastruktur für E-Commerce-Plattform mit VPC-Sicherheit, Load Balancing, Auto-Scaling und RDS-Transaktionsverwaltung für hochverfügbare Retail-Workloads."
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
        en: "Knowledge Graph Models for Universal Database Reasoning",
        de: "Knowledge Graph Models für universelles Datenbank-Reasoning"
      },
      description: {
        en: "Extended ULTRA foundation models to create schema-agnostic knowledge graphs capable of complex reasoning across unseen databases. Evaluated performance on F1 Formula 1 data using RelBench framework.",
        de: "Erweiterte ULTRA-Foundation-Modelle zur Erstellung schema-agnostischer Knowledge Graphs für komplexes Reasoning über ungesehene Datenbanken. Evaluierte Leistung an F1-Formel-1-Daten mit RelBench-Framework."
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
        en: "MangoVision",
        de: "MangoVision"
      },
      description: {
        en: "Award-winning deep learning system achieving 98.5% accuracy in mango fruit detection from aerial drone imagery. Trained YOLO and Faster R-CNN models on 5,500+ curated images, built bilingual GUI with GPS-integrated mapping for precision agriculture applications.",
        de: "Preisgekröntes Deep-Learning-System mit 98,5% Genauigkeit bei der Mangofruchterkennung aus Drohnenluftbildern. Trainierte YOLO- und Faster R-CNN-Modelle auf über 5.500 kuratierten Bildern, erstellte zweisprachige GUI mit GPS-integrierter Kartierung für Präzisionslandwirtschaft."
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

    "3": {
      title: {
        en: "Automated IoT Plant Watering System",
        de: "Automatisiertes IoT-Pflanzenbewässerungssystem"
      },
      description: {
        en: "Built IoT irrigation system using ThingsBoard and three sensors for real-time soil moisture and water level monitoring, automating efficient plant watering.",
        de: "Entwickelte IoT-Bewässerungssystem mit ThingsBoard und drei Sensoren für Echtzeit-Bodenfeuchte- und Wasserstandsüberwachung zur Automatisierung effizienter Pflanzenbewässerung."
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
        en: "Smart Door Lock: IoT Security System",
        de: "Smart Door Lock: IoT-Sicherheitssystem"
      },
      description: {
        en: "Led 3-member team to build Arduino-based smart lock with motion detection and emergency alerts. Developed Flutter mobile app for remote control, fingerprint management, and real-time monitoring using Firebase backend.",
        de: "Leitete 3-köpfiges Team zum Aufbau eines Arduino-basierten Smart Locks mit Bewegungserkennung und Notfallalarmen. Entwickelte Flutter-Mobile-App für Fernsteuerung, Fingerabdruck-Verwaltung und Echtzeit-Überwachung mit Firebase-Backend."
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
        en: "BodyMath: Health & Fitness Tracker",
        de: "BodyMath: Gesundheits- & Fitness-Tracker"
      },
      description: {
        en: "Flutter mobile app with BMI, calorie, body fat, and ideal weight calculators using Firebase backend. Includes admin mode for user management and health advice with GIF demonstrations.",
        de: "Flutter-Mobile-App mit BMI-, Kalorien-, Körperfett- und Idealgewicht-Rechnern mit Firebase-Backend. Enthält Admin-Modus für Benutzerverwaltung und Gesundheitsratschläge mit GIF-Demonstrationen."
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

  },

  // Experience & Education
  timeline: {
    "6": {
      title: {
        en: "Student Research Assistant",
        de: "Wissenschaftliche Hilfskraft"
      },
      description: {
        en: "Analyzing and optimizing a Python-based data processing pipeline for the SOFIA infrared astronomy archive (joint DLR–NASA airborne observatory, 750+ flights, 2010–2022), reviewing the scientific codebase to identify memory bottlenecks and improve resource efficiency",
        de: "Analyse und Optimierung einer Python-basierten Datenverarbeitungspipeline für das SOFIA-Infrarotastronomie-Archiv (gemeinsames DLR–NASA-Projekt, 750+ Flüge, 2010–2022), mit Fokus auf die Identifikation von Speicherengpässen und die Verbesserung der Ressourceneffizienz"
      }
    },
    "1": {
      title: {
        en: "Student Research Assistant",
        de: "Wissenschaftliche Hilfskraft"
      },
      description: {
        en: "• Developed Java and Spring Boot backend for LLM-based data extraction evaluating 6 models in Asset Administration Shell (AAS) digital twin applications\n• Implemented automated end-to-end tests and prepared 30+ test datasets for model evaluation",
        de: "• Entwickelte Java- und Spring Boot-Backend für LLM-basierte Datenextraktion zur Evaluierung von 6 Modellen in Asset Administration Shell (AAS) Digital-Twin-Anwendungen\n• Implementierte automatisierte End-to-End-Tests und erstellte über 30 Testdatensätze für Modellevaluierung"
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
        en: "Master of Science\nSoftware Engineering",
        de: "Master of Science\nSoftware Engineering"
      },
      dateString: {
        en: "Oct 2024 - March 2027 (Expected)",
        de: "Okt 2024 - März 2027 (Erwartet)"
      },
      description: {
        en: "Minor: Information Technology",
        de: "Nebenfach: Informationstechnologie"
      },
      achievements: {
        en: [],
        de: []
      }
    },
    "5": {
      title: {
        en: "Bachelor of Engineering (Hons.)\nComputer Engineering",
        de: "Bachelor of Engineering (Hons.)\nComputer Engineering"
      },
      description: {
        en: "CGPA: 3.7/4.0 (First Class Honors 🎖️)",
        de: "CGPA: 3,7/4,0 (First Class Honors 🎖️)"
      },
      achievements: {
        en: [
          "Best Research Project Award (MangoVision, 98.5% accuracy)",
          "Gold Medal - INVENTX Invention Exhibition 2024",
          "2nd Place - Intel VLSI Design Challenge",
          "Merit International Scholarship (50%)"
        ],
        de: [
          "Best Research Project Award (MangoVision, 98.5% accuracy)",
          "Goldmedaille - INVENTX Erfindungsausstellung 2024",
          "2. Platz - Intel VLSI Design Challenge",
          "Merit International Scholarship (50%)"
        ]
      }
    },

  },

  // Awards
  awards: {

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

    "6": {
      description: {
        en: "Awarded Merit International Scholarship (50%) for Bachelor's degree studies (Oct 2020 - June 2021)",
        de: "Merit International Scholarship (50%) für Bachelorstudium verliehen (Okt 2020 - Juni 2021)"
      }
    },

  },

  // Volunteering
  volunteering: {
    "1": {
      role: {
        en: "AI Workshop Facilitator (Contract)",
        de: "KI-Workshop-Leiter (Vertrag)"
      },
      description: {
        en: [
          "Facilitated AI and machine learning workshops for 20+ international participants from developing countries",
          "Delivered technical sessions on AI applications in smart farming, receiving positive feedback for clear communication"
        ],
        de: [
          "Leitete KI- und Machine-Learning-Workshops für über 20 internationale Teilnehmer aus Entwicklungsländern",
          "Hielt technische Sitzungen zu KI-Anwendungen im Smart Farming und erhielt positives Feedback für klare Kommunikation"
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
          "Founded IEEE Power & Energy Society chapter and increased membership by 30+ students",
          "Coordinated robotics workshop for 30 primary school students and coached team of 6 children"
        ],
        de: [
          "Gründete IEEE Power & Energy Society Chapter und erhöhte Mitgliederzahl um über 30 Studenten",
          "Koordinierte Robotik-Workshop für 30 Grundschüler und coachte ein Team von 6 Kindern"
        ]
      }
    },

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

import type { Locale } from '@/lib/types';
export type { Locale };

export function getLocalizedContent<T>(content: { en: T; de: T }, locale?: Locale): T {
  const safeLocale = locale || 'en';
  return content[safeLocale] || content.en;
}
