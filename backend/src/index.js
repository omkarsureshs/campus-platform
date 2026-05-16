const express = require("express");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});