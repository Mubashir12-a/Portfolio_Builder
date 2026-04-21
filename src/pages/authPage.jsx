import '../pagesStyles/authPage.css';

import Header from '../components/LandingPageComponents/header';
import Btn_Primary from '../components/GeneralComponents/buttonPrimary';
import { useState } from 'react';

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
                    <GetLoginInfo/>
                </div>
            </div>
        </>
    )
}

// Login Components Parts:

function GetLoginInfo(){
    return (
        <>
            <section id="GetLoginInfo">
                <div className="heading">
                    <h3>Welcome <em>back.</em></h3>
                    <p>Log in to your Portfolio Builder account.</p>
                </div>

                <div className="getmail">
                    <label htmlFor="">Email Address</label>
                    <input type="email" name="" id="" placeholder='you@domain.com'/>
                </div>
                <div className="getpass">
                    <label htmlFor="">Password</label>
                    <input type="password" name="" id="" placeholder='Enter Your Password'/>
                </div>
                <div className="terms">
                    <input type="checkbox" name="" id="" />
                    <p>Agree Our</p>
                    <a href="">Terms & Conditions</a>
                </div>
                <button>Log In</button>
                <div className="signup">
                    <p>Don't have an account?</p>
                    <button>Sign up free</button>
                </div>
            </section>
        </>
    )
}

function GetLoginOTP(){

}

function ForgotPass(){

}

function GetForgotOTP(){

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



