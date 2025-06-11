const express = require('express');
const db = require('../db');
const router = express.Router();
const { Parser } = require('json2csv');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const csv = require('csv-parser');

// Add a student to the allowlist (for signup)
router.post('/add', async (req, res) => {
    const { name, email, registrationNumber, room_no } = req.body;
    if (!name || !email || !registrationNumber || !room_no) {
        return res.status(400).json({ message: "Missing fields" });
    }
    try {
        await db.query(
            "INSERT INTO allowed_students (name, email, registrationNumber, room_no) VALUES (?, ?, ?, ?)",
            [name, email, registrationNumber, room_no]
        );
        res.json({ message: "Student added" });
    } catch (err) {
        console.error("Error adding student:", err);
        res.status(500).json({ message: "Error adding student" });
    }
});

// Remove a student from the allowlist
router.delete('/:registrationNumber', async (req, res) => {
    const { registrationNumber } = req.params;
    try {
        const [result] = await db.query(
            "DELETE FROM allowed_students WHERE registrationNumber = ?",
            [registrationNumber]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student removed" });
    } catch (err) {
        res.status(500).json({ message: "Error removing student" });
    }
});

// Get all allowed students
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT name, email, registrationNumber FROM allowed_students"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching students" });
    }
});

// Export allowlist as CSV
router.get('/export-csv', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT name, email, registrationNumber FROM allowed_students");
        const parser = new Parser();
        const csvData = parser.parse(rows);
        res.header('Content-Type', 'text/csv');
        res.attachment('allowed_students.csv');
        res.send(csvData);
    } catch (err) {
        res.status(500).json({ message: "Error exporting CSV" });
    }
});

// Import allowlist from CSV
router.post('/import', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            let success = 0, errors = [];
            for (const item of results) {
                try {
                    await db.query(
                        "INSERT INTO allowed_students (name, email, registrationNumber) VALUES (?, ?, ?)",
                        [item.name || item.Name, item.email || item.Email, item.registrationNumber || item['Registration No']]
                    );
                    success++;
                } catch (err) {
                    errors.push(item);
                }
            }
            fs.unlink(req.file.path, () => {});
            res.json({ message: `${success} imported`, errors });
        });
});

module.exports = router;