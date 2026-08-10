const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {
        interviewName: {
            type: String,
            required: true,
            trim: true,
        },
        interviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interviewer",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        mode: {
            type: String,
            enum: ["Online", "Offline"],
            default: "Online",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        meetLink: {
            type: String,
            default: null,
        },
        maxParticipants: {
            type: Number,
            default: 0, // 0 = unlimited
        },
        description: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
