import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, BadgeCheck } from 'lucide-react';

const LandingMentors = () => {
  const mentors = [
    {
      name: "Rahul Sharma",
      role: "Senior SDE-III",
      company: "Microsoft",
      image: "/newimages/piece_23.png",
      expertise: ["Distributed Systems", "Azure Cloud"],
      quote: "My goal is to teach you how to think like a staff engineer, not just a junior developer."
    },
    {
      name: "Priya Desai",
      role: "Engineering Manager",
      company: "Amazon",
      image: "/newimages/piece_24.png",
      expertise: ["Backend Architecture", "AWS Scalability"],
      quote: "I'll show you exactly what FAANG interviewers look for when they ask system design questions."
    },
    {
      name: "Amit Patel",
      role: "Staff Engineer",
      company: "Google",
      image: "/newimages/piece_25.png",
      expertise: ["Algorithms", "GenAI Integration"],
      quote: "We don't solve LeetCode for sport. We build scalable systems that handle millions of users."
    },
    {
      name: "Aditya Verma",
      role: "Lead Engineer",
      company: "InnovateTech",
      image: "/newimages/piece_26.png",
      expertise: ["Full Stack", "Cloud Deployments"],
      quote: "I'll guide you to build production-ready applications and scale your career to the next level."
    }
  ];

  return (
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="inline-block text-[10px] font-bold tracking-[2.5px] uppercase text-[#2563EB] border border-[#0F7B53]/20 bg-[#2563EB]/5 px-4 py-1.5 rounded-full mb-5">
              Your Mentors
            </span>
            <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl tracking-tight">
              Learn from engineers who built it.
            </h2>
          </div>
          <p className="text-[#64748B] font-light text-base max-w-xs border-l border-gray-200 pl-6">
            No teaching assistants. No academic professors. Pure industry experience from the top 1% of tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.map((mentor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              className="group relative flex flex-col"
            >
              {/* Soft Blue Glow on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#DBEAFE]/80 to-blue-200/80 rounded-[32px] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
              
              <div className="relative h-full bg-white border border-[#E2E8F0] group-hover:border-[#2563EB]/50 shadow-md group-hover:shadow-xl rounded-[32px] p-8 transition-all duration-500 flex flex-col transform group-hover:-translate-y-2 z-10 overflow-hidden">
                
                {/* Cyber Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                />

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="relative">
                    {/* Gen Z Grayscale to Color Avatar */}
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-[#E2E8F0] to-[#E2E8F0] group-hover:from-[#2563EB] group-hover:to-[#1D4ED8] transition-all duration-500">
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#111]">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-[#2563EB] rounded-full p-1.5 shadow-sm transform scale-90 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <BadgeCheck size={18} className="text-white" />
                    </div>
                  </div>
                  
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#2563EB] hover:border-[#2563EB] hover:shadow-md transition-all duration-300 backdrop-blur-md"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>

                <div className="mb-6 relative z-10">
                  <h3 className="text-3xl font-black text-[#0F172A] mb-1 tracking-tight group-hover:text-[#2563EB] transition-colors">{mentor.name}</h3>
                  <p className="text-[16px] font-bold text-[#475569]">{mentor.role}</p>
                  <p className="text-[11px] font-black text-[#0F172A]/40 uppercase tracking-[0.2em] mt-2">{mentor.company}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {mentor.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#EFF6FF] border border-[#2563EB]/20 text-[#2563EB] text-[10px] font-black uppercase tracking-widest rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto relative z-10">
                  <div className="bg-white border border-[#E2E8F0] border-l-2 border-l-[#2563EB] rounded-xl p-5 relative transition-all duration-500 group-hover:bg-[#F8FAFC] group-hover:border-[#E2E8F0] group-hover:border-l-[#2563EB] group-hover:shadow-sm">
                    <p className="text-[#475569] text-[14px] font-medium leading-relaxed">
                      <span className="text-[#2563EB] font-serif text-xl mr-1 italic">"</span>
                      {mentor.quote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingMentors;
