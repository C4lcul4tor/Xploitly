const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "C@)r4E2.)6Gue2gR",
  database: "xploitly"
});

// Admin login
router.post("/", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin_users WHERE username = ? AND password = ?";
  const values = [username, password];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ error: "DB error" });
    }

    if (results.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

module.exports = router;
