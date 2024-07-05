// routes/summary.js
const express = require("express");
const { Op } = require("sequelize");
const JournalEntry = require("../models/JournalEntry");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.use(authenticateToken);

router.get("/", async (req, res) => {
  const { period } = req.query;
  const userId = req.user.id; // Assuming user ID is set in the verifyToken middleware

  try {
    let startDate;

    // Calculate start date based on period
    const today = new Date();
    if (period === "daily") {
      startDate = new Date(today.setDate(today.getDate() - 1));
      console.log(startDate);
    } else if (period === "weekly") {
      startDate = new Date(today.setDate(today.getDate() - 7));
      console.log(startDate);
    } else if (period === "monthly") {
      startDate = new Date(today.setMonth(today.getMonth() - 1));
      console.log(startDate);
    } else {
      return res.status(400).json({ message: "Invalid period specified" });
    }

    // Fetch entries from the database
    const entries = await JournalEntry.findAll({
      where: {
        userId,
        createdAt: {
          [Op.gte]: startDate,
        },
      },
    });

    console.log(entries);

    // Process summary
    const totalEntries = entries.length;
    const categories = [...new Set(entries.map((entry) => entry.category))];

    res.json({ totalEntries, categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary", error });
  }
});

module.exports = router;
