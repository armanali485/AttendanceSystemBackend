// ------------------ Required Modules ------------------
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Loads .env variables

// ------------------ Import Routes ------------------
const teacherRoutes = require("./routes/teacher");
const userRoutes = require("./routes/user");
const studentRoutes = require("./routes/student");
const classRoutes = require("./routes/class");

const app = express();

// ------------------ MongoDB Atlas Connection ------------------
const dbConnectionStr = process.env.MONGODB_URI;

mongoose.connect(dbConnectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas!");
})
.catch((error) => {
  console.error("❌ MongoDB connection failed:", error);
});

// ------------------ CORS Configuration ------------------
app.use(cors({
  origin: ["http://localhost:4200", "https://attendanceSystem485.netlify.app"], // Frontend URLs
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
}));

// (Optional) Handle preflight requests globally
app.options("*", cors());

// ------------------ Middleware ------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

// ------------------ API Routes ------------------
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/class", classRoutes);

// ------------------ Export App ------------------
module.exports = app;
