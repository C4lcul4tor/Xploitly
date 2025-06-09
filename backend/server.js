const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const registerRoute = require('./routes/register');
const adminAuthRoute = require('./routes/adminAuth');
const courseRoutes = require('./routes/courses');
const contactRoutes = require('./routes/contact'); // ✅ <-- added here
const lecturersRoute = require('./routes/lecturers');

app.use("/api/lecturers", require("./routes/lecturers"));
app.use('/api/register', registerRoute);
app.use('/api/admin-auth', adminAuthRoute);
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes); // ✅ <-- added here

// Start Server
app.listen(5000, () => {
  console.log('🚀 Backend running on http://localhost:5000');
});
