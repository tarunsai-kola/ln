const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const Interviewer = require("../models/Interviewer");
const Interview = require("../models/Interview");
const CreateCourse = require("../models/CreateCourse");
const CreateAdvCourse = require("../models/CreateAdvCourse");

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

        res.status(200).json({
            message: "Login successful",
            token,
            interviewer: {
                id: interviewer._id,
                fullname: interviewer.fullname,
                email: interviewer.email,
                assignedCourseId: interviewer.assignedCourseId,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Interviewer Dashboard Data (Assigned Interviews)
router.get("/interviewer-dashboard/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find all interviews assigned to this interviewer
        // Populate booked slots student info if needed (though stored in slots)
        const interviews = await Interview.find({ interviewer: id }).sort({ date: 1 });

        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get All Interviewers (Admin)
router.get("/all", async (req, res) => {
    try {
        const interviewers = await Interviewer.find({});
        const results = [];
        for (const interviewer of interviewers) {
            let courseObj = null;
            if (interviewer.assignedCourseId) {
                let course = await CreateCourse.findById(interviewer.assignedCourseId);
                if (!course) {
                    course = await CreateAdvCourse.findById(interviewer.assignedCourseId);
                }
                if (course) {
                    courseObj = { _id: course._id, title: course.title };
                }
            }
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
