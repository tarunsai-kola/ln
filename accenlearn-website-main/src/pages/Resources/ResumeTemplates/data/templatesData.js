export const RESUME_CATEGORIES = [
  "All",
  "Freshers",
  "Experienced",
  "Software",
  "Marketing",
  "Finance",
  "Design",
  "MBA",
  "Internships"
];

export const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "latest", label: "Latest (July 2026)" },
  { id: "downloads", label: "Most Downloaded" },
  { id: "recommended", label: "Recruiter Recommended" }
];

export const RESUME_TEMPLATES_LIST = [
  {
    id: "harvard-tech",
    name: "Harvard / Tech Standard",
    category: ["Software", "Experienced", "All"],
    description: "Exact single-column standard preferred by FAANG and top tier tech recruiters. Clean typography, high scannability, 1px horizontal dividers.",
    suitableFor: "Software Engineers, Full-Stack Devs, Systems Architects",
    atsScore: "99% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 18450,
    rating: 4.9,
    lastUpdated: "July 2026",
    recommended: true,
    popular: true,
    builderTemplateId: "modern",
    previewColor: "#3d9aa3",
    layoutPreview: {
      headerStyle: "centered-bold",
      summaryStyle: "minimal-border",
      density: "medium",
      accent: "#0f172a"
    }
  },
  {
    id: "executive-classic",
    name: "Executive Classic Serif",
    category: ["Experienced", "MBA", "Finance", "All"],
    description: "Formal serif typography (Times/Georgia) with split left-right contact bar and solid professional headers. Designed for leadership authority.",
    suitableFor: "Senior Executives, MBA Graduates, VPs & Directors, Finance Leads",
    atsScore: "98% ATS Pass Rate",
    pages: "2 Pages",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 14200,
    rating: 4.8,
    lastUpdated: "June 2026",
    recommended: true,
    popular: false,
    builderTemplateId: "classic",
    previewColor: "#1e293b",
    layoutPreview: {
      headerStyle: "split-serif",
      summaryStyle: "classic-border",
      density: "relaxed",
      accent: "#1e3a8a"
    }
  },
  {
    id: "minimal-density",
    name: "High-Density Technical ATS",
    category: ["Software", "Internships", "Freshers", "All"],
    description: "Ultra-compact Calibri/Arial formatting that maximizes data density. Perfect for showcasing extensive project work and technical bullet points on 1 page.",
    suitableFor: "SDE Interns, Computer Science Graduates, DevOps Engineers",
    atsScore: "100% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 21300,
    rating: 5.0,
    lastUpdated: "July 2026",
    recommended: true,
    popular: true,
    builderTemplateId: "minimal",
    previewColor: "#059669",
    layoutPreview: {
      headerStyle: "compact-left",
      summaryStyle: "dense-grid",
      density: "high",
      accent: "#047857"
    }
  },
  {
    id: "software-architect",
    name: "Cloud & Systems Architect",
    category: ["Software", "Experienced", "All"],
    description: "Tailored specifically for senior cloud engineers and DevOps leads. Highlights system scale metrics, AWS/GCP certifications, and CI/CD achievements.",
    suitableFor: "Cloud Architects, SREs, Lead Backend Engineers",
    atsScore: "98% ATS Pass Rate",
    pages: "2 Pages",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 11800,
    rating: 4.9,
    lastUpdated: "July 2026",
    recommended: false,
    popular: true,
    builderTemplateId: "modern",
    previewColor: "#2563eb",
    layoutPreview: {
      headerStyle: "centered-bold",
      summaryStyle: "minimal-border",
      density: "medium",
      accent: "#1d4ed8"
    }
  },
  {
    id: "fresher-launchpad",
    name: "Graduate Fresher Launchpad",
    category: ["Freshers", "Internships", "All"],
    description: "Specifically structured for college students and recent graduates with limited formal work history. Emphasizes academic projects, hackathons, and certifications.",
    suitableFor: "Final Year Students, B.Tech / BCA Graduates, Entry-Level Applicants",
    atsScore: "99% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 25600,
    rating: 4.9,
    lastUpdated: "July 2026",
    recommended: true,
    popular: true,
    builderTemplateId: "minimal",
    previewColor: "#3d9aa3",
    layoutPreview: {
      headerStyle: "compact-left",
      summaryStyle: "dense-grid",
      density: "medium",
      accent: "#0f766e"
    }
  },
  {
    id: "marketing-strategist",
    name: "Strategic Growth & Marketing",
    category: ["Marketing", "Experienced", "MBA", "All"],
    description: "Balanced visual hierarchy that accentuates campaign ROI metrics, customer acquisition cost benchmarks, and brand strategy leadership.",
    suitableFor: "Digital Marketing Managers, Growth Leads, Brand Strategists",
    atsScore: "97% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 9400,
    rating: 4.8,
    lastUpdated: "May 2026",
    recommended: false,
    popular: false,
    builderTemplateId: "modern",
    previewColor: "#7c3aed",
    layoutPreview: {
      headerStyle: "centered-bold",
      summaryStyle: "minimal-border",
      density: "medium",
      accent: "#6d28d9"
    }
  },
  {
    id: "finance-analyst",
    name: "Investment & Financial Analyst",
    category: ["Finance", "MBA", "Experienced", "All"],
    description: "Rigorous quantitative presentation format trusted by investment banks, equity research firms, and corporate finance departments.",
    suitableFor: "Financial Analysts, Investment Banking Associates, CA / CFA Candidates",
    atsScore: "99% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 13500,
    rating: 4.9,
    lastUpdated: "June 2026",
    recommended: true,
    popular: false,
    builderTemplateId: "classic",
    previewColor: "#1e3a8a",
    layoutPreview: {
      headerStyle: "split-serif",
      summaryStyle: "classic-border",
      density: "high",
      accent: "#1e3a8a"
    }
  },
  {
    id: "ui-ux-creative",
    name: "Product Design & UI/UX Clean",
    category: ["Design", "Software", "All"],
    description: "Sleek, minimalist aesthetic that demonstrates typography mastery and structured spacing while remaining 100% readable by corporate applicant tracking systems.",
    suitableFor: "UI/UX Designers, Product Designers, Frontend UX Engineers",
    atsScore: "96% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 15800,
    rating: 4.8,
    lastUpdated: "July 2026",
    recommended: false,
    popular: true,
    builderTemplateId: "modern",
    previewColor: "#db2777",
    layoutPreview: {
      headerStyle: "centered-bold",
      summaryStyle: "minimal-border",
      density: "medium",
      accent: "#be185d"
    }
  },
  {
    id: "data-scientist-ai",
    name: "Data Science & AI Researcher",
    category: ["Software", "Experienced", "Internships", "All"],
    description: "Engineered to highlight machine learning models, statistical research papers, Kaggle achievements, and Python/PyTorch technical stacks.",
    suitableFor: "Data Scientists, AI/ML Engineers, Quantitative Analysts",
    atsScore: "99% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 16900,
    rating: 4.9,
    lastUpdated: "July 2026",
    recommended: true,
    popular: true,
    builderTemplateId: "minimal",
    previewColor: "#0284c7",
    layoutPreview: {
      headerStyle: "compact-left",
      summaryStyle: "dense-grid",
      density: "high",
      accent: "#0369a1"
    }
  },
  {
    id: "product-manager",
    name: "Product Management Executive",
    category: ["MBA", "Experienced", "Software", "All"],
    description: "Focuses on product vision, cross-functional engineering alignment, quarterly OKR delivery, and user engagement growth stories.",
    suitableFor: "Product Managers, Technical PMs, Agile Product Owners",
    atsScore: "98% ATS Pass Rate",
    pages: "2 Pages",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 12400,
    rating: 4.8,
    lastUpdated: "June 2026",
    recommended: false,
    popular: false,
    builderTemplateId: "modern",
    previewColor: "#ea580c",
    layoutPreview: {
      headerStyle: "centered-bold",
      summaryStyle: "minimal-border",
      density: "relaxed",
      accent: "#c2410c"
    }
  },
  {
    id: "internship-starter",
    name: "Summer Internship Compact",
    category: ["Internships", "Freshers", "All"],
    description: "Clean single-page layout designed to help second and third year college students land top summer technical and business internships.",
    suitableFor: "B.Tech/BE Students, BBA/B.Com Interns, Summer Associates",
    atsScore: "100% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 19800,
    rating: 5.0,
    lastUpdated: "July 2026",
    recommended: true,
    popular: true,
    builderTemplateId: "minimal",
    previewColor: "#16a34a",
    layoutPreview: {
      headerStyle: "compact-left",
      summaryStyle: "dense-grid",
      density: "high",
      accent: "#15803d"
    }
  },
  {
    id: "business-consultant",
    name: "Management Consulting Professional",
    category: ["MBA", "Finance", "Experienced", "All"],
    description: "Precise, MECE (Mutually Exclusive, Collectively Exhaustive) structuring built for McKinsey, BCG, and Bain consulting screenings.",
    suitableFor: "Management Consultants, Strategy Associates, Business Analysts",
    atsScore: "98% ATS Pass Rate",
    pages: "1 Page",
    formats: ["Word (.docx)", "PDF (.pdf)"],
    downloads: 10900,
    rating: 4.9,
    lastUpdated: "May 2026",
    recommended: false,
    popular: false,
    builderTemplateId: "classic",
    previewColor: "#334155",
    layoutPreview: {
      headerStyle: "split-serif",
      summaryStyle: "classic-border",
      density: "medium",
      accent: "#334155"
    }
  }
];

export const ATS_WRITING_TIPS = [
  {
    id: 1,
    title: "Keep it to One Page (or Two Max)",
    description: "For freshers and professionals with under 7 years of experience, a clean 1-page resume forces clarity and guarantees every word is read.",
    iconName: "page",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    id: 2,
    title: "Use Measurable Achievements",
    description: "Replace generic responsibilities with hard numbers and ROI (e.g., 'Reduced API latency by 35%' or 'Increased organic sales by $140K').",
    iconName: "chart",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    id: 3,
    title: "Start with Strong Action Verbs",
    description: "Begin every bullet point with powerful verbs: Engineered, Architected, Spearheaded, Optimized, Delivered, or Accelerated.",
    iconName: "bolt",
    color: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    id: 4,
    title: "Tailor for Every Job Application",
    description: "Scan the job description for key technical skills and requirements, and naturally weave those exact keywords into your summary and experience.",
    iconName: "target",
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    id: 5,
    title: "Optimize for ATS Parsers",
    description: "Avoid tables, multi-column text boxes, graphics, and custom fonts that confuse Applicant Tracking Systems. Stick to standard headings.",
    iconName: "shield",
    color: "bg-teal-50 text-teal-600 border-teal-200"
  },
  {
    id: 6,
    title: "Use Keywords Strategically",
    description: "Incorporate industry-standard acronyms, tools, and methodologies (e.g., CI/CD, Agile, Python, SEO) exactly as phrased in the target job specification.",
    iconName: "search",
    color: "bg-indigo-50 text-indigo-600 border-indigo-200"
  }
];

export const RELATED_CAREER_RESOURCES = [
  {
    id: "cover-letter",
    title: "Cover Letter Templates & Builder",
    description: "Professional, tailored cover letters designed to complement your ATS resume and explain your unique career narrative.",
    badge: "Free Suite",
    link: "/internship",
    iconColor: "text-blue-500 bg-blue-50/80"
  },
  {
    id: "linkedin-guide",
    title: "LinkedIn Profile Optimization Guide",
    description: "Step-by-step checklist to optimize your LinkedIn headline, about summary, and skills to attract 5x more recruiter outreach.",
    badge: "Featured",
    link: "/internship",
    iconColor: "text-sky-600 bg-sky-50/80"
  },
  {
    id: "interview-prep",
    title: "Technical & Behavioral Interview Prep",
    description: "Master system design, coding problem-solving, and STAR method answers for top product and service companies.",
    badge: "Interactive",
    link: "/programs",
    iconColor: "text-emerald-600 bg-emerald-50/80"
  },
  {
    id: "career-roadmaps",
    title: "Full-Stack & Cloud Career Roadmaps",
    description: "Structured step-by-step learning paths to transition from student or junior developer to senior technical lead.",
    badge: "Roadmaps",
    link: "/programs",
    iconColor: "text-amber-600 bg-amber-50/80"
  },
  {
    id: "salary-guide",
    title: "Tech Salary & Negotiation Guide",
    description: "Benchmark compensation bands for SDE I/II, Data Scientists, and Product Managers across tier-1 startups and MNCs.",
    badge: "Salary Guide",
    link: "/internship",
    iconColor: "text-teal-600 bg-teal-50/80"
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Rohan Sharma",
    role: "Placed at Amazon (SDE I)",
    batch: "VIT Alumni — 2026 Batch",
    avatar: "RS",
    quote: "Using the Harvard Tech Standard template and Accenlearn's ATS guidelines completely changed my response rate. My resume passed the automated screening at Amazon within 48 hours!",
    rating: 5,
    companyLogo: "Amazon"
  },
  {
    id: 2,
    name: "Ananya Iyer",
    role: "Product Analyst at Flipkart",
    batch: "IIM / Engineering Dual Degree",
    avatar: "AI",
    quote: "The clean layout and quantifiable achievement bullet points made my resume stand out among 3,000+ applicants. Recruiters explicitly complimented the clarity of my 1-page resume.",
    rating: 5,
    companyLogo: "Flipkart"
  },
  {
    id: 3,
    name: "Karthik Verma",
    role: "Full-Stack Developer at TCS Digital",
    batch: "B.Tech Computer Science",
    avatar: "KV",
    quote: "I was struggling with complex Canva templates that got rejected by company portals. Switched to the High-Density Technical ATS template here, and got 4 interview shortlists in two weeks.",
    rating: 5,
    companyLogo: "TCS Digital"
  }
];

export const FAQ_QUESTIONS = [
  {
    id: "faq-1",
    question: "Are these resume templates 100% free to download and use?",
    answer: "Yes, every single template in our library is 100% free forever. You can preview them, download high-resolution PDF or Word (.docx) files, or customize your details directly inside our interactive builder without any hidden paywalls or credit card requirements."
  },
  {
    id: "faq-2",
    question: "How do I know if my resume is truly ATS-friendly?",
    answer: "Our templates are rigorously tested against leading corporate Applicant Tracking Systems (Workday, Greenhouse, Taleo, and Lever). We use single-column layouts, standard HTML/Docx structural tags, clean fonts (Arial, Calibri, Times New Roman), and zero floating text boxes or complex tables that break automated parsers."
  },
  {
    id: "faq-3",
    question: "Can I edit these templates using Google Docs or Microsoft Word?",
    answer: "Absolutely! When you click 'Download Word (.docx)', the file opens cleanly with complete formatting intact in Microsoft Word, Google Docs, Apple Pages, and LibreOffice. You can modify every line, font size, and margin easily."
  },
  {
    id: "faq-4",
    question: "Why should I avoid Canva or graphic-heavy resume templates for corporate jobs?",
    answer: "While graphic-heavy Canva resumes look artistic to the human eye, most enterprise ATS parsers cannot read text embedded inside layered graphic blocks, text frames, or non-standard sidebars. This results in missing work experience data and instant automated rejection before a human recruiter even sees your file."
  },
  {
    id: "faq-5",
    question: "How does the Live Preview & Interactive Resume Builder work?",
    answer: "You have two choices: You can instantly download any template as a Word or PDF file and edit locally, OR you can click '✨ Customize in Interactive Builder' right here on the page. Our interactive builder lets you type your contact info, skills, and projects, evaluate your ATS score in real-time, and download your customized PDF instantly in one click."
  }
];
