const mongoose = require("mongoose");

const salaryFormulaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    metricType: {
      type: String,
      enum: ["revenue", "deals"],
      default: "revenue"
    },
    baseSalary: {
      type: Number,
      required: true,
      default: 25000
    },
    baseTarget: {
      type: Number,
      required: true,
      default: 200000
    },
    payoutModel: {
      type: String,
      enum: ["target_prorata", "guaranteed_base"],
      default: "target_prorata"
      // target_prorata: Full base salary when target is 100% met, pro-rated if below target
      // guaranteed_base: Full base salary is fixed/guaranteed, target tracks milestone
    },
    assignedMembers: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AdvTeam"
        },
        fullname: { type: String },
        email: { type: String, lowercase: true, trim: true },
        team: { type: String },
        designation: { type: String },
        customBaseSalary: { type: Number },
        customBaseTarget: { type: Number },
        assignedAt: { type: Date, default: Date.now }
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Method to calculate salary strictly from fullPaid achievement vs target
salaryFormulaSchema.methods.calculatePayout = function (achievementValue, customBase, customTarget) {
  const baseSalary = customBase != null && customBase !== "" && !isNaN(customBase)
    ? Number(customBase)
    : this.baseSalary;
  const target = customTarget != null && customTarget !== "" && !isNaN(customTarget)
    ? Number(customTarget)
    : this.baseTarget;
  const achievement = Number(achievementValue) || 0; // Strictly fullPaid revenue or deals

  const targetAchieved = target > 0 ? achievement >= target : true;
  const achievementPercent = target > 0 ? Math.round((achievement / target) * 1000) / 10 : 100;
  const remainingToTarget = Math.max(0, target - achievement);

  let earnedSalary = baseSalary;
  if (this.payoutModel === "target_prorata") {
    if (targetAchieved) {
      earnedSalary = baseSalary;
    } else {
      // Pro-rata based on fullPaid target reached
      earnedSalary = target > 0 ? Math.round((achievement / target) * baseSalary) : baseSalary;
    }
  } else {
    // guaranteed_base
    earnedSalary = baseSalary;
  }

  return {
    baseSalary,
    target,
    achievement, // FullPaid Revenue / Deals
    achievementPercent,
    targetAchieved,
    remainingToTarget,
    payoutModel: this.payoutModel || "target_prorata",
    earnedSalary,
    totalPayout: earnedSalary
  };
};

module.exports = mongoose.model("SalaryFormula", salaryFormulaSchema);
