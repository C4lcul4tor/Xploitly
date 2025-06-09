const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// MySQL Connection Pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "C@)r4E2.)6Gue2gR",
  database: "xploitly"
});

// 🟢 Add New Course
router.post("/add", (req, res) => {
  const {
    title,
    description,
    instructor_name,
    duration,
    meetings_per_week,
    lecture_start_time,
    lecture_end_time,
    price,
    sale_price,
    curriculum,
    learning_outcomes,
    is_open = 1
  } = req.body;

  if (
    !title || !description || !instructor_name || !duration ||
    meetings_per_week == null || !lecture_start_time || !lecture_end_time ||
    price == null || !curriculum || !learning_outcomes
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO courses (
      title, description, instructor_name, duration, meetings_per_week,
      lecture_start_time, lecture_end_time, price, sale_price,
      curriculum, learning_outcomes, is_open
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    description,
    instructor_name,
    duration,
    meetings_per_week,
    lecture_start_time,
    lecture_end_time,
    price,
    sale_price || 0,
    curriculum,
    learning_outcomes,
    is_open
  ];

  pool.query(sql, values, (err) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true });
  });
});

// 🟡 Admin Panel: Get Course Status (Title + is_open)
router.get("/status", (req, res) => {
  const sql = `SELECT title, is_open FROM courses`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// 🔁 Admin Panel: Toggle Course is_open
router.post("/toggle", (req, res) => {
  const { course, is_open } = req.body;
  if (!course || typeof is_open !== "boolean") {
    return res.status(400).json({ error: "Invalid data" });
  }

  const sql = `UPDATE courses SET is_open = ? WHERE title = ?`;
  pool.query(sql, [is_open ? 1 : 0, course], (err) => {
    if (err) {
      console.error("Toggle Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true });
  });
});

// 🌐 HOMEPAGE: Get All Open Courses
router.get("/", (req, res) => {
  pool.query("SELECT * FROM courses", (err, results) => { // ❗ removed WHERE is_open = 1
    if (err) {
      console.error("Fetch error:", err);
      return res.status(500).json({ error: "Failed to fetch courses" });
    }
    res.json(results);
  });
});


module.exports = router;
