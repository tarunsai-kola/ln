require('dotenv').config();
const mongoose = require("mongoose");
const CreateAdvCourse = require("./models/CreateAdvCourse");
const CreateCourse = require("./models/CreateCourse");

mongoose.connect(process.env.DB_NAME)
.then(async () => {
    console.log("Connected to MongoDB for migration");
    
    // Migrate AdvCourses
    const advCourses = await CreateAdvCourse.find();
    for (let course of advCourses) {
        let changed = false;
        if (course.sessions && course.sessions.length > 0) {
            console.log(`Migrating sessions for AdvCourse: ${course.title}`);
            if (!course.session || typeof course.session !== "object" || Array.isArray(course.session)) {
                course.session = {};
            }
            
            for (let i = 0; i < course.sessions.length; i++) {
                const sessionCount = Object.keys(course.session).length;
                course.session[`session${sessionCount + 1}`] = course.sessions[i];
            }
            course.sessions = [];
            course.markModified('session');
            course.markModified('sessions');
            changed = true;
        }
        if (changed) {
            await course.save();
            console.log(`Saved migrated AdvCourse: ${course.title}`);
        }
    }
    
    // Migrate Regular Courses
    const courses = await CreateCourse.find();
    for (let course of courses) {
        let changed = false;
        if (course.sessions && course.sessions.length > 0) {
            console.log(`Migrating sessions for Course: ${course.title}`);
            if (!course.session || typeof course.session !== "object" || Array.isArray(course.session)) {
                course.session = {};
            }
            
            for (let i = 0; i < course.sessions.length; i++) {
                const sessionCount = Object.keys(course.session).length;
                course.session[`session${sessionCount + 1}`] = course.sessions[i];
            }
            course.sessions = [];
            course.markModified('session');
            course.markModified('sessions');
            changed = true;
        }
        if (changed) {
            await course.save();
            console.log(`Saved migrated Course: ${course.title}`);
        }
    }
    
    console.log("Migration complete");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
