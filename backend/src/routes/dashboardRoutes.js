const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const totalNotesResult = await pool.query(
      `
      SELECT COUNT(*) 
      FROM notes
      WHERE user_id = $1
      `,
      [userId]
    );

    const pinnedNotesResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM notes
      WHERE user_id = $1
      AND pinned = true
      `,
      [userId]
    );

    const tagsResult = await pool.query(
      `
      SELECT COUNT(DISTINCT tag)
      FROM (
        SELECT UNNEST(tags) AS tag
        FROM notes
        WHERE user_id = $1
      ) t
      `,
      [userId]
    );

    const latestNoteResult = await pool.query(
      `
      SELECT title
      FROM notes
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [userId]
    );

    const recentNotesResult = await pool.query(
      `
      SELECT id, title, created_at
      FROM notes
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [userId]
    );

    res.json({
      success: true,
      totalNotes: Number(totalNotesResult.rows[0].count),
      pinnedNotes: Number(pinnedNotesResult.rows[0].count),
      totalTags: Number(tagsResult.rows[0].count),
      latestNote:
        latestNoteResult.rows[0]?.title || "No Notes Yet",
      recentNotes: recentNotesResult.rows,
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