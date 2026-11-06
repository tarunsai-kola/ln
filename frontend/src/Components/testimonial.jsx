import React from 'react';
import Slider from 'react-slick';
import { Star, CheckCircle } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import r1 from '../assets/alumni/birendra_kumar.png';
import r2 from '../assets/alumni/raja_singh.png';
import r3 from '../assets/alumni/mithun_prajapati.png';
import r4 from '../assets/alumni/alumni_2.png';
import r5 from '../assets/alumni/alumni_1.png';
import r6 from '../assets/alumni/alumni_3.png';

const Testimonial = () => {
  const testimonials = [
    {
      name: "Raja Singh",
      college: "Ujjain Engineering College",
      course: "Stock Marketing",
      image: r2,
      review: "The stock market course was exceptionally informative. The well-structured modules made complex financial concepts easy to understand and apply in real-world trading scenarios.",
    },
    {
      name: "Birendra Kumar",
      college: "TMB University",
      course: "Stock Marketing",
      image: r1,
      review: "Great mentorship and practical training. Completing my internship here significantly boosted my confidence and gave me a clear perspective on market dynamics.",
    },
    {
      name: "Mithun Prajapati",
      college: "VIT Bhopal",
      course: "Full Stack Development",
      image: r3,
      review: "The Full Stack Web Development internship was truly interactive. The mentor support was excellent, helping me build production-ready applications with modern stacks.",
    },
    {
      name: "Prabhleen Kaur",
      college: "Govt Girls College",
      course: "Artificial Intelligence",
      image: r4,
      review: "A joyful and enriching AI internship experience. Concepts were explained with extreme clarity, and the hands-on projects were perfect for skill building.",
    },
    {
      name: "Rohan Singh",
      college: "Amrita University",
      course: "Embedded System",
      image: r5,
      review: "The learning environment was incredibly supportive. The team's guidance during my Embedded Systems training was instrumental in my career progression.",
    },
    {
      name: "Manish Kumar",
      college: "DY Patil University",
      course: "Data Science",
      image: r6,
      review: "Loved the learning experience. The mentors are amazingly knowledgeable, and the doubt-resolution system is one of the best I've encountered in online learning.",
    },
  ];

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    speed: 900,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 2 } },
      { breakpoint: 760, settings: { slidesToShow: 1, adaptiveHeight: true } },
    ],
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-3 pb-8">
              <div
                style={{
                  background: 'var(--atx-tcard-bg, rgba(255,255,255,0.05))',
                  border: '1px solid var(--atx-tcard-border, rgba(30,144,255,0.2))',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '340px',
                  transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
                }}
                className="atx-tcard"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(30,144,255,0.48)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(30,144,255,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--atx-tcard-border, rgba(30,144,255,0.2))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="#1E90FF" style={{ color: '#1E90FF' }} />
                    ))}
                  </div>
                  <div style={{
                    background: 'rgba(30,144,255,0.12)',
                    border: '1px solid rgba(30,144,255,0.25)',
                    color: '#4DA3FF',
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    letterSpacing: '0.05em',
                  }}>
                    <CheckCircle size={9} />
                    VERIFIED
                  </div>
                </div>

                {/* Review */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <p style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '14px',
                    lineHeight: '1.75',
                    fontStyle: 'italic',
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    margin: 0,
                  }}>
                    "{item.review}"
                  </p>
                </div>

                {/* Profile */}
                <div style={{
                  marginTop: '22px',
                  paddingTop: '18px',
                  borderTop: '1px solid rgba(30,144,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(30,144,255,0.3)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E90FF', marginTop: '2px' }}>{item.course}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.college}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
