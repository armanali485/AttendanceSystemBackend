const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Route imports
const teacherRoutes = require("./routes/teacher");
const userRoutes = require("./routes/user");
const studentRoutes = require("./routes/student");
const classRoutes = require("./routes/class");

const app = express();

// ------------------ MongoDB Atlas Connection ------------------
require("dotenv").config();
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

// ------------------ Middleware ------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

// ------------------ CORS Setup ------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// ------------------ Routes ------------------
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/class", classRoutes);

module.exports = app;
