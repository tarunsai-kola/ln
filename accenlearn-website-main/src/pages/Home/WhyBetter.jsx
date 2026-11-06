import React from "react";
import TitleText from "../../components/TitleText";
import { WHY_BETTER_DATA } from "../../shared/data";

const WhyBetter = () => {
  return (
    <div className="w-full flex flex-col gap-6 lg:gap-10 ">
      <TitleText
        title="Why Accenlearn is 10X Better?"
        description="We blend industry-grade curriculum, expert mentorship, and placement support so every learner moves faster from classroom to career."
        
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4 mt-8">
        {[
          {
            title: "Industry-Relevant Curriculum",
            content: "Our programs are designed by top industry leaders and experts, ensuring learners gain practical, in-demand skills aligned with current market needs.",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
          },
          {
            title: "Career-Oriented Learning Approach",
            content: "We focus on job-ready skills, hands-on projects, and real-world applications that help learners confidently transition from learning to employment.",
            img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          },
          {
            title: "Proven Placement Success",
            content: "With 300+ alumni successfully placed, AccenLearn has a strong track record of transforming skills into careers through dedicated placement support.",
            img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
          },
          {
            title: "Personalized & Flexible Learning",
            content: "Learn at your own pace with interactive digital content, assessments, and continuous progress tracking — anytime, anywhere.",
            img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
          },
          {
            title: "Expert Mentorship & Support",
            content: "Get guidance from experienced mentors, doubt-clearing sessions, and continuous academic support throughout your learning journey.",
            img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
          },
          {
            title: "Future-Ready Skills",
            content: "Our programs equip learners with technical expertise, problem-solving abilities, and digital skills essential for today’s evolving professional world.",
            img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          }
        ].map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#041A4C] via-[#041A4C]/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>

            {/* Content Box */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <div className="w-12 h-1 bg-[#0d6efd] mb-6 transition-all duration-500 group-hover:w-24"></div>
              
              <h3 className="text-2xl font-bold mb-2 tracking-tight leading-tight group-hover:-translate-y-2 transition-transform duration-500">
                {item.title}
              </h3>
              
              <p className="text-[#84a3eb] text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 group-hover:-translate-y-2 transition-all duration-700 overflow-hidden mt-2">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyBetter;
