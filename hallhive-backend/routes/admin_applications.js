const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all pending applications
router.get('/', async (req, res) => {
  const [rows] = await db.query(
    `SELECT ra.id as application_id, u.id as user_id, u.name, u.registrationNumber, r.room_no, r.block, r.floor, ra.status, ra.applied_at
   FROM room_applications ra
   JOIN users u ON ra.user_id = u.id
   JOIN rooms r ON ra.room_id = r.id
   WHERE ra.status = 'pending'
   ORDER BY ra.applied_at ASC`
  );
  res.json(rows);
});

// Approve an application
router.post('/approve', async (req, res) => {
  const { application_id } = req.body;
  if (!application_id) return res.status(400).json({ message: "application_id required" });

  // Get application
  const [[app]] = await db.query(
    "SELECT * FROM room_applications WHERE id = ? AND status = 'pending'",
    [application_id]
  );
  if (!app) return res.status(404).json({ message: "Application not found" });

  // Get room info
  const [[room]] = await db.query("SELECT id, capacity FROM rooms WHERE id = ?", [app.room_id]);
  if (!room) return res.status(404).json({ message: "Room not found" });

  // Check current occupancy
  const [[{ count }]] = await db.query(
    "SELECT COUNT(*) as count FROM room_assignments WHERE room_id = ?",
    [room.id]
  );
  if (count >= room.capacity) {
    await db.query("UPDATE room_applications SET status = 'rejected' WHERE id = ?", [application_id]);
    return res.status(400).json({ message: "Room is already full." });
  }

  // Remove any previous assignment for this user (only one room per user)
  await db.query("DELETE FROM room_assignments WHERE user_id = ?", [app.user_id]);

  // Assign user to this room
  await db.query(
    "INSERT INTO room_assignments (user_id, room_id) VALUES (?, ?)",
    [app.user_id, app.room_id]
  );

  // Approve the application
  await db.query(
    "UPDATE room_applications SET status = 'approved' WHERE id = ?", [application_id]
  );

  res.json({ success: true });
});

// Reject an application
router.post('/reject', async (req, res) => {
  const { application_id } = req.body;
  if (!application_id) return res.status(400).json({ message: "application_id required" });
  await db.query("UPDATE room_applications SET status = 'rejected' WHERE id = ?", [application_id]);
  res.json({ success: true });
});

module.exports = router;