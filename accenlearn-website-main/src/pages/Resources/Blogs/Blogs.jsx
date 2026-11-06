import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../../data";
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaClock, 
  FaArrowRight,
  FaBookOpen,
  FaBriefcase,
  FaRobot,
  FaCode,
  FaPaintBrush,
  FaShieldAlt
} from "react-icons/fa";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Career & Resumes":
      case "Resume":
        return <FaBriefcase className="text-primary/40 text-5xl group-hover:scale-110 transition-transform duration-300" />;
      case "AI & Data Science":
        return <FaRobot className="text-primary/40 text-5xl group-hover:scale-110 transition-transform duration-300" />;
      case "Tech & Engineering":
        return <FaCode className="text-primary/40 text-5xl group-hover:scale-110 transition-transform duration-300" />;
      case "Design & UI/UX":
        return <FaPaintBrush className="text-primary/40 text-5xl group-hover:scale-110 transition-transform duration-300" />;
      case "Interviews":
        return <FaBookOpen className="text-primary/40 text-5xl group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <FaBookOpen className="text-primary/40 text-5xl group-hover:scale-110 transition-transform duration-300" />;
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-4 sm:pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-secondary font-bold text-sm tracking-wider uppercase bg-secondary/10 px-4 py-1.5 rounded-full inline-block mb-3">
          Our Library
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-primary mb-4">
          AccenLearn Resources & Blogs
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Explore expert career tips, interview advice, and guides tailored to help you land your dream tech job.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-md border border-gray-100 mb-10">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-gray-700 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group hover:-translate-y-1"
            >
              <div className="relative h-52 bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/20 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/15">
                  {getCategoryIcon(blog.category)}
                </div>

                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : null}
                <div className="absolute z-20 top-4 left-4 bg-white/95 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-100/50">
                  {blog.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-secondary" />
                      {blog.publishedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-secondary" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end mt-auto">
                  <Link
                    to={`/resources/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors group/btn"
                  >
                    Read More
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-xl mx-auto">
          <p className="text-gray-500 text-lg font-medium mb-2">No blogs found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;