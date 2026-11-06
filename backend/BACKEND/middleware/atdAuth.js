const jwt = require("jsonwebtoken");

/**
 * @desc Authentication middleware for Attendance System
 */
const atdAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization || (req.cookies && (req.cookies.token || req.cookies.adminToken));
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Handle Bearer prefix if present
    if (typeof token === "string" && token.toLowerCase().startsWith("bearer ")) {
      token = token.slice(7).trim(); // Skip "Bearer " and any extra spaces
    }

    // Safety check for common invalid strings
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ error: "Access denied. Invalid token format." });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "ACCENLEARNCAMPUS24";
    const decoded = jwt.verify(token, JWT_SECRET);

    // Set req.user for use in controllers
    const effectiveId = decoded.userId || decoded.id || decoded._id || decoded.adminId || "admin";
    req.user = { _id: effectiveId, email: decoded.email, role: decoded.role || "user" };
    req.userId = effectiveId;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = atdAuth;
