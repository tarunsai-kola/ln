import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importing all company logos
import c1 from "../assets/company logo/1.png";
import c2 from "../assets/company logo/2.png";
import c3 from "../assets/company logo/3.png";
import c4 from "../assets/company logo/4.png";
import c5 from "../assets/company logo/5.png";
import c6 from "../assets/company logo/6.png";
import c7 from "../assets/company logo/7.png";
import c8 from "../assets/company logo/8.png";
import c9 from "../assets/company logo/9.png";
import c10 from "../assets/company logo/10.png";
import c11 from "../assets/company logo/11.png";
import c12 from "../assets/company logo/12.png";
import c13 from "../assets/company logo/13.png";
import c14 from "../assets/company logo/14.png";
import c15 from "../assets/company logo/15.png";
import c16 from "../assets/company logo/16.png";
import c17 from "../assets/company logo/17.png";
import c18 from "../assets/company logo/18.png";
import c19 from "../assets/company logo/19.png";
import c20 from "../assets/company logo/20.png";
import c21 from "../assets/company logo/21.png";
import c22 from "../assets/company logo/22.png";
import c23 from "../assets/company logo/23.webp";
import c24 from "../assets/company logo/24.png";
import c25 from "../assets/company logo/25.png";
import c26 from "../assets/company logo/26.png";
import c27 from "../assets/company logo/27.png";
import c28 from "../assets/company logo/28.png";

/**
 * ClientsCarousel Component
 * Renders a smooth, continuous linear marquee of company logos.
 */
const ClientsCarousel = ({ isDark }) => {
  // Common settings for the continuous marquee effect
  const baseMarqueeSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    speed: 6000, // Duration of the animation loop
    arrows: false,
    dots: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchMove: true,
  };

  // Mobile-specific overrides to slow down and smooth the movement
  const responsiveSettings = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        speed: 8000,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        speed: 10000, // Slower on mobile for premium feel
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        speed: 10000, // Extra-slow loop on small screens
      }
    }
  ];

  // Configuration for the first row (Left to Right)
  const settingsRow1 = {
    ...baseMarqueeSettings,
    slidesToShow: 8,
    responsive: responsiveSettings,
  };

  // Configuration for the second row (Right to Left)
  const settingsRow2 = {
    ...baseMarqueeSettings,
    slidesToShow: 8,
    rtl: true,
    responsive: responsiveSettings,
  };

  // Logo Arrays for the two rows
  const row1Logos = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14];
  const row2Logos = [c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25, c26, c27, c28];

  return (
    <div className={`workatslider ${isDark ? 'dark-mode-logos' : ''}`}>
      <style>{`
        .workatslider {
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
        }
        
        /* Logo Containers */
        .workatslider .slick-slide > div {
          padding: 0 10px;
        }

        .workatslider .logo-slide {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          display: flex !important;
          align-items: center;
          justify-content: center;
          height: 85px;
          margin: 10px 0;
          transition: all 0.3s ease;
        }

        .workatslider .logo-slide:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        /* Branding Logos */
        .workatslider .client-img {
          max-width: 130px;
          max-height: 45px;
          width: 100%;
          height: 100%;
          object-fit: contain !important;
          display: block;
          transition: transform 0.3s ease;
        }

        /* Responsive Branding Adjustments */
        @media (max-width: 768px) {
          .workatslider .slick-slide > div {
            padding: 0 8px;
          }
          .workatslider .logo-slide {
            height: 75px;
            border-radius: 12px;
          }
          .workatslider .client-img {
            max-width: 100px;
            max-height: 38px; 
          }
        }
        
        /* Dark Mode Logo Adjustments */
        .dark-mode-logos .client-img {
          filter: drop-shadow(0px 1px 2px rgba(255,255,255,0.15));
          opacity: 1;
        }
        
        .workatslider .row-divider {
          margin-top: 30px;
        }
      `}</style>

      {/* Row 1: Left to Right Marquee */}
      <div className="clients-row">
        <Slider {...settingsRow1}>
          {row1Logos.map((logo, index) => (
            <div key={`row1-${index}`} className="logo-slide">
              <img src={logo} alt={`Brand Logo ${index + 1}`} className="client-img" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Row 2: Right to Left Marquee */}
      <div className="clients-row row-divider">
        <Slider {...settingsRow2}>
          {row2Logos.map((logo, index) => (
            <div key={`row2-${index}`} className="logo-slide">
              <img src={logo} alt={`Brand Logo ${index + 15}`} className="client-img" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default React.memo(ClientsCarousel);
