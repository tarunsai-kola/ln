import React, { useEffect, useState } from "react";
import { IoClose, IoChevronDown } from "react-icons/io5";

const defaultCourse = {
  title: "Course Syllabus",
  syllabus: [
    {
      title: "Module 1: Introduction to Course",
      lessons: [
        "Lesson 1: Course Overview",
        "Lesson 2: Outcomes and Expectations",
        "Lesson 3: Tools and Setup",
      ],
    },
    {
      title: "Module 2: Core Concepts",
      lessons: [
        "Lesson 1: Concepts and Foundations",
        "Lesson 2: Practical Application",
        "Lesson 3: Project Planning",
      ],
    },
  ],
};

const SyllabusModal = ({ isOpen, onClose, course = defaultCourse }) => {
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const syllabus = course.syllabus ?? course.modules ?? [];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white text-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close syllabus modal"
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <IoClose size={22} />
        </button>

        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <div className="space-y-3">
            <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
              Course Outline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {course.title}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Review the full course syllabus with module-level breakdowns and lesson-level detail.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 shadow-sm">
              <div className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left bg-white">
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-[0.25em] text-secondary/90">Course</p>
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {course.title}
                  </h3>
                </div>
                <IoChevronDown className="h-5 w-5 shrink-0 text-slate-500" />
              </div>

              <div className="space-y-4 border-t border-slate-200 px-5 py-6 sm:px-6">
                {syllabus.map((module, moduleIndex) => {
                  const moduleKey = `module-${moduleIndex}`;
                  const isModuleOpen = activeModule === moduleKey;

                  return (
                    <div
                      key={moduleKey}
                      className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-50"
                        onClick={() => setActiveModule((current) => (current === moduleKey ? null : moduleKey))}
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {module.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {module.lessons.length} lessons
                          </p>
                        </div>

                        <IoChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${isModuleOpen ? "rotate-180" : "rotate-0"}`}
                        />
                      </button>

                      <div className={`overflow-hidden transition-[max-height] duration-300 ${isModuleOpen ? "max-h-[800px]" : "max-h-0"}`}>
                        <div className="space-y-3 border-t border-slate-200 px-4 py-4 sm:px-5 sm:py-5">
                          <ol className="space-y-2 text-sm text-slate-700 md:text-base">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li
                                key={lessonIndex}
                                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                              >
                                <span className="font-medium text-slate-900">{lesson}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusModal;
