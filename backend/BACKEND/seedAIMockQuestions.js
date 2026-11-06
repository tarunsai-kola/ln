const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const AIMockQuestion = require("./models/AIMockQuestion");

const sampleInterviewQuestions = [
    // --- Full Stack Development ---
    {
        question: "Explain the difference between synchronous and asynchronous code execution in JavaScript.",
        topic: "Full Stack Development",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "What are React Hooks? Explain why useState and useEffect are essential in functional components.",
        topic: "Full Stack Development",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "How does the virtual DOM work in React, and why does it enhance application performance?",
        topic: "Full Stack Development",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "What is middleware in Express.js and what are common use cases for implementing it?",
        topic: "Full Stack Development",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "Explain the difference between SQL relational databases and NoSQL document databases like MongoDB.",
        topic: "Full Stack Development",
        duration: 30,
        difficulty: "Medium"
    },

    // --- Python Programming ---
    {
        question: "What is the difference between lists and tuples in Python in terms of mutability and memory?",
        topic: "Python",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "Explain what Python decorators are and how the @ symbol simplifies their usage.",
        topic: "Python",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "How does memory management and garbage collection work in Python?",
        topic: "Python",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "Explain the purpose of the 'yield' keyword and how generators differ from standard functions.",
        topic: "Python",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "What is the Global Interpreter Lock (GIL) in CPython and how does it affect multi-threading?",
        topic: "Python",
        duration: 30,
        difficulty: "Hard"
    },

    // --- Data Science & Machine Learning ---
    {
        question: "What is the difference between supervised and unsupervised learning? Give one example of each.",
        topic: "Data Science",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "Explain the bias-variance tradeoff in machine learning and how overfitting occurs.",
        topic: "Data Science",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "What is the difference between Precision and Recall, and when would you prioritize Recall?",
        topic: "Data Science",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "How do Decision Trees split nodes, and what is the concept of Gini Impurity?",
        topic: "Data Science",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "Explain feature scaling techniques such as Min-Max Normalization versus Standardization.",
        topic: "Data Science",
        duration: 30,
        difficulty: "Easy"
    },

    // --- Cyber Security ---
    {
        question: "What is the difference between symmetric and asymmetric encryption? Give an example algorithm of each.",
        topic: "Cyber Security",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "Explain how a Cross-Site Scripting (XSS) attack works and how modern developers prevent it.",
        topic: "Cyber Security",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "What is SQL Injection, and how do parameterized queries mitigate this vulnerability?",
        topic: "Cyber Security",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "Explain the CIA Triad (Confidentiality, Integrity, Availability) in information security.",
        topic: "Cyber Security",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "What is multi-factor authentication (MFA) and why are SMS OTPs considered less secure than hardware tokens?",
        topic: "Cyber Security",
        duration: 30,
        difficulty: "Medium"
    },

    // --- HR & Behavioral ---
    {
        question: "Tell me about a challenging technical bug or conflict you encountered and how you resolved it.",
        topic: "HR & Behavioral",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "Where do you see yourself professionally in the next 3 to 5 years?",
        topic: "HR & Behavioral",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "How do you manage deadlines when multiple high-priority tasks are assigned simultaneously?",
        topic: "HR & Behavioral",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "Why are you interested in joining our organization and what makes you a strong fit?",
        topic: "HR & Behavioral",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "Describe a situation where you had to adapt quickly to a completely new technology or framework.",
        topic: "HR & Behavioral",
        duration: 30,
        difficulty: "Medium"
    },

    // --- System Design & Cloud ---
    {
        question: "What is the difference between horizontal and vertical scaling for web servers?",
        topic: "System Design",
        duration: 30,
        difficulty: "Easy"
    },
    {
        question: "Explain what caching is and when you would introduce Redis into an application architecture.",
        topic: "System Design",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "What is the CAP Theorem and what does it dictate for distributed database systems?",
        topic: "System Design",
        duration: 30,
        difficulty: "Hard"
    },
    {
        question: "How does a reverse proxy like Nginx or AWS CloudFront improve load distribution and security?",
        topic: "System Design",
        duration: 30,
        difficulty: "Medium"
    },
    {
        question: "What is database indexing and how does a B-Tree index speed up query lookup times?",
        topic: "System Design",
        duration: 30,
        difficulty: "Medium"
    }
];

async function seed() {
    try {
        const mongoUri = process.env.DB_NAME;
        if (!mongoUri) {
            console.error("No DB_NAME in .env");
            process.exit(1);
        }
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB.");

        const count = await AIMockQuestion.countDocuments();
        if (count === 0) {
            console.log("Seeding 30 sample AI mock interview questions...");
            await AIMockQuestion.insertMany(sampleInterviewQuestions);
            console.log(`Successfully seeded ${sampleInterviewQuestions.length} interview questions!`);
        } else {
            console.log(`Database already has ${count} interview questions. Ensuring sample questions exist...`);
            for (const q of sampleInterviewQuestions) {
                const exists = await AIMockQuestion.findOne({ question: q.question });
                if (!exists) {
                    await AIMockQuestion.create(q);
                    console.log(`Added: ${q.question.substring(0, 40)}...`);
                }
            }
        }

        await mongoose.disconnect();
        console.log("Seeding complete.");
    } catch (err) {
        console.error("Seed error:", err.message);
        process.exit(1);
    }
}

seed();

