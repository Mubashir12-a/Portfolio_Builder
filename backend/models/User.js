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

  lastLogin: Date,

  profileImage: String,

  about: String,

  phone: String,
  address: String,

  socialLinks: {
    instagram: String,
    facebook: String,
    github: String,
    linkedin: String,
    portfolio: String,
    extra: String
  },

  education: [{ level: String, name: String, address: String, status: String }],
  projects: [{ title: String, description: String, link: String, image: String }],
  experience: [{ company: String, description: String, certificate: String }],
  skills: [{ name: String, icon: String, progress: Number }],

  // Subscription
  plan: { type: String, enum: ['free', 'studio', 'pro'], default: 'free' },
  planExpiry: Date,
  planPending: {
    utr:         String,
    amount:      Number,
    billing:     String,
    plan:        String,
    submittedAt: Date
  }

});

module.exports = mongoose.model("User", userSchema);