import "../pagesStyles/dashboard.css";

import Header from '../components/LandingPageComponents/header';
import Btn_Primary from "../components/GeneralComponents/buttonPrimary.jsx";
import Btn_Secondry from "../components/GeneralComponents/buttonSecondry.jsx";

import profileImg from "../assets/profileImg.png";


// Icons for Social Links:

import Insta from "../assets/dashLinkIcons/Instagram.png";
import faceB from "../assets/dashLinkIcons/facebook.png";
import Linked from "../assets/dashLinkIcons/LinkedIn.png";
import git from "../assets/dashLinkIcons/Github.png";
import port from "../assets/dashLinkIcons/Portfolio.png";
import link from "../assets/dashLinkIcons/Link.png";


function Dashboard(){
    return (
        <>
            <section id="MainCont">
                    
                    <section className="Header">
                        <Header comp={BtnsSet}/>

                        <div className="headerDetailed">
                            <div className="burger">
                                <span className="lines"></span>
                                <span className="lines"></span>
                                <span className="lines"></span>
                            </div>

                            <div className="introTag">
                                <h3>Mubashir Ahmad</h3>
                                <div className="icon">MA</div>
                            </div>
                        </div>
                    </section>



                    <section className="Container">
                        <section className="Sidebar">
                            <AddTabToSideBar TabName={"Theme"}/>
                            <AddTabToSideBar TabName={"Theme"}/>
                            <AddTabToSideBar TabName={"Theme"}/>
                        </section>


                        <section className="Grid">
                            <Details/>
                            <ProfileImg url={profileImg}/>
                            <SocialMedia/>
                            <Resume/>
                            <Education/>
                            {/* <Projects/> */}
                            {/* <Experince/> */}
                            {/* <Skills/> */}
                        </section>
                    </section>

            </section>
        </>
    )
}

export default Dashboard;

function BtnsSet(){
    return (
        <>
            <Btn_Primary title={"Home"} to={"/"}/>
            <Btn_Primary title={"Templates"} to={"/"}/>
        </>
    )
}


function Details(){
    return (
        <>
            <div id="profileDetails">
                <div className="aboutuser">
                    <p>Final-year BCA student and passionate developer focused on building modern web applications. Interested in programming, technology, and problem-solving, with hands-on experience in MERN stack projects and creating user-friendly digital experiences.</p>
                </div>

                <ul>
                    <li>
                        <span className="icon">📞</span>
                        <p>+91-7889825292</p>
                    </li>
                    <li>
                        <span className="icon">📧</span>
                        <p>ma2625645@gmail.com</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

function ProfileImg({url}){
    return (
        <>
            <div id="ProfileImg">
                <img src={url} alt="" />
            </div>
        </>
    )
}

function Skills(){
    return (
        <>
            <div id="skillsDetails">
                <h2>Skills:</h2>

                <ul>

                    <Bars icon={"🪲"} prog={50}/>
                    <Bars icon={"🪲"} prog={50}/>
                    <Bars icon={"🪲"} prog={50}/>
                    <Bars icon={"🪲"} prog={50}/>
                    <Bars icon={"🪲"} prog={50}/>
                    <Bars icon={"🪲"} prog={50}/>
                    <Bars icon={"🪲"} prog={50}/>
                    <Bars icon={"🪲"} prog={50}/>
                    <Bars icon={"🪲"} prog={50}/>
                    
                </ul>
            </div>
        </>
    )
}

function Bars({icon, prog}){
    return (
        <>
            <li>
                <span className="icon">{icon}</span>
                <div className="bar"></div>
                <p className="progress">{prog}%</p>
            </li>
        </>
    )
}


function SocialMedia(){
    return (
        <>
            <div id="SocialMedia">
                <ul>
                    <li>
                        <a href="">
                            <span className="icon"><img src={Insta} alt="" /></span>
                            <div className="ref">
                                <p>INSTAGRAM</p>
                                <p>https://demo.dev/home</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span className="icon"><img src={faceB} alt="" /></span>
                            <div className="ref">
                                <p>FACEBOOK</p>
                                <p>https://demo.dev/home</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="">
                            <span className="icon"><img src={git} alt="" /></span>
                            <div className="ref">
                                <p>GITHUB</p>
                                <p>https://demo.dev/home</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span className="icon"><img src={Linked} alt="" /></span>
                            <div className="ref">
                                <p>LINKED-IN</p>
                                <p>https://demo.dev/home</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="">
                            <span className="icon"><img src={port} alt="" /></span>
                            <div className="ref">
                                <p>PORTFOLIO</p>
                                <p>https://demo.dev/home</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span className="icon"><img src={link} alt="" /></span>
                            <div className="ref">
                                <p>EXTRA</p>
                                <p>https://demo.dev/home</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}


function Education(){
    return (
        <>
            <div id="educationDetails">
                <div className="edu_card school">
                    <h1>10Th</h1>
                    <h2 className="name">Ramzan Memorial Educational Institute</h2>
                    <h3 className="address">Soura Srinagar, J&K, 190011 India</h3>
                    <h4 className="status">Completed</h4>
                </div>
                <div className="edu_card higherEdu">
                    <h1>11Th/12Th</h1>
                    <h2 className="name">Govt Boys Higher Secondary School Soura</h2>
                    <h3 className="address">Soura Srinagar, J&K, 190011 India</h3>
                    <h4 className="status">Completed</h4>
                </div>
                <div className="edu_card UG">
                    <h1>UG Degree</h1>
                    <h2>Islamia College of Sceince and Commerce</h2>
                    <h3>Hawal Srinagar, J&K, 190011 India</h3>
                    <h4 className="status">Ongoing</h4>
                </div>
                <div className="edu_card PG">
                    <h1>PG Degree</h1>
                    <h2>Islamia College of Sceince and Commerce</h2>
                    <h3>Hawal Srinagar, J&K, 190011 India</h3>
                    <h4 className="status">Not yet</h4>
                </div>
            </div>
        </>
    )
}


function Resume(){
    return (
        <>
            <div id="Resume">
                <button>View Resume</button>
                <button>Download Resume</button>
            </div>
        </>
    )
}


function Projects(){
    return (
        <>
            <div id="projectDetails">
                <h2 className="headTag">Projects:</h2>
                
                <div className="ProjectCards">
                    <div className="proj_card Proj_1"></div>
                    <div className="proj_card Proj_2"></div>
                    <div className="proj_card Proj_3"></div> 
                </div>
            </div>
        </>
    )
}

function Experince(){
    return (
        <>
            <div id="experinceDetails">
                <h2 className="headTag">Experince:</h2>

                <div className="Exp_Tabs">
                    <Exp_tabs company={"Company"} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nihil accusantium eligendi animi delectus cum sapiente ipsum explicabo rem blanditiis commodi quidem, maiores ab similique."}/>
                    <Exp_tabs company={"Company"} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nihil accusantium eligendi animi delectus cum sapiente ipsum explicabo rem blanditiis commodi quidem, maiores ab similique."}/>
                    <Exp_tabs company={"Company"} text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nihil accusantium eligendi animi delectus cum sapiente ipsum explicabo rem blanditiis commodi quidem, maiores ab similique."}/>
                </div>
                
            </div>
        </>
    )
}

function Exp_tabs({company, text}){
    return (
        <>
            <div className="exp_card exp_3">
                <h2>{company}</h2>
                <p>{text}</p>
            </div>
        </>
    )
}

function AddTabToSideBar({TabName}){
    return (
        <>
            <div id="SideTab">
                <button>{TabName}</button>
            </div>
        </>
    )
}
