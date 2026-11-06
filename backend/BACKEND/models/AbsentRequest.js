const mongoose = require("mongoose");

const absentRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AtdUser",
      required: true
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    userName: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: [true, "Date is required"],
      trim: true
    },
    reason: {
      type: String,
      required: [true, "Reason/message is required to validate absence"],
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    reviewedBy: {
      type: String,
      default: null
    },
    reviewNote: {
      type: String,
      default: ""
    },
    reviewedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Prevent duplicate absent requests for the exact same date by the same user
absentRequestSchema.index({ userId: 1, date: 1 }, { unique: true });
absentRequestSchema.index({ date: 1, status: 1 });
absentRequestSchema.index({ userEmail: 1, date: 1 });

module.exports = mongoose.model("AbsentRequest", absentRequestSchema);
