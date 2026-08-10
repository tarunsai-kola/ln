const mongoose = require("mongoose");

const masterclassWorkshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    curriculum: [{
        type: String,
        required: true
    }],
    duration: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("MasterclassWorkshop", masterclassWorkshopSchema);
