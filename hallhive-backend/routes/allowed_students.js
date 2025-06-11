const express = require('express');
const router = express.Router();
const db = require('../db');

// All allowed students and their assigned rooms
router.get('/', async (req, res) => {
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, u.registrationNumber, ra.id as assignment_id, r.room_no
     FROM users u
     LEFT JOIN room_assignments ra ON ra.user_id = u.id
     LEFT JOIN rooms r ON ra.room_id = r.id
     WHERE u.role = 'student'`
  );
  res.json(rows);
});

module.exports = router;