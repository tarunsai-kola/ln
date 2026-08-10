import ReactGA from "react-ga4";

const TRACKING_ID = "G-VWLHYWV2CW";

/**
 * Initialize Google Analytics 4
 */
export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
  console.log("GA4 Initialized");
};

/**
 * Send a pageview event to GA4
 * @param {string} path - The URL path to track
 */
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

/**
 * Send a custom event to GA4
 * @param {string} category - The object that was interacted with (e.g., 'Popup', 'FAQ')
 * @param {string} action - The type of interaction (e.g., 'Open', 'Click', 'Submit')
 * @param {string} label - Useful for categorizing events (e.g., 'Internship Form', 'Web Development')
 * @param {object} extra - Any additional data
 */
export const trackEvent = (category, action, label = "", extra = {}) => {
  ReactGA.event({
    category,
    action,
    label,
    ...extra
  });
};

/**
 * Track outbound links
 * @param {string} url - The destination URL
 */
export const trackOutboundLink = (url) => {
  ReactGA.event({
    category: "Outbound",
    action: "Click",
    label: url,
    transport: "beacon"
  });
};
