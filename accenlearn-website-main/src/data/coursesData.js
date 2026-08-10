export const onlinePricing = [
  {
    duration: "1 Month",
    mrp: 8999,
    offerPrice: 3999,
    preRegistration: 1000,
  },
  {
    duration: "2 Months",
    mrp: 9999,
    offerPrice: 6500,
    preRegistration: 1000,
  },
  {
    duration: "3 Months",
    mrp: 17999,
    offerPrice: 8500,
    preRegistration: 2000,
  },
];

export const offlinePricing = [
  {
    duration: "1 Month",
    mrp: 18999,
    offerPrice: 12500,
    preRegistration: 2000,
  },
  {
    duration: "2 Months",
    mrp: 48999,
    offerPrice: 24999,
    preRegistration: 3000,
  },
  {
    duration: "3 Months",
    mrp: 74999,
    offerPrice: 34999,
    preRegistration: 5000,
  },
];

export const courseBenefits = [
  "Multiple certificates — AccenLearn Solutions course completion, ISO-certified and IBM-certified workshop completion",
  "Free resume-building class",
  "Free communication skills class",
  "Free industrial visit for 3-month programmes",
  "One free placement opportunity",
  "Internship completion certificate and Letter of Recommendation",
  "100% placement assistance, mock interviews and expert mentorship",
];

export const courses = [
  {
    id: 1,
    slug: "full-stack-web-development",
    name: "Full Stack Web Development",
    category: "Technology",
    shortDescription:
      "Learn frontend, backend, databases and deployment by building complete web applications.",
    description:
      "A practical programme covering modern frontend development, backend APIs, databases, version control and deployment.",
    curriculum: [
      "HTML, CSS and JavaScript",
      "React fundamentals",
      "Node.js and Express",
      "REST API development",
      "Database integration",
      "Git, GitHub and deployment",
    ],
    syllabus: [
      {
        title: "Module 1: Foundations of Web Development",
        lessons: [
          "Lesson 1: What is Web Development?",
          "Lesson 2: Client vs Server",
          "Lesson 3: Tools & Setup",
        ],
      },
      {
        title: "Module 2: HTML and CSS Fundamentals",
        lessons: [
          "Lesson 1: Basic Tags and Structure",
          "Lesson 2: Forms & Inputs",
          "Lesson 3: Semantic HTML",
        ],
      },
      {
        title: "Module 3: JavaScript Essentials",
        lessons: [
          "Lesson 1: DOM Manipulation",
          "Lesson 2: Events and Data Flow",
          "Lesson 3: Modern JavaScript Features",
        ],
      },
      {
        title: "Module 4: Frontend Frameworks",
        lessons: [
          "Lesson 1: React Basics",
          "Lesson 2: Component Architecture",
          "Lesson 3: State Management",
        ],
      },
      {
        title: "Module 5: Backend and Deployment",
        lessons: [
          "Lesson 1: Node.js and Express APIs",
          "Lesson 2: Database Integration",
          "Lesson 3: Deployment and Hosting",
        ],
      },
    ],
    skillsCovered: [
      "Frontend development",
      "Backend development",
      "API integration",
      "Database management",
      "Deployment",
    ],
    eligibility: [
      "Students and graduates",
      "Freshers",
      "Working professionals",
      "Basic computer knowledge",
    ],
    trainer: {
      name: "AccenLearn Industry Trainer",
      role: "Full Stack Developer",
      experience: "5+ years",
    },
    nextBatch: "Upcoming batch",
  },
  {
    id: 2,
    slug: "ethical-hacking",
    name: "Ethical Hacking",
    category: "Technology",
    shortDescription:
      "Understand cybersecurity fundamentals, vulnerabilities and ethical security testing.",
    description:
      "A hands-on introduction to ethical hacking, security testing, threat analysis and defensive practices.",
    curriculum: [
      "Networking basics",
      "Linux fundamentals",
      "Web application security",
      "Vulnerability assessment",
      "Penetration testing basics",
      "Security reporting",
    ],
    syllabus: [
      {
        title: "Module 1: Cybersecurity Fundamentals",
        lessons: [
          "Lesson 1: Introduction to Ethical Hacking",
          "Lesson 2: Cybersecurity Principles",
          "Lesson 3: Legal and Ethical Practices",
        ],
      },
      {
        title: "Module 2: Networking and Linux",
        lessons: [
          "Lesson 1: Networking Basics",
          "Lesson 2: Linux Fundamentals",
          "Lesson 3: Shell and Command Line Tools",
        ],
      },
      {
        title: "Module 3: Web Application Security",
        lessons: [
          "Lesson 1: Common Web Vulnerabilities",
          "Lesson 2: SQL Injection and XSS",
          "Lesson 3: Secure Coding Practices",
        ],
      },
      {
        title: "Module 4: Hands-on Testing",
        lessons: [
          "Lesson 1: Vulnerability Assessment",
          "Lesson 2: Penetration Testing Basics",
          "Lesson 3: Reporting and Remediation",
        ],
      },
    ],
    skillsCovered: [
      "Security testing",
      "Threat identification",
      "Vulnerability assessment",
      "Network security",
    ],
    eligibility: [
      "Students and graduates",
      "IT professionals",
      "Basic networking knowledge preferred",
    ],
    trainer: {
      name: "AccenLearn Cybersecurity Trainer",
      role: "Security Specialist",
      experience: "5+ years",
    },
    nextBatch: "Upcoming batch",
  },
];