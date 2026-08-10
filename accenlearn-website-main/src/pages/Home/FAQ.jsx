import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
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

  const toggleAccordion = (index) => {
    const isOpening = activeIndex !== index;
    setActiveIndex(isOpening ? index : null);
    if (isOpening) {
      trackEvent("FAQ", "Accordion Click", FAQ_DATA[selectedDomain][index].q);
    }
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-3xl md:text-5xl font-extrabold mb-4">
            Most Frequent Questions
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            Everything students and institutions usually ask before getting started.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left Side: FAQ Accordion */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            {/* Domain Selector */}
            <div className="mb-10 relative">
              <label className="block text-primary font-bold text-xs uppercase tracking-widest mb-3 ml-1">
                Select Your Interest
              </label>
              <div className="relative">
                <select
                  value={selectedDomain}
                  onChange={(e) => {
                    const newDomain = e.target.value;
                    setSelectedDomain(newDomain);
                    setActiveIndex(0); // Reset accordion on domain change
                    trackEvent("FAQ", "Domain Change", newDomain);
                  }}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer text-base sm:text-lg font-medium shadow-sm"
                >
                  {Object.keys(FAQ_DATA).map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                  <IoChevronDown size={24} />
                </div>
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-2 sm:space-y-4">
              {FAQ_DATA[selectedDomain].map((faq, index) => (
                <div 
                  key={index} 
                  className="border-b border-gray-100 last:border-0"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-4 sm:py-6 text-left group transition-all"
                  >
                    <span className={`text-lg sm:text-xl font-bold transition-colors ${activeIndex === index ? 'text-primary' : 'text-gray-800 group-hover:text-primary'}`}>
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                      <IoChevronDown size={20} className="sm:w-6 sm:h-6" />
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100 pb-6 sm:pb-8' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-2/5 relative lg:sticky lg:top-24 order-1 lg:order-2 mb-10 lg:mb-0 self-start">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              {/* Decorative Background Elements */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
              
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white">
                <img 
                  src={FAQImg} 
                  alt="FAQ Illustration" 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Stats Card Overlay */}
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-50 hidden sm:block animate-float z-20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-secondary">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 1010-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">Support Rate</p>
                    <p className="text-lg sm:text-xl font-extrabold text-primary">99.9% Success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FAQ;
