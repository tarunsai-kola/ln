import blogs from "../../src/data/blogs.js";

/**
 * Transforms blog data from src/data/blogs.js into standardized route objects.
 * Handles missing slugs and falls back gracefully according to SEO best practices:
 * blog.updatedAt -> blog.date -> blog.publishedDate -> current date.
 * @returns {Array<Object>} Array of blog route objects
 */
export const getBlogRoutes = () => {
  if (!Array.isArray(blogs)) {
    console.error("✖ [Error] Invalid blogs data loaded from src/data/blogs.js. Expected an array.");
    return [];
  }

  const validBlogRoutes = [];

  for (const blog of blogs) {
    if (!blog || typeof blog !== "object") {
      console.warn("⚠ [Skipped] Invalid blog entry encountered:", blog);
      continue;
    }

    if (!blog.slug || typeof blog.slug !== "string" || blog.slug.trim() === "") {
      console.warn("⚠ [Skipped] Blog entry missing a valid slug property:", blog.id || blog.title || blog);
      continue;
    }

    const cleanSlug = blog.slug.startsWith("/") ? blog.slug.slice(1) : blog.slug.trim();
    const lastmodCandidate = blog.updatedAt || blog.date || blog.publishedDate || undefined;

    validBlogRoutes.push({
      path: `/resources/blog/${cleanSlug}`,
      priority: "0.8",
      changefreq: "monthly",
      lastmod: lastmodCandidate,
    });
  }

  return validBlogRoutes;
};
