import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AdvancedApplyPopup from "../../../Components/AdvancedApplyPopup";

/**
 * ApplyNowButton
 * Triggers the premium AdvancedApplyPopup modal without navigating away.
 */
const ApplyNowButton = ({ courseValue, className = "", label = "Request a Callback" }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const handleEnrollClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="inline-block">
      <button
        data-aos="fade-up"
        onClick={handleEnrollClick}
        className={`bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold px-10 py-3.5 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg ${className}`}
      >
        {label}
      </button>

      {showPopup && (
        <AdvancedApplyPopup 
          onClose={() => setShowPopup(false)} 
          initialDomain={courseValue}
        />
      )}
    </div>
  );
};

export default ApplyNowButton;
