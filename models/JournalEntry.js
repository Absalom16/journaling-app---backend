// models/JournalEntry.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const JournalEntry = sequelize.define("JournalEntry", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

JournalEntry.belongsTo(User, { foreignKey: "userId" });

module.exports = JournalEntry;
