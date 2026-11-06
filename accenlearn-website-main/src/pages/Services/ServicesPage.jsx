import {
  FaCode,
  FaLaptopCode,
  FaRocket,
  FaUsers,
  FaTools,
  FaChalkboardTeacher,
  FaMicrophone,
  FaUserGraduate,
  FaIndustry,
  FaBriefcase,
  FaUserTie,
  FaProjectDiagram,
  FaUniversity,
  FaArrowRight,
} from "react-icons/fa";

import ServiceCategory from "../../components/services/ServiceCategory";
import CourseCategory from "../../components/services/CourseCategory";

import {
  industrySolutions,
  academicSolutions,
  corporateCourseCategories,
} from "../../data/servicesData";

const industryIcons = [
  <FaCode key="custom-software" />,
  <FaLaptopCode key="b2b-product" />,
  <FaRocket key="mvp" />,
  <FaUsers key="development-team" />,
  <FaTools key="maintenance" />,
];

const academicIcons = [
  <FaChalkboardTeacher key="workshop" />,
  <FaMicrophone key="seminar" />,
  <FaUserGraduate key="faculty-development" />,
  <FaIndustry key="industry-training" />,
  <FaBriefcase key="placement-training" />,
  <FaUserTie key="internship" />,
  <FaProjectDiagram key="project-guidance" />,
  <FaUniversity key="college-collaboration" />,
];

const ServicesPage = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById(
      "services-contact"
    );

    contactSection?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="pb-20">
      {/* Hero section */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-secondary px-6 py-16 text-white sm:px-10 lg:px-16 lg:py-24">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-white/75">
            AccenLearn Services
          </p>

          <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Technology, Training and Academic Solutions
          </h1>

          <p className="mb-8 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            AccenLearn supports businesses, colleges,
            professionals and students through software
            development, industry-oriented learning, corporate
            training and academic collaboration.
          </p>

          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-black text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-secondary hover:text-white"
          >
            Discuss Your Requirement
            <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Industry solutions */}
      <ServiceCategory
        eyebrow="For Businesses"
        title="Industry Solutions"
        description="Flexible technology services designed to help organisations build, launch, maintain and scale digital products."
        services={industrySolutions}
        icons={industryIcons}
      />

      {/* Academic solutions */}
      <ServiceCategory
        eyebrow="For Institutions"
        title="Academic Solutions"
        description="Industry-aligned programmes that support colleges, faculty members and students through practical training and collaboration."
        services={academicSolutions}
        icons={academicIcons}
      />

      {/* Corporate training */}
      <section className="my-10 rounded-[2rem] bg-primary px-6 py-14 sm:px-10 lg:px-14">
        <div className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            For Teams and Professionals
          </p>

          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
            Corporate Training
          </h2>

          <p className="text-base leading-8 text-white/75">
            Choose from more than 20 industry-focused courses
            covering technology, programming, management,
            design, medical domains and professional
            development.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {corporateCourseCategories.map((category) => (
            <CourseCategory
              key={category.category}
              category={category.category}
              courses={category.courses}
            />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
            Why AccenLearn
          </p>

          <h2 className="text-3xl font-black text-primary sm:text-4xl">
            Practical solutions with industry relevance
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: "20+",
              label: "Industry-focused courses",
            },
            {
              value: "100%",
              label: "Practical learning approach",
            },
            {
              value: "B2B",
              label: "Custom business solutions",
            },
            {
              value: "360°",
              label: "Training and career support",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="mb-2 text-3xl font-black text-secondary">
                {item.value}
              </p>

              <p className="text-sm font-semibold text-gray-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="services-contact"
        className="rounded-[2rem] border border-primary/10 bg-white px-6 py-12 text-center shadow-xl sm:px-10"
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
          Get Started
        </p>

        <h2 className="mb-4 text-3xl font-black text-primary sm:text-4xl">
          Looking for the right service or training programme?
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-gray-600">
          Share your requirement with our team and we will help
          you identify the most suitable solution, course or
          collaboration model.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-3 rounded-xl bg-secondary px-7 py-3 font-black text-white shadow-lg transition hover:bg-primary"
        >
          Contact Our Team
          <FaArrowRight />
        </a>
      </section>
    </div>
  );
};

export default ServicesPage;