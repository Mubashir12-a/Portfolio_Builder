// Mongo

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

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




const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors({
  origin:  [
    "https://portfolio-builder.online",
    "https://pb.portfoliobuilder153.workers.dev"
  ]
}));

app.use(express.json());

let otpStore = {};

const resend = new Resend(process.env.RESEND_API_KEY);

// ================= SEND OTP =================
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

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
  console.log("FULL BODY:", req.body);

  console.log(name, email, password);

  const { email, otp, name, password } = req.body;

  const record = otpStore[email];

  console.log("RECEIVED OTP:", otp);
  console.log("STORED RECORD:", record);

  if (!record) {
    return res.json({ success: false });
  }

  // expiry check
  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.json({ success: false });
  }

  if (record.otp == otp) {

    try {
      let existingUser = await User.findOne({ email });

      if (type === "signup") {

        let existingUser = await User.findOne({ email });

        if (!existingUser) {
          await User.create({
            name,
            email,
            password
          });
        
          console.log("USER SAVED ✅");
        } else {
          console.log("USER ALREADY EXISTS ⚠️");
        }
      
      }

      delete otpStore[email];
      return res.json({ success: true });

    } catch (err) {
      console.error("DB ERROR FULL:", err);
      return res.status(500).json({ success: false });
    }
  }

  return res.json({ success: false });
});







