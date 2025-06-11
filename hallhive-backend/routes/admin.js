const express = require('express');
const db = require('../db');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/me', authenticate('admin'), async (req, res) => {
  const id = req.user.id;
  const [rows] = await db.query("SELECT id, name, email, role, profilePicture, created_at FROM users WHERE id=? AND role='admin'", [id]);
  if (!rows.length) return res.status(404).json({ message: "Admin not found" });
  res.json(rows[0]);
});

module.exports = router;