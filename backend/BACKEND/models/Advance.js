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
  // Assignment to Sales Person
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdvTeam",
  },
  assignedToName: {
    type: String,
  },
  assignedToEmail: {
    type: String,
  },
  assignedToTeam: {
    type: String,
  },
  assignedBy: {
    type: String,
    default: "Admin",
  },
  assignedAt: {
    type: Date,
  },
  // Lead Progress & Followup
  leadStatus: {
    type: String,
    default: "New",
  },
  lastContactedAt: {
    type: Date,
  },
  remarks: [
    {
      text: { type: String, required: true },
      by: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Advance", AdvanceSchema);
