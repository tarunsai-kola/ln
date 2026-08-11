import React, { useState } from "react";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialsInstructors = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      name: "Sundar Pichai", // Example placeholder
      title: "CEO",
      company: "Alphabet Inc.",
      quote: "The next generation of engineers needs to understand not just how to code, but how to architect scalable systems. Programs that bridge this gap are invaluable.",
      note: "Why this matters: Top tech companies are no longer just hiring coders; they are looking for problem solvers who understand system architecture."
    },
    {
      name: "Satya Nadella", // Example placeholder
      title: "CEO",
      company: "Microsoft",
      quote: "Continuous learning and upskilling in AI and cloud native technologies is the only way to stay relevant in today's rapidly changing tech landscape.",
      note: "Why this matters: Mastering modern tech stacks is a necessity for career longevity and exponential salary growth."
    }
  ];

  const instructors = [
    {
      name: "Dr. Ranjithkumar",
      title: "AI & Machine Learning Expert",
      company: "Nuvama Wealth",
      bio: "10+ years of experience in leading AI initiatives in fintech. Specializes in predictive modeling and intelligent automation.",
      rating: "4.9",
      img: "/mentor_headshot_1.png" // Placeholder
    },
    {
      name: "Mrs. Monisha",
      title: "Domain Specialist",
      company: "Omega Healthcare",
      bio: "Deep knowledge of industry standards, compliance, and building robust healthcare data systems.",
      rating: "4.8",
      img: "/mentor_headshot_2.png" // Placeholder
    }
  ];

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);

  return (
    <section className="bg-white py-24 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Industry Leader Quotes Carousel */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Industry Leaders Say</h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 relative shadow-sm">
            <FaQuoteLeft className="absolute top-8 left-8 w-12 h-12 text-slate-100" />
            
            <div className="relative z-10 min-h-[200px] flex flex-col justify-center">
              <p className="text-xl md:text-2xl text-slate-700 italic leading-relaxed text-center mb-8">
                "{quotes[currentQuote].quote}"
              </p>
              
              <div className="flex flex-col items-center">
                <p className="text-slate-900 font-bold text-lg">{quotes[currentQuote].name}</p>
                <p className="text-slate-500 text-sm mb-6">{quotes[currentQuote].title}, <span className="text-blue-600">{quotes[currentQuote].company}</span></p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center max-w-lg">
                  <p className="text-blue-700 text-sm">{quotes[currentQuote].note}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <button onClick={prevQuote} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextQuote} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Instructors Grid */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Learn From The Top 1%</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Mentors who have built scalable systems at the world's best tech companies.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {instructors.map((inst, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:border-slate-300 shadow-sm transition-colors">
                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  {/* Fallback image if placeholder fails */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-3xl font-bold text-blue-600">
                    {inst.name.charAt(0)}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{inst.name}</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-1">{inst.title}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">@ {inst.company}</p>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                    {inst.bio}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <FaStar key={i} className="w-3 h-3" />)}
                    </div>
                    <span className="text-slate-500 text-xs font-bold">{inst.rating}/5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsInstructors;
