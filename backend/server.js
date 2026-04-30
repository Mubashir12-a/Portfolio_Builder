const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors({
  origin: "https://pb.portfoliobuilder153.workers.dev"
}));

app.use(express.json());

let otpStore = {};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const resend = new Resend(process.env.RESEND_API_KEY);

// send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = generateOTP();
  otpStore[email] = otp;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your OTP Code",
    html: `<h1>Your OTP is ${otp}</h1>`,
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));