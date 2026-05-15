const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  profileCompleted: {
    type: Boolean,
    default: false
  },

  profileImage: String,

  about: String,

  phone: String,

  socialLinks: {
    instagram: String,
    facebook: String,
    github: String,
    linkedin: String,
    portfolio: String,
    extra: String
  },

  education: [{ level: String, name: String, address: String, status: String }],
  projects: [{ title: String, description: String }],
  experience: [{ company: String, description: String }],
  skills: [{ name: String, icon: String, progress: Number }]

});

module.exports = mongoose.model("User", userSchema);