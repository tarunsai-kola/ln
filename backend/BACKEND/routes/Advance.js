const express = require("express");
const router = express.Router();
const Advance = require("../models/Advance");
const AdvLead = require("../models/AdvLead");
const verifyAnyAuth = require("../middleware/verifyAnyAuth");
const crypto = require("crypto");
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail, SVGS, COMPANY_NAME } = require("../utils/emailTemplate");


router.get("/advancequeries", verifyAnyAuth, async (req, res) => {
  const { limit, all } = req.query;
  try {
    // If all=true or limit=0, fetch all records (for dashboard)
    const queryLimit = all === 'true' || limit === '0' ? 0 : (parseInt(limit) || 0);

    let queries;
    if (queryLimit > 0) {
      queries = await Advance.find()
        .sort({ _id: -1 })
        .limit(queryLimit)
        .lean();
    } else {
      // No limit - fetch all
      queries = await Advance.find()
        .sort({ _id: -1 })
        .lean();
    }
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

router.post("/advance/register", async (req, res) => {
  const { name, email, phone, goal, goalOther, domain, domainOther, interestedDomain, reason, passedOutYear } = req.body;
  // console.log(req.body);
  try {
    const newRegistration = new Advance({
      name,
      email,
      phone,
      goal,
      goalOther: goal === "Other" ? goalOther : undefined,
      domain,
      domainOther: domain === "Other" ? domainOther : undefined,
      interestedDomain: interestedDomain,
      passedOutYear: passedOutYear || undefined,
      reason: reason
    });
    
    await newRegistration.save();
    
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

//put request to update the mentorship data in admin
router.put("/advancequery/:id", verifyAnyAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { action } = req.body;
    const query = await Advance.findById(id);
    if (query) {
      if (action === "Share to CRM" || action === "Shared to CRM") {
        query.action = "Shared to CRM";
        
        // -- MANUAL CRM INTEGRATION --
        try {
          await AdvLead.findOneAndUpdate(
            { email: query.email.toLowerCase() },
            {
              $set: {
                full_name: query.name,
                phone_number: query.phone,
                opted_domain: query.interestedDomain,
                education_background: query.passedOutYear || "",
                source: "Website Lead",
                last_interaction_at: new Date(),
                extra_fields: {
                  "what_is_your_primary_goal_right_now?": query.goal === "Other" ? query.goalOther : query.goal,
                  "what_is_your_biggest_career_challenge?": query.reason,
                  "domain": query.domain === "Other" ? query.domainOther : query.domain,
                  "passed_out_year": query.passedOutYear || ""
                }
              },
              $setOnInsert: {
                status: "fresh",
                created_at: new Date()
              }
            },
            { upsert: true, new: true }
          );
        } catch (leadError) {
          console.error("Failed to share query to CRM:", leadError);
          // Non-blocking
        }
      } else {
        query.action = action;
      }
      
      await query.save();
      res.status(200).json({ message: "Query updated successfully" });
    } else {
      res.status(404).json({ message: "Query not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating data", error: error.message });
  }
});

module.exports = router;
