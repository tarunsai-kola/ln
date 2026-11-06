const CodingProblem = require("../models/CodingProblem");
const axios = require("axios");
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const util = require('util');
const execPromise = util.promisify(exec);

exports.createProblem = async (req, res) => {
    try {
        const problem = new CodingProblem(req.body);
        await problem.save();
        res.status(201).json({ success: true, data: problem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createProblemsBulk = async (req, res) => {
    try {
        const problems = req.body.problems; // expecting an array of problems
        if (!Array.isArray(problems)) {
            return res.status(400).json({ success: false, message: "Expected an array of problems" });
        }
        await CodingProblem.insertMany(problems);
        res.status(201).json({ success: true, message: `${problems.length} problems added successfully.` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProblems = async (req, res) => {
    try {
        const { subject } = req.query;
        let query = {};
        if (subject) {
            query.subject = subject;
        }
        // Exclude test cases for list view to save bandwidth
        const problems = await CodingProblem.find(query).select("-testCases").sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: problems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProblemById = async (req, res) => {
    try {
        const problem = await CodingProblem.findById(req.params.id);
        if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });
        // Optionally, don't send hidden test cases to user
        const safeProblem = problem.toObject();
        safeProblem.testCases = safeProblem.testCases.map(tc => {
            if (tc.isHidden) {
                return { _id: tc._id, isHidden: true };
            }
            return tc;
        });
        res.status(200).json({ success: true, data: safeProblem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProblem = async (req, res) => {
    try {
        await CodingProblem.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Problem deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.executeCode = async (req, res) => {
    const { language, sourceCode, input } = req.body;
    
    try {
        if (!sourceCode || sourceCode.trim() === '') {
            return res.status(400).json({ success: false, message: "Source code cannot be empty" });
        }

        const tempDir = os.tmpdir();
        const uuid = crypto.randomUUID();
        let filepath;
        const cleanupFiles = [];

        if (language === 'python') {
            filepath = path.join(tempDir, `${uuid}.py`);
            fs.writeFileSync(filepath, sourceCode);
            cleanupFiles.push(filepath);
            command = `python "${filepath}"`;
        } else if (language === 'javascript') {
            filepath = path.join(tempDir, `${uuid}.js`);
            fs.writeFileSync(filepath, sourceCode);
            cleanupFiles.push(filepath);
            command = `node "${filepath}"`;
        } else if (language === 'sql') {
            const sqlFile = path.join(tempDir, `${uuid}.sql`);
            fs.writeFileSync(sqlFile, sourceCode);
            cleanupFiles.push(sqlFile);

            const runnerScriptPath = path.join(__dirname, '..', 'sql_runner.py');
            let inputArg = '';
            if (input && input.trim() !== '') {
                const inputPath = path.join(tempDir, `${uuid}_schema.sql`);
                fs.writeFileSync(inputPath, input);
                cleanupFiles.push(inputPath);
                inputArg = ` "${inputPath}"`;
            }
            command = `python "${runnerScriptPath}" "${sqlFile}"${inputArg}`;
        } else if (language === 'react') {
            return res.status(200).json({
                success: true,
                data: {
                    run: {
                        output: "React component evaluated. Switch to the 'Live Preview' tab to interact with your live UI!",
                        stderr: ""
                    }
                }
            });
        } else if (language === 'java') {
            const javaDir = path.join(tempDir, uuid);
            fs.mkdirSync(javaDir, { recursive: true });
            
            let className = 'Main';
            const classMatch = sourceCode.match(/class\s+([A-Za-z0-9_]+)/);
            if (classMatch) {
                className = classMatch[1];
            }
            filepath = path.join(javaDir, `${className}.java`);
            fs.writeFileSync(filepath, sourceCode);
            command = `cd /d "${javaDir}" && javac "${className}.java" && java ${className}`;
        } else if (language === 'cpp' || language === 'c++') {
            return res.status(200).json({
                success: true,
                data: { run: { output: "C++ compiler (g++) is not configured on this server. Please use Python, Java, JavaScript, or SQL." } }
            });
        } else {
            return res.status(400).json({ success: false, message: "Unsupported language" });
        }

        let inputPath;
        if (input && input.trim() !== '') {
            inputPath = path.join(tempDir, `${uuid}_input.txt`);
            fs.writeFileSync(inputPath, input);
            cleanupFiles.push(inputPath);
            command = `${command} < "${inputPath}"`;
        }

        try {
            const { stdout, stderr } = await execPromise(command, { timeout: 10000 });
            res.status(200).json({
                success: true,
                data: {
                    run: {
                        output: stdout || stderr,
                        stderr: stderr
                    }
                }
            });
        } catch (execError) {
            res.status(200).json({
                success: true,
                data: {
                    run: {
                        output: execError.stdout || execError.stderr || execError.message,
                        stderr: execError.stderr
                    }
                }
            });
        } finally {
            try {
                if (language === 'java') {
                    const javaDir = path.join(tempDir, uuid);
                    if (fs.existsSync(javaDir)) fs.rmSync(javaDir, { recursive: true, force: true });
                }
                for (const file of cleanupFiles) {
                    if (file && fs.existsSync(file)) {
                        fs.unlinkSync(file);
                    }
                }
            } catch (cleanupErr) {
                console.error("Cleanup error:", cleanupErr.message);
            }
        }
    } catch (error) {
        console.error("Execution error:", error);
        res.status(500).json({ success: false, message: "Error executing code", error: error.message });
    }
};
