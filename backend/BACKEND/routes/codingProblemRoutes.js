const express = require("express");
const router = express.Router();
const {
    createProblem,
    getProblems,
    getProblemById,
    deleteProblem,
    executeCode,
    createProblemsBulk
} = require("../controllers/codingProblemController");

// Admin routes
router.post("/", createProblem);
router.post("/bulk", createProblemsBulk);
router.delete("/:id", deleteProblem);

// Public / User routes
router.get("/", getProblems);
router.get("/:id", getProblemById);
router.post("/execute", executeCode);

module.exports = router;
