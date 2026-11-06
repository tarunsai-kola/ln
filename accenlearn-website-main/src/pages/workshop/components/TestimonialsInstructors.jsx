import React, { useState } from "react";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Domain-tailored industry leader insights from senior practitioners & hiring directors
const getIndustryQuotes = (courseTitle) => {
  const t = courseTitle || "Technology";

  // 1. Artificial Intelligence & Machine Learning
  if (t.includes("Artificial Intelligence") || t.includes("Machine Learning") || t.includes("AI")) {
    return [
      {
        name: "Dr. Aris Thorne",
        title: "VP of Applied AI & Machine Learning",
        company: "Enterprise Cognitive Systems",
        quote: "Hiring managers have moved past candidates who only train models on toy datasets. Today, we look for engineers who understand latency profiling, distributed inference with vLLM, and how to reliably evaluate LLM pipelines in production.",
        note: "Why this matters: Companies prioritize engineers who can deploy, monitor, and scale generative AI models into live business workflows."
      },
      {
        name: "Elena Rostova",
        title: "Director of AI Systems Research",
        company: "Autonomous Technologies Lab",
        quote: "Theoretical understanding of neural networks is table stakes. The candidates who stand out can articulate how to mitigate hallucinations, optimize memory with quantization, and orchestrate multi-agent workflows.",
        note: "Why this matters: Hands-on mastery of production tools like PyTorch, LangGraph, and Vector DBs bridges the gap between research and commercial engineering."
      }
    ];
  }

  // 2. Cyber Security
  if (t.includes("Cyber Security") || t.includes("Security")) {
    return [
      {
        name: "Marcus Vance",
        title: "Chief Information Security Officer & Practice Lead",
        company: "CyberDefense Solutions",
        quote: "Automated vulnerability scanners only scratch the surface. We actively seek security analysts who can perform manual penetration testing, dissect network protocols, and implement zero-trust access control.",
        note: "Why this matters: Demonstrating practical proficiency with Burp Suite, SIEM threat hunting, and defense-in-depth architecture makes you a high-value hire for SecOps teams."
      },
      {
        name: "Nisha Patel",
        title: "Director of Enterprise Threat Intelligence",
        company: "SecurSphere Global",
        quote: "Security is no longer a checklist; it is an active operational discipline. Candidates who understand incident response workflows and cloud compliance frameworks like ISO 27001 command high market demand.",
        note: "Why this matters: Practical SOC lab experience and forensic readiness directly translate into day-one readiness for corporate security roles."
      }
    ];
  }

  // 3. Cloud Computing & DevOps
  if (t.includes("Cloud") || t.includes("DevOps")) {
    return [
      {
        name: "David Chen",
        title: "Principal Cloud Solutions Architect",
        company: "Apex Cloud Infrastructure",
        quote: "The modern cloud ecosystem demands Infrastructure as Code and multi-cloud resilience. Candidates who know how to architect immutable infrastructure with Terraform and automate with GitOps pipelines rise straight to the top of our candidate lists.",
        note: "Why this matters: Automating deployments and managing container orchestration with Kubernetes are the two most lucrative skill sets in enterprise infrastructure."
      },
      {
        name: "Siddharth Menon",
        title: "Senior Director of Platform & Site Reliability Engineering",
        company: "ScaleCloud Networks",
        quote: "Uptime and observability define customer trust. We evaluate engineers on how they handle real incident post-mortems, Prometheus metric alerts, and automated zero-downtime canary rollouts.",
        note: "Why this matters: Hands-on experience debugging live infrastructure outages and configuring microservice meshes sets senior candidates apart from entry-level applicants."
      }
    ];
  }

  // 4. Data Structures & Full Stack Software Development
  if (t.includes("Full Stack") || t.includes("Software Development") || t.includes("Data Structures") || t.includes("Android")) {
    return [
      {
        name: "Rachel Adams",
        title: "VP of Software Engineering",
        company: "Vanguard Digital Systems",
        quote: "Anyone can copy a basic tutorial, but engineering teams test for architecture. We look for developers who understand database query performance, asynchronous queue workers, and clean separation between domain logic and presentation.",
        note: "Why this matters: Building full-stack systems with real authentication, database indexing, and caching proves you can contribute to enterprise codebases immediately."
      },
      {
        name: "Vikram Malhotra",
        title: "Head of Engineering & Scalable Platforms",
        company: "Nova Tech Ventures",
        quote: "Algorithmic thinking is not just for interviews; it dictates how your APIs perform under heavy load. A developer who can write clean, scalable TypeScript and design resilient microservices is an immediate asset.",
        note: "Why this matters: Mastering data structures alongside modern frameworks ensures you pass technical screening rounds with confidence."
      }
    ];
  }

  // 5. Data Science, Data Analytics & SQL
  if (t.includes("Data") || t.includes("Analytics") || t.includes("SQL")) {
    return [
      {
        name: "Ananya Sen",
        title: "Director of Enterprise Data & Business Intelligence",
        company: "Global Analytics Group",
        quote: "Writing clean SQL and Python is the baseline. The real differentiator is business intuition—can you translate ambiguous business questions into actionable statistical experiments and intuitive executive dashboards?",
        note: "Why this matters: Pairing advanced SQL window functions and predictive modeling with stakeholder presentation skills accelerates career promotions."
      },
      {
        name: "Karthik Sundaram",
        title: "Lead Data Architect & Decision Scientist",
        company: "InsightMetrics Corp",
        quote: "Modern data engineering and analytics require robust ELT pipelines and data governance. Candidates who understand warehouse architectures like Snowflake or BigQuery are in tremendous demand.",
        note: "Why this matters: Hands-on portfolio projects featuring end-to-end data pipelines and automated reporting establish strong technical credibility."
      }
    ];
  }

  // 6. Embedded Systems & VLSI Design
  if (t.includes("Embedded") || t.includes("VLSI")) {
    return [
      {
        name: "Rajeshwar Rao",
        title: "Chief Hardware Architect & Embedded Systems Fellow",
        company: "CoreSilicon Innovations",
        quote: "Real hardware engineers must know how firmware interacts directly with registers. We look for engineers who can write bare-metal drivers, debug serial protocols on logic analyzers, and handle RTOS priority inversions.",
        note: "Why this matters: Practical lab experience with real microcontrollers and oscilloscope signal analysis is what core engineering recruiters look for."
      },
      {
        name: "Dr. Sandeep Kulkarni",
        title: "Technical Director of VLSI & Physical Verification",
        company: "MicroSemicon Technologies",
        quote: "In the semiconductor sector, verification quality determines billion-dollar tape-out success. Candidates fluent in SystemVerilog, UVM testbench architectures, and timing closure are hired with exceptional starting packages.",
        note: "Why this matters: Mastering industry-standard EDA tools and ASIC/FPGA workflows provides a clear pathway into tier-1 semiconductor companies."
      }
    ];
  }

  // 7. Design & UI/UX
  if (t.includes("UI/UX") || t.includes("Graphics") || t.includes("Design")) {
    return [
      {
        name: "Maya Sterling",
        title: "Head of Product Experience & Design Systems",
        company: "Studio Paradigm",
        quote: "A portfolio is not a gallery of static mockups; it is proof of critical problem solving. We look for designers who conduct rigorous user research, test interaction flows, and create scalable design tokens that engineers love.",
        note: "Why this matters: Presenting your UX case studies with data-backed user feedback and measurable business KPIs distinguishes you from junior designers."
      },
      {
        name: "Arjun Nambiar",
        title: "Design Director & Creative Strategist",
        company: "Kinetic Interactive",
        quote: "Designers who master both visual polish and technical empathy—understanding CSS flexbox, component states, and accessibility compliance—are the most indispensable members of product teams.",
        note: "Why this matters: Bridging design systems with frontend realities ensures your designs are built exactly as intended in production."
      }
    ];
  }

  // 8. Digital Marketing
  if (t.includes("Marketing")) {
    return [
      {
        name: "Sophia Reynolds",
        title: "VP of Global Growth & Performance Media",
        company: "OmniGrowth Media",
        quote: "Modern digital marketing is an exact science of unit economics. Growth leads must be able to audit customer acquisition costs, execute conversion rate optimization tests, and track multi-touch attribution across channels.",
        note: "Why this matters: Real campaign budget management experience and analytical reporting give you immediate credibility at high-growth brands."
      },
      {
        name: "Rohan Verma",
        title: "Director of Search & Content Strategy",
        company: "Acquisition Labs",
        quote: "Algorithms change constantly, but intent-driven marketing remains evergreen. Marketers who combine technical SEO audits with programmatic ad targeting deliver repeatable commercial revenue.",
        note: "Why this matters: Full-funnel execution across organic search and paid acquisition makes you an invaluable strategic asset."
      }
    ];
  }

  // 9. Human Resource
  if (t.includes("Human Resource") || t.includes("HR")) {
    return [
      {
        name: "Pooja Hegde",
        title: "Global Head of Talent Acquisition & Human Capital",
        company: "Apex Corporate Partners",
        quote: "Modern HR leaders look for strategic business partners who utilize people analytics, structured hiring rubrics, and automated onboarding systems to maximize talent retention and productivity.",
        note: "Why this matters: Proficiency in HR analytics and workforce planning elevates you from an administrative coordinator to an executive leadership advisor."
      },
      {
        name: "Daniel Wright",
        title: "VP of People & Organizational Development",
        company: "Stratum People Consulting",
        quote: "Talent density and compliant payroll frameworks are the foundation of healthy enterprises. HR specialists who understand statutory compliance, compensation benchmarking, and employee engagement drive organizational success.",
        note: "Why this matters: Comprehensive training in labor laws and performance management models opens immediate pathways to senior HRBP roles."
      }
    ];
  }

  // 10. Finance & Capital Markets
  if (t.includes("Finance") || t.includes("Stock Market")) {
    return [
      {
        name: "Gautam Singhania",
        title: "Managing Director of Equity Research & Valuations",
        company: "Meridian Capital Markets",
        quote: "Investment committees don't care about intuition; they demand defensible financial models. We hire analysts who can build robust 3-statement forecast models, execute DCF valuations, and stress-test assumptions.",
        note: "Why this matters: Mastering institutional-grade financial modeling and trading multiples gives you an undeniable edge during banking interviews."
      },
      {
        name: "Claire Thornton",
        title: "Senior Portfolio Strategist & Risk Manager",
        company: "Beacon Wealth Advisory",
        quote: "True financial expertise lies in understanding capital allocation, macro indicators, and portfolio risk management metrics like Value at Risk and Sharpe ratios.",
        note: "Why this matters: Practical portfolio simulation experience and equity valuation pitch decks prove your investment analysis capability."
      }
    ];
  }

  // 11. Medical Coding
  if (t.includes("Medical Coding")) {
    return [
      {
        name: "Dr. K. S. Balasubramanian",
        title: "Director of Health Information Management & Audit",
        company: "Apex Healthcare Systems",
        quote: "Medical coding accuracy directly impacts hospital revenue cycles and regulatory compliance. Facilities actively seek certified coders who demonstrate zero-error chart auditing across ICD-10 and CPT.",
        note: "Why this matters: Clinical chart practice and compliance auditing training prepare you to clear professional certification on your first attempt."
      },
      {
        name: "Meera Krishnan",
        title: "Senior Director of Revenue Cycle Management",
        company: "Global Care Informatics",
        quote: "With increasing scrutiny on claims and medical necessity, healthcare providers need coders who can mitigate denials through thorough clinical documentation knowledge.",
        note: "Why this matters: Certified professional coders with practical chart auditing skills enjoy rapid promotion to Quality Analyst and Team Lead positions."
      }
    ];
  }

  // 12. Psychology
  if (t.includes("Psychology")) {
    return [
      {
        name: "Dr. Shalini Mukhopadhyay",
        title: "Clinical Director of Behavioral Health Services",
        company: "MindBridge Psychological Institute",
        quote: "Effective mental health support demands rigorous grounding in evidence-based modalities like Cognitive Behavioral Therapy, paired with ethical therapeutic boundary management.",
        note: "Why this matters: Practicing structured case formulation and simulated client intake sessions prepares counselors for meaningful, ethical practice."
      },
      {
        name: "Dr. Arthur Pendelton",
        title: "Head of Counseling & Workplace Wellbeing",
        company: "Integrative Health Alliance",
        quote: "The modern workforce is facing unprecedented psychological stress. Organizations are looking for practitioners who can conduct psychoeducational workshops and design workplace wellness programs.",
        note: "Why this matters: Combining individual counseling techniques with corporate mental wellness frameworks creates diverse career pathways."
      }
    ];
  }

  // 13. Technology, Software Engineering & General Default
  return [
    {
      name: "Kavita Ramachandran",
      title: "Senior Engineering Director",
      company: "Global Cloud Engineering",
      quote: "Hiring panels evaluate candidates on systems thinking: can you build software that is modular, maintainable, and resilient to failure? Engineers who bring structured project portfolios consistently win senior offers.",
      note: "Why this matters: Demonstrating architectural reasoning and clean engineering practices sets you apart from candidates who only know basic syntax."
    },
    {
      name: "Neil Sanderson",
      title: "VP of Enterprise Technology & Hiring",
      company: "NextGen Software Group",
      quote: "The technology landscape is moving towards full-stack autonomy. We look for individuals who take complete ownership of features from API design through testing, deployment, and monitoring.",
      note: "Why this matters: Hands-on mastery across development and deployment pipelines maximizes your career velocity and compensation growth."
    }
  ];
};

const TestimonialsInstructors = ({ title }) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = getIndustryQuotes(title);
  const activeQuote = quotes[currentQuote % quotes.length] || quotes[0];

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);

  return (
    <section className="bg-white py-20 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Industry Leader Quotes Carousel */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
              Industry Perspectives
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">What Industry Leaders Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              Perspectives from senior hiring managers, technical architects, and domain directors on high-impact skills that accelerate hiring.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 relative shadow-sm hover:shadow-md transition-shadow">
            <FaQuoteLeft className="absolute top-8 left-8 w-12 h-12 text-slate-100" />
            
            <div className="relative z-10 min-h-[200px] flex flex-col justify-center">
              <p className="text-xl md:text-2xl text-slate-700 italic leading-relaxed text-center mb-8">
                "{activeQuote.quote}"
              </p>
              
              <div className="flex flex-col items-center">
                <p className="text-slate-900 font-bold text-lg">{activeQuote.name}</p>
                <p className="text-slate-500 text-sm mb-6">{activeQuote.title}, <span className="text-blue-600 font-medium">{activeQuote.company}</span></p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center max-w-xl">
                  <p className="text-blue-700 text-sm font-medium">{activeQuote.note}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <button 
              onClick={prevQuote} 
              aria-label="Previous quote"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextQuote} 
              aria-label="Next quote"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuote(idx)}
                  aria-label={`Go to quote ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === (currentQuote % quotes.length) 
                      ? "w-8 bg-blue-600" 
                      : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Instructors Grid - Commented out */}
        {/* 
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Learn From The Top 1%</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Mentors who have built scalable systems at the world's best tech companies.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {instructors.map((inst, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:border-slate-300 shadow-sm transition-colors">
                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-3xl font-bold text-blue-600">
                    {inst.name.charAt(0)}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{inst.name}</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-1">{inst.title}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">@ {inst.company}</p>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                    {inst.bio}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <FaStar key={i} className="w-3 h-3" />)}
                    </div>
                    <span className="text-slate-500 text-xs font-bold">{inst.rating}/5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        */}

      </div>
    </section>
  );
};

export default TestimonialsInstructors;
