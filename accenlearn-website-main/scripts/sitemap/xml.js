import { escapeXml, formatDate } from "./utils.js";

/**
 * Generates sitemap.xml content compliant with sitemaps.org protocol.
 * Ensures strict escaping, URL class usage, and proper XML indentation.
 * @param {Array<Object>} routes Array of validated and sorted route objects
 * @param {string} baseUrl Base domain URL
 * @returns {string} Formatted XML string
 */
export const createXml = (routes, baseUrl) => {
  const urlNodes = routes
    .map((route) => {
      let locUrl;
      try {
        locUrl = route.fullUrl || new URL(route.path, baseUrl).href;
      } catch {
        // Fallback or skip if URL constructor fails
        return null;
      }

      const escapedLoc = escapeXml(locUrl);
      const lastmod = formatDate(route.lastmod);
      const changefreq = route.changefreq || "monthly";
      const priority = route.priority || "0.8";

      return `  <url>
    <loc>${escapedLoc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .filter(Boolean)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>
`;
};

/**
 * Advanced Feature: Generates a sitemap index file compliant with sitemaps.org protocol.
 * Useful when URL count exceeds 50,000 or when splitting sitemaps by content domain.
 * @param {Array<{ url: string, lastmod?: string }>} sitemaps Array of individual sitemap files
 * @returns {string} Formatted Sitemap Index XML string
 */
export const createSitemapIndex = (sitemaps) => {
  const sitemapNodes = sitemaps
    .map((item) => {
      const escapedUrl = escapeXml(item.url);
      const lastmod = formatDate(item.lastmod);
      return `  <sitemap>
    <loc>${escapedUrl}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapNodes}
</sitemapindex>
`;
};
