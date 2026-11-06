import fs from "fs";
import path from "path";

/**
 * Escapes XML special characters according to sitemaps.org protocol.
 * @param {string} str Input string to escape
 * @returns {string} Escaped string
 */
export const escapeXml = (str) => {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

/**
 * Formats any valid date input into a YYYY-MM-DD format compliant with W3C Datetime.
 * Fallbacks to the current UTC date if the input is missing or invalid.
 * @param {string|Date|number} [dateInput] Raw date input
 * @returns {string} Formatted YYYY-MM-DD date string
 */
export const formatDate = (dateInput) => {
  const fallback = new Date().toISOString().split("T")[0];
  if (!dateInput) return fallback;

  try {
    const parsed = new Date(dateInput);
    if (isNaN(parsed.getTime())) {
      return fallback;
    }
    return parsed.toISOString().split("T")[0];
  } catch {
    return fallback;
  }
};

/**
 * Validates a route object against strict production requirements.
 * Skipped if path is empty, undefined, null, or does not start with "/".
 * @param {Object} route The route object to inspect
 * @returns {boolean} True if route is valid, false otherwise
 */
export const validateRoute = (route) => {
  if (!route || typeof route !== "object") {
    console.warn("⚠ [Skipped] Invalid route object:", route);
    return false;
  }

  const { path } = route;
  if (path === undefined || path === null || path === "") {
    console.warn(`⚠ [Skipped] Route has empty/null/undefined path:`, route);
    return false;
  }

  if (typeof path !== "string") {
    console.warn(`⚠ [Skipped] Route path must be a string. Received type (${typeof path}):`, route);
    return false;
  }

  if (!path.startsWith("/")) {
    console.warn(`⚠ [Skipped] Route path does not start with "/": "${path}"`);
    return false;
  }

  return true;
};

/**
 * Removes duplicate URLs using Map. Preserves unique absolute URLs.
 * @param {Array<Object>} routes Array of valid route objects
 * @param {string} baseUrl The base domain URL (e.g. https://accenlearn.com)
 * @returns {{ uniqueRoutes: Array<Object>, duplicateCount: number }}
 */
export const removeDuplicates = (routes, baseUrl) => {
  const routeMap = new Map();
  let duplicateCount = 0;

  for (const route of routes) {
    try {
      const fullUrl = new URL(route.path, baseUrl).href;
      if (routeMap.has(fullUrl)) {
        duplicateCount++;
        console.info(`ℹ [Duplicate Removed] Skipped redundant path: "${route.path}" (${fullUrl})`);
      } else {
        routeMap.set(fullUrl, {
          ...route,
          fullUrl,
        });
      }
    } catch (err) {
      console.warn(`⚠ [Invalid URL] Could not resolve full URL for path "${route.path}":`, err.message);
    }
  }

  return {
    uniqueRoutes: Array.from(routeMap.values()),
    duplicateCount,
  };
};

/**
 * Alphabetically sorts routes by their fully qualified URL.
 * @param {Array<Object>} routes Array of route objects containing `fullUrl`
 * @returns {Array<Object>} Sorted array
 */
export const sortRoutes = (routes) => {
  return [...routes].sort((a, b) => a.fullUrl.localeCompare(b.fullUrl));
};

/**
 * Safely writes content to the filesystem, creating parent directories if required.
 * @param {string} filePath Absolute target file path
 * @param {string} content Content string to write
 * @returns {boolean} True on success, false on failure
 */
export const writeFile = (filePath, content) => {
  try {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf-8");
    return true;
  } catch (error) {
    console.error(`✖ [Filesystem Error] Failed to write file at ${filePath}:`, error.message);
    return false;
  }
};
