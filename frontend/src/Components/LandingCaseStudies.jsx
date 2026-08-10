import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const LandingCaseStudies = () => {
  const caseStudies = [
    {
      name: "Rahul M.",
      previousRole: "System Engineer",
      previousCompany: "Infosys",
      previousSalary: "4.5 LPA",
      newRole: "SDE-1",
      newCompany: "Amazon",
      newSalary: "22 LPA",
      hike: "388%",
      timeline: "5 months",
      image: "/newimages/piece_1.png",
      quote: "I was handling support tickets for 2 years. Accenlearn taught me to think in distributed systems. The mock interviews were harder than the actual Amazon loop."
    },
    {
      name: "Sneha K.",
      previousRole: "Frontend Developer",
      previousCompany: "TCS",
      previousSalary: "6.0 LPA",
      newRole: "Software Engineer",
      newCompany: "Microsoft",
      newSalary: "28 LPA",
      hike: "366%",
      timeline: "6 months",
      image: "/newimages/piece_2.png",
      quote: "Transitioning from React to core backend architecture felt impossible until Accenlearn. The 1:1 mentorship from a Microsoft engineer made everything click."
    },
    {
      name: "Amit Patel",
      previousRole: "Software Tester",
      previousCompany: "Wipro",
      previousSalary: "3.5 LPA",
      newRole: "Backend Engineer",
      newCompany: "Swiggy",
      newSalary: "18 LPA",
      hike: "414%",
      timeline: "4 months",
      image: "/newimages/piece_3.png",
      quote: "I was stuck in manual QA. The rigorous DSA and system design modules at Accenlearn helped me crack Swiggy's backend round with ease."
    },
    {
      name: "Priya Sharma",
      previousRole: "Associate Analyst",
      previousCompany: "Cognizant",
      previousSalary: "4.0 LPA",
      newRole: "Data Engineer",
      newCompany: "Walmart Global Tech",
      newSalary: "24 LPA",
      hike: "500%",
      timeline: "6 months",
      image: "/newimages/piece_4.png",
      quote: "Moving from an analyst to a core data engineering role at Walmart was a dream. Accenlearn's hands-on projects were the key differentiator in my interviews."
    },
    {
      name: "Rohan Desai",
      previousRole: "Support Engineer",
      previousCompany: "Tech Mahindra",
      previousSalary: "3.2 LPA",
      newRole: "SDE-2",
      newCompany: "Paytm",
      newSalary: "26 LPA",
      hike: "712%",
      timeline: "7 months",
      image: "/newimages/piece_5.png",
      quote: "The personalized mentorship and mock interviews gave me the confidence to negotiate a senior role at Paytm, jumping straight from L1 support."
    },
    {
      name: "Kavita Singh",
      previousRole: "Web Developer",
      previousCompany: "Local Agency",
      previousSalary: "5.0 LPA",
      newRole: "Frontend Engineer",
      newCompany: "Flipkart",
      newSalary: "20 LPA",
      hike: "300%",
      timeline: "4 months",
      image: "/newimages/piece_6.png",
      quote: "I knew React, but Accenlearn taught me web performance and large-scale architecture. That's exactly what Flipkart tested me on."
    },
    {
      name: "Vikram Reddy",
      previousRole: "QA Automation",
      previousCompany: "Accenture",
      previousSalary: "6.5 LPA",
      newRole: "SDET",
      newCompany: "Atlassian",
      newSalary: "35 LPA",
      hike: "438%",
      timeline: "8 months",
      image: "/newimages/piece_7.png",
      quote: "Atlassian's interview loop is notoriously tough. The intensive system design curriculum at Accenlearn helped me clear all 5 rounds effortlessly."
    },
    {
      name: "Neha Gupta",
      previousRole: "IT Consultant",
      previousCompany: "Capgemini",
      previousSalary: "4.8 LPA",
      newRole: "Product Engineer",
      newCompany: "Zomato",
      newSalary: "22 LPA",
      hike: "358%",
      timeline: "5 months",
      image: "/newimages/piece_8.png",
      quote: "I was terrified of competitive programming. Accenlearn broke it down into patterns rather than rote learning. Zomato's coding round felt like a breeze."
    },
    {
      name: "Arjun Nair",
      previousRole: "Java Developer",
      previousCompany: "TCS",
      previousSalary: "5.5 LPA",
      newRole: "SDE-1",
      newCompany: "Google India",
      newSalary: "32 LPA",
      hike: "481%",
      timeline: "9 months",
      image: "/newimages/piece_9.png",
      quote: "The Google interview is a marathon. My Accenlearn mentor, a former Googler, guided my prep strategy perfectly. I wouldn't have made it without them."
    },
    {
      name: "Pooja Iyer",
      previousRole: "BPO Executive",
      previousCompany: "Genpact",
      previousSalary: "2.5 LPA",
      newRole: "Software Engineer",
      newCompany: "Cred",
      newSalary: "18 LPA",
      hike: "620%",
      timeline: "7 months",
      image: "/newimages/piece_10.png",
      quote: "Transitioning from a non-tech role seemed impossible. Accenlearn's foundation courses and dedicated TA support helped me land a job at Cred."
    },
    {
      name: "Suresh Kumar",
      previousRole: "Network Admin",
      previousCompany: "HCL",
      previousSalary: "4.0 LPA",
      newRole: "Cloud Engineer",
      newCompany: "AWS",
      newSalary: "25 LPA",
      hike: "525%",
      timeline: "6 months",
      image: "/newimages/piece_11.png",
      quote: "I wanted to move from networking to cloud engineering. Accenlearn's AWS and DevOps curriculum was precisely what I needed to clear the loop."
    },
    {
      name: "Anjali Verma",
      previousRole: "Project Trainee",
      previousCompany: "Infosys",
      previousSalary: "3.6 LPA",
      newRole: "SDE-1",
      newCompany: "Uber",
      newSalary: "28 LPA",
      hike: "677%",
      timeline: "6 months",
      image: "/newimages/piece_12.png",
      quote: "The sheer depth of Accenlearn's backend engineering module is unmatched. It gave me the competitive edge I needed for Uber."
    },
    {
      name: "Manish Tiwari",
      previousRole: "Database Admin",
      previousCompany: "IBM",
      previousSalary: "7.0 LPA",
      newRole: "Data Engineer",
      newCompany: "Netflix",
      newSalary: "45 LPA",
      hike: "542%",
      timeline: "10 months",
      image: "/newimages/piece_13.png",
      quote: "Netflix looks for extreme depth. The massive scale data pipelines we built in the Accenlearn capstone project became the highlight of my interview."
    },
    {
      name: "Swati Joshi",
      previousRole: "Junior Developer",
      previousCompany: "Startup",
      previousSalary: "5.0 LPA",
      newRole: "Frontend Engineer",
      newCompany: "Razorpay",
      newSalary: "21 LPA",
      hike: "320%",
      timeline: "4 months",
      image: "/newimages/piece_14.png",
      quote: "I knew the basics, but Accenlearn pushed me to master advanced JS concepts and React internals. Razorpay's machine coding round was exactly what we practiced."
    },
    {
      name: "Karan Malhotra",
      previousRole: "Application Developer",
      previousCompany: "Oracle",
      previousSalary: "8.0 LPA",
      newRole: "SDE-2",
      newCompany: "PhonePe",
      newSalary: "38 LPA",
      hike: "375%",
      timeline: "7 months",
      image: "/newimages/piece_15.png",
      quote: "I was stagnating at a service-based firm. Accenlearn's high-level system design classes gave me the exact tools to break into PhonePe."
    },
    {
      name: "Riya Das",
      previousRole: "Content Writer",
      previousCompany: "Media Firm",
      previousSalary: "3.0 LPA",
      newRole: "UX Engineer",
      newCompany: "Myntra",
      newSalary: "16 LPA",
      hike: "433%",
      timeline: "8 months",
      image: "/newimages/piece_16.png",
      quote: "Switching from content to coding was hard, but Accenlearn's structured frontend roadmap and portfolio reviews got me into Myntra."
    },
    {
      name: "Vivek Menon",
      previousRole: "Mainframe Dev",
      previousCompany: "Cognizant",
      previousSalary: "6.0 LPA",
      newRole: "Backend Engineer",
      newCompany: "ShareChat",
      newSalary: "24 LPA",
      hike: "300%",
      timeline: "5 months",
      image: "/newimages/piece_17.png",
      quote: "I felt trapped in legacy tech. Accenlearn updated my stack to Go and microservices, which is exactly what top startups are looking for."
    },
    {
      name: "Shruti Rao",
      previousRole: "Test Analyst",
      previousCompany: "Mindtree",
      previousSalary: "4.5 LPA",
      newRole: "SDE-1",
      newCompany: "LinkedIn",
      newSalary: "27 LPA",
      hike: "500%",
      timeline: "6 months",
      image: "/newimages/piece_18.png",
      quote: "The emphasis Accenlearn places on writing clean, production-ready code is what impressed my interviewers at LinkedIn the most."
    },
    {
      name: "Aditya Bhat",
      previousRole: "Technical Support",
      previousCompany: "Dell",
      previousSalary: "3.8 LPA",
      newRole: "Security Engineer",
      newCompany: "CrowdStrike",
      newSalary: "29 LPA",
      hike: "663%",
      timeline: "7 months",
      image: "/newimages/piece_19.png",
      quote: "Accenlearn's niche tracks are incredible. I took the cybersecurity elective and landed a role at CrowdStrike with multiple competing offers."
    },
    {
      name: "Meera Chatterjee",
      previousRole: "Data Analyst",
      previousCompany: "MuSigma",
      previousSalary: "6.5 LPA",
      newRole: "Machine Learning Eng",
      newCompany: "Ola",
      newSalary: "25 LPA",
      hike: "284%",
      timeline: "5 months",
      image: "/newimages/piece_20.png",
      quote: "Moving from basic analytics to core ML required heavy math and deployment skills. Accenlearn filled that gap perfectly."
    },
    {
      name: "Yash Agarwal",
      previousRole: "Systems Engineer",
      previousCompany: "TCS",
      previousSalary: "4.2 LPA",
      newRole: "SDE-1",
      newCompany: "Dream11",
      newSalary: "23 LPA",
      hike: "447%",
      timeline: "6 months",
      image: "/newimages/piece_21.png",
      quote: "I thought my tier-3 college background would hold me back. Accenlearn proved that skills trump degrees every single time."
    },
    {
      name: "Divya Jain",
      previousRole: "Freelancer",
      previousCompany: "Self-Employed",
      previousSalary: "4.0 LPA",
      newRole: "Full Stack Dev",
      newCompany: "ClearTax",
      newSalary: "19 LPA",
      hike: "375%",
      timeline: "4 months",
      image: "/newimages/piece_22.png",
      quote: "I lacked the discipline to upskill alone. The cohort-based learning and strict deadlines at Accenlearn completely transformed my career trajectory."
    }
  ];

  const renderCard = (study, idx) => (
    <div
      key={idx}
      className="group relative flex flex-col mc-card-wrapper"
    >
      {/* Extreme Neon Glow on Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00FFA3]/60 to-blue-500/60 rounded-[24px] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />

      <div className="relative h-full bg-[#0a0a0a] border border-white/10 group-hover:border-[#00FFA3]/50 shadow-2xl rounded-[24px] p-5 md:p-6 transition-all duration-500 flex flex-col transform group-hover:-translate-y-1 z-10 overflow-hidden">
        
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
        />

        {/* Profile row */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-white/10 to-white/5 group-hover:from-[#00FFA3] group-hover:to-blue-500 transition-all duration-500">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#111]">
                <img src={study.image} alt={study.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-black text-white text-xl mb-0.5 tracking-tight group-hover:text-[#00FFA3] transition-colors">{study.name}</h3>
            <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-black tracking-widest text-[#00FFA3] bg-[#00FFA3]/10 border border-[#00FFA3]/30 px-2 py-1 rounded-full shadow-[inset_0_0_10px_rgba(0,255,163,0.05)]">
              <ArrowUpRight size={12} /> {study.hike} HIKE
            </span>
          </div>
        </div>

        {/* Before / After table */}
        <div className="border border-white/10 rounded-xl overflow-hidden mb-6 relative z-10">
          <div className="grid grid-cols-[1fr,2fr,1fr] bg-[#111] border-b border-white/10">
            <div className="p-2.5 text-[9px] font-black text-gray-500 uppercase tracking-widest">Phase</div>
            <div className="p-2.5 text-[9px] font-black text-gray-500 uppercase tracking-widest border-l border-white/10">Role</div>
            <div className="p-2.5 text-[9px] font-black text-gray-500 uppercase tracking-widest border-l border-white/10 text-right">Pkg</div>
          </div>
          <div className="grid grid-cols-[1fr,2fr,1fr] border-b border-white/10 bg-[#0a0a0a]">
            <div className="p-2.5 text-xs text-gray-500 font-black uppercase tracking-wider flex items-center">Before</div>
            <div className="p-2.5 border-l border-white/10">
              <div className="text-[11px] text-gray-300 font-bold">{study.previousRole}</div>
              <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-0.5">@ {study.previousCompany}</div>
            </div>
            <div className="p-2.5 border-l border-white/10 text-right text-[12px] text-gray-400 font-bold flex items-center justify-end">{study.previousSalary}</div>
          </div>
          <div className="grid grid-cols-[1fr,2fr,1fr] bg-gradient-to-r from-[#00FFA3]/5 to-[#00FFA3]/15 group-hover:from-[#00FFA3]/10 group-hover:to-[#00FFA3]/20 transition-all duration-500">
            <div className="p-2.5 text-xs text-[#00FFA3] font-black uppercase tracking-wider drop-shadow-[0_0_8px_rgba(0,255,163,0.5)] flex items-center">After</div>
            <div className="p-2.5 border-l border-white/10">
              <div className="text-[12px] text-white font-black">{study.newRole}</div>
              <div className="text-[9px] text-[#00FFA3] font-black uppercase tracking-widest mt-0.5">@ {study.newCompany}</div>
            </div>
            <div className="p-2.5 border-l border-white/10 text-right text-[14px] text-[#00FFA3] font-black drop-shadow-[0_0_8px_rgba(0,255,163,0.5)] flex items-center justify-end">{study.newSalary}</div>
          </div>
        </div>

        <div className="mt-auto relative z-10">
          <div className="bg-white/5 border border-white/10 border-l-2 border-l-[#00FFA3] rounded-lg p-4 relative transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:border-l-[#00FFA3] group-hover:shadow-[0_0_15px_rgba(0,255,163,0.1)]">
            <p className="text-gray-300 text-[11px] font-medium leading-relaxed">
              <span className="text-[#00FFA3] font-serif text-lg mr-1 italic">&quot;</span>
              {study.quote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-28 bg-white border-t border-gray-100 overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: scroll-left 60s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: scroll-right 60s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
        .mc-card-wrapper {
          width: 340px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .mc-card-wrapper {
            width: 280px;
          }
        }
      `}} />
      <div className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-xl">
            <span className="inline-block text-[10px] font-black tracking-[2.5px] uppercase text-[#00FFA3] border border-[#00FFA3]/30 bg-[#00FFA3]/10 px-4 py-1.5 rounded-full mb-5 shadow-[0_0_15px_rgba(0,255,163,0.15)]">
              Student Outcomes
            </span>
            <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl tracking-tight">
              Don't trust the promise. <br/>Trust the data.
            </h2>
          </div>
          <p className="text-gray-400 font-light text-base max-w-xs border-l border-gray-200 pl-6">
            Real learners, verified offer letters. This is what happens when serious people commit to the system.
          </p>
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-8 pb-12 pt-4">
        {/* Row 1: Left scrolling */}
        <div className="animate-marquee-left gap-6 px-3">
          {[...caseStudies.slice(0, 11), ...caseStudies.slice(0, 11)].map((study, idx) => renderCard(study, `r1-${idx}`))}
        </div>

        {/* Row 2: Right scrolling */}
        <div className="animate-marquee-right gap-6 px-3">
          {[...caseStudies.slice(11, 22), ...caseStudies.slice(11, 22)].map((study, idx) => renderCard(study, `r2-${idx}`))}
        </div>
      </div>
    </section>
  );
};

export default LandingCaseStudies;
