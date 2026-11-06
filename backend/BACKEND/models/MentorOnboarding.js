const mongoose = require("mongoose");

const mentorOnboardingSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    optedDomain: {
      type: String,
      required: true,
      trim: true,
    },
    optedCourseId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    resumeLink: {
      type: String,
      required: true,
      trim: true,
    },
    photoLink: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
    github: {
      type: String,
      trim: true,
      default: "",
    },
    // Bank Details
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    branchName: {
      type: String,
      required: true,
      trim: true,
    },
    upiNumber: {
      type: String,
      trim: true,
      default: "",
    },
    // Application & Workflow Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    offerLetterSent: {
      type: Boolean,
      default: false,
    },
    offerLetterSentDate: {
      type: Date,
      default: null,
    },
    perSessionRate: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: "",
    },
    interviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interviewer",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MentorOnboarding", mentorOnboardingSchema);

