const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const newNote = await pool.query(
      `
      INSERT INTO notes (title, content, user_id, tags)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [title, content, req.user.id, tags]
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

router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const { title, content } = req.body;
    const { id } = req.params;

    const updatedNote = await pool.query(
      `
      UPDATE notes
      SET title = $1,
          content = $2
      WHERE id = $3
      AND user_id = $4
      RETURNING *
      `,
      [title, content, id, req.user.id]
    );

    res.json({
      success: true,
      note: updatedNote.rows[0],
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