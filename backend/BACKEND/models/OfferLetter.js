const mongoose = require("mongoose");

const offerLetterSchema = new mongoose.Schema(
  {
    letterType: {
      type: String,
      enum: ["intern", "full_time"],
      required: true,
      default: "intern"
    },
    candidateName: {
      type: String,
      required: true,
      trim: true
    },
    candidateEmail: {
      type: String,
      required: true,
      trim: true
    },
    candidatePhone: {
      type: String,
      trim: true,
      default: ""
    },
    offerDate: {
      type: String,
      required: true
    },
    dateOfJoining: {
      type: String,
      required: true
    },
    department: {
      type: String,
      default: "Inside Sales",
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    },
    workLocation: {
      type: String,
      default:
        "Accenlearn at 5th floor, Primehub Building, JP Nagar 2nd Phase, 2nd Stage, Near Ragigudda Metro Station, Bengaluru – 560041."
    },
    fixedCompensation: {
      type: String,
      default: ""
    },
    incentive: {
      type: String,
      default: ""
    },
    // Intern specific
    internshipDuration: {
      type: String,
      default: "four (4) months"
    },
    ojtDays: {
      type: String,
      default: "10 working days"
    },
    // Full Time specific
    monthlyTargets: {
      type: String,
      default: "target to be confirmed by management"
    },
    probationPeriod: {
      type: String,
      default: "six (6) months"
    },
    // Email specifics
    emailSubject: {
      type: String,
      default: ""
    },
    ccEmail: {
      type: String,
      default: "aravind@accenlearn.com"
    },
    customNotes: {
      type: String,
      default: ""
    },
    sentBy: {
      type: String,
      default: "HR Team"
    },
    status: {
      type: String,
      enum: ["Sent", "Failed", "Draft"],
      default: "Sent"
    },
    emailResponse: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("OfferLetter", offerLetterSchema);

