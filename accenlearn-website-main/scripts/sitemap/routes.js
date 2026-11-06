/**
 * Core static pages and resource hubs for AccenLearn.
 * Easily extensible for future modular content without altering core generator logic.
 * @returns {Array<Object>} Array of route objects
 */
export const getStaticRoutes = () => {
  return [
    {
      path: "/",
      priority: "1.0",
      changefreq: "weekly",
    },
    {
      path: "/about",
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      path: "/mentor",
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      path: "/leadership",
      priority: "0.7",
      changefreq: "monthly",
    },
    {
      path: "/collaboration",
      priority: "0.7",
      changefreq: "monthly",
    },
    {
      path: "/internship",
      priority: "0.9",
      changefreq: "weekly",
    },
    {
      path: "/contact",
      priority: "0.8",
      changefreq: "monthly",
    },
    {
      path: "/resources/blogs",
      priority: "0.9",
      changefreq: "weekly",
    },
    {
      path: "/resources/faq",
      priority: "0.7",
      changefreq: "monthly",
    },
    {
      path: "/resources/resume-templates",
      priority: "0.8",
      changefreq: "monthly",
    },
  ];
};
