/**
 * Generates SEO compliant robots.txt content referencing the absolute sitemap URL.
 * @param {string} baseUrl The base domain (e.g. https://accenlearn.com)
 * @param {string} [customSitemapPath="/sitemap.xml"] Relative path to the sitemap file
 * @returns {string} Formatted robots.txt content
 */
export const generateRobotsTxt = (baseUrl, customSitemapPath = "/sitemap.xml") => {
  const sitemapUrl = new URL(customSitemapPath, baseUrl).href;

  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
};
