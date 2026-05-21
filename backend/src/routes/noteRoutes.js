const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = await pool.query(
      `
      INSERT INTO notes (title, content, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [title, content, req.user.id]
    );

    res.json({
      success: true,
      note: newNote.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await pool.query(
      `
      SELECT * FROM notes
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      notes: notes.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM notes
      WHERE id = $1
      AND user_id = $2
      `,
      [id, req.user.id]
    );

    res.json({
      success: true,
      message: "Note deleted",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }

});

module.exports = router;