const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let otpStore = {}; // temporary storage

// generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// mail setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "portfoliobuilder153@gmail.com",
    pass: "vwbulvqqflqzluid",
  },
});

// send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = generateOTP();
  otpStore[email] = otp;

  await transporter.sendMail({
    from: "portfoliobuilder153@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });

  res.json({ message: "OTP sent" });
});

// verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// app.listen(5000, () => console.log("Server running on 5000"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on", PORT));