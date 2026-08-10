const mongoose = require("mongoose");

const AdvanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  currentRole: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  interestedDomain: {
  type: String,
  },
  goal: {
    type: String,
    required: true,
  },
  goalOther: {
    type: String,
  },
  domain: {
    type: String,
  },
  domainOther: {
    type: String,
  },
  passedOutYear: {
    type: String,
  },
  reason: {
    type: String,
  },
  action: {
    type: String,
    default: "Unseen"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Advance", AdvanceSchema);
