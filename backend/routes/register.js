const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router(); // ✅ THIS LINE WAS MISSING

const dataPath = path.join(__dirname, '../data/registrations.json');

// Make sure the file exists
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
  fs.writeFileSync(dataPath, '[]');
}

router.post('/', (req, res) => {
  console.log("📥 Received registration:", req.body);

  const { name, surname, birthdate, personalNumber, mobile, email, course } = req.body;

  if (!name || !surname || !birthdate || !personalNumber || !mobile || !email || !course) {
    console.log("❌ Missing field(s):", req.body);
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newEntry = {
    name,
    surname,
    birthdate,
    personalNumber,
    mobile,
    email,
    course,
    timestamp: new Date().toISOString()
  };

  const existing = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  existing.push(newEntry);

  fs.writeFileSync(dataPath, JSON.stringify(existing, null, 2));
  console.log("✅ Registration saved");

  res.json({ success: true, message: "Registered successfully" });
});

module.exports = router;
