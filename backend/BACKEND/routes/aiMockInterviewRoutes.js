const express = require("express");
const router = express.Router();
const {
    createQuestion,
    createQuestionsBulk,
    getQuestions,
    getTopics,
    deleteQuestion
} = require("../controllers/aiMockInterviewController");

// Public / User routes
router.get("/questions", getQuestions);
router.get("/topics", getTopics);

// Admin routes
router.post("/questions", createQuestion);
router.post("/questions/bulk", createQuestionsBulk);
router.delete("/questions/:id", deleteQuestion);

module.exports = router;

