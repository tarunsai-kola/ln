import { FaCheckCircle } from "react-icons/fa";
import { courseBenefits } from "../../data/coursesData";

const BenefitsSection = () => {
  return (
    <section className="rounded-2xl bg-primary p-6 text-white sm:p-8">
      <h2 className="mb-6 text-2xl font-black">
        Benefits included with every course
      </h2>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {courseBenefits.map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-3 text-sm leading-7 text-white/90"
          >
            <FaCheckCircle className="mt-1 shrink-0 text-secondary" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BenefitsSection;