const express = require('express');
const db = require('../db');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
require('dotenv').config(); // Load env variables at the top

// GET current student info (shows correct current room)
router.get('/me', authenticate('student'), async (req, res) => {
  const id = req.user.id;

  // 1. Get student base info
  const [[student]] = await db.query(
    `SELECT id, name, session, department, registrationNumber, email, contactNumber, profilePicture, created_at
     FROM users
     WHERE id=? AND role='student'`,
    [id]
  );
  if (!student) return res.status(404).json({ message: "Student not found" });

  // 2. Get current room assignment (if any)
  const [[room]] = await db.query(
    `SELECT r.block, r.floor, r.room_no
     FROM room_assignments ra
     JOIN rooms r ON ra.room_id = r.id
     WHERE ra.user_id = ?`,
    [id]
  );

  // 3. Respond with combined info
  res.json({
    id: student.id,
    name: student.name,
    batch: student.session,
    department: student.department,
    studentId: student.registrationNumber,
    roomNo: room ? room.room_no : null,
    email: student.email,
    phone: student.contactNumber,
    profilePicture: student.profilePicture,
    createdAt: student.created_at
  });
});

module.exports = router;