import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Star, Quote, Code } from "lucide-react";
import { motion } from "framer-motion";

const allReviews = [
  { name: "Rahul Sharma", prev: "B.Com", role: "Backend Developer", quote: "I was working in sales for 3 years. This course taught me Java from scratch and now I'm building microservices! Highly recommended." },
  { name: "Priya Patel", prev: "BA Arts", role: "Frontend Engineer", quote: "Never wrote a line of code before. The 1:1 mentorship helped me transition into a React developer role smoothly." },
  { name: "Ankit Verma", prev: "Mechanical Eng", role: "Full Stack SDE", quote: "The capstone projects gave me the exact experience recruiters were looking for. Best decision for non-CS grads." },
  { name: "Sneha Reddy", prev: "BBA", role: "Software Engineer", quote: "Switching careers seemed impossible, but the structured curriculum made learning DSA and System Design manageable." },
  { name: "Vikram Singh", prev: "Civil Eng", role: "Cloud Engineer", quote: "I was stuck in a low-paying site job. Now I manage AWS deployments and write Python daily. Absolutely life-changing!" },
  { name: "Pooja Gupta", prev: "BSc Physics", role: "AI Developer", quote: "I was intimidated by AI, but the practical approach to RAG and LangChain made me confident enough to secure an AI role." },
  { name: "Rohan Desai", prev: "Marketing", role: "SDE I", quote: "From managing ad campaigns to writing APIs in Spring Boot. The rigorous interview prep was the absolute game-changer." },
  { name: "Aditi Joshi", prev: "B.Com", role: "Software Developer", quote: "The hands-on labs forced me to code every day. I didn't feel like a beginner after the first 8 weeks of the program." },
  { name: "Manish Tiwari", prev: "MBA", role: "Product Engineer", quote: "I realized I wanted to build products, not just manage them. The transition was tough but Accenlearn made it entirely worth it." },
  { name: "Neha Chauhan", prev: "Teacher", role: "Backend Dev", quote: "I used to teach math, now I code scalable databases. The support team answered my doubts patiently at every step." },
  { name: "Arjun Nair", prev: "BPO Support", role: "SDE", quote: "Moving from BPO to core tech was a dream. The 24-week timeline is intense but the curriculum is perfectly designed." },
  { name: "Kavya Menon", prev: "BA English", role: "Frontend Dev", quote: "I thought you needed a CS degree to code. This program proved that wrong. I now build beautiful interactive UIs in Next.js!" },
  { name: "Sanjay Kumar", prev: "Operations", role: "DevOps Engineer", quote: "From running excel sheets to deploying Docker containers. The practical assignments are gold for anyone starting fresh." },
  { name: "Riya Das", prev: "HR Executive", role: "Full Stack Dev", quote: "I hired developers and realized I wanted to be one. Accenlearn gave me the exact roadmap I needed to make the switch." },
  { name: "Karan Mehta", prev: "B.Sc Chem", role: "SDE I", quote: "The logic-building sessions were incredible. They took me from absolute zero to solving complex algorithms confidently." },
  { name: "Divya Singh", prev: "Non-IT", role: "AI App Developer", quote: "I was amazed at how quickly we went from basics to building LLM wrappers. The best career decision I've ever made." },
  { name: "Amit Bhatia", prev: "Freelance Writer", role: "SDE", quote: "Writing code isn't too different from writing logic. The transition was smooth thanks to the brilliant mentors." },
  { name: "Sunita Rao", prev: "Bank Teller", role: "Backend Eng", quote: "Banking to coding was a massive leap. The live classes and real-world projects made the knowledge gap disappear entirely." },
  { name: "Yash Agarwal", prev: "Data Entry", role: "Full Stack SDE", quote: "I wanted a better future. I struggled initially, but the recorded sessions and TA support got me through the tough parts." },
  { name: "Meera Pillai", prev: "Retail Manager", role: "Frontend Eng", quote: "The UI/UX and React modules were fantastic. I built a portfolio that got me hired in just 5 months without a tech degree." },
];

const ReviewCard = ({ review }) => (
  <div className="bg-[#12161f] border border-white/10 rounded-2xl p-6 mx-3 flex flex-col justify-between h-[280px] shadow-lg relative overflow-hidden group hover:border-primary/50 transition-colors">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Quote size={60} className="text-white" />
    </div>
    <div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="#f59e0b" className="text-amber-500" />
        ))}
      </div>
      <p className="text-gray-300 text-[15px] leading-relaxed italic line-clamp-4 relative z-10">
        "{review.quote}"
      </p>
    </div>
    
    <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between z-10">
      <div>
        <h4 className="text-white font-bold text-base">{review.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400 line-through decoration-red-500/50">{review.prev}</span>
          <span className="text-primary text-sm font-bold flex items-center gap-1">
             <Code size={12}/> {review.role}
          </span>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black border border-primary/30">
        {review.name.charAt(0)}
      </div>
    </div>
  </div>
);

const NonTechReviewsMarquee = () => {
  const row1 = allReviews.slice(0, 10);
  const row2 = allReviews.slice(10, 20);

  const baseSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: true,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const mobileSettings = {
    slidesToShow: 1,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "ease",
    centerMode: true,
    centerPadding: "20px",
  };

  const settingsRow1 = {
    ...baseSettings,
    speed: 30000, 
    slidesToShow: 3.5,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: mobileSettings },
    ]
  };

  const settingsRow2 = {
    ...baseSettings,
    speed: 25000,
    rtl: true,
    slidesToShow: 3.5,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { ...mobileSettings, rtl: false, autoplaySpeed: 3500 } },
    ]
  };

  return (
    <section className="py-24 bg-[#07090b] relative overflow-hidden border-t border-white/5 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-4"
        >
          Career Transformations
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-[44px] font-black font-outfit text-white tracking-tight leading-tight mb-4"
        >
          From Non-Tech to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Software Engineer</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Hear from our alumni who successfully transitioned into high-paying tech roles with zero prior coding experience.
        </motion.p>
      </div>

      <div className="relative z-10">
        <div className="mb-6">
          <Slider {...settingsRow1}>
            {row1.map((review, idx) => (
              <ReviewCard key={`row1-${idx}`} review={review} />
            ))}
          </Slider>
        </div>
        <div>
          <Slider {...settingsRow2}>
            {row2.map((review, idx) => (
              <ReviewCard key={`row2-${idx}`} review={review} />
            ))}
          </Slider>
        </div>
        
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#07090b] to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#07090b] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default React.memo(NonTechReviewsMarquee);
