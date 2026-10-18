const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const Interviewer = require("../models/Interviewer");
const Interview = require("../models/Interview");
const CreateCourse = require("../models/CreateCourse");
const CreateAdvCourse = require("../models/CreateAdvCourse");

// Helper to resolve assigned course from CreateCourse or CreateAdvCourse with title & sessions
async function resolveAssignedCourse(assignedCourseId) {
    if (!assignedCourseId) return null;
    try {
        let course = await CreateCourse.findById(assignedCourseId);
        if (!course) {
            course = await CreateAdvCourse.findById(assignedCourseId);
        }
        if (course) {
            return {
                _id: course._id,
                title: course.title,
                session: course.get('session') || {}
            };
        }
    } catch (err) {
        console.error("Error resolving assigned course:", err.message);
    }
    return null;
}

// Create Interviewer (Admin only)
router.post("/create-interviewer", async (req, res) => {
    try {
        const { fullname, email, phone, password, subjects, assignedCourseId } = req.body;

        // Check if interviewer exists
        const existingInterviewer = await Interviewer.findOne({ email });
        if (existingInterviewer) {
            return res.status(400).json({ message: "Interviewer already exists" });
        }

        const newInterviewer = new Interviewer({
            fullname,
            email,
            phone,
            password, // Store plain text
            subjects: subjects || [],
            assignedCourseId: assignedCourseId || null,
        });

        await newInterviewer.save();
        res.status(201).json({ message: "Interviewer created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Interviewer Login
router.post("/interviewer-login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const interviewer = await Interviewer.findOne({ email });
        if (!interviewer) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (password !== interviewer.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: interviewer._id, role: "interviewer" },
            process.env.JWT_SECRET || "fallbacksecret",
            { expiresIn: "10m" }
        );

        const courseObj = await resolveAssignedCourse(interviewer.assignedCourseId);

        res.status(200).json({
            message: "Login successful",
            token,
            interviewer: {
                id: interviewer._id,
                fullname: interviewer.fullname,
                email: interviewer.email,
                assignedCourseId: courseObj || interviewer.assignedCourseId,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Interviewer Dashboard Data (Assigned Interviews + Populated Course & Sessions)
router.get("/interviewer-dashboard/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Fetch interviewer details & resolve assigned course from CreateCourse or CreateAdvCourse
        const interviewer = await Interviewer.findById(id);
        const courseObj = interviewer ? await resolveAssignedCourse(interviewer.assignedCourseId) : null;

        // 2. Find all interviews assigned to this interviewer
        const interviews = await Interview.find({ interviewer: id }).sort({ date: 1 });

        // Return both for rich dashboard access
        res.status(200).json({
            interviews,
            mentor: interviewer ? {
                ...interviewer.toObject(),
                assignedCourseId: courseObj
            } : null
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get All Interviewers (Admin) kg kjsrbtksrugweitbse 
router.get("/all", async (req, res) => {
    try {
        const interviewers = await Interviewer.find({});
        const results = [];
        for (const interviewer of interviewers) {
            const courseObj = await resolveAssignedCourse(interviewer.assignedCourseId);
            results.push({
                ...interviewer.toObject(),
                assignedCourseId: courseObj
            });
        }
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Single Interviewer by ID (with resolved assigned course & sessions)
router.get("/:id", async (req, res) => {
    try {
        const interviewer = await Interviewer.findById(req.params.id);
        if (!interviewer) {
            return res.status(404).json({ message: "Interviewer not found" });
        }
        const courseObj = await resolveAssignedCourse(interviewer.assignedCourseId);
        res.status(200).json({
            ...interviewer.toObject(),
            assignedCourseId: courseObj
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete Interviewer (Admin)
router.delete("/delete-interviewer/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInterviewer = await Interviewer.findByIdAndDelete(id);

        if (!deletedInterviewer) {
            return res.status(404).json({ message: "Interviewer not found" });
        }

        res.status(200).json({ message: "Interviewer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update Interviewer
router.put("/update-interviewer/:id", async (req, res) => {
    try {
        const { fullname, email, phone, password, subjects, assignedCourseId } = req.body;
        const updated = await Interviewer.findByIdAndUpdate(
            req.params.id,
            { fullname, email, phone, password, subjects: subjects || [], assignedCourseId: assignedCourseId || null },
            { new: true }
        );
        res.status(200).json({ message: "Interviewer updated", interviewer: updated });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
