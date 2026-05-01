// Mongo

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.error("MongoDB Error ❌", err);
});




const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors({
  origin: "https://pb.portfoliobuilder153.workers.dev"
}));

app.use(express.json());

let otpStore = {};

const resend = new Resend(process.env.RESEND_API_KEY);

// ================= SEND OTP =================
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  // 🔥 STORE OTP (you forgot this earlier)
  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000 // 5 minutes
  };

  console.log("SENT OTP:", otp);
  console.log("STORE AFTER SAVE:", otpStore);

  try {
    const response = await resend.emails.send({
      from: "Portfolio Builder <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Code",
      html: `<h1>Your OTP is ${otp}</h1>`,
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
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  console.log("RECEIVED OTP:", otp);
  console.log("STORED RECORD:", record);
  console.log("FULL STORE:", otpStore);

  if (!record) {
    return res.json({ success: false });
  }

  // expiry check
  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.json({ success: false });
  }

  if (record.otp == otp) {
    delete otpStore[email];
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));



// MongoDB

