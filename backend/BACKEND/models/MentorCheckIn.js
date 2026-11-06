const mongoose = require("mongoose");

const mentorCheckInSchema = new mongoose.Schema(
    {
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interviewer",
            required: true,
        },
        mentorName: {
            type: String,
            required: true,
            trim: true,
        },
        mentorEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mentorPhone: {
            type: String,
            default: "",
        },
        assignedOperationId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        assignedOperationName: {
            type: String,
            default: "",
        },
        assignedOperationEmail: {
            type: String,
            default: "",
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        courseTitle: {
            type: String,
            default: "",
        },
        sessionTitle: {
            type: String,
            required: true,
            trim: true,
        },
        sessionDate: {
            type: Date,
            default: Date.now,
        },
        sessionStartTime: {
            type: String,
            default: "",
        },
        sessionEndTime: {
            type: String,
            default: "",
        },
        duration: {
            type: String,
            default: "",
        },
        driveLink: {
            type: String,
            required: true,
            trim: true,
        },
        driveId: {
            type: String,
            default: "",
        },
        notes: {
            type: String,
            default: "",
        },
        learnerCount: {
            type: Number,
            default: 0,
        },
        // Verification of class taken
        status: {
            type: String,
            enum: ["pending", "verified", "rejected"],
            default: "pending",
        },
        // Operation payment approval
        paymentStatus: {
            type: String,
            enum: ["unpaid", "approved", "paid", "hold"],
            default: "unpaid",
        },
        sessionFee: {
            type: Number,
            default: 0,
        },
        operationRemarks: {
            type: String,
            default: "",
        },
        verifiedBy: {
            type: String,
            default: "",
        },
        verifiedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

// Indexes for fast lookup by operation, mentor, status and date
mentorCheckInSchema.index({ assignedOperationId: 1, sessionDate: -1 });
mentorCheckInSchema.index({ mentorId: 1, sessionDate: -1 });
mentorCheckInSchema.index({ status: 1 });
mentorCheckInSchema.index({ sessionDate: -1 });

module.exports = mongoose.model("MentorCheckIn", mentorCheckInSchema);

