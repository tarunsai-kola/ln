import { FaCheckCircle } from "react-icons/fa";

const CourseCategory = ({ category, courses }) => {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
      <h3 className="mb-5 text-xl font-bold text-white">
        {category}
      </h3>

      <ul className="space-y-3">
        {courses.map((course) => (
          <li
            key={course}
            className="flex items-start gap-3 text-sm leading-6 text-white/85"
          >
            <FaCheckCircle className="mt-1 shrink-0 text-secondary" />

            <span>{course}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default CourseCategory;