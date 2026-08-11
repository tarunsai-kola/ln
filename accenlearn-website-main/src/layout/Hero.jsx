import React from "react";
import { FaPlay, FaRegClock, FaRegCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import studentImg from "../assets/classic_student.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white min-h-screen pt-28 lg:pt-36 pb-20 text-slate-900 w-full relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Left Column (Content) */}
          <div className="flex flex-col space-y-8 pr-0 lg:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-[52px] leading-[1.1] font-medium text-slate-900 tracking-tight">
              Join the <span className="font-bold text-blue-600">Top 1%</span> of Tech Talent <br className="hidden md:block" />
              with Industry Experts
            </h1>
            
            {/* Detail Row (Icons + Text) */}
            <div className="flex flex-wrap items-center gap-6 text-[15px] font-medium text-slate-600">
              <div className="flex items-center gap-2">
                 <FaRegCalendarAlt className="text-lg" /> Live + Recorded
              </div>
              <div className="flex items-center gap-2">
                 <FiBriefcase className="text-lg" /> Hands-on Projects
              </div>
              <div className="flex items-center gap-2">
                 <FaMapMarkerAlt className="text-lg" /> 100% Placement Assistance
              </div>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-3">
               <span className="px-5 py-2 rounded-full bg-[#e8f0fc] text-[#2a5b9b] text-sm font-bold">Tech / IT</span>
               <span className="px-5 py-2 rounded-full bg-[#fce8e8] text-[#9b2a2a] text-sm font-bold">Management</span>
               <span className="px-5 py-2 rounded-full bg-[#e8fce8] text-[#2a9b40] text-sm font-bold">Healthcare</span>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
               <button 
                  onClick={() => navigate('/programs/tech-it')}
                  className="bg-[#faf9f6] border border-slate-300 text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors flex items-center gap-3 shadow-sm w-fit"
                >
                  EXPLORE PROGRAMS <FaArrowRight />
               </button>
            </div>

            {/* Trust Logos Section */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-slate-200 mt-6">
               {/* Built by alumni from */}
               <div>
                 <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">Mentors from:</p>
                 <div className="flex items-center gap-4 opacity-80 grayscale">
                    <span className="font-black text-xl tracking-tighter">Google</span>
                    <span className="font-bold text-lg">Amazon</span>
                 </div>
               </div>
               {/* Supported by */}
               <div className="overflow-hidden w-[180px]">
                 <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">Placed students at:</p>
                 <div className="animate-marquee gap-6 opacity-80 grayscale">
                    {/* First set */}
                    <span className="font-black text-xl italic text-blue-500">TCS</span>
                    <span className="font-bold text-lg tracking-widest text-slate-800">Wipro</span>
                    <span className="font-serif text-xl font-bold text-blue-800">Infosys</span>
                    <span className="font-black text-xl text-blue-600 tracking-tighter">HCL</span>
                    <span className="font-bold text-lg text-purple-700">Accenture</span>
                    {/* Duplicate set for seamless looping */}
                    <span className="font-black text-xl italic text-blue-500">TCS</span>
                    <span className="font-bold text-lg tracking-widest text-slate-800">Wipro</span>
                    <span className="font-serif text-xl font-bold text-blue-800">Infosys</span>
                    <span className="font-black text-xl text-blue-600 tracking-tighter">HCL</span>
                    <span className="font-bold text-lg text-purple-700">Accenture</span>
                 </div>
               </div>
               {/* Backed by */}
               <div>
                 <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">Industry Partners:</p>
                 <div className="flex items-center gap-4 opacity-80 grayscale">
                    <span className="font-black text-xl text-green-700">250+</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column (Video Thumbnail) */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[24px] sm:rounded-[32px] overflow-hidden group shadow-2xl">
             <img src={studentImg} alt="Student Video Thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             
             {/* Dark Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
             
             {/* Quote Text */}
             <div className="absolute top-1/2 left-6 sm:left-10 -translate-y-1/2 w-[80%] sm:w-[70%]">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-[1.2]">
                   Bridging the gap between <br/> 
                   <span className="font-bold underline decoration-blue-500 decoration-4 underline-offset-4">college learning</span> <br/> 
                   and real job skills.
                </h2>
             </div>

             {/* Name Tag */}
             <div className="absolute bottom-6 right-6 bg-slate-900/70 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl">
                <p className="text-white font-bold text-sm sm:text-base">1:1 Mentorship</p>
                <p className="text-slate-300 text-xs sm:text-sm">Personalized Guidance</p>
             </div>

             {/* Duration Badge */}
             <div className="absolute bottom-6 left-6 bg-[#2563eb] text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm font-bold shadow-lg">
                <FaRegClock /> Job-Ready
             </div>
          </div>
        </div>

        {/* Bottom Section: 5 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mt-12 w-full">
           
           {/* Card 1 */}
           <div className="flex flex-col bg-[#faf9f6] rounded-[24px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 md:h-40 w-full relative">
                 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" alt="Learners" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 md:p-5 flex items-center md:items-start gap-2 md:gap-4">
                 <h3 className="text-2xl md:text-3xl font-black text-[#2563eb] leading-none tracking-tight">8k<span className="text-lg md:text-xl">+</span></h3>
                 <p className="text-slate-900 font-bold leading-tight text-xs md:text-[15px]">Active<br/>Learners</p>
              </div>
           </div>
           
           {/* Card 2 */}
           <div className="flex flex-col bg-[#faf9f6] rounded-[24px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 md:h-40 w-full relative">
                 <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop" alt="Domains" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 md:p-5 flex items-center md:items-start gap-2 md:gap-4">
                 <h3 className="text-3xl md:text-4xl font-black text-[#2563eb] leading-none">3</h3>
                 <p className="text-slate-900 font-bold leading-tight text-xs md:text-[15px]">Main<br/>Domains</p>
              </div>
           </div>

           {/* Card 3 */}
           <div className="flex flex-col bg-[#faf9f6] rounded-[24px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 md:h-40 w-full relative">
                 <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop" alt="Hiring Partners" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 md:p-5 flex items-center md:items-start gap-2 md:gap-4">
                 <h3 className="text-3xl md:text-4xl font-black text-[#2563eb] leading-none tracking-tight">250<span className="text-lg md:text-2xl">+</span></h3>
                 <p className="text-slate-900 font-bold leading-tight text-xs md:text-[15px]">Hiring<br/>Partners</p>
              </div>
           </div>

           {/* Card 4 */}
           <div className="flex flex-col bg-[#faf9f6] rounded-[24px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 md:h-40 w-full relative">
                 <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop" alt="Mentors" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 md:p-5 flex items-center md:items-start gap-2 md:gap-4">
                 <h3 className="text-3xl md:text-4xl font-black text-[#2563eb] leading-none tracking-tight">170<span className="text-lg md:text-2xl">+</span></h3>
                 <p className="text-slate-900 font-bold leading-tight text-xs md:text-[15px]">Global<br/>Mentors</p>
              </div>
           </div>

           {/* Card 5 */}
           <div className="flex flex-col bg-[#faf9f6] rounded-[24px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 md:h-40 w-full relative">
                 <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop" alt="Placements" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 md:p-5 flex items-center md:items-start gap-2 md:gap-3">
                 <h3 className="text-3xl md:text-4xl font-black text-[#2563eb] leading-none tracking-tight">300<span className="text-lg md:text-2xl">+</span></h3>
                 <p className="text-slate-900 font-bold leading-tight text-xs md:text-[14px]">Alumni<br/>Placed</p>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
