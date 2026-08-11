import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaChevronDown, FaWhatsapp, FaStar, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { DiMongodb, DiPostgresql } from "react-icons/di";
import { SiGooglecloud, SiTensorflow, SiKubernetes } from "react-icons/si";
import { IMAGE_HELPER } from "../../shared/ImageHelper";

const MEDICAL_COURSES = [
  {
    title: "Psychology",
    path: "/programs/medical/psychology",
    description: "Understand human behavior and mental processes.",
    rating: "4.9",
    duration: "6 Months",
    bullets: ["Behavioral Psychology", "Clinical Diagnostics", "Counseling"],
    roles: "Psychologist, Counselor",
    icons: [<FaGraduationCap key="1" />],
    color: "rose",
    accent: "from-rose-500/20 to-transparent",
    border: "group-hover:border-rose-500/50",
    glow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.15)]",
    span: "md:col-span-2",
    image: "/program-bg/ai-ml.png" // using placeholder images
  },
  {
    title: "Medical Coding",
    path: "/programs/medical/medical-coding",
    description: "Learn to translate healthcare diagnoses and procedures into universal medical codes.",
    rating: "4.8",
    duration: "4 Months",
    bullets: ["ICD-10-CM", "CPT Coding", "Healthcare Compliance"],
    roles: "Medical Coder",
    icons: [<FaStar key="1" />],
    color: "emerald",
    accent: "from-emerald-500/20 to-transparent",
    border: "group-hover:border-emerald-500/50",
    glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    span: "md:col-span-1",
    image: "/program-bg/da-ai.png"
  }
];

const MENTORS = [
  { name: "Dr. M. Kumar M.E., Ph.D.", company: "Sriram Engineering College", role: "Cyber Security Specialist", domain: "Cyber Security", yoe: "15+", rating: "4.9", img: IMAGE_HELPER.MENTOR_CYBER, bio: "Expert in network defense and cryptography. Instrumental in designing secure enterprise architectures and ethical hacking protocols." },
  { name: "Dr. M. Usharani M.E., Ph.D.", company: "PSV college", role: "Technical Advisor", domain: "Leadership & Architecture", yoe: "26+", rating: "5.0", img: IMAGE_HELPER.MENTOR_USHARANI, bio: "Decades of experience in technical leadership. Mentored hundreds of engineers and guided large-scale academic & enterprise projects." },
  { name: "Dr. Ranjithkumar", company: "Nuvama Wealth management", role: "Artificial Intelligence", domain: "AI / Machine Learning", yoe: "10+", rating: "4.9", img: IMAGE_HELPER.MENTOR_AI, bio: "Leading AI initiatives in the fintech sector. Specializes in predictive modeling, deep learning, and intelligent automation systems." },
  { name: "Mrs. Monisha", company: "Omega Healthcare", role: "Medical Coding Specialist", domain: "Medical Coding", yoe: "5+", rating: "4.8", img: IMAGE_HELPER.MENTOR_MEDICAL, bio: "Specialist in healthcare IT and medical coding. Deep knowledge of industry standards, compliance, and healthcare data systems." },
  { name: "Mr. Kailash U", company: "Aeris", role: "Graphic Design", domain: "Creative Design", yoe: "2+", rating: "4.8", img: IMAGE_HELPER.MENTOR_GRAPHIC, bio: "Creative visionary building next-gen visual experiences. Focuses on UI/UX, branding, and immersive digital design." },
  { name: "Sakshi", company: "Tekzow", role: "Frontend Engineer", domain: "Frontend Architecture", yoe: "1+", rating: "4.9", img: IMAGE_HELPER.MENTOR_SAKSHI, bio: "Passionate about building pixel-perfect, highly performant web applications. Master of modern React and JavaScript ecosystems." },
  { name: "Anjali", company: "Accenlearn", role: "MERN Stack + AI Engineer", domain: "MERN Stack & AI", yoe: "4+", rating: "4.8", img: IMAGE_HELPER.MENTOR_ANJALI, bio: "Full stack engineer bridging the gap between robust web development and intelligent AI integrations." },
  { name: "Arjun", company: "Whitedart", role: "App Development", domain: "App Development", yoe: "4+", rating: "4.9", img: IMAGE_HELPER.MENTOR_ARJUN, bio: "Mobile and web app developer with a track record of delivering scalable, user-centric applications from scratch." },
];

const FAQS = [
  { q: "Do I need prior coding experience?", a: "No, our programs are designed to take you from fundamentals to advanced concepts. Beginners are welcome." },
  { q: "What is the duration of the programs?", a: "Programs range from 5 to 8 months depending on the domain and depth of the curriculum." },
  { q: "Do you provide placement assistance?", a: "Yes, we have a dedicated placement cell, partner with 500+ hiring brands, and provide comprehensive interview prep." },
  { q: "Are the sessions recorded?", a: "Absolutely. All live sessions are recorded and available in your dashboard for lifetime access." },
  { q: "How is this different from a standard bootcamp?", a: "We focus heavily on 1:1 mentorship from industry veterans who actually work at top tech companies, ensuring you learn production-ready skills." },
];

const MedicalPrograms = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-24 selection:bg-blue-500/30">
      
      {/* 1. Split Hero Section (Editorial Style) */}
      <div className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0f172a]" style={{ backgroundImage: "url('/hero_mesh_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[#0f172a]/85 mix-blend-multiply"></div>
        
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Left Content - Editorial Typographic Focus */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block border border-white/30 text-white/80 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 mb-8 rounded-none">
                Admissions Open 2026
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium text-white mb-8 leading-[1.05] tracking-tight">
                Master Healthcare with <br className="hidden lg:block"/>
                <span className="italic text-slate-300 font-light">Top 1% Mentors.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed font-light">
                An executive-tier program designed to break you into top healthcare companies. Learn real-world practices directly from industry veterans.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <button className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 font-bold uppercase tracking-widest text-sm hover:bg-slate-200 transition-colors rounded-none">
                  Explore Programs
                </button>
                <button className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors rounded-none">
                  Speak to an Advisor
                </button>
              </div>
            </div>

            {/* Right Form - Stark Editorial Style */}
            <div className="w-full lg:w-[440px] shrink-0">
              <div className="bg-white p-10 shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-900"></div>
                <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">Medical Programs</h2>
                    <p className="text-xs font-semibold text-slate-500">Advance your healthcare career</p>
                  </div>
                  <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-1">
                    Limited Seats
                  </span>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors rounded-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</label>
                    <input type="tel" className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors rounded-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors rounded-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Domain of Interest</label>
                    <select className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors rounded-none appearance-none cursor-pointer">
                      <option value="" disabled selected>Select an option</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="fsd">Full Stack Development</option>
                      <option value="data">Data Science & Analytics</option>
                      <option value="cloud">Cloud & DevOps</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-4 mt-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-colors rounded-none">
                    Request Callback
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* 2. Stats Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 hidden md:block">
        <div className="grid grid-cols-4 gap-4">
          {[
            { v: "10k+", l: "Active Learners" },
            { v: "500+", l: "Hiring Brands" },
            { v: "92%", l: "Placement Rate" },
            { v: "100%", l: "Outcome Focused" }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="relative rounded-xl p-6 text-center shadow-xl hover:-translate-y-1 transition-transform overflow-hidden border border-slate-700 bg-cover bg-center"
              style={{ backgroundImage: "url('/stats_card_bg.png')" }}
            >
              <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-[2px]"></div>
              <div className="relative z-10">
                <div className="text-3xl font-black text-white mb-1 drop-shadow-md">{stat.v}</div>
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.15em] drop-shadow-md">{stat.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Course Cards - Premium Bento Grid */}
      <div className="bg-[#0a0a0f] relative overflow-hidden py-24">
        {/* Abstract Art Background for Section */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "url('/subtle_mesh_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        {/* Subtle mesh/noise background overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent pointer-events-none"></div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-4">Choose Your Path</h2>
            <p className="text-slate-400 text-base max-w-lg mx-auto">Industry-vetted curriculum designed for maximum impact and elite engineering outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-min">
            {MEDICAL_COURSES.map((course, idx) => (
              <div 
                key={idx} 
                className={`bg-[#0f0f19]/60 backdrop-blur-[20px] rounded-[24px] p-6 sm:p-8 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-500 ease-out flex flex-col group relative overflow-hidden ${course.span} hover:-translate-y-2 ${course.glow} ${course.border}`}
              >
                {/* Category Accent Gradient & Glow */}
                <div className={`absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b ${course.accent} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${course.accent} blur-[80px] rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-700`}></div>
                
                {/* Distinct Background Image per Course */}
                <div 
                   className="absolute inset-0 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none mix-blend-normal"
                   style={{ 
                     backgroundImage: `url('${course.image}')`, 
                     backgroundSize: 'cover', 
                     backgroundPosition: 'center',
                   }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f19] via-[#0f0f19]/70 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f19]/50 to-transparent pointer-events-none"></div>
                
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <FaStar className="text-amber-400 text-sm group-hover:animate-pulse" />
                    <span className="text-amber-400 text-sm font-semibold tracking-wide">{course.rating}</span>
                  </div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-[0.05em] bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 rounded-full shadow-lg">
                    {course.duration}
                  </div>
                </div>

                <div className="relative z-10 flex-grow">
                  <h3 className="text-[22px] font-bold text-[#f8fafc] mb-1 group-hover:text-white transition-colors tracking-tight">{course.title}</h3>
                  <p className="text-slate-400 text-[13px] leading-relaxed mb-6">{course.description}</p>
                  
                  {/* What You'll Master */}
                  <div className="mb-6 bg-white/[0.02] p-4 rounded-xl border border-white/[0.03]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {course.bullets.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 flex-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-indigo-400 transition-colors shrink-0"></div>
                          <span className="text-[12px] text-[#cbd5e1] font-medium leading-tight">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Target Roles & Icons */}
                <div className="relative z-10 mt-auto pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                    {course.roles.split(",").map((role, rIdx) => (
                      <span key={rIdx} className="whitespace-nowrap bg-white/[0.05] text-[#a5b4fc] text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full border border-white/[0.05]">
                        {role.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xl text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity">
                    {course.icons}
                  </div>
                </div>

                {/* CTA Button */}
                <Link to={course.path} className="relative z-10 w-full mt-6 text-center py-3 rounded-xl border border-white/10 text-white text-[13px] font-semibold tracking-[0.02em] hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:border-transparent hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300">
                  View Curriculum
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* 4. Certifications */}
      <div className="bg-[#f8fafc] relative pt-24 pb-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Certify your Success</h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 lg:gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <img src={IMAGE_HELPER.WORKSHOP} alt="Workshop Certificate" className="relative w-full max-w-[500px] h-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white transform transition-transform duration-500 group-hover:-translate-y-2" />
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <img src={IMAGE_HELPER.TRAINING} alt="Training Certificate" className="relative w-full max-w-[500px] h-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white transform transition-transform duration-500 group-hover:-translate-y-2" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Mentor Grid */}
      <div className="bg-[#f8fafc] relative pt-12 pb-48">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Learn from the Top 1%</h2>
            <p className="text-slate-600 text-lg">Mentors who have built scalable systems at the world's best tech companies.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MENTORS.map((m, i) => (
            <div key={i} className="bg-black border border-white/10 rounded-sm overflow-hidden flex flex-col justify-end group h-[280px] sm:h-[320px] relative">
              {/* Background Image - Right aligned */}
              <div className="absolute inset-0 left-1/4 sm:left-1/3">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              
              {/* Heavy Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent sm:hidden"></div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full w-full sm:w-3/4">
                <h3 className="text-xl sm:text-[22px] font-bold text-white mb-2 leading-tight tracking-tight">{m.domain}</h3>
                <p className="text-slate-300 text-sm font-medium mb-1">Taught by {m.name}</p>
                <p className="text-slate-400 text-sm mb-6">{m.role} @ <span className="font-bold text-white uppercase tracking-wider text-[11px] ml-1">{m.company}</span></p>

                <div className="mt-auto border-t border-white/20 pt-4 mb-6">
                   <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                     {m.bio}
                   </p>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-white/5 border border-white/10 rounded-sm px-3 py-1.5 flex items-center gap-3 w-fit">
                    <span className="text-[10px] font-bold text-slate-300 tracking-[0.1em] uppercase">{m.yoe} YEARS OF EXPERIENCE</span>
                    <div className="w-[1px] h-3 bg-white/30"></div>
                    <span className="text-[11px] font-bold text-yellow-500 flex items-center gap-1">{m.rating} <FaStar className="w-3 h-3 text-yellow-600"/></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave transition to FAQ */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
        <svg className="relative block w-full h-[120px] md:h-[200px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,123.63,200.27,110.33Z" className="fill-[#0f172a]"></path>
        </svg>
      </div>
    </div>

    {/* 6. FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-[#1e293b] border border-white/5 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-white text-lg pr-8">{faq.q}</span>
                <FaChevronDown className={`text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="p-6 pt-0 text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Sticky Footer CTA */}
      <div className={`fixed bottom-0 left-0 w-full bg-[#1e293b]/95 backdrop-blur-xl border-t border-white/10 p-4 transition-transform duration-500 z-50 ${showSticky ? "translate-y-0" : "translate-y-full"}`}>
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="hidden sm:block text-slate-300">
            <span className="font-bold text-white">Ready to accelerate your career?</span> Talk to our advisors today.
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shrink-0">
              <FaWhatsapp className="text-xl" /> <span className="hidden sm:inline">WhatsApp Us</span>
            </a>
            <button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-colors">
              Book Free Counseling
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MedicalPrograms;
