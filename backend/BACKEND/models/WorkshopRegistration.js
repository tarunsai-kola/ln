const mongoose = require("mongoose");

const workshopRegistrationSchema = new mongoose.Schema({
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
    college: {
        type: String,
        required: true,
    },
    workshopTitle: {
        type: String,
        required: true,
        enum: ["AI & Machine Learning", "Cybersecurity", "IoT & Robotics"]
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("WorkshopRegistration", workshopRegistrationSchema);
