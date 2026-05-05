import '../pagesStyles/authPage.css';

import loadingAuth from "../assets/loadingAuth.gif"

import Header from '../components/LandingPageComponents/header';
import Btn_Primary from '../components/GeneralComponents/buttonPrimary';
import { useState } from 'react';
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

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
    const [switchTab, setSwitchTab] = useState("LogInContainer")
    const [userEmail, setUserEmail] = useState("");
    const [userData, setUserData] = useState({});


    return (
        <>
            <div id="LogSigncontainer">
                <div className="switchTab">
                    <button onClick={() => {
                        setIsActive("LogIn");
                        setSwitchTab("LogInContainer");
                        setHoldLogInCont('GetLoginInfo');
                    }} className={isActive === "LogIn" ? "activeBtn" : ''}>Log In</button>

                    <button onClick={() => {
                        setIsActive("SignUp");
                        setSwitchTab("SignupContainer");
                        setHoldLogInCont('Create_Acc');
                    }} className={`btn ${isActive === "SignUp" ? "activeBtn" : ''}`}>Sign Up</button>
                </div>

                <div className="show">
                    {switchTab === 'LogInContainer' && <LogInContainer 
                                                                setHoldLogInCont={setHoldLogInCont} 
                                                                HoldLogInCont={HoldLogInCont} 
                                                                userEmail={userEmail} 
                                                                setUserEmail={setUserEmail} 
                                                                setSwitchTab={setSwitchTab}/>}

                    {switchTab === 'SignupContainer' && <SignupContainer 
                                                                setHoldLogInCont={setHoldLogInCont} 
                                                                HoldLogInCont={HoldLogInCont} 
                                                                userEmail={userEmail} 
                                                                setUserEmail={setUserEmail} 
                                                                setSwitchTab={setSwitchTab}
                                                                userData={userData}
                                                                setUserData={setUserData}/>}
                </div>
            </div>
        </>
    )
}


// LogIn Container:

function LogInContainer({ setHoldLogInCont, userEmail, HoldLogInCont, setUserEmail, setSwitchTab }) {
    return (
        <>
            {HoldLogInCont === 'GetLoginInfo' && (
                <GetLoginInfo 
                    holdCont={setHoldLogInCont} 
                    setUserEmail={setUserEmail}
                    setSwitchTab={setSwitchTab}
                />
            )}

            {HoldLogInCont === 'OTPVerify' && (
                <GetLoginOTP 
                    holdCont={setHoldLogInCont} 
                    userEmail={userEmail}
                    type="login"
                />
            )}

            {HoldLogInCont === 'LogInDone' && (
                <LogInDone holdCont={setHoldLogInCont}/>
            )}

            {HoldLogInCont === 'ForgotPass' && (
                <ForgotPass holdCont={setHoldLogInCont}/>
            )}
        </>
    );
}

function SignupContainer({setHoldLogInCont, userEmail, HoldLogInCont, setUserEmail, setSwitchTab, userData, setUserData}){
    return (
        <>
            {HoldLogInCont === 'OTPVerify' && (
                <GetLoginOTP 
                    holdCont={setHoldLogInCont} 
                    userEmail={userEmail}
                    type="signup"
                    userData={userData}
                />
            )}

            {HoldLogInCont === 'SignUpDone' && (
                <SignUpDone holdCont={setHoldLogInCont}/>
            )}

            {HoldLogInCont === 'Create_Acc' && (
                <CreateAcc 
                    holdCont={setHoldLogInCont}
                    setUserEmail={setUserEmail}
                    setSwitchTab={setSwitchTab}
                    setUserData={setUserData}
                />
            )}
        </>
    )
}





// Login Components Parts:

function GetLoginInfo({ holdCont, setUserEmail, setSwitchTab }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsAlert, setShowTermsAlert] = useState(false);   
    const [errorMsg, setErrorMsg] = useState(""); 
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    const handleLogin = async () => {
        console.log("LOGIN CLICKED");

        if (!email) return setErrorMsg("Email is required");
        if (!emailRegex.test(email)) return setErrorMsg("Invalid email format");
        if (!password) return setErrorMsg("Password is required");
        if (password.length < 8) return setErrorMsg("Password must be at least 8 characters");
        if (!termsAccepted) return setErrorMsg("Accept Terms & Conditions");

        setErrorMsg("");
        setUserEmail(email);

        console.log("Calling API...");
        setLoading(true);

        try {
            const res = await fetch("https://portfolio-builder-wgp1.onrender.com/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                cache: "no-store" // 🔥 important
            });

            const data = await res.json();
            console.log("SEND OTP RESPONSE:", data);

            if (data.message === "OTP sent") {
                holdCont("OTPVerify");
            } else {
                setErrorMsg("Failed to send OTP");
            }

        } catch (err) {
            console.error(err);
            setErrorMsg("Server error. Try again.");
        } finally {
            setLoading(false);
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

            <button onClick={handleLogin}>
                {loading ? <LoadingForAuth /> : "Log In"}
            </button>

            <div className="signup">
                <p>Don't have an account?</p>
                <button onClick={() => {holdCont('Create_Acc'); setSwitchTab('SignupContainer')}}>Sign up free</button>
            </div>
        </section>
  );
}




function GetLoginOTP({ holdCont, userEmail, type, userData = {} }){
    const [time, setTime] = useState(30);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
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

    console.log("VERIFYING OTP:", finalOTP);
    setLoading(true);

    try {
        const res = await fetch("https://portfolio-builder-wgp1.onrender.com/verify-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userEmail,
                otp: finalOTP,
                name: userData.name,
                password: userData.password
            }),
            cache: "no-store" // 🔥 important
        });

        const data = await res.json();
        console.log("VERIFY RESPONSE:", data);

        if (data.success) {
            setOtp(["", "", "", "", "", ""]);

            if (type === "signup") {
                holdCont("SignUpDone");
            } else {
                holdCont("LogInDone");
            }
        } else {
            setError("Invalid or expired OTP");
        }

    } catch (err) {
        console.error(err);
        setError("Server error. Try again.");
    } finally {
        setLoading(false);
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

               <button className='Ver_LogIn' onClick={handleVerify}>
                    {loading ? <LoadingForAuth /> : (type === "signup" ? "Verify & Sign Up ✓" : "Verify & Login ✓")}
                </button>
                <button 
                    className='back' 
                    onClick={() => {
                        if (type === "signup") {
                            holdCont('Create_Acc');
                        } else {
                            holdCont('GetLoginInfo');
                        }
                    }}>← Back</button>
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
    const navigate = useNavigate();

    return (
        <div id="LogInDone">
            <span>✓</span>

            <h3>You're in, <em> welcome back!</em></h3>
            <p>Identity verified. Redirecting you to your dashboard in a moment...</p>

            <button onClick={() => navigate("/userDash")}>
                Go To Dashboard →
            </button>
        </div>
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



// SignUp components:

function CreateAcc({holdCont, setUserEmail, setSwitchTab, setUserData}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[._\-\/@])[A-Za-z\d._\-\/@]{8,}$/;

    const handleSignup = async () => {

        if (!name) return setErrorMsg("Name is required");

        if (!email) return setErrorMsg("Email is required");
        if (!emailRegex.test(email)) return setErrorMsg("Invalid email format (abc@domain.xyz)");

        if (!password) return setErrorMsg("Password is required");
        if (!passwordRegex.test(password)) {
            return setErrorMsg("Password must include [A-Z], [a-z], [0-9] & (._-/@)");
        }

        if (!termsAccepted) return setErrorMsg("Accept Terms & Conditions");

        setErrorMsg("");
        setLoading(true);

        try {
            const res = await fetch("https://portfolio-builder-wgp1.onrender.com/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                cache: "no-store"
            });

            const data = await res.json();

            if (data.message === "OTP sent") {
                setUserEmail(email);
                setUserData({ name, password }); 
                holdCont('OTPVerify');
            } else {
                setErrorMsg("Failed to send OTP");
            }

        } catch (err) {
            console.error(err);
            setErrorMsg("Server error. Try again.");
        } finally {
           setLoading(false);
        }
    };

    return (
        <>
            <div id="CreateAcc">
                <div className="lines">
                    <span></span><span></span><span></span>
                </div>

                <p className='Acc_text'><span>1</span> Account Details</p>

                <h3>Create your <em>account.</em></h3>
                <p className="captn">It's free. No credit card needed</p>

                {errorMsg && <AlertBox AlertMsg={errorMsg} />}

                <div className="getname">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="e.g Mubashir Ahmad"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="getmail">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="getpass">
                    <p className='instruct'>min. 8 characters</p>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Set Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="passwordStrongBar">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="terms">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <p>Agree Our <a href="">Terms & Service</a> and <a href="">Privacy Policy</a></p>
                </div>

                <button onClick={handleSignup}>
                    {loading ? <LoadingForAuth /> : "Continue →"}
                </button>

                <p className='logIn'>
                    Already have an account? 
                    <button onClick={() => {
                        setSwitchTab('LogInContainer');
                        holdCont("GetLoginInfo");
                    }}>
                        Log in
                    </button>
                </p>
            </div>
        </>
    )
}


function UserType({holdCont}){
    return (
        <>
            <div id="UserType">
                <p className='U_Type_text'><span>3</span> One Last Thing</p>

                <h3>What best <em>describes you?</em></h3>
                <p className="captn">We'll recommend the best templates for you.</p>

                <div className="options">
                    <div className="cardtag">
                        <span className="icon"></span>
                        <div className="info">
                            <h4>Student</h4>
                            <p>Currently studying, building my first projects</p>
                        </div>
                    </div>

                    <div className="cardtag">
                        <span className="icon"></span>
                        <div className="info">
                            <h4>Fresher / Job Seeker</h4>
                            <p>Recently graduated, looking for my first role</p>
                        </div>
                    </div>

                    <div className="cardtag">
                        <span className="icon"></span>
                        <div className="info">
                            <h4>Professional / Freelancer</h4>
                            <p>Working in the industry, updating my presence</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => holdCont('SignUpDone')}>Finish →</button>
            </div>
        </>
    )
}

function SignUpDone({holdCont}){
    const navigate = useNavigate();

    return (
        <div id="SignUpDone">
            <span>✓</span>

            <h3>Account Created Successfully, <em> welcome!</em></h3>
            <p>Identity Stored. Redirecting you to your dashboard in a moment...</p>

            <button onClick={() => navigate("/userDash")} >
                Go To Dashboard →
            </button>
        </div>
    )
}


function LoadingForAuth(){
    return (
        <>
            <div id="loadAni">
                <img src={loadingAuth} alt="" />
            </div>
        </>
    )
}





// Caption:

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
