import React, { useState, useEffect, useRef } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import FAQImg from '../../assets/FAQ/FAQimg.png';
import { trackEvent } from "../../utils/analytics";

const FAQ_DATA = {
  "Web Development": [
    { q: "What technologies are covered in Web Development?", a: "We cover the MERN stack (MongoDB, Express, React, Node.js), HTML5, CSS3, Tailwind CSS, and modern JavaScript (ES6+)." },
    { q: "Will I build real-world projects?", a: "Yes, you'll build full-stack applications, including an e-commerce platform and a social media dashboard, to ensure industry readiness." },
    { q: "Is prior coding experience required?", a: "While helpful, our curriculum starts from the basics, making it accessible for beginners who are eager to learn." }
  ],
  "App Development": [
    { q: "Which framework is taught for App Development?", a: "We focus on React Native and Flutter, allowing you to build high-performance cross-platform apps for both iOS and Android." },
    { q: "Do we learn about app deployment?", a: "Absolutely. We guide you through the process of publishing apps to the Google Play Store and Apple App Store." },
    { q: "Are backend integrations covered?", a: "Yes, you'll learn to connect your mobile apps with Firebase and RESTful APIs." }
  ],
  "AI Engineering": [
    { q: "What is AI Engineering?", a: "AI Engineering focuses on developing tools, systems, and processes to enable the application of artificial intelligence in real-world contexts." },
    { q: "What are the core subjects?", a: "Core subjects include Machine Learning, Neural Networks, Deep Learning, and AI model optimization." },
    { q: "Is programming mandatory?", a: "Yes, proficiency in Python is highly recommended as it's the primary language for AI development." }
  ],
  "Machine Learning": [
    { q: "What mathematical concepts are necessary?", a: "We cover essential Linear Algebra, Probability, and Statistics required to understand ML algorithms deeply." },
    { q: "Which libraries will we use?", a: "You will gain hands-on experience with Python libraries like Scikit-Learn, TensorFlow, and Keras." },
    { q: "Is deep learning included?", a: "Yes, the course includes advanced modules on Neural Networks and Natural Language Processing (NLP)." }
  ],
  "Data Science": [
    { q: "What tools are used for data visualization?", a: "You'll learn to use Tableau, Power BI, and Python libraries like Matplotlib and Seaborn." },
    { q: "Is SQL part of the curriculum?", a: "Yes, advanced SQL for data retrieval and manipulation is a critical component of the course." },
    { q: "Will I work on big data?", a: "We introduce concepts of Hadoop and Spark for handling large-scale datasets." }
  ],
  "Data Analytics": [
    { q: "What is the difference between Data Science and Data Analytics?", a: "Data Analytics focuses on processing and performing statistical analysis of existing datasets to answer specific questions." },
    { q: "What tools will I learn?", a: "You will master Excel, SQL, Tableau, and basic Python for data manipulation." },
    { q: "Is this suitable for non-tech students?", a: "Yes, Data Analytics is a great entry point for students from commerce or management backgrounds." }
  ],
  "Full Stack Software Developer": [
    { q: "What does Full Stack mean?", a: "It means learning both the front-end (UI) and back-end (server/database) of software applications." },
    { q: "Which stack is taught?", a: "We primarily focus on the MERN stack (MongoDB, Express, React, Node.js)." },
    { q: "Will I learn system design?", a: "Yes, we include modules on architecture and system design to build scalable software." }
  ],
  "Data Structures and Algorithms (DSA)": [
    { q: "Why is DSA important?", a: "DSA is the foundation of computer science and is crucial for clearing technical interviews at top tech companies." },
    { q: "Which language is used for DSA?", a: "We offer tracks in Java, C++, and Python for mastering algorithms." },
    { q: "Are live coding sessions included?", a: "Yes, we conduct weekly live problem-solving sessions on platforms like LeetCode and GeeksforGeeks." }
  ],
  "Cybersecurity": [
    { q: "Is this a beginner-friendly course?", a: "We start with networking fundamentals before moving into Ethical Hacking and Penetration Testing." },
    { q: "Will I learn about cloud security?", a: "Yes, we include modules on securing AWS and Azure environments against modern threats." },
    { q: "Are there labs for practice?", a: "Our course features virtual labs where you can practice defensive and offensive security in a safe environment." }
  ],
  "DevOps": [
    { q: "What is DevOps?", a: "DevOps is a set of practices that combines software development and IT operations to shorten the systems development life cycle." },
    { q: "Which tools are covered?", a: "We cover Docker, Kubernetes, Jenkins, Git, and Terraform." },
    { q: "Is cloud computing involved?", a: "Yes, you'll learn to implement CI/CD pipelines on AWS and Azure." }
  ],
  "SQL": [
    { q: "What is SQL used for?", a: "SQL is used for managing and manipulating relational databases." },
    { q: "Will I learn about database design?", a: "Yes, we cover normalization, schema design, and query optimization." },
    { q: "Which databases are used?", a: "We primarily use MySQL and PostgreSQL for hands-on practice." }
  ],
  "Cloud Fundamentals": [
    { q: "Which cloud providers are covered?", a: "We provide in-depth training on AWS (Amazon Web Services) and Azure." },
    { q: "Do I need prior networking knowledge?", a: "No, we cover the networking basics required for cloud computing within the course." },
    { q: "Will I get certification help?", a: "Our curriculum is aligned with AWS Cloud Practitioner and Azure Fundamentals exams." }
  ],
  "Digital Marketing": [
    { q: "What platforms are covered in the course?", a: "We cover Google Ads, Facebook/Instagram Ads, LinkedIn Marketing, and SEO optimization techniques." },
    { q: "Will I learn about analytics?", a: "Yes, Google Analytics 4 and GTM are core parts of the curriculum to help you measure campaign performance." },
    { q: "Do you provide live campaign experience?", a: "Students get to work on simulated live budgets to understand real-time bidding and optimization." }
  ],
  "UI/UX Design": [
    { q: "Which design tools will I learn?", a: "The course focuses on Figma and Adobe XD, the industry standards for UI/UX design." },
    { q: "Is user research covered?", a: "Yes, we emphasize the entire design thinking process, from user interviews to high-fidelity prototyping." },
    { q: "Do I need to know how to code?", a: "No coding is required for UI/UX design, though we teach you how to hand off designs to developers." }
  ],
  "Psychology": [
    { q: "What is the focus of the Psychology workshop?", a: "We focus on organizational psychology, consumer behavior, and mental health awareness." },
    { q: "Are there practical case studies?", a: "Yes, we analyze real-world scenarios in workplace dynamics and human behavior." },
    { q: "Is this for non-psychology majors?", a: "Absolutely, it's designed to provide valuable insights for anyone interested in human behavior." }
  ],
  "Medical Coding": [
    { q: "What is Medical Coding?", a: "Medical coding is the transformation of healthcare diagnosis, procedures, medical services, and equipment into universal medical alphanumeric codes." },
    { q: "Which coding systems are covered?", a: "We cover ICD-10-CM, CPT, and HCPCS Level II coding systems, which are standard in the healthcare industry." },
    { q: "Are there certification opportunities?", a: "Yes, our training prepares you for professional certifications like CPC (Certified Professional Coder) by AAPC." }
  ],
  "Human Resource": [
    { q: "What HR functions are covered?", a: "We cover recruitment, talent management, employee relations, and HR analytics." },
    { q: "Will I learn about HR software?", a: "Yes, we introduce popular HRIS (Human Resource Information Systems) tools." },
    { q: "Are labor laws included?", a: "We cover essential labor laws and compliance requirements for modern workplaces." }
  ],
  "Business Analytics": [
    { q: "How is this different from Data Analytics?", a: "Business Analytics focuses specifically on using data to drive business decisions and strategy." },
    { q: "What tools will I learn?", a: "The focus is on Excel, Tableau, and business modeling techniques." },
    { q: "Is a business background required?", a: "While helpful, we teach the necessary business concepts alongside the analytical tools." }
  ],
  "Finance": [
    { q: "What areas of finance are covered?", a: "We cover financial modeling, corporate finance, and investment analysis." },
    { q: "Will I learn Excel for finance?", a: "Yes, advanced Excel for financial statement analysis is a core part of the course." },
    { q: "Is this suitable for CFA aspirants?", a: "It provides a strong foundation for those planning to pursue professional certifications like CFA." }
  ],
  "Stock Market": [
    { q: "Will I learn technical analysis?", a: "Yes, we cover chart patterns, indicators, and price action strategies." },
    { q: "Is fundamental analysis included?", a: "Yes, you'll learn how to read balance sheets and evaluate company health." },
    { q: "Do we practice with live markets?", a: "We use paper trading simulators to practice strategies in real-time market conditions." }
  ]
};

const FAQ = () => {
  const [selectedDomain, setSelectedDomain] = useState("Web Development");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAccordion = (index) => {
    const isOpening = activeIndex !== index;
    setActiveIndex(isOpening ? index : null);
    if (isOpening) {
      trackEvent("FAQ", "Accordion Click", FAQ_DATA[selectedDomain][index].q);
    }
  };

  return (
    <section className="bg-gray-50/50 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 shadow-sm border border-primary/10">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Got Questions?
          </div>
          <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Frequently Asked <span className="text-primary relative inline-block">
              Questions
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to know about our courses, curriculum, and how we can help you accelerate your career.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Side: FAQ Accordion */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            {/* Custom Domain Selector */}
            <div className="mb-8 relative" ref={dropdownRef}>
              <label className="block text-gray-400 font-bold text-xs uppercase tracking-widest mb-3 ml-2">
                Select Your Interest Area
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between bg-white border ${isDropdownOpen ? 'border-primary ring-4 ring-primary/10' : 'border-gray-200'} text-gray-800 py-4 px-6 rounded-2xl hover:border-primary/50 focus:outline-none transition-all shadow-sm font-medium text-left text-lg`}
                >
                  <span>{selectedDomain}</span>
                  <IoChevronDown size={24} className={`text-primary transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-80 overflow-y-auto py-2 custom-scrollbar">
                    {Object.keys(FAQ_DATA).map((domain) => (
                      <button
                        key={domain}
                        onClick={() => {
                          setSelectedDomain(domain);
                          setIsDropdownOpen(false);
                          setActiveIndex(0);
                          trackEvent("FAQ", "Domain Change", domain);
                        }}
                        className={`w-full text-left px-6 py-3.5 transition-colors text-base ${selectedDomain === domain ? 'bg-primary/5 text-primary font-bold border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'}`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {FAQ_DATA[selectedDomain].map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white ${isOpen ? 'ring-1 ring-primary/20 border-primary/20 shadow-md' : 'border-gray-100 hover:border-gray-300 hover:shadow-sm'}`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-all group"
                    >
                      <span className={`text-lg font-bold transition-colors pr-4 ${isOpen ? 'text-primary' : 'text-gray-800 group-hover:text-primary'}`}>
                        {faq.q}
                      </span>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary/10 text-primary rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary/70'}`}>
                        <IoChevronDown size={18} />
                      </div>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6 px-5 sm:px-6' : 'max-h-0 opacity-0 px-5 sm:px-6'}`}
                    >
                      <p className="text-gray-600 text-base leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-2/5 relative lg:sticky lg:top-32 order-1 lg:order-2 mb-10 lg:mb-0 self-start">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              {/* Decorative Background Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-[6px] border-white bg-white">
                <img 
                  src={FAQImg} 
                  alt="Students and Mentor" 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>


            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  );
};

export default FAQ;

