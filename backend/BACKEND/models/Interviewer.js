const mongoose = require("mongoose");

const interviewerSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        companyEmail: {
            type: String,
            lowercase: true,
            trim: true,
            default: "",
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        whatsAppNumber: {
            type: String,
            trim: true,
            default: "",
        },
        password: {
            type: String,
            required: true,
        },
        subjects: [{
            type: String,
        }],
        assignedCourseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CreateCourse",
            default: null,
        },
        companyName: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            default: "",
        },
        experience: {
            type: String,
            default: "",
        },
        resumeLink: {
            type: String,
            default: "",
        },
        photoLink: {
            type: String,
            default: "",
        },
        linkedin: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        // Bank details
        accountNumber: {
            type: String,
            default: "",
        },
        ifscCode: {
            type: String,
            default: "",
        },
        bankName: {
            type: String,
            default: "",
        },
        branchName: {
            type: String,
            default: "",
        },
        upiNumber: {
            type: String,
            default: "",
        },
        bookings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Interview",
            },
        ],
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
        assignedOperationType: {
            type: String,
            enum: ["Operation", "AdvOperation", ""],
            default: "",
        },
        perSessionRate: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Interviewer", interviewerSchema);
