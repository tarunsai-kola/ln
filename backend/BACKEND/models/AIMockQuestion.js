const mongoose = require("mongoose");

const AIMockQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    duration: {
        type: Number,
        default: 30, // seconds
        min: 10,
        max: 180
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium"
    },
    sampleAnswer: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("AIMockQuestion", AIMockQuestionSchema);

