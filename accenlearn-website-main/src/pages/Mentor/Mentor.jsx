import React, { useState } from 'react';
import { Modal } from 'antd';
import SharedBreadcrumb from '../../components/SharedBreadcrumb';
import TitleText from '../../components/TitleText';
import { IMAGE_HELPER } from '../../shared/ImageHelper';

const Mentor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);

    const mentors = [
        {
            image: IMAGE_HELPER.MENTOR_CYBER,
            name: "Dr. M. Kumar M.E., Ph.D.",
            role: "Cyber Security Specialist",
            domainSpecialist: "Cyber Security Specialist",
            worksAt: "Sriram Engineering College",
            experience: "15+ years",
            resume: IMAGE_HELPER.MENTOR_CV_KUMAR,
            bioFile: IMAGE_HELPER.MENTOR_BIO_KUMAR
        },
        {
            image: IMAGE_HELPER.MENTOR_USHARANI,
            name: "Dr. M. Usharani M.E., Ph.D., MISTE, MIE",
            role: "Technical Advisor",
            domainSpecialist: "Technical Advisor",
            worksAt: "PSV college",
            experience: "26+ years",
            resume: IMAGE_HELPER.MENTOR_CV_USHARANI
        },
        {
            image: IMAGE_HELPER.MENTOR_AI,
            name: "Dr. Ranjithkumar",
            role: "AI Specialist",
            domainSpecialist: "Artificial Intelligence",
            worksAt: "Nuvama Wealth management pvt Ltd",
            experience: "10+ years",
            resume: IMAGE_HELPER.MENTOR_CV_RANJITH
        },
        {
            image: IMAGE_HELPER.MENTOR_MEDICAL,
            name: "Mrs. Monisha",
            role: "Medical Coding Specialist",
            domainSpecialist: "Medical Coding Specialist",
            worksAt: "Omega Healthcare",
            experience: "5+ years",
            resume: IMAGE_HELPER.MENTOR_CV_MONISHA
        },
        {
            image: IMAGE_HELPER.MENTOR_GRAPHIC,
            name: "Mr. Kailash U",
            role: "Graphic Designer Mentor",
            domainSpecialist: "Graphic Design & Creative Visuals",
            worksAt: "Aeris",
            experience: "2+ years",
            externalProfile: "https://www.behance.net/kailashcreatio"
        },
        {
            image: IMAGE_HELPER.MENTOR_SAKSHI,
            name: "Sakshi",
            role: "Frontend Engineer",
            domainSpecialist: "Frontend Engineer",
            worksAt: "Tekzow",
            experience: "1+ years"
        },
        {
            image: IMAGE_HELPER.MENTOR_ANJALI,
            name: "Anjali",
            role: "MERN Stack + AI Engineer",
            domainSpecialist: "MERN Stack + AI Engineer",
            worksAt: "Accenlearn",
            experience: "4+ years"
        },
        {
            image: IMAGE_HELPER.MENTOR_ARJUN,
            name: "Arjun",
            role: "MERN Stack + App Development",
            domainSpecialist: "MERN Stack + App Development",
            worksAt: "Whitedart",
            experience: "4+ years"
        }
    ];

    const openBio = (mentor) => {
        if (mentor.externalProfile) {
            window.open(mentor.externalProfile, '_blank');
            return;
        }
        setSelectedMentor(mentor);
        setIsModalOpen(true);
    };

    const closeBio = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMentor(null), 300);
    };

    return (
        <div className='min-h-screen w-full pt-4 sm:pt-6 pb-20'>
            <SharedBreadcrumb to="/mentor" title="Mentors" />
            
            <div className="max-w-7xl mx-auto px-4">
                <div className="mt-20">
                    <TitleText 
                        align="center"
                        title="Meet Our Expert Mentors"
                        description="The driving force behind our industry-aligned training programs."
                    />
                    
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 mt-20">
                        {mentors.map((mentor, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col group w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] min-w-[280px] max-w-[340px]" 
                                data-aos="fade-up" 
                                data-aos-delay={index * 100}
                            >
                                <div className="relative w-full overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem] aspect-[4/5] bg-white shadow-2xl border-b-8 border-r-8 border-secondary/20 group-hover:border-secondary transition-all duration-500">
                                    <img 
                                        src={mentor.image} 
                                        alt={mentor.name} 
                                        className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <div className="mt-8 space-y-4 px-2">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-extrabold text-primary tracking-tighter italic line-clamp-2">
                                            {mentor.name}
                                        </h3>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-secondary font-black uppercase tracking-wider text-[10px] md:text-xs">
                                                {mentor.domainSpecialist}
                                            </p>
                                            {mentor.worksAt && (
                                                <p className="text-primary font-bold text-[10px] md:text-xs">
                                                    Working at: <span className="text-secondary">{mentor.worksAt}</span>
                                                </p>
                                            )}
                                            <p className="text-primary font-bold text-[10px] md:text-xs italic">
                                                Experience: <span className="text-secondary">{mentor.experience}</span>
                                            </p>
                                        </div>
                                    </div>

                                     <div className="pt-2">
                                        <button 
                                            onClick={() => openBio(mentor)}
                                            className="w-full bg-secondary text-white font-bold py-3 rounded-xl hover:bg-primary transition-all text-sm uppercase tracking-widest shadow-lg active:scale-95"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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
                    {selectedMentor && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-secondary/20 shrink-0">
                                    <img 
                                        src={selectedMentor.image} 
                                        alt={selectedMentor.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-xl sm:text-2xl font-extrabold text-primary italic leading-snug break-words">{selectedMentor.name}</h3>
                                    <p className="text-secondary font-black uppercase tracking-wider text-[10px] mb-1">{selectedMentor.domainSpecialist}</p>
                                    {selectedMentor.worksAt && (
                                        <p className="text-primary font-bold text-xs">Working at: <span className="text-secondary">{selectedMentor.worksAt}</span></p>
                                    )}
                                    <p className="text-primary font-bold text-xs italic">Experience: <span className="text-secondary">{selectedMentor.experience}</span></p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                {selectedMentor.bioFile && (
                                    <button 
                                        onClick={() => window.open(selectedMentor.bioFile, '_blank')}
                                        className="w-full bg-secondary text-white font-bold py-3 min-h-[48px] rounded-xl hover:bg-secondary/90 transition-all shadow-lg uppercase tracking-widest text-xs flex items-center justify-center"
                                    >
                                        View Bio
                                    </button>
                                )}
                                {selectedMentor.resume && (
                                    <button 
                                        onClick={() => window.open(selectedMentor.resume, '_blank')}
                                        className="w-full bg-primary text-white font-bold py-3 min-h-[48px] rounded-xl hover:bg-primary/90 transition-all shadow-lg uppercase tracking-widest text-xs flex items-center justify-center"
                                    >
                                        {selectedMentor.bioFile ? "View CV" : "View Full Resume / CV"}
                                    </button>
                                )}
                                <button 
                                    onClick={closeBio}
                                    className="w-full bg-primary/10 text-primary font-bold py-3 min-h-[48px] rounded-xl hover:bg-primary/20 transition-all text-xs uppercase tracking-widest flex items-center justify-center"
                                >
                                    Close Profile
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default Mentor;
