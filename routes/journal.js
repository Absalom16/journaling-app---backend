// routes/journal.js
const express = require("express");
const JournalEntry = require("../models/JournalEntry");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.use(authenticateToken);

router.post("/entries", async (req, res) => {
  const { title, content, category } = req.body;
  const userId = req.user.id;

  try {
    if (!title || !content || !category) {
      res.status(404).json({ error: "Invalid entry" });
    } else {
      const entry = await JournalEntry.create({
        title,
        content,
        category,
        userId,
      });
      res.status(201).json(entry);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create entry" });
  }
});

router.get("/entries", async (req, res) => {
  const userId = req.user.id;
  const { category } = req.query;

  try {
    if (category) {
      const entries = await JournalEntry.findAll({ where: { category } });
      res.json(entries);
    } else {
      const entries = await JournalEntry.findAll({ where: { userId } });
      res.json(entries);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

router.put("/entries/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const userId = req.user.id;

  try {
    const entry = await JournalEntry.findOne({ where: { id, userId } });
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    entry.title = title;
    entry.content = content;
    entry.category = category;
    await entry.save();

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "Failed to update entry" });
  }
});

router.delete("/entries/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const entry = await JournalEntry.findOne({ where: { id, userId } });
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    await entry.destroy();
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

module.exports = router;
