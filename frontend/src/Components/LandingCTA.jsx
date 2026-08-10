import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const LandingCTA = () => {
  return (
    <section className="relative py-24 px-6 bg-white border-t border-gray-100 overflow-hidden">

      {/* ── VISIBLE SVG Contour Line Background (on white section) ── */}
      {/* TOP-LEFT cluster — large dark-gray arcs, clearly visible */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] opacity-[0.06]"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M -60 540 C 60 400, 220 220, 260 -40" stroke="#111111" strokeWidth="2" />
        <path d="M -20 570 C 100 420, 270 240, 320 -40" stroke="#111111" strokeWidth="2" />
        <path d="M 30 590 C 140 440, 320 260, 380 -30" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M 80 600 C 180 460, 370 280, 440 -20" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M 130 610 C 220 480, 420 300, 500 -10" stroke="#111111" strokeWidth="1" />
        <path d="M 180 615 C 260 490, 470 310, 560 0" stroke="#111111" strokeWidth="1" />
        <path d="M -100 480 C 40 360, 180 200, 210 -50" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M -130 420 C 20 320, 140 180, 160 -60" stroke="#111111" strokeWidth="1" />
        {/* Horizontal wave */}
        <path d="M -100 300 Q 100 240, 280 300 T 620 270" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M -100 340 Q 100 280, 280 340 T 620 310" stroke="#111111" strokeWidth="1" />
      </svg>

      {/* BOTTOM-RIGHT cluster — mirrored, equally visible */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] opacity-[0.06]"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 660 60 C 540 200, 380 380, 340 640" stroke="#111111" strokeWidth="2" />
        <path d="M 620 30 C 500 180, 330 360, 280 640" stroke="#111111" strokeWidth="2" />
        <path d="M 570 10 C 460 160, 280 340, 220 650" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M 520 0 C 420 140, 230 320, 160 660" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M 470 -10 C 380 120, 180 300, 100 670" stroke="#111111" strokeWidth="1" />
        <path d="M 420 -15 C 340 110, 130 280, 40 670" stroke="#111111" strokeWidth="1" />
        <path d="M 700 120 C 560 240, 420 400, 390 650" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M 730 180 C 580 280, 460 420, 430 660" stroke="#111111" strokeWidth="1" />
        {/* Horizontal wave */}
        <path d="M 700 300 Q 500 360, 320 300 T -20 330" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M 700 260 Q 500 320, 320 260 T -20 290" stroke="#111111" strokeWidth="1" />
      </svg>

      {/* Center top faint arc for composition balance */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[200px] opacity-[0.04]"
        viewBox="0 0 900 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 200 Q 450 -60, 900 200" stroke="#111111" strokeWidth="2" />
        <path d="M 50 200 Q 450 -20, 850 200" stroke="#0F7B53" strokeWidth="1.5" />
        <path d="M 100 200 Q 450 20, 800 200" stroke="#111111" strokeWidth="1" />
      </svg>

      {/* ── CTA Card ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-2xl px-8 py-20 md:py-28 text-center overflow-hidden"
        >
          {/* Inner dark box: own subtle glow for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(15,123,83,0.07),transparent)] pointer-events-none" />

          {/* Inner SVG — white contour strokes visible on dark bg */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <path d="M -80 500 C 80 380, 260 160, 300 -60" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M -40 530 C 100 400, 300 180, 360 -60" stroke="white" strokeWidth="1" fill="none" />
            <path d="M 40 550 C 160 420, 360 200, 430 -40" stroke="white" strokeWidth="1" fill="none" />
            <path d="M 1280 -60 C 1120 80, 940 300, 900 560" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M 1240 -80 C 1080 60, 900 280, 860 580" stroke="white" strokeWidth="1" fill="none" />
            <path d="M 1180 -60 C 1040 60, 840 260, 800 570" stroke="white" strokeWidth="1" fill="none" />
          </svg>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="lp-font-outfit text-4xl md:text-6xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
              The top 1% of engineers <br className="hidden md:block" />start somewhere.
            </h2>
            <p className="text-[#64748B] text-lg md:text-xl mb-12 font-light max-w-xl mx-auto leading-relaxed">
              Secure your seat in the upcoming cohort. Only 40 seats per batch. Admission by selection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-10 py-4 bg-white text-[#111111] rounded-xl font-bold text-[15px] hover:bg-[#2563EB] hover:text-[#0F172A] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
                Apply for Next Cohort
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-4 bg-transparent text-[#64748B] border border-[#E2E8F0] rounded-xl font-semibold text-[15px] hover:text-[#0F172A] hover:border-[#2563EB] transition-all duration-300">
                Book Free Consultation
              </button>
            </div>

            <p className="text-gray-600 text-xs mt-10 font-medium tracking-wide uppercase">
              14-Day Money-Back Guarantee &nbsp;·&nbsp; No-Cost EMI Available &nbsp;·&nbsp; Selective Admission
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingCTA;
