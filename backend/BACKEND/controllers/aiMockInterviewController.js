const AIMockQuestion = require("../models/AIMockQuestion");

// 1. Create a single question
exports.createQuestion = async (req, res) => {
    try {
        const { question, topic, duration, difficulty, sampleAnswer } = req.body;
        if (!question || !topic) {
            return res.status(400).json({ success: false, message: "Question and topic are required." });
        }

        const newQ = new AIMockQuestion({
            question,
            topic: topic.trim(),
            duration: duration ? Number(duration) : 30,
            difficulty: difficulty || "Medium",
            sampleAnswer: sampleAnswer || ""
        });

        await newQ.save();
        res.status(201).json({ success: true, data: newQ, message: "Interview question added successfully." });
    } catch (error) {
        console.error("Error creating AI mock question:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Bulk insert questions
exports.createQuestionsBulk = async (req, res) => {
    try {
        const { questions } = req.body;
        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ success: false, message: "Expected a non-empty array of questions." });
        }

        const validQuestions = questions.map(q => ({
            question: q.question,
            topic: (q.topic || "General").trim(),
            duration: q.duration ? Number(q.duration) : 30,
            difficulty: q.difficulty || "Medium",
            sampleAnswer: q.sampleAnswer || ""
        }));

        const inserted = await AIMockQuestion.insertMany(validQuestions);
        res.status(201).json({
            success: true,
            count: inserted.length,
            message: `Successfully uploaded ${inserted.length} interview questions.`
        });
    } catch (error) {
        console.error("Error bulk creating AI mock questions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Get questions (with optional topic filter, random sampling for realistic interview, limit 30)
exports.getQuestions = async (req, res) => {
    try {
        const { topic, limit, random } = req.query;
        const maxLimit = limit ? Math.min(Number(limit), 50) : 30;

        let query = {};
        if (topic && topic !== "All Topics") {
            query.topic = { $regex: new RegExp(`^${topic.trim()}$`, "i") };
        }

        let questions;
        if (random === "true") {
            // Aggregate sample for random 30 questions
            questions = await AIMockQuestion.aggregate([
                { $match: query },
                { $sample: { size: maxLimit } }
            ]);
        } else {
            questions = await AIMockQuestion.find(query)
                .sort({ createdAt: -1 })
                .limit(maxLimit);
        }

        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions
        });
    } catch (error) {
        console.error("Error fetching AI mock questions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Get available topics with counts
exports.getTopics = async (req, res) => {
    try {
        const stats = await AIMockQuestion.aggregate([
            {
                $group: {
                    _id: "$topic",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1, _id: 1 } }
        ]);

        const topics = stats.map(s => ({
            name: s._id,
            questionCount: s.count
        }));

        res.status(200).json({ success: true, data: topics });
    } catch (error) {
        console.error("Error fetching topics:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Delete question
exports.deleteQuestion = async (req, res) => {
    try {
        const deleted = await AIMockQuestion.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Question not found." });
        }
        res.status(200).json({ success: true, message: "Question deleted successfully." });
    } catch (error) {
        console.error("Error deleting AI mock question:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

