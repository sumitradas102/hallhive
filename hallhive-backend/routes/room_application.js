const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/authenticate');
require('dotenv').config(); // Load env variables at the top


router.post('/', authenticate('student'), async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { room_no } = req.body;

    if (!user_id || !room_no) {
      return res.status(400).json({ message: "user_id and room_no required" });
    }

    const [[room]] = await db.query("SELECT id, capacity FROM rooms WHERE room_no = ?", [room_no]);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const [[{ count }]] = await db.query(
      "SELECT COUNT(*) as count FROM room_assignments WHERE room_id = ?",
      [room.id]
    );
    if (count >= room.capacity) {
      return res.status(400).json({ message: "Room is already full." });
    }

    const [[existing]] = await db.query(
      "SELECT * FROM room_applications WHERE user_id = ? AND status = 'pending'",
      [user_id]
    );
    if (existing) {
      return res.status(400).json({ message: "You already have a pending application." });
    }

    await db.query(
      "INSERT INTO room_applications (user_id, room_id) VALUES (?, ?)",
      [user_id, room.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;