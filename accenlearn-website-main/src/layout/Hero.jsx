import { Divider } from "antd";
import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaVideo } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { LuMailQuestion } from "react-icons/lu";
import $ from "jquery";
import "jquery.ripples";
import { BackgroundButton, BorderedButton } from "../components/Button";
import { PiLaptopBold } from "react-icons/pi";
import { IMAGE_HELPER } from "../shared/ImageHelper";
import CountUp from "react-countup";

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const playground = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Only apply ripples on desktop (screen width > 1024px) and if WebGL is supported
    const isMobile = window.innerWidth <= 1024;
    const element = playground.current;

    if (!isMobile && element) {
      try {
        $(element).ripples({
          resolution: 256,
          perturbance: 0.02,
        });
      } catch (error) {
        // Silently fail if ripples can't be initialized (no WebGL support)
        console.warn('Ripples effect disabled:', error.message);
      }
    }

    // Cleanup
    return () => {
      try {
        if (element) {
          $(element).ripples('destroy');
        }
      } catch {
        // Ignore cleanup errors
      }
    };
  }, []);

  const STATS = [
    { count: "1,027+", label: "Students" },
    { count: "16+", label: "Programs" },
    { count: "200+", label: "Sessions" },
    { count: "500+", label: "Certified" },
  ];

  return (
    <section
      ref={playground}
      className="relative w-full bg-white px-4 sm:px-8 md:px-[10vw] !select-none min-h-screen lg:h-[calc(100vh-250px)] overflow-hidden flex items-center"
    >
      <div className="relative z-20 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        
        {/* CONTENT ON THE LEFT */}
        <div className="text-gray-800 space-y-4 sm:space-y-6 order-1 text-center lg:text-left">
          <div 
            onClick={() => navigate("/internship")}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 border border-gray-300 rounded-full text-[10px] sm:text-sm font-semibold backdrop-blur text-primary mx-auto lg:mx-0 cursor-pointer hover:bg-primary/5 transition-colors group"
          >
            <FaVideo className="flex-shrink-0" />
            <span className="whitespace-nowrap">Limited seats available – Book now</span>
            <FaArrowRight className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-primary">
            Build Skills That <br className="hidden sm:block" /> 
            <span className="text-secondary typing-effect" aria-label="Turn Into Careers">
              Turn Into Careers
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            Accenlearn empowers learners with industry-ready skills, hands-on
            training, internships, and personalized career guidance. Learn
            practically. Grow professionally.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
            <BackgroundButton 
              Icon={PiLaptopBold} 
              text="LEARN MORE" 
              onClick={() => navigate("/about")}
            />
            <BorderedButton Icon={LuMailQuestion} text="Enquire Now" onClick={() => navigate("/internship")} />
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-y-3 gap-x-4 sm:gap-x-6 pt-4 sm:pt-6 text-[10px] sm:text-sm font-semibold text-primary">
            <div className="flex items-center gap-2">
              <GiTrophyCup className="flex-shrink-0 text-secondary" />
              <span className="whitespace-nowrap">Affordable Pricing</span>
            </div>
            <div className="hidden md:block w-[1.5px] h-4 bg-gray-300/60" />
            <div className="flex items-center gap-2">
              <GiTrophyCup className="flex-shrink-0 text-secondary" />
              <span className="whitespace-nowrap">Self-Paced Learning</span>
            </div>
            <div className="hidden md:block w-[1.5px] h-4 bg-gray-300/60" />
            <div className="flex items-center gap-2">
              <GiTrophyCup className="flex-shrink-0 text-secondary" />
              <span className="whitespace-nowrap">Career-Focused Content</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - SINGLE IMAGE WITH FLOATING BADGES AS PER DRAWING */}
        <div className="relative h-full w-full flex items-center justify-center lg:justify-end order-2 mt-10 lg:mt-0">
          <div className="relative w-full max-w-[400px] sm:max-w-[550px] lg:max-w-[580px] xl:max-w-[640px] animate__animated animate__fadeInRight">
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={IMAGE_HELPER.HERO_SECTION} 
                alt="Hero" 
                className="w-full h-auto object-contain"
              />
            </div>
            
            {/* Badge 1: Bottom-Left - Tilt Left + Float animation */}
            <div className="absolute bottom-[15%] left-2 sm:left-4 bg-white/95 backdrop-blur-md p-2 sm:p-4 rounded-lg shadow-2xl border border-white/50 z-40 min-w-[100px] sm:min-w-[120px] hover:scale-110 hover:-rotate-3 transition-all duration-500 animate__animated animate__fadeInUp rotate-[-2deg] hover:z-50">
              <h3 className="text-lg sm:text-2xl font-extrabold text-primary">
                <CountUp start={0} end={1297} duration={3} suffix="+" enableScrollSpy={true} scrollSpyOnce={true}>
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </h3>
              <p className="text-[8px] sm:text-xs font-bold text-gray-600 uppercase tracking-widest">Alumni</p>
            </div>

            {/* Badge 2: Middle-Right - Tilt Right + Bounce animation */}
            <div className="absolute top-[45%] right-2 sm:right-4 bg-white/95 backdrop-blur-md p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl border border-white/50 z-40 min-w-[100px] sm:min-w-[120px] hover:scale-110 hover:rotate-3 transition-all duration-500 animate__animated animate__fadeInUp rotate-[3deg] hover:z-50">
              <h3 className="text-lg sm:text-2xl font-extrabold text-secondary">
                <CountUp start={0} end={170} duration={3} suffix="+" enableScrollSpy={true} scrollSpyOnce={true}>
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </h3>
              <p className="text-[8px] sm:text-xs font-bold text-gray-600 uppercase tracking-widest">Global Mentors</p>
            </div>

            {/* Badge 3: Bottom - Pulse + Slide Up animation */}
            <div className="absolute bottom-[-5%] sm:bottom-[-10%] left-[20%] bg-white/95 backdrop-blur-md p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl border border-white/50 z-40 min-w-[100px] sm:min-w-[120px] hover:scale-110 transition-all duration-500 animate__animated animate__fadeInUp hover:z-50">
              <h3 className="text-lg sm:text-2xl font-extrabold text-primary">
                <CountUp start={0} end={8023} duration={3} separator="," suffix="+" enableScrollSpy={true} scrollSpyOnce={true}>
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </h3>
              <p className="text-[8px] sm:text-xs font-bold text-gray-600 uppercase tracking-widest">Learners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
