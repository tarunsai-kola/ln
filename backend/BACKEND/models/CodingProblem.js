const mongoose = require("mongoose");

const CodingProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
        default: "DSA Beginner"
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy"
    },
    preCode: {
        type: Map,
        of: String,
        default: {
            python: "def solve():\n    # Write your code here\n    pass",
            cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}",
            java: "public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
            javascript: "// Write your code here\nfunction solve() {\n    \n}\nsolve();"
        }
    },
    testCases: [{
        input: { type: String, default: "" },
        output: { type: String, default: "" },
        isHidden: { type: Boolean, default: false }
    }]
}, { timestamps: true });

module.exports = mongoose.model("CodingProblem", CodingProblemSchema);
