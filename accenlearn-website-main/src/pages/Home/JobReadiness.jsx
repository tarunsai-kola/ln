import React from "react";
import {
  HiCpuChip,
  HiChatBubbleLeftRight,
  HiBriefcase,
  HiGlobeAlt,
  HiDocumentCheck,
  HiUserGroup,
  HiFire,
  HiTrophy,
} from "react-icons/hi2";

// Local Images ijg sengsnigningrgljrpogjrg
import sectionBg from "../../assets/readiness/section_bg.jpg";
import techFoundationsImg from "../../assets/readiness/tech_foundations.jpg";
import communicationImg from "../../assets/readiness/communication.jpg";
import projectsImg from "../../assets/readiness/projects.jpg";
import presenceImg from "../../assets/readiness/presence.jpg";
import resumeImg from "../../assets/readiness/resume.jpg";
import interviewImg from "../../assets/readiness/interview.jpg";
import disciplineImg from "../../assets/readiness/discipline.jpg";
import destinationImg from "../../assets/readiness/destination.jpg";

const STORY_STEPS = [
  {
    step: "01",
    tag: "Core Depth",
    title: "Solid Technical Foundations",
    icon: HiCpuChip,
    image: techFoundationsImg,
    accentGradient: "from-blue-600 to-indigo-600",
    dotColor: "bg-blue-400",
    quote: "DSA, problem-solving, CS fundamentals, and system design basics.",
    story: "For tech roles, strong core logic is non-negotiable. For non-tech, it’s deep domain knowledge. Build genuine depth before chasing trendy tools.",
    rule: "Depth > superficial buzzwords",
    next: "Communication",
  },
  {
    step: "02",
    tag: "Expression",
    title: "Strong Communication Skills",
    icon: HiChatBubbleLeftRight,
    image: communicationImg,
    accentGradient: "from-sky-500 to-blue-600",
    dotColor: "bg-sky-400",
    quote: "Speak clearly, explain your thoughts, and listen well.",
    story: "It’s not just about English — it’s about confidence and clarity. Great engineers explain complex ideas simply and articulate decisions calmly under pressure.",
    rule: "Confidence & structured clarity",
    next: "Practical Projects",
  },
  {
    step: "03",
    tag: "Proof of Work",
    title: "Good Projects & Experience",
    icon: HiBriefcase,
    image: projectsImg,
    accentGradient: "from-emerald-500 to-teal-600",
    dotColor: "bg-emerald-400",
    quote: "Real, impactful projects (not just classroom assignments).",
    story: "Internships, open-source work, or freelance projects prove you can solve messy real-world challenges. Companies look for deployed, working code.",
    rule: "Live deployments & real impact",
    next: "Online Presence",
  },
  {
    step: "04",
    tag: "Visibility",
    title: "Professional Online Presence",
    icon: HiGlobeAlt,
    image: presenceImg,
    accentGradient: "from-amber-500 to-orange-600",
    dotColor: "bg-amber-400",
    quote: "LinkedIn, GitHub, or a portfolio site showcasing your work.",
    story: "Recruiters and engineering leads actively check your digital footprint before calling. A clean GitHub and polished LinkedIn attract inbound opportunities.",
    rule: "Inbound recruiter magnet",
    next: "Tailored Resume",
  },
  {
    step: "05",
    tag: "Conversion",
    title: "Tailored Resume & Applications",
    icon: HiDocumentCheck,
    image: resumeImg,
    accentGradient: "from-rose-500 to-pink-600",
    dotColor: "bg-rose-400",
    quote: "ATS-friendly resume highlighting results, not just tasks.",
    story: "Replace generic mass-applications with role-targeted resumes and custom cover letters. Quantify your measurable impact over routine task lists.",
    rule: "Results beat task lists",
    next: "Mock Interviews",
  },
  {
    step: "06",
    tag: "Execution",
    title: "Interview Readiness",
    icon: HiUserGroup,
    image: interviewImg,
    accentGradient: "from-purple-500 to-indigo-600",
    dotColor: "bg-purple-400",
    quote: "Comfort with technical, behavioral, and situational questions.",
    story: "Knowledge alone isn't enough if you freeze in the room. Practice with realistic mock interviews until answering tough questions feels natural.",
    rule: "Mock-tested composure",
    next: "Daily Discipline",
  },
  {
    step: "07",
    tag: "The Catalyst",
    title: "Consistency & Discipline",
    icon: HiFire,
    image: disciplineImg,
    accentGradient: "from-amber-500 to-yellow-500",
    dotColor: "bg-amber-400",
    quote: "Regular practice, continuous learning, and networking.",
    story: "Not just 'placement season' panic. Committing to steady daily progress compounds over months and makes your placement inevitable.",
    rule: "Daily 90 mins > panic",
    next: "The Destination",
  },
];

const JobReadiness = () => {
  return (
    <section 
      className="relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      {/* Deep Atmospheric Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-slate-950/95 backdrop-blur-[2px]"></div>

      {/* Ambient Lighting Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-14 z-10 text-white">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3 sm:gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What It Really Takes to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Get a Job
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Companies look for a <strong className="text-white font-bold">complete package</strong> — here’s what truly makes the difference:
          </p>

          {/* Connected Storyline Progress Track */}
          <div className="hidden lg:flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-400">
            <span className="text-blue-400 font-bold">01. Foundations</span>
            <span className="text-slate-600">──➔</span>
            <span className="text-sky-400 font-bold">02. Voice</span>
            <span className="text-slate-600">──➔</span>
            <span className="text-emerald-400 font-bold">03. Proof</span>
            <span className="text-slate-600">──➔</span>
            <span className="text-amber-400 font-bold">04. Presence</span>
            <span className="text-slate-600">──➔</span>
            <span className="text-rose-400 font-bold">05. Pitch</span>
            <span className="text-slate-600">──➔</span>
            <span className="text-purple-400 font-bold">06. Interview</span>
            <span className="text-slate-600">──➔</span>
            <span className="text-amber-400 font-bold">07. Daily Habit</span>
            <span className="text-slate-600">──➔</span>
            <span className="text-emerald-300 font-extrabold bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">🎯 Offer</span>
          </div>
        </div>

        {/* 8-Card Storyboard: 4 cards on Row 1 + 4 cards on Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          
          {/* Chapters 1 to 7 */}
          {STORY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                data-aos="fade-up"
                data-aos-delay={idx * 60}
                className="group rounded-3xl border border-white/15 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full relative"
              >
                {/* Thematic Background Image spanning the entire card */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Layered Gradient Backdrop so the background image is visible while text stays 100% readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/92 to-slate-900/75 backdrop-blur-[1px]"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${step.accentGradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>

                {/* Card Content Layer */}
                <div className="relative z-10 p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4 h-full">
                  
                  {/* Top Meta Header */}
                  <div className="flex items-center justify-between gap-2 pb-1">
                    {/* Unified Integrated Glass Capsule Chip */}
                    <div className="inline-flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-xl shadow-xs group-hover:border-white/40 transition-all duration-300">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${step.accentGradient} flex items-center justify-center text-white shadow-sm group-hover:rotate-12 transition-transform duration-300 shrink-0`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                        {step.tag}
                      </span>
                    </div>

                    {/* Step Milestone Pill */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/60 border border-white/10 text-[10px] font-mono text-slate-300 font-bold backdrop-blur-md shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Step {step.step}/07</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg sm:text-xl text-white leading-snug drop-shadow-md group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Frosted Quote Insight Card */}
                  <div className="relative rounded-2xl bg-white/10 border border-white/15 p-3.5 backdrop-blur-md shadow-inner">
                    <div className="flex items-start gap-2">
                      <span className="text-xl leading-none text-blue-400 font-serif select-none">“</span>
                      <p className="text-white font-bold text-xs sm:text-[13px] leading-snug">
                        {step.quote}
                      </p>
                    </div>
                  </div>

                  {/* Narrative Story Description */}
                  <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed flex-grow">
                    {step.story}
                  </p>
                </div>

                {/* Bottom Animated Hover Accent Strip */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${step.accentGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left relative z-10`}></div>
              </div>
            );
          })}

          {/* Chapter 8: The Destination & Climax (The "Remember" Golden Rule) */}
          <div
            data-aos="fade-up"
            data-aos-delay="450"
            className="group rounded-3xl border border-amber-400/30 hover:border-amber-400/60 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full relative"
          >
            {/* Thematic Background Image spanning the entire card */}
            <img
              src={destinationImg}
              alt="Getting Placed & Hired"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Layered Gradient Backdrop for contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/92 to-slate-900/75 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/25 via-emerald-500/15 to-blue-600/20 opacity-35 group-hover:opacity-50 transition-opacity"></div>

            {/* Card Content Layer */}
            <div className="relative z-10 p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4 h-full">
              
              {/* Top Meta Header */}
              <div className="flex items-center justify-between gap-2 pb-1">
                {/* Unified Integrated Glass Capsule Chip */}
                <div className="inline-flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 backdrop-blur-xl shadow-xs group-hover:border-amber-400/50 transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 shadow-sm group-hover:rotate-12 transition-transform duration-300 shrink-0">
                    <HiTrophy className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                    The Destination
                  </span>
                </div>

                {/* Step Milestone Pill */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-mono text-emerald-300 font-bold backdrop-blur-md shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>🎯 Job Offer</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg sm:text-xl text-white leading-snug drop-shadow-md group-hover:text-amber-300 transition-colors">
                Getting Placed & Hired
              </h3>

              {/* Frosted Quote Insight Card */}
              <div className="relative rounded-2xl bg-amber-500/10 border border-amber-400/25 p-3.5 backdrop-blur-md shadow-inner">
                <div className="flex items-start gap-2">
                  <span className="text-xl leading-none text-amber-400 font-serif select-none">“</span>
                  <p className="text-white font-bold text-xs sm:text-[13px] leading-snug">
                    Remember: You don’t need to be perfect in all areas at once.
                  </p>
                </div>
              </div>

              {/* Narrative Story Description */}
              <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed flex-grow">
                Start with your weakest point, improve steadily with daily 1% compounding growth, and build yourself into an unbeatable candidate companies{" "}
                <strong className="text-amber-300 underline decoration-amber-400 underline-offset-2">
                  can’t ignore
                </strong>
                .
              </p>
            </div>

            {/* Bottom Animated Hover Accent Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left relative z-10"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default JobReadiness;
