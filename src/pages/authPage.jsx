import '../pagesStyles/authPage.css';

import Header from '../components/LandingPageComponents/header';
import Btn_Primary from '../components/GeneralComponents/buttonPrimary';

function AuthPage(){
    return (
        <>
            <Header comp={BtnsSet}/>

            <section id='auth'>
                <div className="container_1">
                    <Caption/>
                </div>
                <div className="container_2">

                </div>
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


function Caption(){
    return (
        <>
            <div className="tag"><span></span><p>JOIN THE BUILDER</p></div>

            <h1>Your portfolio<br/>is one step<br/><em>away.</em></h1>

            <p>Sign up in under 2 minutes. No credit card, no setup complexity — just your story, beautifully presented.</p>

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
        </>
    )
}

