import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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


function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";
                const res = await fetch(`${apiUrl}/api/user/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setUserData(data.user);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    if (!userData) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    }

    return (
        <>
            <section id="MainCont">

                <section className="Header">
                    <Header comp={BtnsSet} />

                    <div className="headerDetailed">
                        <div className={`burger ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <span className="lines"></span>
                            <span className="lines"></span>
                            <span className="lines"></span>
                        </div>

                        <div className="introTag">
                            <h3>{userData.name}</h3>
                            {userData.profileImage ? (
                                <img src={userData.profileImage} alt="Profile" className="icon" style={{ objectFit: 'cover', padding: 0 }} />
                            ) : (
                                <div className="icon">{userData.name.substring(0, 2).toUpperCase()}</div>
                            )}
                        </div>
                    </div>
                </section>



                <section className="Container">
                    <section className={`Sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
                        <AddTabToSideBar TabName={"Edit Profile"} icon="✏️" isSidebarOpen={isSidebarOpen} onClick={() => navigate("/collect-info")} />
                        <AddTabToSideBar TabName={"View Resume"} icon="📄" isSidebarOpen={isSidebarOpen} onClick={() => navigate("/resume")} />
                        <AddTabToSideBar TabName={"Download Resume"} icon="⬇️" isSidebarOpen={isSidebarOpen} onClick={() => navigate("/resume")} />
                        <AddTabToSideBar TabName={"Logout"} icon="🚪" isSidebarOpen={isSidebarOpen} onClick={handleLogout} />
                    </section>


                    <section className="Grid">
                        <Details userData={userData} />
                        <ProfileImg url={userData.profileImage || profileImg} />
                        <SocialMedia socialLinks={userData.socialLinks || {}} />
                        <Resume />
                        <Education education={userData.education || []} />
                        <Projects projects={userData.projects || []} />
                        <Experince experience={userData.experience || []} />
                        <Skills skills={userData.skills || []} />
                    </section>
                </section>

            </section>
        </>
    )
}

export default Dashboard;

function BtnsSet() {
    return (
        <>
            <Btn_Primary title={"Home"} to={"/"} />
            <Btn_Primary title={"Templates"} to={"/"} />
        </>
    )
}


function Details({ userData }) {
    const navigate = useNavigate();
    return (
        <>
            <div id="profileDetails">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-2)' }}>About Me</h3>
                    <button
                        onClick={() => navigate("/collect-info")}
                        style={{ background: 'var(--violet)', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Edit Profile
                    </button>
                </div>
                <div className="aboutuser">
                    <p>{userData.about || "Write something about yourself..."}</p>
                </div>

                <ul>
                    <li>
                        <span className="icon">📞</span>
                        <p>{userData.phone || "N/A"}</p>
                    </li>
                    <li>
                        <span className="icon">📧</span>
                        <p>{userData.email}</p>
                    </li>
                    <li>
                        <span className="icon">📍</span>
                        <p>{userData.address || "N/A"}</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

function ProfileImg({ url }) {
    return (
        <>
            <div id="ProfileImg" style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </>
    )
}

function Skills({ skills }) {
    return (
        <>
            <div id="skillsDetails">
                <h2>Skills:</h2>

                <ul>
                    {skills.length > 0 ? skills.map((s, i) => {
                        if (!s.name) return null;
                        return <Bars key={i} icon={s.icon || "💻"} prog={s.progress || 50} />
                    }) : <p>No skills added.</p>}
                </ul>
            </div>
        </>
    )
}

function Bars({ icon, prog }) {
    // Check if icon is a URL or emoji
    const isUrl = icon && icon.startsWith('http');
    const [animatedProg, setAnimatedProg] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedProg(Math.max(1, prog));
        }, 100);
        return () => clearTimeout(timer);
    }, [prog]);

    return (
        <>
            <li>
                <span className="icon">
                    {isUrl ? <img src={icon} alt="skill" style={{ width: '24px', height: '24px', objectFit: 'contain' }} /> : icon}
                </span>
                <div className="bar">
                    <div className="bar-fill" style={{ width: `${animatedProg}%`, height: '100%', background: 'linear-gradient(50deg, var(--violet), var(--coral), var(--amber))', borderRadius: '20px', transition: 'width 1s ease-in-out' }}></div>
                </div>
                <p className="progress">{prog}%</p>
            </li>
        </>
    )
}


function SocialMedia({ socialLinks }) {
    return (
        <>
            <div id="SocialMedia">
                <ul>
                    {socialLinks.instagram && (
                        <li>
                            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                                <span className="icon"><img src={Insta} alt="" /></span>
                                <div className="ref">
                                    <p>INSTAGRAM</p>
                                    <p>{socialLinks.instagram.substring(0, 20)}...</p>
                                </div>
                            </a>
                        </li>
                    )}
                    {socialLinks.facebook && (
                        <li>
                            <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
                                <span className="icon"><img src={faceB} alt="" /></span>
                                <div className="ref">
                                    <p>FACEBOOK</p>
                                    <p>{socialLinks.facebook.substring(0, 20)}...</p>
                                </div>
                            </a>
                        </li>
                    )}
                </ul>
                <ul>
                    {socialLinks.github && (
                        <li>
                            <a href={socialLinks.github} target="_blank" rel="noreferrer">
                                <span className="icon"><img src={git} alt="" /></span>
                                <div className="ref">
                                    <p>GITHUB</p>
                                    <p>{socialLinks.github.substring(0, 20)}...</p>
                                </div>
                            </a>
                        </li>
                    )}
                    {socialLinks.linkedin && (
                        <li>
                            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                                <span className="icon"><img src={Linked} alt="" /></span>
                                <div className="ref">
                                    <p>LINKED-IN</p>
                                    <p>{socialLinks.linkedin.substring(0, 20)}...</p>
                                </div>
                            </a>
                        </li>
                    )}
                </ul>
                <ul>
                    {socialLinks.portfolio && (
                        <li>
                            <a href={socialLinks.portfolio} target="_blank" rel="noreferrer">
                                <span className="icon"><img src={port} alt="" /></span>
                                <div className="ref">
                                    <p>PORTFOLIO</p>
                                    <p>{socialLinks.portfolio.substring(0, 20)}...</p>
                                </div>
                            </a>
                        </li>
                    )}
                    {socialLinks.extra && (
                        <li>
                            <a href={socialLinks.extra} target="_blank" rel="noreferrer">
                                <span className="icon"><img src={link} alt="" /></span>
                                <div className="ref">
                                    <p>EXTRA</p>
                                    <p>{socialLinks.extra.substring(0, 20)}...</p>
                                </div>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}


function Education({ education }) {
    return (
        <>
            <div id="educationDetails">
                {education.length > 0 ? education.map((edu, i) => {
                    if (!edu.name) return null;
                    const classes = ['school', 'higherEdu', 'UG', 'PG'];
                    const cardClass = classes[i % classes.length];
                    return (
                        <div key={i} className={`edu_card ${cardClass}`}>
                            <h1>{edu.level}</h1>
                            <h2 className="name">{edu.name}</h2>
                            <h3 className="address">{edu.address}</h3>
                            <h4 className="status">{edu.status}</h4>
                        </div>
                    );
                }) : <p style={{ padding: '20px' }}>No education added.</p>}
            </div>
        </>
    )
}


function Resume() {
    const navigate = useNavigate();
    return (
        <>
            <div id="Resume">
                <button onClick={() => navigate("/resume")}>View / Download Resume</button>
            </div>
        </>
    )
}


function Projects({ projects }) {
    return (
        <>
            <div id="projectDetails">
                <h2 className="headTag">Projects:</h2>

                <div className="ProjectCards">
                    {projects.length > 0 ? projects.map((proj, i) => {
                        if (!proj.title) return null;
                        return (
                            <div key={i} className={`proj_card Proj_${(i % 3) + 1}`} style={{ padding: '1rem', color: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                {proj.image && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3 }}>
                                        <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div style={{ zIndex: 1, position: 'relative' }}>
                                    {proj.link ? (
                                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                                            <h3 style={{ margin: 0, fontSize: '20px', textDecoration: 'underline' }}>{proj.title}</h3>
                                        </a>
                                    ) : (
                                        <h3 style={{ margin: 0, fontSize: '20px' }}>{proj.title}</h3>
                                    )}
                                    <p style={{ fontSize: '12px', marginTop: '10px' }}>{proj.description}</p>
                                </div>
                            </div>
                        )
                    }) : <p>No projects added.</p>}
                </div>
            </div>
        </>
    )
}

function Experince({ experience }) {
    return (
        <>
            <div id="experinceDetails">
                <h2 className="headTag">Experince:</h2>

                <div className="Exp_Tabs">
                    {experience.length > 0 ? experience.map((exp, i) => {
                        if (!exp.company) return null;
                        return <Exp_tabs key={i} company={exp.company} text={exp.description} />;
                    }) : <p>No experience added.</p>}
                </div>

            </div>
        </>
    )
}

function Exp_tabs({ company, text }) {
    return (
        <>
            <div className="exp_card exp_3">
                <h2>{company}</h2>
                <p>{text}</p>
            </div>
        </>
    )
}

function AddTabToSideBar({ TabName, icon, isSidebarOpen, onClick }) {
    return (
        <>
            <div id="SideTab" onClick={onClick}>
                <button style={{ display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: '0 10px' }}>
                    <span className="icon" style={{ fontSize: '1.2rem', marginRight: isSidebarOpen ? '10px' : '0' }}>{icon}</span>
                    <span className="text" style={{ display: isSidebarOpen ? 'inline' : 'none' }}>{TabName}</span>
                </button>
            </div>
        </>
    )
}
