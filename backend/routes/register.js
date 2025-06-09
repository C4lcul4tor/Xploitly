const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "C@)r4E2.)6Gue2gR",
  database: "xploitly"
});

// 📝 Register a student
router.post("/", (req, res) => {
  const { name, surname, birthdate, personalNumber, mobile, email, course } = req.body;
  if (!(name && surname && birthdate && personalNumber && mobile && email && course)) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const sql = `INSERT INTO registrations (name, surname, birthdate, personalNumber, mobile, email, course, registered_at, is_paid)
               VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 0)`;
  pool.query(sql, [name, surname, birthdate, personalNumber, mobile, email, course], (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database insertion failed" });
    }
    res.json({ success: true });
  });
});

// 📋 Get all registrations
router.get("/all", (req, res) => {
  pool.query("SELECT * FROM registrations ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to fetch registrations" });
    }
    res.json(results);
  });
});

// 💰 Toggle paid/unpaid status
router.post("/toggle-payment", (req, res) => {
  const { id, is_paid } = req.body;
  if (typeof id !== "number" || typeof is_paid !== "boolean") {
    return res.status(400).json({ error: "Invalid payment toggle input" });
  }

  pool.query("UPDATE registrations SET is_paid = ? WHERE id = ?", [is_paid ? 1 : 0, id], (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to update payment status" });
    }
    res.json({ success: true });
  });
});

// 🔓 Get status of all courses (open/locked)
router.get("/courses/status", (req, res) => {
  pool.query("SELECT title, is_open FROM courses", (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to fetch course status" });
    }
    res.json(results);
  });
});

// 🔒 Toggle course lock/unlock
router.post("/toggle-course", (req, res) => {
  const { course, is_open } = req.body;
  if (typeof course !== "string" || typeof is_open !== "boolean") {
    return res.status(400).json({ error: "Invalid course toggle input" });
  }

  pool.query("UPDATE courses SET is_open = ? WHERE title = ?", [is_open ? 1 : 0, course], (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to update course status" });
    }
    res.json({ success: true });
  });
});

// 📚 GET all courses (for homepage)
router.get("/courses", (req, res) => {
  pool.query("SELECT * FROM courses ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to fetch courses" });
    }
    res.json(results);
  });
});

// ➕ Add a new course
router.post("/courses/add", (req, res) => {
  const {
    title,
    description,
    instructor_name,
    duration,
    meetings_per_week,
    lecture_hours_start,
    lecture_hours_end,
    price,
    sale_price,
    curriculum,
    learning_outcomes
  } = req.body;

  if (!(title && description && instructor_name && duration && lecture_hours_start && lecture_hours_end && price && curriculum && learning_outcomes)) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const query = `
    INSERT INTO courses (
      title, description, instructor_name, duration, meetings_per_week,
      lecture_start_time, lecture_end_time, price, sale_price,
      curriculum, learning_outcomes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(query, [
    title,
    description,
    instructor_name,
    duration,
    meetings_per_week,
    lecture_hours_start,
    lecture_hours_end,
    price,
    sale_price || null,
    curriculum,
    learning_outcomes
  ], (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to insert course" });
    }
    res.status(201).json({ message: "Course created successfully" });
  });
});

// ✅ Export router
module.exports = router;
