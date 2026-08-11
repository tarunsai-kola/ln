const express = require("express");
const router = express.Router();
const WorkshopRegistration = require("../models/WorkshopRegistration");
const MasterclassWorkshop = require("../models/MasterclassWorkshop");
const { transporter } = require("../utils/emailService");
const { parse } = require("json2csv");

// Register for a workshop
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, college, workshopTitle } = req.body;

        if (!name || !email || !phone || !college || !workshopTitle) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already registered for this specific workshop
        const existingReg = await WorkshopRegistration.findOne({ email, workshopTitle });
        if (existingReg) {
            return res.status(400).json({ message: "You have already registered for this workshop" });
        }

        const newRegistration = new WorkshopRegistration({
            name, email, phone, college, workshopTitle
        });
        await newRegistration.save();

        // Send Confirmation Email via standard SMTP

        const mailOptions = {
            from: process.env.SMTP_NOREPLY_EMAIL || "onboarding@accenlearn.com",
            to: email,
            subject: `Workshop Registration Confirmed: ${workshopTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #1a56db;">Registration Successful!</h2>
                    <p>Dear ${name},</p>
                    <p>Thank you for registering for the <strong>${workshopTitle}</strong> workshop hosted by Accenlearn Campus in collaboration with IEEE, IET, and the R&D Cell of CRD College of Engineering.</p>
                    <p>We are thrilled to have you onboard! We will send you more details and the exact schedule as we get closer to the event.</p>
                    <br/>
                    <p>Best regards,<br/>The Accenlearn Campus Team</p>
                </div>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending workshop confirmation email:", error);
            } else {
                console.log("Workshop confirmation email sent:", info.response);
            }
        });

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Workshop Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Admin Route: Get all registrations
router.get("/registrations", async (req, res) => {
    try {
        const registrations = await WorkshopRegistration.find().sort({ registeredAt: -1 });
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Admin Route: Export to CSV by Workshop Title
router.get("/export/:workshopTitle", async (req, res) => {
    try {
        const { workshopTitle } = req.params;
        const query = workshopTitle === "All" ? {} : { workshopTitle };
        const registrations = await WorkshopRegistration.find(query).sort({ registeredAt: -1 }).lean();

        if (registrations.length === 0) {
            return res.status(404).json({ message: "No registrations found to export." });
        }

        const fields = ["name", "email", "phone", "college", "workshopTitle", "registeredAt"];
        const csv = parse(registrations, { fields });

        res.header('Content-Type', 'text/csv');
        res.attachment(`Workshop_Registrations_${workshopTitle.replace(/\s+/g, '_')}.csv`);
        return res.send(csv);

    } catch (error) {
        console.error("CSV Export Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// --- DYNAMIC WORKSHOP CRUD ROUTES ---

// Public: Get all active masterclass workshops
router.get("/list", async (req, res) => {
    try {
        const workshops = await MasterclassWorkshop.find({ isActive: true }).sort({ createdAt: 1 });
        res.status(200).json(workshops);
    } catch (error) {
        console.error("Fetch Workshops Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Admin: Get ALL masterclass workshops (active and inactive)
router.get("/admin/list", async (req, res) => {
    try {
        const workshops = await MasterclassWorkshop.find().sort({ createdAt: -1 });
        res.status(200).json(workshops);
    } catch (error) {
        console.error("Admin Fetch Workshops Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Admin: Create a new workshop
router.post("/admin/create", async (req, res) => {
    try {
        const { title, description, curriculum, duration } = req.body;
        
        if (!title || !description || !curriculum || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newWorkshop = new MasterclassWorkshop({
            title, description, curriculum, duration
        });
        await newWorkshop.save();

        res.status(201).json(newWorkshop);
    } catch (error) {
        console.error("Create Workshop Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Admin: Update a workshop
router.put("/admin/update/:id", async (req, res) => {
    try {
        const updatedWorkshop = await MasterclassWorkshop.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedWorkshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }
        res.status(200).json(updatedWorkshop);
    } catch (error) {
        console.error("Update Workshop Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Admin: Delete a workshop
router.delete("/admin/delete/:id", async (req, res) => {
    try {
        const deletedWorkshop = await MasterclassWorkshop.findByIdAndDelete(req.params.id);
        if (!deletedWorkshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }
        res.status(200).json({ message: "Workshop deleted successfully" });
    } catch (error) {
        console.error("Delete Workshop Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
