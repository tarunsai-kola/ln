import React, { useState } from 'react';
import { Modal } from 'antd';
import SharedBreadcrumb from '../../components/SharedBreadcrumb';
import TitleText from '../../components/TitleText';
import { FaUsers, FaLightbulb, FaRocket, FaHandshake, FaUser } from 'react-icons/fa';
import FounderImage from '../../assets/LeaderShip/founderimage1 (2).png';
import CoFounderImage from '../../assets/LeaderShip/CoFounder.png';
import TechnicalCooImage from '../../assets/LeaderShip/technical-advisor-coo.png';
import TechnicalAdvisorImage from '../../assets/LeaderShip/technical-advisor.png';
import ExecutiveDirectorImage from '../../assets/LeaderShip/executivedirector.png';
import MarketingHeadImage from '../../assets/LeaderShip/marketing-head.png';
import AnjaliAImage from '../../assets/LeaderShip/anjali-a.png';
import ThilakImage from '../../assets/LeaderShip/thilak-kumar.png';
import KrupakaranImage from '../../assets/LeaderShip/krupakaran.png';
import SumanImage from '../../assets/LeaderShip/suman.png';

const Leadership = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const leadershipPillars = [
        {
            icon: FaUsers,
            title: "Expert Mentorship",
            description: "Guided by industry veterans with decades of experience in technology and management."
        },
        {
            icon: FaLightbulb,
            title: "Innovative Thinking",
            description: "Fostering a culture of creativity and forward-thinking to solve real-world challenges."
        },
        {
            icon: FaRocket,
            title: "Strategic Growth",
            description: "Empowering individuals to take lead roles and drive organizational success."
        },
        {
            icon: FaHandshake,
            title: "Community Impact",
            description: "Building a network of leaders dedicated to social and professional development."
        }
    ];

    const coreTeam = [
        {
            image: TechnicalCooImage,
            name: "RANJITHKUMAR",
            role: "Technical Advisor & COO",
            shortResponsibility: "Oversees technical operations and strategic system implementations to ensure seamless project delivery.",
            responsibility: "Oversees technical operations and strategic system implementations to ensure seamless project delivery across the organization. Maintains operational excellence by integrating advanced technological solutions into core business workflows. Focuses on driving innovation while upholding the highest standards of technical integrity and performance. Leads cross-functional teams to align technical strategy with long-term organizational goals. Dedicated to building a future-ready infrastructure that supports global educational empowerment."
        },
        {
            image: TechnicalAdvisorImage,
            name: "Dr. M. KUMAR",
            role: "Technical Advisor",
            shortResponsibility: "Provides expert guidance on emerging technologies to keep the curriculum at the industry's cutting edge.",
            responsibility: "Provides expert guidance on emerging technologies and critical architectural decisions to keep the curriculum at the industry's cutting edge. Prepares students with the most relevant and advanced skills required to excel in today's competitive global market. Bridges the gap between theoretical knowledge and practical industry applications for long-term career success. Fosters an environment of continuous learning and technological advancement for all learners. Ensures the technical accuracy and industry relevance of all educational programs."
        },
        {
            image: ExecutiveDirectorImage,
            name: "SAI RAGHAVA",
            role: "Executive Director",
            shortResponsibility: "Leads overarching strategy and operational framework to foster a high-performance culture.",
            responsibility: "Leads the organization's overarching strategy and operational framework to foster a high-performance culture across all departments. Drives sustainable growth through visionary leadership and ensures the mission of empowerment is achieved. Ensures that every team member is aligned with core values and strategic business objectives. Works to create a collaborative ecosystem that inspires professional excellence and development. Oversees high-level decision-making and resource management to optimize organizational performance."
        },
        {
            image: AnjaliAImage,
            name: "Anjali A",
            role: "Head of IT & Web Developer",
            shortResponsibility: "Architects robust digital infrastructure and develops innovative web solutions for a global community.",
            responsibility: "Architects and maintains robust digital infrastructure while prioritizing a world-class user experience for the global community. Develops innovative web solutions that integrate seamlessly with learning platforms to ensure reliability. Leverages modern technologies to ensure the digital ecosystem remains secure, scalable, and intuitive. Creates a seamless technological bridge between educational content and end-users. Manages technical deployments and platform updates to enhance system efficiency."
        },
        {
            image: ThilakImage,
            name: "Thilak kumar.S",
            role: "Business Development Head",
            shortResponsibility: "Spearheads strategic business initiatives and market analysis to identify new growth opportunities.",
            responsibility: "Spearheads strategic business initiatives and market analysis to identify new growth opportunities for the organization. Enhances the global footprint through innovative partnership models and sustainable business strategies. Leverages expertise in market penetration and relationship management to deliver value to partners. Builds strong foundations that support the long-term vision of educational accessibility. Identifies and cultivates strategic alliances to expand the reach of educational programs."
        },
        {
            image: MarketingHeadImage,
            name: "DIPANSHU SACHAN",
            role: "Head of Marketing",
            shortResponsibility: "Directs creative marketing strategies and brand positioning to engage a global audience.",
            responsibility: "Directs creative marketing strategies and brand positioning to engage a global audience of aspiring professionals. Fosters a vibrant community of passionate learners and industry experts through data-driven campaigns. Elevates brand presence through creative storytelling and connects students with life-changing opportunities. Ensures brand consistency and quality across all digital and traditional marketing channels. Analyzes market trends to optimize outreach and maximize impact on the target audience."
        },
        {
            image: null,
            name: "RUDHRA",
            role: "Head of Operations",
            shortResponsibility: "Directs daily business operations with a focus on optimizing workflows and resource allocation.",
            responsibility: "Directs daily business operations with a focus on optimizing internal workflows and resource allocation. Ensures all organizational processes run with peak efficiency to support the mission of educational excellence. Streamlines logistics and administrative tasks to maximize productivity and stakeholder satisfaction. Maintains high standards of service and operational integrity across all departments. Implements process improvements to enhance the overall effectiveness of business delivery."
        },
        {
            image: null,
            name: "JAHNAVI GORLA",
            role: "Human Resource Manager",
            shortResponsibility: "Manages talent acquisition, employee relations, and organizational culture to build a high-performing workforce.",
            responsibility: "Manages end-to-end human resource functions, including talent acquisition, employee relations, and organizational culture development. Focuses on building a high-performing workforce by implementing strategic HR policies and fostering a supportive work environment. Leads recruitment initiatives to attract top talent and ensures smooth onboarding processes. Handles employee engagement and performance management to drive organizational success. Dedicated to maintaining a positive and inclusive workplace that inspires professional growth and excellence."
        },
        {
            image: KrupakaranImage,
            name: "Krupakaran.G",
            role: "Graphic Designer & Video Editor",
            shortResponsibility: "Creates visually compelling branding, marketing collaterals, and high-impact video content.",
            responsibility: "Creates visually compelling branding, marketing collaterals, and high-impact video content for all training modules and social channels. Focuses on maintaining a premium visual aesthetic across digital platforms. Collaborates with the marketing and technical teams to craft engaging multimedia experiences for students."
        },
        {
            image: SumanImage,
            name: "Suman Raj X",
            role: "Digital Marketing Executive",
            shortResponsibility: "Drives brand awareness, digital outreach campaigns, and online community engagement.",
            responsibility: "Drives brand awareness, digital outreach campaigns, and online community engagement to reach aspiring professionals. Implements SEO, social media marketing, and data-driven ad campaigns to optimize website traffic and conversion rates."
        }
    ];

    const openBio = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeBio = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 300);
    };

    return (
        <div className='min-h-screen w-full pt-4 sm:pt-6 pb-20'>
            <SharedBreadcrumb to="/leadership" title="Leadership" />
            
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section - Full Width Top */}
                <div className="w-full mb-16">
                    <TitleText 
                        align="center"
                        title="Empowering Leadership & Collaboration" 
                        description="Accenlearn Leadership is dedicated to fostering excellence in management and team collaboration." 
                    />
                </div>

                {/* Founder Section - Split Layout */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    {/* Left Side - Founder Content */}
                    <div className="flex-1 space-y-6" data-aos="fade-right">
                        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary uppercase tracking-wider">
                            Founder's Message
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                            Driving Innovation through <span className="text-secondary">Strategic Vision</span>
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <p>
                                Leads the organizational vision and strategic direction to transform the global educational landscape through innovation. Pioneers industry-aligned programs that effectively bridge the gap between theoretical knowledge and practical application. Fosters a culture of collaboration and continuous learning to empower the next generation of professionals. Drives high-level strategic initiatives to ensure sustainable growth and long-term organizational success. Dedicated to excellence in skill development and educational accessibility for learners worldwide.
                            </p>
                        </div>
                        <div className="pt-4">
                            <h3 className="text-xl font-bold text-primary">LOKESHWARAN</h3>
                            <p className="text-secondary font-semibold uppercase tracking-widest text-sm">Founder & CEO</p>
                        </div>
                    </div>

                    {/* Right Side - Founder Image */}
                    <div className="flex-1 flex justify-center lg:justify-end" data-aos="fade-left">
                        <div className="relative">
                            {/* Attractive Background Shapes */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                            
                            {/* Static Image Container */}
                            <div className="relative flex flex-col items-center">
                                <img 
                                    src={FounderImage} 
                                    alt="Founder" 
                                    className="relative w-full max-w-[450px] object-contain transform transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Co-Founder Section - Split Layout */}
                <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-20 mt-24">
                    {/* Right Side - Co-Founder Content */}
                    <div className="flex-1 space-y-6" data-aos="fade-left">
                        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary uppercase tracking-wider">
                            Strategic Partnerships
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                            Building <span className="text-secondary">Global Ecosystems</span> for Success
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <p>
                                Oversees strategic operations and organizational development to drive sustainable growth and operational excellence. Leads the implementation of global partnership models and enhances the company's ecosystem through strategic alliances. Focuses on scaling the organization's impact by integrating innovative business practices into core workflows. Dedicated to fostering a culture of high performance and continuous improvement across all departments. Ensures long-term strategic objectives are met with precision and excellence.
                            </p>
                        </div>
                        <div className="pt-4">
                            <h3 className="text-xl font-bold text-primary">AKHILA</h3>
                            <p className="text-secondary font-semibold uppercase tracking-widest text-sm">Co-Founder & COO</p>
                        </div>
                    </div>

                    {/* Left Side - Co-Founder Image */}
                    <div className="flex-1 flex justify-center lg:justify-start" data-aos="fade-right">
                        <div className="relative">
                            {/* Attractive Background Shapes */}
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                            
                            {/* Static Image Container */}
                            <div className="relative flex flex-col items-center">
                                <img 
                                    src={CoFounderImage} 
                                    alt="Co-Founder" 
                                    className="relative w-full max-w-[450px] object-contain transform transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-32">
                    {leadershipPillars.map((pillar, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-300">
                                <pillar.icon className="text-3xl text-secondary group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{pillar.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                        </div>
                    ))}
                </div>

                {/* Core Team Section */}
                <div className="mt-32">
                    <TitleText 
                        align="center"
                        title="Our Strategic Leadership Team"
                        description="Meet the experts driving our mission forward."
                    />
                    
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 mt-20">
                        {coreTeam.map((member, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col group w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(25%-2rem)] min-w-[280px] max-w-[340px]" 
                                data-aos="fade-up" 
                                data-aos-delay={index * 100}
                            >
                                {/* Image with integrated border/shadow style from summary card */}
                                <div className="relative w-full overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem] aspect-[4/5] bg-white shadow-2xl border-b-8 border-r-8 border-secondary/20 group-hover:border-secondary transition-all duration-500 flex items-center justify-center">
                                    {member.image ? (
                                        <img 
                                            src={member.image} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transform transition-all duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            <FaUser className="text-7xl" />
                                        </div>
                                    )}
                                </div>

                                {/* Information integrated directly with the card */}
                                <div className="mt-8 space-y-3">
                                    <div className="text-center sm:text-left px-2">
                                        <h3 className="text-2xl font-extrabold text-primary tracking-tighter italic">
                                            {member.name}
                                        </h3>
                                        <p className="text-secondary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mt-1 whitespace-nowrap">
                                            {member.role}
                                        </p>
                                    </div>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium border-l-4 border-secondary/30 pl-4 py-1 mx-2 line-clamp-2">
                                         {member.shortResponsibility}
                                     </p>
                                     <button 
                                         onClick={() => openBio(member)}
                                         className="text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors ml-2 mt-1"
                                     >
                                         Read More →
                                     </button>
                                 </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bio Modal */}
                <Modal
                    title={null}
                    open={isModalOpen}
                    onCancel={closeBio}
                    footer={null}
                    centered
                    width="92%"
                    style={{ maxWidth: 600 }}
                    className="bio-modal"
                    styles={{
                        content: {
                            borderRadius: '1.5rem',
                            padding: 'clamp(1.25rem, 4vw, 2.5rem)',
                        }
                    }}
                >
                    {selectedMember && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-secondary/20 shrink-0 flex items-center justify-center bg-gray-100 text-gray-400">
                                    {selectedMember.image ? (
                                        <img 
                                            src={selectedMember.image} 
                                            alt={selectedMember.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FaUser className="text-4xl" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-xl sm:text-2xl font-extrabold text-primary italic leading-snug break-words">{selectedMember.name}</h3>
                                    <p className="text-secondary font-black uppercase tracking-wider text-xs">{selectedMember.role}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-lg font-bold text-primary border-b-2 border-secondary/10 pb-2">Professional Responsibility</h4>
                                <p className="text-gray-700 leading-relaxed text-base font-medium">
                                    {selectedMember.responsibility}
                                </p>
                            </div>
                            <button 
                                onClick={closeBio}
                                className="w-full bg-primary text-white font-bold py-3 min-h-[48px] rounded-xl hover:bg-secondary transition-all shadow-lg mt-4 flex items-center justify-center"
                            >
                                Close Profile
                            </button>
                        </div>
                    )}
                </Modal>

                <div className="mt-24 bg-secondary/5 rounded-4xl p-8 md:p-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Join Our Growing Mission</h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
                        Whether you are a fresh talent ready to start your journey or an experienced professional looking to make an impact, we invite you to join our passionate mission of transforming education and empowering the next generation of global leaders.
                    </p>
                    <button 
                        onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=hr@accenlearn.com&su=Resume Submission - [Your Name]", "_blank")}
                        className="bg-secondary text-white font-bold py-4 px-10 min-h-[48px] rounded-full hover:bg-secondary/90 transition-all shadow-lg hover:shadow-secondary/30 inline-flex items-center justify-center"
                    >
                        Upload Your Resume
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Leadership;
