import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaClock,
  FaGraduationCap,
} from "react-icons/fa";

const CourseCard = ({ course, onViewSyllabus }) => {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {course.category}
        </span>

        <FaGraduationCap className="text-2xl text-secondary" />
      </div>

      <h3 className="mb-3 text-xl font-black text-gray-900">
        {course.name}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-7 text-gray-600">
        {course.shortDescription}
      </p>

      <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
        <FaClock className="text-secondary" />
        1, 2 and 3-month options
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <button
          type="button"
          onClick={onViewSyllabus}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
        >
          View Syllabus
        </button>

        <Link
          to={`/courses/${course.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-secondary"
        >
          View Course
          <FaArrowRight />
        </Link>
      </div>
    </article>
  );
};

export default CourseCard;