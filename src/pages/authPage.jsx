import '../pagesStyles/authPage.css';

import Header from '../components/LandingPageComponents/header';
import Btn_Primary from '../components/GeneralComponents/buttonPrimary';
import { useState } from 'react';
import { useEffect } from "react";


console.log("P01");
console.log("P02");
console.log("P03");

function AuthPage(){
    return (
        <>
            <Header comp={BtnsSet}/>

            <section id='auth'>
                <Caption/>
                
                <LoginRSignupComp/>


            </section>
        </>
    )
}

export default AuthPage;


function BtnsSet(){
    return (
        <>
            <Btn_Primary title={"Home"} to={"/"}/>
        </>
    )
}


function LoginRSignupComp() {
    const [isActive, setIsActive] = useState("LogIn");
    const [HoldLogInCont, setHoldLogInCont] = useState("GetLoginInfo");
    const [userEmail, setUserEmail] = useState("");


    return (
        <>
            <div id="LogSigncontainer">
                <div className="switchTab">
                    <button onClick={() => {
                        setIsActive("LogIn");
                    }} className={isActive === "LogIn" ? "activeBtn" : ''}>Log In</button>

                    <button onClick={() => {
                        setIsActive("SignUp");
                    }} className={`btn ${isActive === "SignUp" ? "activeBtn" : ''}`}>Sign Up</button>
                </div>

                <div className="show">
                    {HoldLogInCont == 'GetLoginInfo' && <GetLoginInfo holdCont={setHoldLogInCont} setUserEmail={setUserEmail}/>}
                    {HoldLogInCont == 'OTPVerify' && <GetLoginOTP holdCont={setHoldLogInCont} userEmail={userEmail}/>}
                    {HoldLogInCont == 'LogInDone' && <LogInDone holdCont={setHoldLogInCont}/>}
                    {HoldLogInCont == 'ForgotPass' && <ForgotPass holdCont={setHoldLogInCont}/>}
                </div>
            </div>
        </>
    )
}





// Login Components Parts:

function GetLoginInfo({ holdCont, setUserEmail }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsAlert, setShowTermsAlert] = useState(false);   
    const [errorMsg, setErrorMsg] = useState(""); 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    const handleLogin = async () => {
        console.log("LOGIN CLICKED");

        if (!email) {
            setErrorMsg("Email is required");
            return;
        }  
        
        if  (!emailRegex.test(email)) {
            setErrorMsg("Invalid email format");
            return;
        }  
        
        if  (!password) {
            setErrorMsg("Password is required");
            return;
        }  
        
        if  (password.length < 8) {
            setErrorMsg("Password must be at least 8 characters");
            return;
        }  
        
        if  (!termsAccepted) {
            setErrorMsg("Accept Terms & Conditions");
            return;
        }  
        
        setErrorMsg("");

        setUserEmail(email);

        console.log("Calling API...");

        try {
            const res = await fetch("https://portfolio-builder-wgp1.onrender.com/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
      
            const data = await res.json();
      
            if (data.message === "OTP sent") {
                holdCont("OTPVerify");
            } else {
                setErrorMsg("Failed to send OTP");
            }
        } catch (err) {
            setErrorMsg("Server error. Try again.");
        }
    };



    return (
        <section id="GetLoginInfo">
            <div className="heading">
                <h3>Welcome <em>back.</em></h3>
                <p>Log in to your Portfolio Builder account.</p>
            </div>

            {errorMsg && <AlertBox AlertMsg={errorMsg} />}

            <div className="getmail">
                <label>Email Address</label>
                <input
                    type="email"
                    id="loginEmail"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="getpass">
                <button className='forgotPass' onClick={() => {holdCont('ForgotPass')}}>Forgot password?</button>
                <label>Password</label>
                <input
                    type="password"
                    id="loginPass"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="terms">
                <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <p>Agree Our</p>
                <a href="">Terms & Conditions</a>
            </div>

            <button onClick={handleLogin}>Log In</button>

            <div className="signup">
                <p>Don't have an account?</p>
                <button>Sign up free</button>
            </div>
        </section>
  );
}

function GetLoginOTP({ holdCont, userEmail }){
    const [time, setTime] = useState(30);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (time <= 0) return;
        
        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);
        
        return () => clearInterval(timer);
    }, [time]);
    
    const handleResend = () => {
        if (time === 0) {
            setTime(30);
        }
    };

    const handleVerify = async () => {
        const finalOTP = otp.join("");

        if (finalOTP.length < 6) {
            setError("Enter full OTP");
            return;
        }
      
        try {
            const res = await fetch("https://portfolio-builder-wgp1.onrender.com/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                email: userEmail,
                otp: finalOTP,
                }),
            });
        
            const data = await res.json();
        
            if (data.success) {
                setOtp(["", "", "", "", "", ""]);
                holdCont("LogInDone");
            } else {
                setError("Invalid or expired OTP");
            }
        } catch (err) {
            setError("Server error. Try again.");
        }
    };

    return (
        <>
            <div id="getLoginOTP">
                <div className='headLines'>
                    <span className='line'></span><span className='line'></span>
                </div>

                <p className='getOTPtext'><span>2</span> Verify It's You</p>

                {error && <AlertBox AlertMsg={error} />}

                <h3>Check your <em>inbox.</em></h3>
                <p className='captn'>We sent a 6-digit code to</p>

                <div className="refMail">
                    <span>📧</span>
                    <p>{userEmail}</p>
                </div>

                <div className="EnterOTP">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "").slice(0, 1);

                                const newOtp = [...otp];
                                newOtp[index] = val;
                                setOtp(newOtp);

                                if (val && e.target.nextSibling) {
                                    e.target.nextSibling.focus();
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !digit && e.target.previousSibling) {
                                    e.target.previousSibling.focus();
                                }
                            }}
                        />
                    ))}
                </div>

                <div className="resendCode">
                    {time > 0 ? (
                        <p>Resend code in {time} s</p>
                    ) : (
                        <button onClick={handleResend}>Resend Code</button>
                    )}
                </div>

                <button className='Ver_LogIn' onClick={handleVerify}>Verify & Login ✓</button>
                <button className='back'  onClick={() => {holdCont('GetLoginInfo')}}>← Back</button>
            </div>
        </>
    )

    
}

const OTPValidate_Jump = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    e.target.value = value;
    
    if (value && e.target.nextSibling) {
        e.target.nextSibling.focus();
    }
}

const BackJump = (e) => {
    if (e.key === "Backspace" && !e.target.value) {
        const prev = e.target.previousSibling;
        if (prev) {
            prev.focus();
        }
    }
}



function ForgotPass({holdCont}){
    return (
        <>
            <div id="ForgotPass">
                <h3>Reset your <em>password.</em></h3>
                <p>Enter your email and we'll send a reset link.</p>

                <div className="getmail">
                    <label>Email Address</label>
                    <input
                        type="email"
                        id="forgotEmail"
                        placeholder="you@domain.com"
                    />
                </div>

                <button className='sendResetLink'>Send Reset Link →</button>
                <button className='BackToLog' onClick={() => {holdCont('GetLoginInfo')}}>← Back To Log-In</button>
            </div>
        </>
    )
}


function LogInDone({holdCont}){
    return (
        <>
            <div id="LogInDone">
                <span>✓</span>

                <h3>You're in, <em> welcome back!</em></h3>
                <p>Identity verified. Redirecting you to your dashboard in a moment...</p>

                <button>Go To Dashboard →</button>
            </div>
        </>
    )
}

function AlertBox({AlertMsg}){
    return (
        <>
            <div className='AlertBox'>
                <span>⚠️</span>
                <p>{AlertMsg}</p>
            </div>
        </>
    )
}


function Caption(){
    return (
        <>
           <section className="parent">
                <div className="tag"><span>.</span><p>JOIN THE BUILDER</p></div>

                <h1>Your portfolio is one step<br/><em>away.</em></h1>

                <p className='para'>Sign up in under 2 minutes. No credit card, no setup complexity — just your story, beautifully presented.</p>

                <div className="tabs">
                    <div className="tab tab1">
                        <span>🎨</span>
                        <div>
                            <h4>12+ Professional Templates</h4>
                            <p>Designed for developers, designers & creators</p>
                        </div>
                    </div>
                    <div className="tab tab2">
                        <span>🔒</span>
                        <div>
                            <h4>Secure OTP Verification</h4>
                            <p>Your account is protected with email verification</p>
                        </div>
                    </div>
                    <div className="tab tab3">
                        <span>⚡</span>
                        <div>
                            <h4>Publish in Minutes</h4>
                            <p>Get a live shareable link the same day</p>
                        </div>
                    </div>
                </div>

                <div className="MajorTab">
                    <div>
                        <span>M</span>
                        <span>A</span>
                        <span>H</span>
                        <span>+2k</span>
                    </div>

                    <div>
                        <h3>2,000+ students & developers</h3>
                        <p>already have their portfolio live.</p>
                    </div>
                </div>
           </section>
        </>
    )
}
