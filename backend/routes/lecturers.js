const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "C@)r4E2.)6Gue2gR",
  database: "xploitly"
});

// GET /api/lecturers
router.get("/", (req, res) => {
  pool.query("SELECT id, name, role, bio, image_url AS image FROM lecturers", (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to fetch lecturers" });
    }
    res.json(results);
  });
});

module.exports = router;
