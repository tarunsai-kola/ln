const CourseFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2">
      <input
        type="search"
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search courses"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <select
        value={selectedCategory}
        onChange={(event) =>
          onCategoryChange(event.target.value)
        }
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="All">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseFilters;