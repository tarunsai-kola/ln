import React from 'react';
import { FaStar, FaClock, FaUsers, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// No image imports needed

const PopularCoursesSection = () => {
  const navigate = useNavigate();

  const popularCourses = [
    {
      title: "Data Science & Generative AI",
      desc: "Master predictive modeling and architect LLM-powered applications.",
      rating: 4.9,
      students: "3,140+",
      duration: "24 Weeks",
      link: "/Advance"
    },
    {
      title: "Data Analytics & AI",
      desc: "Combine traditional business intelligence with AI-driven analytics.",
      rating: 4.8,
      students: "2,890+",
      duration: "20 Weeks",
      link: "/Advance"
    },
    {
      title: "AI-Powered Full Stack",
      desc: "Build secure MERN applications augmented with intelligent features.",
      rating: 4.9,
      students: "4,200+",
      duration: "24 Weeks",
      link: "/Advance"
    },
    {
      title: "Cybersecurity",
      desc: "Defend digital systems with ethical hacking and cloud security.",
      rating: 4.8,
      students: "1,950+",
      duration: "20 Weeks",
      link: "/Advance"
    },
    {
      title: "Digital Marketing & AI",
      desc: "Execute high-ROI campaigns using predictive analytics and AI content.",
      rating: 4.7,
      students: "2,560+",
      duration: "16 Weeks",
      link: "/Advance"
    }
  ];

  return (
    <section className="km-popular">
      <div className="km-container">
        <div className="km-popular__header" data-aos="fade-up">
          <div className="km-section-chip">Trending Now</div>
          <h2 className="km-section-title">Most <span>Popular</span> Courses</h2>
          <p className="km-section-sub">Join thousands of students in our top-rated mentorship programs.</p>
        </div>

        <div className="km-popular__grid">
          {popularCourses.map((course, index) => (
            <div 
              key={index} 
              className="km-popular-card" 
              data-aos="fade-up" 
              data-aos-delay={index * 50}
            >
              <div className="km-card__body">
                <div className="km-card__badges">
                  <span className="km-card__badge km-card__badge--green">LIVE</span>
                  <span className="km-card__badge">CERTIFIED</span>
                </div>
                <h3 className="km-card__title">{course.title}</h3>
                <p className="km-card__desc">{course.desc}</p>
                
                <div className="km-card__meta">
                  <div className="km-card__left-meta">
                    <div className="km-card__stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < 4 ? "#f59e0b" : "#e2e8f0"} size={14} />
                      ))}
                      <span className="km-card__rating-num">{course.rating}</span>
                    </div>
                  </div>
                  <div className="km-card__right-meta">
                    <div className="km-card__meta-item"><FaClock /> {course.duration}</div>
                    <div className="km-card__meta-item"><FaUsers /> {course.students}</div>
                  </div>
                </div>

                <div className="km-card__actions">
                  <button className="km-card__btn-primary" onClick={() => navigate(course.link)}>
                    Program Details <FaArrowRight style={{marginLeft: '8px'}} size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
