import React from "react";
import {
  ABOUT_DATA,
  HIRING_DATA,
  HIRING_DATA2,
} from "../../shared/data";
import collabImg from "../../assets/about_collab.png";
import mentorImg from "../../assets/about_mentor.png";
import strengthCoursesImg from "../../assets/strength_courses.png";
import strengthExpertsImg from "../../assets/strength_experts.png";
import strengthProjectsImg from "../../assets/strength_projects.png";
import strengthPlacementImg from "../../assets/strength_placement.png";
import aboutBgImg from "../../assets/about_bg.png";
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <section 
      className="w-full py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed contrast-125"
      style={{ backgroundImage: `url(${aboutBgImg})` }}
    >
      
      {/* Decorative Blur Elements (keeping these for extra flavor) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Storytelling Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-8 items-center mb-24">
          
          {/* Left: The Story */}
          <div className="flex flex-col space-y-8 pr-0 lg:pr-12">
            <div>
              <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-3">About Us</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">
                Transforming education <br/> into <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">successful careers.</span>
              </h2>
            </div>
            
            <div className="text-slate-600 text-lg leading-relaxed space-y-6">
              <p>
                Accenlearn is a dynamic ed-tech platform dedicated to bridging the gap between classroom learning and real-world industry needs. We do this by offering practical skills, internships, and personalized career guidance.
              </p>
              <p>
                Education isn't just about gaining knowledge—it’s about building skills, gaining experience, and turning aspirations into reality. We are redefining the future of learning through technology, innovation, and accessibility.
              </p>
              <p className="font-medium text-slate-800">
                Our career-focused programs combine expert-led training with real-world projects to prepare learners for successful careers.
              </p>
            </div>
            

          </div>

          {/* Right: The Visuals (Overlapping Composition) */}
          <div className="relative w-full h-[400px] sm:h-[500px]">
            {/* Main Image */}
            <div className="absolute right-0 top-0 w-full h-[85%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
              <img src={collabImg} alt="Students Collaborating" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            
            {/* Secondary Image */}
            <div className="absolute -left-12 bottom-0 w-[65%] h-[60%] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white z-20">
              <img src={mentorImg} alt="Tech Mentor" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            
            {/* Decorative Dot Grid */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-30 z-0" style={{ backgroundImage: 'radial-gradient(#2563eb 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
          </div>
        </div>

        {/* Bottom Section: Features (Bento Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT BOX: Our Strengths */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-2xl font-bold mb-8 text-slate-900">
              Our Strengths
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="relative h-48 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all cursor-pointer">
                <img src={strengthCoursesImg} alt="Courses" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
                  <h4 className="font-bold text-white text-lg leading-tight">Explore Industry-Leading Courses</h4>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="relative h-48 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all cursor-pointer">
                <img src={strengthExpertsImg} alt="Experts" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
                  <h4 className="font-bold text-white text-lg leading-tight">Learn from Industry Experts</h4>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative h-48 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all cursor-pointer">
                <img src={strengthProjectsImg} alt="Projects" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
                  <h4 className="font-bold text-white text-lg leading-tight">Gain Hands-On Experience</h4>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative h-48 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all cursor-pointer">
                <img src={strengthPlacementImg} alt="Placements" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
                  <h4 className="font-bold text-white text-lg leading-tight">Personalized Placement Support</h4>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BOX: Why Choose Us */}
          <div className="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-2xl font-bold mb-8 text-slate-900">
              Why Choose Us
            </h3>

            <div className="flex flex-col gap-5">
              {HIRING_DATA2.map((res, index) => {
                const Icon = res?.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all group"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                      <Icon size={20} className="text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-slate-700 font-medium leading-snug">
                      {res?.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
