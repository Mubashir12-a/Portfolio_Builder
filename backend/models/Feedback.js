const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  type:        { type: String, default: "General" }, // Feature Request / Bug Report / Suggestion / General Love
  message:     { type: String, required: true },
  name:        { type: String, default: "Anonymous" },
  submittedAt: { type: Date,   default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
