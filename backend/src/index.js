const express = require("express");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const noteRoutes = require("./routes/noteRoutes");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Backend connected successfully!",
      databaseTime: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected profile data",
    user: req.user,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});