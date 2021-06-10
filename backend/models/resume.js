const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
  filename: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: String, required: true },
  linkedin: { type: String, required: true },
  education: { type: String, required: true },
  skills: { type: String, required: true },
  languages: { type: String, required: true },
  filePath: { type: String, required: true }
});

module.exports = mongoose.model("Resume", resumeSchema);
