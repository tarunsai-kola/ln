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

// POST /advancequery/assign - Assign query (or multiple queries) to a sales person
router.post("/advancequery/assign", verifyAnyAuth, async (req, res) => {
  try {
    const {
      queryIds,
      salespersonId,
      salespersonName,
      salespersonEmail,
      salespersonTeam,
      assignedBy = "Admin",
      note
    } = req.body;

    if (!queryIds || (Array.isArray(queryIds) && queryIds.length === 0)) {
      return res.status(400).json({ success: false, message: "No query ID(s) provided" });
    }

    if (!salespersonId && !salespersonName) {
      return res.status(400).json({ success: false, message: "Sales person information is required" });
    }

    const ids = Array.isArray(queryIds) ? queryIds : [queryIds];

    const updateData = {
      assignedTo: salespersonId,
      assignedToName: salespersonName,
      assignedToEmail: salespersonEmail || "",
      assignedToTeam: salespersonTeam || "",
      assignedBy: assignedBy || "Admin",
      assignedAt: new Date(),
      action: "Shared",
      leadStatus: "New"
    };

    const pushRemark = note && note.trim()
      ? {
          remarks: {
            text: `Assigned to ${salespersonName} by ${assignedBy}. Note: ${note.trim()}`,
            by: assignedBy,
            createdAt: new Date()
          }
        }
      : {
          remarks: {
            text: `Lead assigned to ${salespersonName} by ${assignedBy}`,
            by: assignedBy,
            createdAt: new Date()
          }
        };

    const updatedQueries = await Advance.find({ _id: { $in: ids } });

    await Advance.updateMany(
      { _id: { $in: ids } },
      {
        $set: updateData,
        $push: pushRemark
      }
    );

    // Optional sync to AdvLead (CRM) for seamless team integration
    for (const q of updatedQueries) {
      try {
        await AdvLead.findOneAndUpdate(
          { email: q.email.toLowerCase() },
          {
            $set: {
              full_name: q.name,
              phone_number: q.phone,
              opted_domain: q.interestedDomain,
              education_background: q.passedOutYear || "",
              source: "Website Advance Query (Admin Assigned)",
              owner_id: String(salespersonId || ""),
              owner_name: salespersonName,
              team_name: salespersonTeam || "",
              status: "assigned",
              stage: "Fresh Lead",
              disposition: "New Lead",
              last_interaction_at: new Date(),
              extra_fields: {
                "what_is_your_primary_goal_right_now?": q.goal === "Other" ? q.goalOther : q.goal,
                "what_is_your_biggest_career_challenge?": q.reason,
                "domain": q.domain === "Other" ? q.domainOther : q.domain,
                "passed_out_year": q.passedOutYear || ""
              }
            },
            $setOnInsert: {
              created_at: new Date()
            }
          },
          { upsert: true, new: true }
        );
      } catch (leadError) {
        // Non-blocking
      }
    }

    res.status(200).json({
      success: true,
      message: `Successfully assigned ${ids.length} lead(s) to ${salespersonName}!`,
      count: ids.length
    });
  } catch (error) {
    console.error("Error assigning advance queries:", error);
    res.status(500).json({ success: false, message: "Failed to assign lead(s)", error: error.message });
  }
});

// GET /advancequeries/assigned - Get leads assigned to sales person or team
router.get("/advancequeries/assigned", verifyAnyAuth, async (req, res) => {
  try {
    const {
      salespersonId,
      salespersonName,
      salespersonEmail,
      team,
      designation,
      scope = "my", // "my" or "team"
      status,
      search
    } = req.query;

    const query = {};

    const isManagerOrLeader =
      (designation && (
        designation.toLowerCase().includes("leader") ||
        designation.toLowerCase().includes("manager") ||
        designation.toLowerCase().includes("head")
      )) ||
      (salespersonName && salespersonName.toLowerCase().includes("sumeetha"));

    if (scope === "team" && isManagerOrLeader) {
      if (team && team !== "all") {
        query.assignedToTeam = team;
      } else {
        query.assignedTo = { $exists: true, $ne: null };
      }
    } else {
      const orConditions = [];
      if (salespersonId) orConditions.push({ assignedTo: salespersonId });
      if (salespersonName) orConditions.push({ assignedToName: salespersonName });
      if (salespersonEmail) orConditions.push({ assignedToEmail: salespersonEmail.toLowerCase() });

      if (orConditions.length > 0) {
        query.$or = orConditions;
      } else {
        query.assignedTo = { $exists: true, $ne: null };
      }
    }

    if (status && status !== "all") {
      query.leadStatus = status;
    }

    if (search && search.trim()) {
      const s = search.trim();
      const regex = new RegExp(s, "i");
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { name: regex },
          { email: regex },
          { phone: regex },
          { interestedDomain: regex },
          { domain: regex },
          { goal: regex },
          { assignedToName: regex }
        ]
      });
    }

    const leads = await Advance.find(query)
      .sort({ assignedAt: -1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error) {
    console.error("Error fetching assigned advance queries:", error);
    res.status(500).json({ success: false, message: "Failed to fetch assigned leads", error: error.message });
  }
});

// PUT /advancequery/:id/lead-status - Update lead status / remark by sales person
router.put("/advancequery/:id/lead-status", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { leadStatus, remark, salespersonName = "Sales Specialist" } = req.body;

    const query = await Advance.findById(id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    if (leadStatus) {
      query.leadStatus = leadStatus;
      query.lastContactedAt = new Date();
    }

    if (remark && remark.trim()) {
      query.remarks = query.remarks || [];
      query.remarks.push({
        text: remark.trim(),
        by: salespersonName,
        createdAt: new Date()
      });
    }

    await query.save();

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      lead: query
    });
  } catch (error) {
    console.error("Error updating lead status:", error);
    res.status(500).json({ success: false, message: "Failed to update lead status", error: error.message });
  }
});

// POST /advancequery/:id/remark - Add a new remark to lead
router.post("/advancequery/:id/remark", verifyAnyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, by = "Sales Specialist" } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Remark text is required" });
    }

    const query = await Advance.findById(id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    query.remarks = query.remarks || [];
    query.remarks.push({
      text: text.trim(),
      by,
      createdAt: new Date()
    });
    query.lastContactedAt = new Date();

    await query.save();

    res.status(200).json({
      success: true,
      message: "Remark added successfully",
      remarks: query.remarks
    });
  } catch (error) {
    console.error("Error adding remark:", error);
    res.status(500).json({ success: false, message: "Failed to add remark", error: error.message });
  }
});

module.exports = router;
