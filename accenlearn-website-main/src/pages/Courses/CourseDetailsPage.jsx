import { useState } from "react";
import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaGraduationCap,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa";

import PricingSelector from "../../components/courses/PricingSelector";
import BenefitsSection from "../../components/courses/BenefitsSection";
import SyllabusModal from "../../components/SyllabusModal";
import { courses } from "../../data/coursesData";

const CourseDetailsPage = () => {
  const { slug } = useParams();

  const course = courses.find(
    (item) => item.slug === slug
  );

  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    mode: "online",
    duration: "1 Month",
    mrp: 8999,
    offerPrice: 3999,
    preRegistration: 1000,
  });

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const whatsappMessage = encodeURIComponent(
    `Hello AccenLearn, I am interested in ${course.name}. I would like more information about the ${selectedPlan.mode} ${selectedPlan.duration} batch.`
  );

  const whatsappUrl =
    `https://wa.me/9344322482?text=${whatsappMessage}`;

  const handlePurchase = () => {
    console.log("Selected purchase:", {
      course: course.name,
      ...selectedPlan,
    });

    // Replace later with payment gateway integration.
    alert(
      "Payment integration will be connected in the next step."
    );
  };

  return (
    <div className="pb-20">
      <Link
        to="/courses"
        className="mb-8 inline-flex items-center gap-2 font-bold text-primary hover:text-secondary"
      >
        <FaArrowLeft />
        Back to courses
      </Link>

      <section className="mb-10 rounded-[2rem] bg-gradient-to-br from-primary to-secondary px-6 py-14 text-white sm:px-10 lg:px-14">
        <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
          {course.category}
        </span>

        <h1 className="mb-5 text-4xl font-black sm:text-5xl">
          {course.name}
        </h1>

        <p className="max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
          {course.description}
        </p>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <CourseInfoSection
            title="Curriculum"
            items={course.curriculum}
          />

          <CourseInfoSection
            title="Skills Covered"
            items={course.skillsCovered}
          />

          <CourseInfoSection
            title="Eligibility"
            items={course.eligibility}
          />

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-black text-primary">
              Trainer Details
            </h2>

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FaUserTie size={24} />
              </div>

              <div>
                <h3 className="font-black text-gray-900">
                  {course.trainer.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {course.trainer.role}
                </p>

                <p className="mt-1 text-sm font-semibold text-secondary">
                  {course.trainer.experience} experience
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-black text-primary">
              Batch Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard
                icon={<FaClock />}
                label="Duration"
                value="1, 2 or 3 months"
              />

              <InfoCard
                icon={<FaGraduationCap />}
                label="Next Batch"
                value={course.nextBatch}
              />
            </div>
          </section>

          <BenefitsSection />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <PricingSelector
            onSelectionChange={setSelectedPlan}
          />

          <button
            type="button"
            onClick={() => setIsSyllabusOpen(true)}
            className="w-full rounded-xl border border-slate-200 bg-white px-6 py-4 font-black text-slate-900 shadow-sm transition hover:bg-slate-100"
          >
            View Syllabus
          </button>

          <button
            type="button"
            onClick={handlePurchase}
            className="w-full rounded-xl bg-secondary px-6 py-4 font-black text-white shadow-lg transition hover:bg-primary"
          >
            Purchase Now
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-green-500 px-6 py-4 font-black text-green-600 transition hover:bg-green-500 hover:text-white"
          >
            <FaWhatsapp size={22} />
            Talk to Our Team
          </a>
        </aside>
      </div>

      <SyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
        course={course}
      />
    </div>
  );
};

const CourseInfoSection = ({ title, items }) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="mb-5 text-2xl font-black text-primary">
      {title}
    </h2>

    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-sm leading-7 text-gray-600"
        >
          <FaCheckCircle className="mt-1 shrink-0 text-secondary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
    <div className="mt-1 text-secondary">{icon}</div>

    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 font-bold text-gray-800">
        {value}
      </p>
    </div>
  </div>
);

export default CourseDetailsPage;