require("dotenv").config();
const mongoose = require("mongoose");
const User     = require("./models/User");
const Feedback = require("./models/Feedback");

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 } // 1MB
});

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");

  app.listen(PORT, () => {
    console.log("Server running on", PORT);
  });

})
.catch((err) => {
  console.error("MongoDB Error ❌", err);
});


app.use(cors({
  origin:  [
    "http://localhost:5173",
    "https://portfolio-builder.online",
    "https://pb.portfoliobuilder153.workers.dev"
  ]
}));

app.use(express.json());

let otpStore = {};

const resend = new Resend(process.env.RESEND_API_KEY);

// ================= SEND OTP =================
app.post("/send-otp", async (req, res) => {
  const { email, type, password } = req.body;

  if (type === "login") {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
  }

  if (type === "forgot-password") {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }
  }

  if (type === "signup") {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000
  };

  console.log("SENT OTP:", otp);
  console.log("STORE AFTER SAVE:", otpStore);

  try {
    const response = await resend.emails.send({
      from: "Portfolio Builder <noreply@portfolio-builder.online>",
      to: email,
      subject: "Your Verification Code • Portfolio Builder",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          background:#f4f7fb;
          padding:40px 20px;
          color:#111827;
        ">

          <div style="
            max-width:520px;
            margin:auto;
            background:white;
            border-radius:16px;
            overflow:hidden;
            border:1px solid #e5e7eb;
            box-shadow:0 10px 30px rgba(0,0,0,0.06);
          ">

            <div style="
              background:#7B5EF8;
              padding:28px;
              text-align:center;
              color:white;
            ">
              <h1 style="
                margin:0;
                font-size:28px;
              ">
                Portfolio Builder
              </h1>

              <p style="
                margin-top:8px;
                opacity:0.9;
                font-size:14px;
              ">
                Secure Email Verification
              </p>
            </div>

            <div style="padding:35px;">

              <h2 style="
                margin-top:0;
                font-size:24px;
                color:#111827;
              ">
                Verify your email
              </h2>

              <p style="
                font-size:15px;
                line-height:1.7;
                color:#4b5563;
              ">
                Use the verification code below to continue.
                This code will expire in 5 minutes.
              </p>

              <div style="
                margin:30px 0;
                text-align:center;
              ">

                <div style="
                  display:inline-block;
                  background:#f3f4f6;
                  padding:18px 36px;
                  border-radius:14px;
                  font-size:34px;
                  font-weight:bold;
                  letter-spacing:8px;
                  color:#7B5EF8;
                ">
                  ${otp}
                </div>

              </div>

              <p style="
                font-size:14px;
                color:#6b7280;
                line-height:1.6;
              ">
                If you did not request this verification code, you can safely ignore this email.
              </p>

            </div>

            <div style="
              border-top:1px solid #e5e7eb;
              padding:20px;
              text-align:center;
              font-size:13px;
              color:#9ca3af;
            ">
              © 2026 Portfolio Builder. All rights reserved.
            </div>

          </div>
        </div>
      `,
    });

    console.log("EMAIL RESPONSE:", response);

    return res.json({ message: "OTP sent" });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return res.status(500).json({
      message: "Email failed",
      error: error.message
    });
  }
});

// ================= VERIFY OTP =================
app.post("/verify-otp", async (req, res) => {

  const { email, otp, name, password, type } = req.body;

  const record = otpStore[email];

  if (!record) {
    return res.json({ success: false });
  }

  // OTP expired
  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.json({ success: false });
  }

  // OTP matched
  if (record.otp == otp) {

    try {

      let user = await User.findOne({ email });

      // SIGNUP
      if (type === "signup") {

        if (!user) {

          user = await User.create({
            name,
            email,
            password,
            profileCompleted: false
          });

          console.log("USER CREATED ✅");
        }
      }

      // LOGIN CHECK
      if (!user && type !== "forgot-password") {
        return res.json({
          success: false,
          message: "User not found"
        });
      }

      if (type === "forgot-password") {
        delete otpStore[email];
        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '15m' });
        return res.json({ success: true, resetToken });
      }

      delete otpStore[email];

      // Record last login time and persist
      user.lastLogin = new Date();
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '12h' });

      return res.json({
        success: true,
        user,
        token
      });

    } catch (err) {

      console.error(err);

      return res.status(500).json({
        success: false
      });
    }
  }

  return res.json({ success: false });
});

// ================= RESET PASSWORD =================
app.post("/reset-password", async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return res.status(400).json({ message: "Missing token or password" });
  }

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET || 'secret_key');
    const user = await User.findOne({ email: decoded.email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

// ================= MIDDLEWARE =================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// ================= UPDATE PROFILE =================
app.put("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const { name, address, about, phone, socialLinks, education, projects, experience, skills } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (address) user.address = address;
    if (about) user.about = about;
    if (phone) user.phone = phone;
    if (socialLinks) user.socialLinks = socialLinks;
    if (education) user.education = education;
    if (projects) user.projects = projects;
    if (experience) user.experience = experience;
    if (skills) user.skills = skills;
    
    user.profileCompleted = true;

    await user.save();
    
    return res.json({ success: true, user });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= GET PROFILE =================
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    
    return res.json({ success: true, user });
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= UPLOAD IMAGE =================
app.post("/api/user/upload-image", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "portfolio_builder_profiles",
      resource_type: "auto",
    });

    const user = await User.findById(req.user.userId);
    user.profileImage = result.secure_url;
    await user.save();

    return res.json({ success: true, url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: err.message || "Upload failed" });
  }
});


// ================= ADMIN CREDENTIALS (env only) =================
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const ADMIN_OTP      = process.env.ADMIN_OTP      || '';

// ================= ADMIN MIDDLEWARE =================
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "No token" });
  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, decoded) => {
    if (err || decoded.role !== 'admin')
      return res.status(403).json({ message: "Not authorized" });
    req.admin = decoded;
    next();
  });
};

// ================= ADMIN LOGIN (sends decoy OTP) =================
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Send a random decoy OTP — the real OTP is the static secret in .env
  const decoyOtp = Math.floor(100000 + Math.random() * 900000);
  try {
    await resend.emails.send({
      from: "Portfolio Builder <noreply@portfolio-builder.online>",
      to: email,
      subject: "Admin Verification Code • Portfolio Builder",
      html: `<div style="font-family:Arial;padding:30px;background:#0a0a12;color:#fff;border-radius:12px">
        <h2 style="color:#7B5EF8">Admin Panel Access</h2>
        <p>Verification code:</p>
        <div style="font-size:2rem;font-weight:bold;letter-spacing:8px;color:#2EDFA3;padding:16px;background:#111;border-radius:8px;display:inline-block">${decoyOtp}</div>
        <p style="color:#666;font-size:12px;margin-top:20px">This code expires in 5 minutes.</p>
      </div>`
    });
  } catch (e) { /* ignore send errors */ }
  return res.json({ success: true, message: "OTP sent" });
});

// ================= ADMIN VERIFY OTP (static secret) =================
app.post('/api/admin/verify-otp', (req, res) => {
  const { otp } = req.body;
  if (String(otp).trim() !== String(ADMIN_OTP).trim()) {
    return res.status(401).json({ success: false, message: "Invalid OTP" });
  }
  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: '8h' }
  );
  return res.json({ success: true, token });
});

// ================= SUBMIT PAYMENT REQUEST =================
app.post('/api/subscription/request', authenticateToken, async (req, res) => {
  const { plan, billing, amount, utr } = req.body;
  if (!plan || !billing || !amount || !utr)
    return res.status(400).json({ message: "Missing fields" });
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.planPending = { utr, amount, billing, plan, submittedAt: new Date() };
    await user.save();
    return res.json({ success: true, message: "Payment request submitted. Awaiting verification." });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= GET PENDING PAYMENTS (admin) =================
app.get('/api/admin/pending-payments', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({ 'planPending.utr': { $exists: true, $ne: null } })
      .select('name email plan planExpiry planPending');
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= APPROVE PAYMENT (admin) =================
app.post('/api/admin/approve-payment', authenticateAdmin, async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const billing = user.planPending?.billing;
    const plan    = user.planPending?.plan;

    const daysMap = { 'Monthly': 30, '6 Months': 180, 'Yearly': 365, '3 Years': 1095 };
    const days = daysMap[billing] || 30;

    user.plan       = plan;
    user.planExpiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    user.planPending = undefined;
    await user.save();
    return res.json({ success: true, message: `Plan activated: ${plan} for ${days} days` });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= REJECT PAYMENT (admin) =================
app.post('/api/admin/reject-payment', authenticateAdmin, async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.planPending = undefined;
    await user.save();
    return res.json({ success: true, message: "Payment request rejected" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});


// ================= SUBMIT FEEDBACK (public) =================
app.post('/api/feedback', async (req, res) => {
  const { type, message, name } = req.body;
  if (!message || message.trim().length < 5)
    return res.status(400).json({ message: "Message too short" });
  try {
    const fb = await Feedback.create({
      type:    type    || 'General',
      message: message.trim(),
      name:    name?.trim() || 'Anonymous'
    });
    return res.json({ success: true, feedback: fb });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= GET ALL FEEDBACKS (admin) =================
app.get('/api/admin/feedbacks', authenticateAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    return res.json({ success: true, feedbacks });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= DELETE FEEDBACK (admin) =================
app.delete('/api/admin/feedback/:id', authenticateAdmin, async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Feedback deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ================= GET ALL USERS (admin) =================
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .select('name email password phone address plan planExpiry profileCompleted lastLogin createdAt')
      .sort({ lastLogin: -1 });
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});


// ================= CONTACT FORM =================
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields are required" });
  if (message.trim().length < 5)
    return res.status(400).json({ message: "Message is too short" });
  try {
    await resend.emails.send({
      from: "Portfolio Builder <noreply@portfolio-builder.online>",
      to:   process.env.ADMIN_EMAIL || 'ma2625645@gmail.com',
      subject: `Contact Message from ${name} — Portfolio Builder`,
      html: `
        <div style="font-family:Arial;padding:30px;background:#0a0a12;color:#fff;border-radius:12px;max-width:500px">
          <h2 style="color:#7B5EF8;margin-bottom:20px">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#9490B5;width:80px">Name</td><td style="color:#fff;font-weight:bold">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#9490B5">Email</td><td style="color:#38C5FF">${email}</td></tr>
          </table>
          <div style="background:#111;border-radius:8px;padding:16px;margin-top:16px;border-left:3px solid #7B5EF8">
            <p style="color:#9490B5;font-size:12px;margin-bottom:8px">MESSAGE</p>
            <p style="color:#e0e0f0;line-height:1.6">${message}</p>
          </div>
          <p style="color:#333344;font-size:11px;margin-top:20px">Sent via Portfolio Builder contact form</p>
        </div>
      `
    });
    return res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact email error:", err);
    return res.status(500).json({ message: "Failed to send message" });
  }
});

