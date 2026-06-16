const express = require("express");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);

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

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {

    const userResult = await pool.query(
      `
      SELECT id, name, email, nickname
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      user: userResult.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
});


app.put("/api/profile", authMiddleware, async (req, res) => {

  try {

    const { name, nickname } = req.body;

    const updatedUser = await pool.query(
      `
      UPDATE users
      SET
        name = $1,
        nickname = $2
      WHERE id = $3
      RETURNING id, name, email, nickname
      `,
      [
        name,
        nickname,
        req.user.id
      ]
    );

    res.json({
      success: true,
      user: updatedUser.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }

});

app.get("/api/stats", authMiddleware, async (req, res) => {
  try {

    const totalNotes = await pool.query(
      "SELECT COUNT(*) FROM notes WHERE user_id = $1",
      [req.user.id]
    );

    const pinnedNotes = await pool.query(
      "SELECT COUNT(*) FROM notes WHERE user_id = $1 AND pinned = true",
      [req.user.id]
    );

    const recentNotes = await pool.query(
      `
      SELECT id, title, created_at
      FROM notes
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [req.user.id]
    );

    res.json({
  totalNotes: Number(totalNotes.rows[0].count),
  pinnedNotes: Number(pinnedNotes.rows[0].count),
  recentNotes: recentNotes.rows,
  recentCount: recentNotes.rows.length,
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});