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

  const otp = Math.floor(100000 + Math.random() * 900000);

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