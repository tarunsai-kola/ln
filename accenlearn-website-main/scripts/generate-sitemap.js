import path from "path";
import { fileURLToPath } from "url";
import { getStaticRoutes } from "./sitemap/routes.js";
import { getWorkshopRoutes } from "./sitemap/workshops.js";
import { getBlogRoutes } from "./sitemap/blog-routes.js";
import {
  validateRoute,
  removeDuplicates,
  sortRoutes,
  writeFile,
} from "./sitemap/utils.js";
import { createXml } from "./sitemap/xml.js";
import { generateRobotsTxt } from "./sitemap/robots.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.accenlearn.com/";

/**
 * Main Enterprise Sitemap & Robots.txt Generator Orchestrator.
 * Follows Google Search Central recommendations and sitemaps.org protocol.
 */
const generateEnterpriseSitemap = () => {
  const startTime = performance.now();
  console.info("🚀 [Sitemap Generator] Starting enterprise sitemap and robots.txt generation...");

  // 1. Collect all domain routes from modular content sources
  const rawRoutes = [
    ...getStaticRoutes(),
    ...getWorkshopRoutes(),
    ...getBlogRoutes(),
  ];

  // 2. Validate every route and track skipped invalid entries
  let invalidCount = 0;
  const validRoutes = rawRoutes.filter((route) => {
    const isValid = validateRoute(route);
    if (!isValid) invalidCount++;
    return isValid;
  });

  // 3. Deduplicate URLs automatically using Map and absolute URLs
  const { uniqueRoutes, duplicateCount } = removeDuplicates(validRoutes, BASE_URL);

  // 4. Alphabetically sort every URL before XML generation
  const sortedRoutes = sortRoutes(uniqueRoutes);

  // 5. Generate compliant XML with escaped special characters
  const sitemapXml = createXml(sortedRoutes, BASE_URL);

  // 6. Generate compliant robots.txt
  const robotsTxt = generateRobotsTxt(BASE_URL);

  // 7. Write files safely to public directory
  const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
  const robotsPath = path.resolve(__dirname, "../public/robots.txt");

  const isSitemapWritten = writeFile(sitemapPath, sitemapXml);
  const isRobotsWritten = writeFile(robotsPath, robotsTxt);

  const endTime = performance.now();
  const generationTimeMs = (endTime - startTime).toFixed(2);

  if (isSitemapWritten && isRobotsWritten) {
    console.log("\n========================================================");
    console.log("✔ SITEMAP & ROBOTS.TXT GENERATION COMPLETE");
    console.log("========================================================");
    console.log(`✔ Number of URLs       : ${sortedRoutes.length}`);
    console.log(`✔ Duplicate URLs removed : ${duplicateCount}`);
    console.log(`✔ Invalid URLs skipped   : ${invalidCount}`);
    console.log(`✔ Generation time      : ${generationTimeMs} ms`);
    console.log(`✔ Sitemap Output Path  : ${sitemapPath}`);
    console.log(`✔ Robots Output Path   : ${robotsPath}`);
    console.log("========================================================\n");
  } else {
    console.error("✖ [Fatal Error] Failed to write one or more output files.");
    process.exit(1);
  }
};

// Execute orchestrator
generateEnterpriseSitemap();
