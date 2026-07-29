/**
 * Content translations for portfolio data
 * All user-facing content in English and German
 */

export const contentTranslations = {
  // Personal Info
  personalInfo: {
    title: {
      en: "M.Sc. Information Technology (INFOTECH) — Software Engineering specialisation",
      de: "M.Sc. Informationstechnologie (INFOTECH) — Vertiefung Software Engineering"
    },
    summary: {
      en: "M.Sc. Information Technology student (Software Engineering specialisation) focused on privacy and security. Experience across network traffic analysis, backend development, and performance optimisation of research software. Seeking a Master's thesis starting October 2026.",
      de: "M.Sc.-Student der Informationstechnologie (Vertiefung Software Engineering) mit Schwerpunkt Privatsphäre und Sicherheit. Erfahrung in Netzwerkverkehrsanalyse, Backend-Entwicklung und Performance-Optimierung von Forschungssoftware. Auf der Suche nach einer Masterarbeit ab Oktober 2026."
    },
    workPermitDetails: {
      en: "Available on Request",
      de: "Auf Anfrage verfügbar"
    }
  },

  // Projects - All project translations
  projects: {
    "new-4": {
      title: {
        en: "PrivacyLens — LLM Data-Exposure Analysis",
        de: "PrivacyLens — Analyse der LLM-Datenexposition"
      },
      description: {
        en: "How much of your data do AI tools actually see? This research intercepts and analyses outbound network traffic from LLM-integrated productivity tools — browser extensions, code editors, and web interfaces — under identical controlled conditions to systematically compare their data exposure footprint.",
        de: "Wie viele deiner Daten sehen KI-Tools wirklich? Diese Forschung fängt den ausgehenden Netzwerkverkehr von LLM-integrierten Produktivitätswerkzeugen — Browser-Erweiterungen, Code-Editoren und Web-Interfaces — unter identischen kontrollierten Bedingungen ab und analysiert ihn, um ihren Datenexpositions-Fußabdruck systematisch zu vergleichen."
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
    "saha": {
      title: {
        en: "Saha",
        de: "Saha"
      },
      description: {
        en: "Deployed racket-sports booking platform, built security-first. Postgres row-level security isolates every tenant's data at the database rather than in application code, a strict Content Security Policy constrains what the browser will execute, MFA gates admin actions, an append-only audit log records privileged operations, and Stripe Connect webhooks are signature-verified before any payout is trusted. Self-audited the row-level security policies and closed a privilege-escalation gap.",
        de: "Produktiv betriebene Buchungsplattform für Schlägersportarten, konsequent sicherheitsorientiert entwickelt. Postgres Row-Level Security isoliert die Daten jedes Mandanten in der Datenbank statt im Anwendungscode, eine strikte Content Security Policy begrenzt, was der Browser ausführt, MFA schützt Admin-Aktionen, ein Append-only-Audit-Log protokolliert privilegierte Operationen, und Stripe-Connect-Webhooks werden signaturgeprüft, bevor einer Auszahlung vertraut wird. Die RLS-Richtlinien selbst auditiert und eine Lücke zur Rechteausweitung geschlossen."
      },
      course: {
        en: "Personal Project",
        de: "Eigenes Projekt"
      },
      highlights: {
        en: [
          "Postgres row-level security isolating tenant data at the database",
          "Strict Content Security Policy and MFA-gated admin actions",
          "Append-only audit log over privileged operations",
          "Signature-verified Stripe Connect webhooks",
          "Self-audited the RLS policies and fixed a privilege-escalation gap"
        ],
        de: [
          "Postgres Row-Level Security isoliert Mandantendaten in der Datenbank",
          "Strikte Content Security Policy und MFA-geschützte Admin-Aktionen",
          "Append-only-Audit-Log über privilegierte Operationen",
          "Signaturgeprüfte Stripe-Connect-Webhooks",
          "RLS-Richtlinien selbst auditiert und Rechteausweitung behoben"
        ]
      }
    },
    "makhzan": {
      title: {
        en: "Makhzan",
        de: "Makhzan"
      },
      description: {
        en: "Storage-rental marketplace hardened against the common web attack classes: JWTs held in httpOnly cookies so session tokens are unreachable from JavaScript, parameterised SQL throughout, IDOR checks on every object reference, a strict Content Security Policy, and signature-verified Stripe webhooks. Ships with a documented privacy-by-design gap analysis setting out the data-minimisation work still outstanding.",
        de: "Marktplatz für Lagerraumvermietung, gehärtet gegen die gängigen Web-Angriffsklassen: JWTs in httpOnly-Cookies, sodass Session-Tokens für JavaScript unerreichbar bleiben, durchgängig parametrisiertes SQL, IDOR-Prüfungen bei jeder Objektreferenz, eine strikte Content Security Policy und signaturgeprüfte Stripe-Webhooks. Enthält eine dokumentierte Privacy-by-Design-Lückenanalyse, die die noch ausstehende Datenminimierung benennt."
      },
      course: {
        en: "Personal Project",
        de: "Eigenes Projekt"
      },
      highlights: {
        en: [
          "httpOnly-cookie JWT sessions, no tokens exposed to JavaScript",
          "Parameterised SQL and IDOR checks on every object reference",
          "Strict Content Security Policy and signed Stripe webhooks",
          "Documented privacy-by-design gap analysis as future work"
        ],
        de: [
          "JWT-Sessions in httpOnly-Cookies, keine Tokens für JavaScript sichtbar",
          "Parametrisiertes SQL und IDOR-Prüfungen bei jeder Objektreferenz",
          "Strikte Content Security Policy und signierte Stripe-Webhooks",
          "Dokumentierte Privacy-by-Design-Lückenanalyse als Ausblick"
        ]
      }
    },
    "semsem": {
      title: {
        en: "Semsem",
        de: "Semsem"
      },
      description: {
        en: "Real-time voice-driven desktop AI assistant, designed around the question of what an assistant should be allowed to do. A capability-based permission model makes dangerous actions default-deny, a destructive-command denylist blocks irreversible operations outright, and filesystem access is confined to an approved root with symlink escapes resolved and rejected. Independently code-reviewed.",
        de: "Sprachgesteuerter Desktop-KI-Assistent in Echtzeit, bei dessen Entwurf die Frage im Mittelpunkt stand, was ein Assistent überhaupt tun darf. Ein fähigkeitsbasiertes Berechtigungsmodell verweigert gefährliche Aktionen standardmäßig, eine Denylist destruktiver Befehle blockiert irreversible Operationen vollständig, und der Dateisystemzugriff ist auf ein freigegebenes Wurzelverzeichnis beschränkt, wobei Symlink-Ausbrüche aufgelöst und abgewiesen werden. Unabhängig per Code-Review geprüft."
      },
      course: {
        en: "Personal Project",
        de: "Eigenes Projekt"
      },
      highlights: {
        en: [
          "Capability-based permission model, default-deny for dangerous actions",
          "Destructive-command denylist blocking irreversible operations",
          "Symlink-safe filesystem confinement to an approved root",
          "Independently code-reviewed"
        ],
        de: [
          "Fähigkeitsbasiertes Berechtigungsmodell, gefährliche Aktionen standardmäßig verweigert",
          "Denylist destruktiver Befehle blockiert irreversible Operationen",
          "Symlink-sichere Beschränkung des Dateisystems auf ein freigegebenes Wurzelverzeichnis",
          "Unabhängig per Code-Review geprüft"
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
        en: "Award-winning deep learning system for mango detection from aerial drone imagery. Developed and benchmarked YOLOv8 and Faster R-CNN detectors across a public benchmark and a custom drone dataset, reaching mAP@0.5 of 0.959 and 0.756, and built a bilingual GUI with GPS-integrated mapping for precision agriculture.",
        de: "Preisgekröntes Deep-Learning-System zur Mangoerkennung aus Drohnenluftbildern. YOLOv8- und Faster-R-CNN-Detektoren auf einem öffentlichen Benchmark und einem eigenen Drohnendatensatz entwickelt und verglichen, mit mAP@0.5 von 0,959 bzw. 0,756, sowie zweisprachige GUI mit GPS-integrierter Kartierung für die Präzisionslandwirtschaft."
      },
      course: {
        en: "Final Year Project",
        de: "Abschlussprojekt"
      },
      highlights: {
        en: [
          "mAP@0.5 of 0.959 (YOLOv8) and 0.756 (Faster R-CNN)",
          "Awarded Best Research Project at MMU",
          "Bilingual GUI with GPS-integrated mapping",
          "Outperformed Detectron2 in accuracy benchmarks"
        ],
        de: [
          "mAP@0.5 von 0,959 (YOLOv8) und 0,756 (Faster R-CNN)",
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
        en: "Working Student – Software Engineer",
        de: "Werkstudent – Software Engineer"
      },
      description: {
        en: "• Performance optimisation: took a stalling NASA/DLR data-reduction job from over 50 GB (could not complete) to 14.4 GB with bit-identical output\n• Root-cause analysis: traced the peak to redundant concurrent calculations; a two-line config change gave 39%, and memray-guided dtype fixes a further 32%",
        de: "• Performance-Optimierung: einen blockierenden NASA/DLR-Datenreduktionslauf von über 50 GB (nicht abschließbar) auf 14,4 GB gebracht, bei bit-identischem Ergebnis\n• Ursachenanalyse: die Spitze auf redundante nebenläufige Berechnungen zurückgeführt; eine zweizeilige Konfigurationsänderung brachte 39%, memray-geleitete dtype-Korrekturen weitere 32%"
      }
    },
    "1": {
      title: {
        en: "Working Student – Software Engineer",
        de: "Werkstudent – Software Engineer"
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
        en: "Master of Science\nInformation Technology (INFOTECH)",
        de: "Master of Science\nInformationstechnologie (INFOTECH)"
      },
      dateString: {
        en: "Oct 2024 - March 2027 (Expected)",
        de: "Okt 2024 - März 2027 (Erwartet)"
      },
      description: {
        en: "Specialisation: Software Engineering",
        de: "Vertiefung: Software Engineering"
      },
      achievements: {
        en: [],
        de: []
      }
    },
    "5": {
      title: {
        en: "B.Eng. (Hons.)\nElectronics Majoring in Computer",
        de: "B.Eng. (Hons.)\nElectronics Majoring in Computer"
      },
      description: {
        en: "CGPA: 3.7/4.0 — First Class Honours (German equivalent ≈ 1.4) 🎖️",
        de: "CGPA: 3,7/4,0 — First Class Honours (deutsche Entsprechung ≈ 1,4) 🎖️"
      },
      achievements: {
        en: [
          "Best Research Project Award (MangoVision, mAP@0.5 0.959)",
          "Gold Medal - INVENTX Invention Exhibition 2024",
          "2nd Place - Intel VLSI Design Challenge",
          "Merit International Scholarship (50%)"
        ],
        de: [
          "Best Research Project Award (MangoVision, mAP@0.5 0.959)",
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
