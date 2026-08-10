const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const CreateCourse = require("../models/CreateCourse"); // needed for video upload
const CreateAdvCourse = require("../models/CreateAdvCourse");

// Create Interview (Admin)
router.post("/create-interview", async (req, res) => {
    try {
        const { interviewName, interviewerId, date, startTime, endTime, mode, description, maxParticipants, meetLink } = req.body;

        const newInterview = new Interview({
            interviewName,
            interviewer: interviewerId,
            date,
            startTime,
            endTime,
            mode,
            description,
            maxParticipants,
            meetLink,
        });

        await newInterview.save();
        res.status(201).json({ message: "Interview created successfully", interview: newInterview });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Available Interviews (User)
router.get("/available-interviews", async (req, res) => {
    try {
        const now = new Date();
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);

        // 1. Permanently delete past interviews (date < today)
        await Interview.deleteMany({ date: { $lt: today } });

        // 2. Fetch potentially valid interviews
        let interviews = await Interview.find({
            isActive: true,
            date: { $gte: today }
        }).populate("interviewer", "fullname").sort({ date: 1 });

        // Note: For today's meetings, we can just keep them all day.
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get All Interviews (Admin)
router.get("/all", async (req, res) => {
    try {
        const interviews = await Interview.find({}).populate("interviewer", "fullname").sort({ date: -1 });
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete Interview (Admin)
router.delete("/delete-interview/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInterview = await Interview.findByIdAndDelete(id);

        if (!deletedInterview) {
            return res.status(404).json({ message: "Interview not found" });
        }

        res.status(200).json({ message: "Interview deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Mentor adds meeting link
router.post("/mentor-add-meet-link", async (req, res) => {
    try {
        const { interviewId, meetLink } = req.body;

        const updatedInterview = await Interview.findByIdAndUpdate(
            interviewId,
            { meetLink },
            { new: true }
        );

        if (!updatedInterview) {
            return res.status(404).json({ message: "Interview not found" });
        }

        res.status(200).json({ message: "Meeting link updated successfully", interview: updatedInterview });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Mentor uploads video to course LMS
router.post("/mentor-upload-video", async (req, res) => {
    try {
        const { courseId, sessionTitle, driveLink } = req.body;
        
        if (!courseId || !sessionTitle || !driveLink) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let course = await CreateCourse.findById(courseId);
        if (!course) {
            course = await CreateAdvCourse.findById(courseId);
        }

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
        const driveId = match ? match[1] : null;

        const newSession = {
            title: sessionTitle,
            driveLink,
            description: driveId, // Used by AdvanceLearning.jsx as the video ID
            type: 'mentor_video',
            createdAt: new Date()
        };

        const currentSession = course.get('session') || {};
        
        if (typeof currentSession !== "object" || Array.isArray(currentSession)) {
            course.set('session', {});
        }

        const sessionCount = Object.keys(course.get('session') || {}).length;
        const newSessionKey = `session${sessionCount + 1}`;

        const updatedSession = {
            ...(course.get('session') || {}),
            [newSessionKey]: newSession
        };
        
        course.set('session', updatedSession);
        course.markModified('session');
        await course.save();

        res.status(200).json({ message: "Video session added successfully", session: newSession });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Toggle Active Status / Mode (Admin)
router.post("/update-interview-status", async (req, res) => {
    try {
        const { interviewId, isActive, mode } = req.body;
        const updateFields = {};
        if (isActive !== undefined) updateFields.isActive = isActive;
        if (mode !== undefined) updateFields.mode = mode;

        const updated = await Interview.findByIdAndUpdate(interviewId, updateFields, { new: true });
        res.status(200).json({ message: "Updated successfully", interview: updated });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Specific Interview Details (User/Admin)
router.get("/:id", async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id).populate("interviewer", "fullname");
        if (!interview) return res.status(404).json({ message: "Interview not found" });
        res.status(200).json(interview);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
