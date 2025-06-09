const express = require('express');
const router = express.Router();
const db = require('../db');

// 📩 Save contact message (no email)
router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await db.query(
      'INSERT INTO contact_messages (name, email, message, is_replied) VALUES (?, ?, ?, 0)',
      [name, email, message]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🧠 Fetch all contact messages
router.get('/all', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contact_messages ORDER BY sent_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

// 🔁 Toggle is_replied status
router.post('/mark-replied', async (req, res) => {
  const { id, is_replied } = req.body;
  if (typeof id !== 'number' || typeof is_replied !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    await db.query('UPDATE contact_messages SET is_replied = ? WHERE id = ?', [is_replied, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

module.exports = router;
