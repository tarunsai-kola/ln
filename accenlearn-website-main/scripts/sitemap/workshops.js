/**
 * Workshop domain pages for AccenLearn across Tech, Management, and Medical categories.
 * @returns {Array<Object>} Array of workshop route objects
 */
export const getWorkshopRoutes = () => {
  return [
    // Tech Workshops
    { path: "/workshops/tech/artificial-intelligence", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/data-structures-and-algorithms", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/full-stack-software-development", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/machine-learning", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/data-science", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/cloud-computing", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/cyber-security", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/data-analytics", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/devops", priority: "0.9", changefreq: "weekly" },
    { path: "/workshops/tech/sql", priority: "0.9", changefreq: "weekly" },
    // Management Workshops
    { path: "/workshops/management/digital-marketing", priority: "0.8", changefreq: "monthly" },
    { path: "/workshops/management/human-resource", priority: "0.8", changefreq: "monthly" },
    { path: "/workshops/management/finance", priority: "0.8", changefreq: "monthly" },
    { path: "/workshops/management/business-analytics", priority: "0.8", changefreq: "monthly" },
    { path: "/workshops/management/stock-market", priority: "0.8", changefreq: "monthly" },
    { path: "/workshops/management/graphics-designing", priority: "0.8", changefreq: "monthly" },
    // Medical Workshops
    { path: "/workshops/medical/psychology", priority: "0.8", changefreq: "monthly" },
    { path: "/workshops/medical/medical-coding", priority: "0.8", changefreq: "monthly" },
  ];
};
