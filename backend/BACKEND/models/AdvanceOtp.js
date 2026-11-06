const mongoose = require("mongoose");

const AdvanceOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // Automatically delete after 10 minutes (600 seconds)
  }
});

module.exports = mongoose.model("AdvanceOtp", AdvanceOtpSchema);
