const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.use(authenticateToken);

router.put("/", async (req, res) => {
  const id = req.user.id;
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (username == "" || password == "") {
      console.log(username)
      return res
        .status(404)
        .json({ message: "Username or password cannot be empty" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }

    user.username = username;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

module.exports = router;
