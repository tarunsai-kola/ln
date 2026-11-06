import React from "react";
import { Star, ArrowRight, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const mentors = [
  {
    id: 1,
    name: "Dr. Rhea Mukherjee",
    role: "Principal AI Engineer",
    company: "NovaMind Labs",
    bio: "Dr. Rhea Mukherjee is a Principal AI Engineer at NovaMind Labs with 9+ years of experience building LLM applications, retrieval systems, and production-grade AI workflows. She has mentored developers and product teams across GenAI, RAG pipelines, and agent-based automation.",
    rating: "4.9",
    reviews: "Excellent reviews",
    image: "/newimages/piece_87.png",
  },
  {
    id: 2,
    name: "Karthik Subramanian",
    role: "Senior Data Scientist",
    company: "Accenlearn",
    bio: "Karthik leads AI initiatives specializing in predictive modeling, scalable data architectures, and deploying large-scale deep learning models into production. He brings a wealth of hands-on experience from top tech firms.",
    rating: "5.0",
    reviews: "Top rated mentor",
    image: "/newimages/piece_88.png",
  },
  {
    id: 3,
    name: "Aditya Verma",
    role: "Lead Full Stack Engineer",
    company: "InnovateTech",
    bio: "Aditya is a Lead Full Stack Engineer with 8+ years of experience in React, Next.js, and scalable cloud deployments. With a strong passion for teaching, he has guided hundreds of students to build production-ready applications and achieve their career goals.",
    rating: "4.9",
    reviews: "Highly recommended",
    image: "/newimages/piece_89.png",
  }
];

const MeetYourMentors = ({ mentorsData }) => {
  const displayMentors = mentorsData || mentors;

  return (
    <section className="py-24 px-6 bg-bg border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Instructors
            </span>
            <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight mb-3">
              Meet Your Mentors
            </h2>
            <p className="text-textMuted text-lg max-w-2xl">
              Learn directly from industry professionals who build and ship real AI systems.
            </p>
          </div>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-8">
          {displayMentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-[32px] p-8 pt-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_-15px_rgba(19,138,82,0.3)] border border-gray-100 flex flex-col group cursor-pointer relative"
            >
              {/* Break-out 3D Avatar */}
              <div className="absolute -top-12 left-8 w-[88px] h-[88px] rounded-2xl overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.15)] border-4 border-white bg-gray-100 rotate-[-4deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 z-10">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Header Info */}
              <div className="flex flex-col gap-1.5 mt-2 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[22px] font-black text-gray-900 leading-tight font-outfit">
                    {mentor.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Linkedin size={14} fill="currentColor" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[14px] font-bold text-gray-500">
                    {mentor.role}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                    {mentor.company}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8 flex-grow">
                <p className="text-[15px] text-gray-600 leading-relaxed line-clamp-3">
                  {mentor.bio}
                </p>
              </div>

              {/* Footer: Split Action & Rating */}
              <div className="pt-5 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div className="inline-flex items-center gap-1.5 text-[14px] font-black text-primary group-hover:text-primaryHover transition-colors">
                  Read full bio <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </div>

                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100/50">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-[14px] font-black text-gray-900 ml-1.5">{mentor.rating}</span>
                  <span className="text-[12px] text-gray-500 font-bold ml-1.5">
                    ({mentor.reviews})
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetYourMentors;
