import React from 'react';
import { useNavigate } from 'react-router-dom';
import SharedBreadcrumb from '../../components/SharedBreadcrumb';
import TitleText from '../../components/TitleText';
import { trackEvent } from "../../utils/analytics";
import TekzowImg from "../../assets/Collaboration/Tekzow.png";
import WhiteDartImg from "../../assets/Collaboration/whiteDart.png";
import NskdImg from "../../assets/Collaboration/NSKD.jpeg";
import ZeonyImg from "../../assets/Collaboration/zeony_technologies29_cover.jpg";
import HeroImg from "../../assets/hero Section.png";
import { Collapse } from 'antd';
import { FaArrowRight } from 'react-icons/fa';

const Collaboration = () => {
    const navigate = useNavigate();

    const handleWhatsAppClick = () => {
        window.open("https://wa.me/919344322482", "_blank");
    };

    const handleContactClick = () => {
        trackEvent("CTA", "Click", "Become a Partner / Get in Touch");
        navigate("/contact");
    };

    const handleTekzowClick = () => {
        window.open("https://tekzow.com/", "_blank");
    };

    const handleNskdClick = () => {
        window.open("https://nskdtechno.com/", "_blank");
    };

    const handleZeonyClick = () => {
        window.open("https://zeonytechnologies.com/", "_blank");
    };


    return (
        <div className='min-h-screen w-full pt-4 sm:pt-6 pb-20 overflow-x-hidden'>
            <SharedBreadcrumb to="/collaboration" title="Collaboration" />
            
            {/* 1. Hero Section - Content Only */}
            <section className="relative w-full py-16 lg:py-24 bg-white px-4 md:px-16 overflow-hidden">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="space-y-8" data-aos="fade-up">
                        <p className="text-black font-bold uppercase tracking-widest text-sm">PARTNERSHIPS</p>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                            Partner with <span className="text-primary">Accenlearn</span> and transform the <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-cyan-500 to-green-500">future of education</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            At Accenlearn, we believe the best partnerships go beyond business—they create impact. As a Partner, you'll work alongside a global leader in higher education technology to deliver cutting-edge solutions and services to institutions, governments, and corporations worldwide.
                        </p>
                        <div className="flex justify-center">
                            <button 
                                onClick={handleContactClick}
                                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/20"
                            >
                                Become a Partner
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Collaboration - Moved Before H2 */}
            <div className="max-w-7xl mx-auto px-4 mb-20">
                <div className="w-full mb-16">
                    <TitleText 
                        align="center"
                        title="Strategic Collaboration"
                        description="How our leadership team works together to drive excellence." 
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-24">
                    <div className="p-8 rounded-[2rem] bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 transition-all duration-300" data-aos="fade-up">
                        <h4 className="text-xl font-bold text-primary mb-4">Interdisciplinary Synergy</h4>
                        <p className="text-gray-600 leading-relaxed">
                            Our technical and management teams collaborate daily to ensure that every educational program is both technically sound and market-relevant.
                        </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                        <h4 className="text-xl font-bold text-primary mb-4">Open Communication</h4>
                        <p className="text-gray-600 leading-relaxed">
                            We maintain a transparent environment where ideas flow freely across all levels of leadership, fostering innovation and rapid problem-solving.
                        </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                        <h4 className="text-xl font-bold text-primary mb-4">Shared Vision</h4>
                        <p className="text-gray-600 leading-relaxed">
                            Every member of our leadership team is unified by a single goal: empowering our students with the skills they need to succeed in their careers.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Intro Section */}
            <section className="py-20 bg-gray-50/50 px-4 border-y border-gray-100">
                <div className="max-w-4xl mx-auto text-center space-y-6" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">More than a partnership—a true extension of our team</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        When you work with Accenlearn, you become part of our team. Together, we'll help institutions excel, empower learners, and drive meaningful change.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 mt-20">
                {/* Tekzow Section - Reverted to Older Type */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24" data-aos="fade-right">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-white rounded-[2.5rem] blur-xl transition-all duration-500"></div>
                        <img 
                            src={TekzowImg} 
                            alt="Tekzow Collaboration" 
                            className="relative w-full rounded-[2rem] shadow-2xl object-cover transform group-hover:scale-[1.02] transition-all duration-500 bg-white"
                        />
                    </div>
                    <div className="space-y-6">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm">Corporate Partner</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                            Innovating with <span className="text-secondary">Tekzow</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our partnership with Tekzow brings industry-leading technical expertise directly to our students. Together, we are bridging the gap between theoretical knowledge and practical application in the ever-evolving tech landscape.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Direct mentorship from Tekzow experts",
                                "Exclusive internship opportunities",
                                "Co-developed curriculum for emerging technologies"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={handleTekzowClick}
                            className="mt-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-secondary/10"
                        >
                            Learn More About Tekzow
                        </button>
                    </div>
                </div>

                {/* WhiteDart Section - Reverted to Older Type */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24" data-aos="fade-left">
                    <div className="space-y-6 lg:order-1">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Strategic Partner</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                            Excellence with <span className="text-secondary">WhiteDart</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            WhiteDart collaboration empowers our learners with strategic insights and management excellence. This partnership ensures our students are not just technically proficient but also business-ready.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Business strategy workshops",
                                "Industry-standard project management training",
                                "Global networking opportunities"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group lg:order-2">
                        <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
                        <img 
                            src={WhiteDartImg} 
                            alt="WhiteDart Collaboration" 
                            className="relative w-full rounded-[2rem] shadow-2xl object-cover transform group-hover:scale-[1.02] transition-all duration-500"
                        />
                    </div>
                </div>

                {/* NSKD Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24" data-aos="fade-right">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-white rounded-[2.5rem] blur-xl transition-all duration-500"></div>
                        <img 
                            src={NskdImg} 
                            alt="NSKD Collaboration" 
                            className="relative w-full rounded-[2rem] shadow-2xl object-cover transform group-hover:scale-[1.02] transition-all duration-500 bg-white"
                        />
                    </div>
                    <div className="space-y-6">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm">Research & IPR Partner</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                            Empowering Innovation with <span className="text-secondary">NSKD</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our collaboration with NSKD Firm drives research excellence and academic innovation. Together, we guide learners through intellectual property rights, patent drafting, research methodologies, and publication strategies.
                        </p>
                        <div className="space-y-4">
                            {[
                                "IPR and patent drafting guidance",
                                "Research methodology & publication workshops",
                                "Support for student research and publications"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={handleNskdClick}
                            className="mt-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-secondary/10"
                        >
                            Learn More About NSKD
                        </button>
                    </div>
                </div>

                {/* Zeony Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24" data-aos="fade-left">
                    <div className="space-y-6 lg:order-1">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Technology Partner</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                            Innovating with <span className="text-secondary">Zeony Technologies</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our partnership with Zeony Technologies equips students with cutting-edge expertise in Web Development, Mobile App Development, and UI/UX Design. Together, we provide practical exposure to real-world software products and digital solutions.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Hands-on projects in custom software engineering",
                                "UI/UX design & prototyping bootcamps",
                                "Internship and career opportunities in digital solutions"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={handleZeonyClick}
                            className="mt-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-secondary/10"
                        >
                            Learn More About Zeony
                        </button>
                    </div>
                    <div className="relative group lg:order-2">
                        <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
                        <img 
                            src={ZeonyImg} 
                            alt="Zeony Technologies Collaboration" 
                            className="relative w-full rounded-[2rem] shadow-2xl object-cover transform group-hover:scale-[1.02] transition-all duration-500"
                        />
                    </div>
                </div>

                {/* Final CTA Section */}
                <div className="mt-24 mb-32 py-20 text-center space-y-8" data-aos="zoom-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Ready to grow with us?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Becoming part of the Accenlearn Partner Program means joining a team that values collaboration, innovation, and shared success.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 pt-6">
                        <button 
                            onClick={handleContactClick}
                            className="bg-primary text-white hover:bg-primary/90 font-bold py-4 px-10 rounded text-lg transition-all"
                        >
                            Become A Partner
                        </button>
                        <button 
                            onClick={handleWhatsAppClick}
                            className="border-2 border-primary text-primary hover:bg-primary/5 font-bold py-4 px-10 rounded text-lg transition-all"
                        >
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collaboration;
