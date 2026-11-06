import { useMemo, useState } from "react";
import CourseCard from "../../components/courses/CourseCard";
import CourseFilters from "../../components/courses/CourseFilters";
import SyllabusModal from "../../components/SyllabusModal";
import { courses } from "../../data/coursesData";

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);

  const categories = useMemo(() => {
    return [...new Set(courses.map((course) => course.category))];
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="pb-20">
      <section className="mb-12 rounded-[2rem] bg-gradient-to-br from-primary to-secondary px-6 py-16 text-white sm:px-10 lg:px-16">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white/75">
          AccenLearn Courses
        </p>

        <h1 className="mb-5 text-4xl font-black sm:text-5xl">
          Build industry-ready skills
        </h1>

        <p className="max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
          Explore practical courses across technology,
          programming, management, design, medical domains and
          professional development.
        </p>
      </section>

      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewSyllabus={() => {
                setSelectedCourse(course);
                setIsSyllabusOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="mb-2 text-xl font-bold text-primary">
            No courses found
          </h2>

          <p className="text-gray-600">
            Try another course name or category.
          </p>
        </div>
      )}

      <SyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
};

export default CoursesPage;