const mongoose = require("mongoose");
require("dotenv").config();
const MasterclassWorkshop = require("./models/MasterclassWorkshop");

const WORKSHOPS = [
    {
        title: "AI & Machine Learning",
        description: "Dive into the world of AI, Neural Networks, and Predictive Modeling with hands-on projects.",
        curriculum: ["Intro to AI & ML", "Supervised & Unsupervised Learning", "Deep Learning Basics", "Real-world AI Projects"],
        duration: "2 Days (Weekend)",
    },
    {
        title: "Cybersecurity",
        description: "Learn how to secure networks, understand ethical hacking, and protect digital assets.",
        curriculum: ["Networking Basics", "Ethical Hacking Fundamentals", "Vulnerability Assessment", "Cyber Defense Strategies"],
        duration: "3 Days",
    },
    {
        title: "IoT & Robotics",
        description: "Build interconnected devices and robotic systems using microcontrollers and sensors.",
        curriculum: ["Introduction to IoT", "Arduino & Raspberry Pi", "Sensor Integration", "Building Smart Systems"],
        duration: "2 Days (Weekend)",
    }
];

mongoose.connect(process.env.DB_NAME)
    .then(async () => {
        console.log("Connected to DB, seeding workshops...");
        for (const ws of WORKSHOPS) {
            const exists = await MasterclassWorkshop.findOne({ title: ws.title });
            if (!exists) {
                await new MasterclassWorkshop(ws).save();
                console.log(`Added: ${ws.title}`);
            }
        }
        console.log("Seeding complete!");
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
