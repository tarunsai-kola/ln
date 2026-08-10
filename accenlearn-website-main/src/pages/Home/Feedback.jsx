import React, { useState } from "react";
import TitleText from "../../components/TitleText";
import SwiperComponent from "../../components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import { Image, Modal } from "antd";
import { IMAGE_HELPER } from "../../shared/ImageHelper";
import { FaCertificate, FaQuoteLeft, FaTimes, FaExpand, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FEEDBACKS = [
  {
    name: "Akshita",
    role: "Certified Medical Coder",
    quote:
      "The Medical Coding workshop at AccenLearn provided me with a deep understanding of ICD-10 and CPT coding. The practical sessions and industry-focused curriculum were essential in preparing me for a professional career in healthcare administration.",
    track: "Medical Coding",
    image: IMAGE_HELPER.AKSHITA,
    certificateUrl: IMAGE_HELPER.AKSHITA_CERT,
    offerLetterUrl: null,
    placedAt: "Global Health Solutions",
  },
  {
    name: "Aravind R",
    role: "DevOps Engineer",
    quote:
      "Mastering CI/CD pipelines and Kubernetes at AccenLearn was a breakthrough for my career. The hands-on labs and automation strategies provided me with the practical expertise needed for modern cloud operations.",
    track: "DevOps",
    image: IMAGE_HELPER.ARVIND,
    certificateUrl: IMAGE_HELPER.ARVIND_CERT,
    offerLetterUrl: IMAGE_HELPER.ARVIND_OFFER,
    placedAt: "GLOBUSSOFT",
  },
  {
    name: "Ajith Kumar",
    role: "Data Structure & Algorithm",
    quote:
      "The Data Structures and Algorithms workshop was perfectly structured. I learned everything from basic complexity analysis to advanced graph algorithms, which helped me land my first role in software engineering.",
    track: "Data Structure & Algorithm",
    image: IMAGE_HELPER.AJIT,
    certificateUrl: IMAGE_HELPER.AJITH_CERT,
    offerLetterUrl: null,
    placedAt: "Tech Solutions Ltd",
  },
  {
    name: "Adharsha",
    role: "Digital Marketing Specialist",
    quote:
      "The Digital Marketing program at AccenLearn transformed my understanding of online growth. From SEO to social media strategies, the hands-on campaigns helped me build a professional edge in the industry.",
    track: "Digital Marketing",
    image: IMAGE_HELPER.ADHARSHA,
    certificateUrl: IMAGE_HELPER.ADHARSHA_CERT,
    offerLetterUrl: null,
    placedAt: "Marketing Pro Agency",
  },
  {
    name: "KALPANA",
    role: "Machine Learning",
    quote:
      "The Machine Learning program was a deep dive into neural networks and predictive modeling. The real-world datasets and hands-on projects helped me build a strong portfolio and secure my position in the AI field.",
    track: "Machine Learning",
    image:
      "https://img.freepik.com/free-photo/young-girl-listening-educational-documentary-laptop-takes-notes_482257-126301.jpg?semt=ais_hybrid&w=740&q=80",
    certificateUrl: IMAGE_HELPER.KALPANA_CERT,
    offerLetterUrl: null,
    placedAt: "Secure Net Systems",
  },
  {
    name: "NANDHA KUMAR",
    role: "Full Stack Web Development",
    quote:
      "The Full Stack Web Development program was exceptional. I gained hands-on experience with the MERN stack, from building responsive front-ends to architecting robust back-end systems, which was pivotal for my career.",
    track: "Full Stack Web Development",
    image: IMAGE_HELPER.NANDHA_IMG,
    certificateUrl: IMAGE_HELPER.NANDHA_CERT,
    offerLetterUrl: null,
    placedAt: "Tekzow",
  },
  {
    name: "Madhu",
    role: "Machine Learning",
    quote:
      "The Machine Learning program was a deep dive into neural networks and predictive modeling. The real-world datasets and hands-on projects helped me build a strong portfolio and secure my position in the AI field.",
    track: "Machine Learning",
    image: IMAGE_HELPER.MADHU,
    certificateUrl: IMAGE_HELPER.MADHU_CERT,
    offerLetterUrl: null,
    placedAt: "Tech Innovation Hub",
  },
  {
    name: "ARUN KUMAR",
    role: "Finance",
    quote:
      "The Finance workshop at AccenLearn provided me with essential skills in financial modeling and analysis. The practical approach to real-world financial scenarios was exactly what I needed to advance my career.",
    track: "Finance",
    image: IMAGE_HELPER.ARUN_IMG,
    certificateUrl: IMAGE_HELPER.ARUN_CERT,
    offerLetterUrl: null,
    placedAt: "Muthoot Finance",
  },
  {
    name: "ABISHIEK",
    role: "Devops",
    quote:
      "The DevOps program at AccenLearn was a comprehensive journey through modern deployment strategies. Mastering automation tools and cloud infrastructure has given me a competitive edge in the tech industry.",
    track: "Devops",
    image:
      "https://img.freepik.com/free-photo/handsome-young-businessman-working-laptop-office-sharing-ideas-with-his-colleagues_146671-15598.jpg?t=st=1740000000~exp=1740003600~hmac=...",
    certificateUrl: IMAGE_HELPER.ABISHIEK_CERT,
    offerLetterUrl: IMAGE_HELPER.ARVIND_OFFER,
    placedAt: "Tech Infrastructure Co",
  },
  {
    name: "SANTHOSH C",
    role: "cloud computing",
    quote:
      "Learning cloud computing at AccenLearn was an incredible experience. The hands-on labs and expert mentorship helped me understand complex cloud architectures and how to implement them effectively.",
    track: "cloud computing",
    image: IMAGE_HELPER.SANTHOSH_IMG,
    certificateUrl: IMAGE_HELPER.SANTHOSH_CERT,
    offerLetterUrl: null,
    placedAt: "Cloud Solutions Provider",
  },
  {
    name: "Om Amol Kusanale",
    role: "Finance Specialist",
    quote:
      "The Finance workshop at AccenLearn was a game-changer for me. The deep dive into financial modeling and strategic analysis helped me gain the confidence and skills needed to secure a position at Shri Jinnappanna Credit.",
    track: "Finance",
    image: IMAGE_HELPER.OM_IMG,
    certificateUrl: IMAGE_HELPER.OM_CERT,
    offerLetterUrl: null,
    placedAt: "Shri Jinnappanna Credit",
  },
];

const Feedback = () => {
  const navigate = useNavigate();
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDocClick = (e, url, title, student) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent swiper from moving
    if (url === "#" || !url) return;
    
    // On mobile/tablet (less than lg breakpoint), navigate to full page
    if (windowWidth < 1024) {
      navigate("/preview", { state: { url, title, student } });
    } else {
      // On desktop, use the split-view layout
      setPreviewDoc({ url, title, student });
    }
  };

  const openQuoteModal = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedQuote(item);
    setIsQuoteModalOpen(true);
  };

  const handleFullScreen = () => {
    if (previewDoc) {
      navigate("/preview", { state: previewDoc });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 lg:gap-10 pb-10 px-4 md:px-10 relative z-10">
      {/* Quote Modal */}
      <Modal
        title={null}
        footer={null}
        open={isQuoteModalOpen}
        onCancel={() => setIsQuoteModalOpen(false)}
        centered
        width={700}
        className="feedback-modal"
        styles={{
          mask: { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.45)' },
          content: { borderRadius: '2rem', padding: '0', overflow: 'hidden' }
        }}
      >
        {selectedQuote && (
          <div className="relative overflow-hidden flex flex-col">
            <div className="h-2 w-full bg-gradient-to-r from-primary to-secondary" />
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full border-4 border-gray-50 shadow-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={selectedQuote.image}
                    alt={selectedQuote.name}
                    className="w-full h-full object-cover"
                    preview={false}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tighter leading-none">{selectedQuote.name}</h3>
                  <p className="text-sm font-bold text-secondary uppercase tracking-widest mt-2">{selectedQuote.role}</p>
                </div>
                <div className="ml-auto opacity-10">
                   <FaQuoteLeft size={60} />
                </div>
              </div>
              
              <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 relative">
                <p className="text-gray-800 text-lg md:text-xl leading-relaxed italic font-medium relative z-10">
                  "{selectedQuote.quote}"
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">
                  Verified Student Feedback
                </span>
                <button 
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="px-8 py-3 bg-primary text-white font-black text-xs rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-widest"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="flex flex-col items-center gap-2">
        <TitleText title="Our Students said" />
        <p className="global_text !text-center max-w-3xl -mt-10" data-aos="fade-up">
          Real voices from learners who turned projects, mentorship, and
          practice into career momentum.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-4 transition-all duration-500 ease-in-out">
        {/* Left Side: Testimonial Section */}
        <div className={`w-full transition-all duration-500 ease-in-out ${
          previewDoc ? "lg:col-span-7" : "lg:col-span-12 max-w-6xl mx-auto"
        }`}>
          {previewDoc ? (
            // Show only the selected student's feedback when a document is being previewed
            <div className="animate__animated animate__fadeIn h-full">
              {FEEDBACKS.filter(item => item.name === previewDoc.student).map((item, index) => (
                <div
                  key={item.name + index}
                  className="group relative rounded-[2rem] border border-primary/20 bg-primary/5 shadow-xl overflow-hidden flex flex-col w-full min-h-[480px] animate__animated animate__zoomIn animate__faster"
                >
                  {/* Top Accent Border */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

                  <div className="relative p-6 md:p-10 pt-10 flex flex-col flex-grow">
                    {/* Header Section (Not absolute to prevent overlap) */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg flex-shrink-0">
                        <FaQuoteLeft size={18} />
                      </div>
                      <span className="text-[10px] md:text-xs font-black uppercase text-primary tracking-[0.2em] bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-primary/10 shadow-sm whitespace-nowrap">
                        {item.track}
                      </span>
                    </div>

                    {/* Quote Content */}
                    <div className="relative mb-8 flex-grow flex flex-col justify-center">
                      <p className="text-gray-800 text-base md:text-lg lg:text-xl leading-relaxed italic font-bold">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Footer Section */}
                    <div className="pt-6 md:pt-8 border-t border-primary/10 flex flex-col gap-6 md:gap-8 mt-auto">
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className="h-14 w-14 md:h-16 md:w-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            preview={false}
                          />
                        </div>
                        <div className="flex flex-col justify-center overflow-hidden">
                          <h4 className="text-lg md:text-xl font-black text-primary leading-tight truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs md:text-sm font-bold text-secondary tracking-tight uppercase mt-0.5 md:mt-1 truncate">
                            {item.role}
                          </p>
                          <div className="flex items-center gap-2 mt-2 overflow-hidden">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
                            <span className="text-[9px] md:text-[10px] font-black text-primary/60 uppercase tracking-widest truncate">
                              Placed at: {item.placedAt}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-nowrap gap-2 md:gap-3 pt-2">
                        <button
                          onClick={(e) => handleDocClick(e, item.certificateUrl, "Certificate of Achievement", item.name)}
                          className={`flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-2 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black transition-all duration-300 border ${
                            previewDoc?.url === item.certificateUrl
                              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                              : "bg-white text-primary border-primary/10 hover:border-primary/30 hover:shadow-md"
                          } whitespace-nowrap uppercase tracking-wider`}
                        >
                          <FaCertificate className="text-xs md:text-sm" />
                          CERTIFICATE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SwiperComponent
              count={3}
              component={FEEDBACKS.map((item, index) => (
                <SwiperSlide key={item.name + index} className="py-8 px-2 !h-auto flex">
                  <div
                    data-aos="fade-up"
                    className="group relative rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col w-full h-full min-h-[460px]"
                  >
                    {/* Top Accent Border */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary" />

                    <div className="relative p-6 md:p-8 pt-10 flex flex-col flex-grow">
                      {/* Header Section (Not absolute to prevent overlap) */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-secondary shadow-sm flex-shrink-0">
                          <FaQuoteLeft size={16} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-primary/70 tracking-[0.2em] bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10 backdrop-blur-sm whitespace-nowrap animate-bg-pulse">
                          {item.track}
                        </span>
                      </div>

                      {/* Quote Content */}
                      <div className="relative mb-6 flex-grow flex flex-col">
                        <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed italic font-medium line-clamp-5 flex-grow">
                          "{item.quote}"
                        </p>
                        <button 
                          onClick={(e) => openQuoteModal(e, item)}
                          className="mt-4 text-primary font-bold text-xs hover:underline flex items-center gap-1 transition-all w-fit relative z-30"
                        >
                          Read More
                        </button>
                      </div>

                      {/* Footer Section */}
                      <div className="pt-6 border-t border-gray-100 flex flex-col gap-6 mt-auto">
                        <div className="flex items-center gap-4 h-[70px] md:h-[80px]">
                          <div className="h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-secondary/20 shadow-md overflow-hidden bg-gray-50 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={`Photo of ${item.name}`}
                              className="w-full h-full object-cover"
                              preview={false}
                              loading="lazy"
                            />
                          </div>
                          <div className="flex flex-col justify-center overflow-hidden">
                            <h4 className="text-base md:text-lg font-extrabold text-primary leading-tight truncate">
                              {item.name}
                            </h4>
                            <p className="text-[10px] md:text-xs font-bold text-secondary tracking-tight uppercase mt-0.5 truncate">
                              {item.role}
                            </p>
                            <span className="text-[9px] md:text-[10px] font-bold text-primary/60 truncate mt-1 uppercase tracking-widest">
                              Placed at: {item.placedAt}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-nowrap gap-2 pt-2">
                          <button
                            onClick={(e) => handleDocClick(e, item.certificateUrl, "Certificate of Achievement", item.name)}
                            className={`flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-2 py-3 rounded-xl text-[9px] md:text-[10px] font-black transition-all duration-300 border ${
                              previewDoc?.url === item.certificateUrl
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                                : "bg-primary/5 text-primary border-primary/10 hover:bg-primary hover:text-white"
                            } whitespace-nowrap uppercase tracking-wider`}
                          >
                            <FaCertificate className="text-xs" />
                            CERTIFICATE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            />
          )}
        </div>

        {/* Right Side: Document Viewer */}
        {previewDoc && (
          <div className="lg:col-span-5 w-full h-full sticky top-32 hidden lg:block animate__animated animate__slideInRight animate__faster">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-6 h-[600px] flex flex-col relative">
              {/* Controls */}
              <div className="absolute -top-3 -left-3 flex gap-2 z-30">
                <button 
                  onClick={() => setPreviewDoc(null)}
                  className="h-10 w-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FaTimes size={14} />
                </button>
                <button 
                  onClick={handleFullScreen}
                  className="h-10 w-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                  title="Open in Full Page"
                >
                  <FaExternalLinkAlt size={12} />
                </button>
              </div>

              {/* Viewer Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-black text-primary uppercase tracking-tighter">
                    Document Preview
                  </h3>
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">
                    {previewDoc.student} · {previewDoc.title}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <FaExpand size={14} />
                </div>
              </div>

              {/* Image Display Area */}
              <div className="flex-grow bg-gray-50 rounded-2xl overflow-hidden relative group/viewer flex items-center justify-center border-2 border-dashed border-gray-200">
                <div 
                  key={previewDoc.url}
                  className="w-full h-full p-4 animate__animated animate__fadeIn animate__faster"
                >
                   <Image
                    src={previewDoc.url}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg shadow-lg"
                    preview={true}
                  />
                  {/* Floating Verification Badge */}
                  <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-green-100 flex items-center gap-2 animate__animated animate__bounceIn animate__delay-1s">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Verified</span>
                  </div>
                </div>
              </div>

              {/* Viewer Footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                   AccenLearn Verification Portal
                 </span>
                 <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { FEEDBACKS };
export default Feedback;
