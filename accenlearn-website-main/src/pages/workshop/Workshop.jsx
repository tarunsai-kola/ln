import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SharedBreadcrumb from "../../components/SharedBreadcrumb";
import TitleText from "../../components/TitleText";
import Feedback from "../Home/Feedback";
import Sponsers from "../Home/Sponsers";
import Workshop from "../Home/Workshop";
import { useLocation } from "react-router-dom";
import WorkshopHeader from "./WorkshopHeader";
import { IMAGE_HELPER } from "../../shared/ImageHelper";
import { WORKSHOP_CONTENT, DEFAULT_WORKSHOP_CONTENT } from "../../shared/workshopContent";
import ProgramCTA from "../../components/ProgramCTA";
import OverviewModal from "../../components/OverviewModal";
import IbmCertificationPath from "../../components/IbmCertificationPath";

const Workshopindex = ({ title }) => {
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);
    const content = WORKSHOP_CONTENT[title] || DEFAULT_WORKSHOP_CONTENT;
    const resolvedProgram = {
        ...content,
        title: content.title || title,
        duration: content.duration || "2–3 Months",
        brochure: content.brochure || "/brochures/default.pdf",
        highlights: content.highlights || [
            "Designed for students, graduates and professionals",
            "NSDC Accredited",
            "Skill India Certified",
            "Industry Expert Trainers",
            "100+ Internship Partners",
           
        ]
    };
    
    const featureList = content.features;

    const highlightStats = [
        { label: "Professionals Career-Enabled", value: "150+" },
        { label: "Peak Compensation Achieved", value: "12+ LPA" },
        { label: "Career Transition Success Rate", value: "85%+" },
        { label: "Industry & Hiring Alliances", value: "60+" },
    ];

    const offerings = [
        {
            title: "Workshop",
            description:
                "Immersive, project-based learning led by industry experts to equip learners with real-world, job-ready skills.",
        },
        {
            title: "Training",
            description:
                "Comprehensive mentor-led training, spanning foundational to advanced skills, delivered through immersive, multi-modal learning experiences.",
        },
        {
            title: "Placement Assistance",
            description:
                "Structured training in aptitude, personality, mock interviews, and HR readiness to ensure job success.",
        },
    ];

    const certBenefits = [
        "Earn a globally recognized Google for Education Certificate",
        "Gain credibility with schools, companies, and tech recruiters",
        "Learn modern digital tools used by educators and institutions worldwide",
        "Strengthen your academic & professional profile with Google-certified expertise",
        "Showcase your commitment to digital learning and innovation",
    ];

    const plans = [
        {
            name: "Skill Accelerator Kit",
            price: "₹9,999",
            perks: [
                "Recorded Sessions",
                "Hands-on Projects",
                "IBM Certification Pathway",
                "1:1 Mentoring",
                "Live Sessions",
                "Doubt Clear Sessions",
                "Mentor Guidance",
            ],
        },
        {
            name: "Career Launchpad Kit",
            price: "₹17,999",
            perks: [
                "Recorded Sessions",
                "Hands-on Projects",
                "IBM Certification Pathway",
                "1:1 Mentoring",
                "Live Sessions",
                "Doubt Clear Sessions",
                "Mentor Guidance",
                "Job Accelerator",
                "Interview Mastery",
                "Corporate Entry",
                "Workplace Success",
                "Industry-Ready",
            ],
        },
    ];

    const pillars = [
        {
            title: "Strategic Career Alignment",
            description:
                "Identify and pursue learning pathways tailored to long-term professional objectives and industry demands.",
        },
        {
            title: "Curated Expert-Led Curriculum",
            description:
                "Access meticulously designed courses delivered by seasoned industry leaders, ensuring relevance and depth.",
        },
        {
            title: "Immersive Project-Based Learning",
            description:
                "Engage in complex, real-world projects that foster critical thinking and advanced problem-solving skills.",
        },
        {
            title: "Verified Certification for Industry Recognition",
            description:
                "Earn accredited certificates that validate your expertise and enhance your professional credibility.",
        },
        {
            title: "Comprehensive Career Acceleration Support",
            description:
                "Benefit from personalized mentorship, networking opportunities, and job placement assistance to fast-track growth.",
        },
    ];

    const { pathname } = useLocation();

    const handleOpenOverviewModal = () => {
        setIsOverviewOpen(true);
    };

    const handleCloseOverviewModal = () => {
        setIsOverviewOpen(false);
    };

    return (
        <div className="min-h-screen w-full pt-4 sm:pt-6 pb-16">
            <div className=" mx-auto px-4">
                <SharedBreadcrumb to={pathname} title={title} />
                <WorkshopHeader title={title} />

                <section className="relative overflow-hidden rounded-3xl shadow-xl p-5 sm:p-8 md:p-12 mt-6">

                    <div className="relative space-y-6">
                        <div className="inline-flex items-center gap-3 rounded-full bg-secondary/10 px-4 py-2 text-xs sm:text-sm font-semibold text-secondary">
                            {title}
                        </div>
                        <div className="space-y-3 text-center sm:text-left">
                            <p className="text-sm sm:text-base md:text-lg font-semibold text-primary/80">
                                {content.tagline}
                            </p>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-primary">
                                {content.headline}
                            </h1>
                            <p className="global_text max-w-3xl mx-auto sm:mx-0">
                                {content.description}
                            </p>
                            <p className="global_text max-w-3xl mx-auto sm:mx-0">
                                AccenLearn aligns learning with real industry demand, not just certifications. We build professionals
                                who are adaptable, capable, and future-ready.
                            </p>
                        </div>

                        <ProgramCTA
                            duration={resolvedProgram.duration}
                            brochureUrl={resolvedProgram.brochure}
                            onEnroll={handleOpenOverviewModal}
                            onDownload={handleOpenOverviewModal}
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {featureList.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 rounded-2xl bg-primary border border-primary/10 px-4 py-3"
                                >
                                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                                    <p className="text-sm md:text-base text-white">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <TitleText
                        align="left"
                        title="Key Highlights"
                        description="Driving measurable career outcomes through skill excellence."
                    />
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {highlightStats.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl  shadow-md border border-gray-100 p-6 text-center"
                            >
                                <div className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">
                                    {item.value}
                                </div>
                                <p className="text-primary font-semibold">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <TitleText align="left" title="What We Offer" description="Immersive learning tracks for every stage." />
                    <div className="grid gap-6 md:grid-cols-3">
                        {offerings.map((item, idx) => (
                            <div
                                key={idx}
                                className="h-full rounded-2xl  shadow-lg  bg-secondary p-6 flex flex-col gap-3"
                            >
                                <div className="inline-flex items-center gap-2 text-white font-semibold">
                                    <span className="h-2 w-2 rounded-full bg-white" />
                                    {item.title}
                                </div>
                                <p className="text-sm md:text-base text-white leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section >
                    <Sponsers provides={true} />
                    <Workshop certificate={true} />
                </section>

                <section className="mt-12">
                    <TitleText align="left" title="Google Certification Path" description="Why and how to get certified." />
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2 rounded-2xl  border border-gray-100 shadow-md p-6 space-y-4">
                            <p className="text-lg font-semibold text-primary">Why Should You Get GOOGLE Certified?</p>
                            <div className="space-y-2">
                                {certBenefits.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                                        <p className="text-sm md:text-base text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-lg font-bold">How to Get Certified?</p>
                            <p className="text-sm text-primary/80">
                                Complete Google’s online training modules and pass a certification exam to earn your official Google for Education Certificate.
                            </p>
                            <div className="flex flex-col gap-2 text-sm font-semibold">
                                <div className="flex items-center justify-between">
                                    <span>Exam Duration:</span>
                                    <span className="text-secondary">1-2 hour</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Mode:</span>
                                    <span className="text-secondary">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-primary text-white shadow-md p-6 space-y-3">

                            <img src={IMAGE_HELPER?.GOOGLE} alt="Google Certificate" className="w-full h-full object-cover rounded-2xl" />
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <TitleText
                        align="left"
                        title="Choose Your Perfect Plan"
                        description="Unlock your true potential with AccenLearn Solutions."
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                        {plans.map((plan, idx) => {
                            const isFeatured = idx === 1;

                            return (
                                <div
                                    key={idx}
                                    className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 flex flex-col gap-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl `}
                                >
                                    {isFeatured && (
                                        <span className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                            Most Popular
                                        </span>
                                    )}

                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <p className={`text-xl font-bold text-black`}>{plan.name}</p>
                                            <p className={`text-sm font-medium text-black`}>
                                                Designed for ambitious learners ready to move faster
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {plan.perks.map((perk, perkIdx) => (
                                            <div
                                                key={perkIdx}
                                                className={`flex items-start gap-3 text-sm md:text-base text-black
                                                    }`}
                                            >
                                                <span
                                                    className={`mt-2 h-2.5 w-2.5 rounded-full bg-secondary
                                                        }`}
                                                />
                                                <span>{perk}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-4">
                                        <p className="text-3xl font-extrabold text-secondary">{plan.price}</p>
                                        <button
                                            className={`inline-flex cursor-pointer  items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition shadow bg-secondary text-primary hover:opacity-90`}
                                            aria-label={`Enroll in ${plan.name}`}
                                            onClick={handleOpenOverviewModal}
                                        >
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="mt-12">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary text-white p-8 md:p-12 shadow-2xl">
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                            <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-secondary/40 blur-3xl" />
                        </div>

                        <div className="relative grid gap-10 md:grid-cols-[1.05fr,1.15fr] items-start">
                            <div className="space-y-4 md:space-y-6 max-w-2xl">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                                    Why AccenLearn
                                </span>
                                <p className="text-2xl md:text-3xl font-extrabold leading-tight">
                                    Empower your future with expert mentors and career-focused, advanced learning pathways.
                                </p>
                                <p className="text-sm md:text-base text-white/85">
                                    Transform learning into real-world expertise through immersive projects, guided mentorship,
                                    and clear milestones that keep you moving toward your goals.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {pillars.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/15"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition group-hover:opacity-100" />
                                        <div className="relative flex items-start gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-lg font-extrabold text-white shadow-inner">
                                                {idx + 1}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-lg font-semibold">{item.title}</p>
                                                <p className="text-sm text-white/80">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <Feedback />
                </section>
            </div>

            <OverviewModal
                isOpen={isOverviewOpen}
                onClose={handleCloseOverviewModal}
                program={resolvedProgram}
            />
        </div>
    );
};

export default Workshopindex;