import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from 'jszip';
import "../pagesStyles/dashboard.css";
import ToggleThemeBtn from '../components/GeneralComponents/toggleThemeBtn.jsx';


const TEMPLATES = [
  { id: 1, name: 'Modern Dark', category: 'Tech', plan: 'pro', image: '/templates/core/TemModernDark.png', previewUrl: 'https://portfolio-modern-dark.netlify.app' },
  { id: 2, name: 'Minimal White', category: 'Minimal', plan: 'free', image: '/templates/core/TemMinimalWhite.png', previewUrl: 'https://portfolio-minimal-white.netlify.app' },
  { id: 3, name: 'Glassmorphism', category: 'Modern', plan: 'studio', image: '/templates/core/TemGlassmorphism.png', previewUrl: 'https://portfolio-glassmorphism.netlify.app' },
  { id: 4, name: 'Creative Studio', category: 'Design', plan: 'free', image: '/templates/core/TemCreativeStudio.png', previewUrl: 'https://portfolio-creative.netlify.app' },
  { id: 5, name: 'Executive Suite', category: 'Professional', plan: 'pro', image: '/templates/core/TemExecutiveSuite.png', previewUrl: 'https://portfolio-executive.netlify.app' },
  { id: 6, name: 'Cyberpunk Terminal', category: 'Tech', plan: 'studio', image: '/templates/core/TemCyberpunkTerminal.png', previewUrl: 'https://portfolio-neobrutalist.netlify.app' },
];


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
    const [likedIds, setLikedIds] = useState(() => {
        const saved = localStorage.getItem('likedTemplates');
        return saved ? JSON.parse(saved) : [];
    });
    const navigate = useNavigate();

    const handleUnlike = (id) => {
        const updated = likedIds.filter(i => i !== id);
        localStorage.setItem('likedTemplates', JSON.stringify(updated));
        setLikedIds(updated);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('resetToken');
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
                } else {
                    setUserData({
                        name: "Developer Guest",
                        email: "guest@portfoliobuilder.com",
                        plan: "free",
                        about: "Hi! You are currently using the portfolio builder in offline/guest mode. Log in or create an account to customize your profile information, save projects, and build resumes.",
                        skills: [
                            { name: "HTML5", progress: 95, icon: "🌐" },
                            { name: "CSS3", progress: 90, icon: "🎨" },
                            { name: "JavaScript", progress: 85, icon: "⚡" }
                        ],
                        education: [],
                        projects: [],
                        experience: []
                    });
                }
            } catch (err) {
                console.error(err);
                setUserData({
                    name: "Developer Guest",
                    email: "guest@portfoliobuilder.com",
                    plan: "free",
                    about: "Hi! You are currently using the portfolio builder in offline/guest mode. Log in or create an account to customize your profile information, save projects, and build resumes.",
                    skills: [
                        { name: "HTML5", progress: 95, icon: "🌐" },
                        { name: "CSS3", progress: 90, icon: "🎨" },
                        { name: "JavaScript", progress: 85, icon: "⚡" }
                    ],
                    education: [],
                    projects: [],
                    experience: []
                });
            }
        };
        fetchProfile();
    }, []);

    if (!userData) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px', background: 'var(--bg)' }}>
                <div style={{ width: 40, height: 40, border: '3px solid var(--violet-dim)', borderTop: '3px solid var(--violet)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <p style={{ color: 'var(--text-2)', fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', letterSpacing: '2px' }}>LOADING DASHBOARD...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
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

                        <div className="mobile-logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
                            <span className="logoName">Portfolio<em>Builder</em></span>
                        </div>

                        <div className="introTag">
                            <div className="mobile-theme-toggle">
                                <ToggleThemeBtn />
                            </div>
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
                        {/* Mobile sidebar header with close button */}
                        <div className="mobile-sidebar-header">
                            <span className="logoName">Portfolio<em>Builder</em></span>
                            <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
                        </div>

                        {/* Plan badge */}
                        {isSidebarOpen && (
                            <div style={{
                                background: userData.plan === 'pro' ? 'rgba(255,184,48,.1)' : userData.plan === 'studio' ? 'rgba(56,197,255,.1)' : 'rgba(46,223,163,.1)',
                                border: `1px solid ${userData.plan === 'pro' ? 'rgba(255,184,48,.35)' : userData.plan === 'studio' ? 'rgba(56,197,255,.35)' : 'rgba(46,223,163,.35)'}`,
                                borderRadius: '10px',
                                padding: '8px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px'
                            }}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-2)' }}>Current Plan</span>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: userData.plan === 'pro' ? '#FFB830' : userData.plan === 'studio' ? '#38C5FF' : '#2EDFA3'
                                }}>
                                    {userData.plan === 'pro' ? '👑 Pro' : userData.plan === 'studio' ? '⚡ Studio' : '🌱 Free'}
                                </span>
                                {userData.planExpiry && userData.plan !== 'free' && (
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>
                                        Expires {new Date(userData.planExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                )}
                            </div>
                        )}
                        <AddTabToSideBar TabName={"Edit Profile"}     icon="✏️" isSidebarOpen={isSidebarOpen} onClick={() => navigate("/collect-info")} />
                        <AddTabToSideBar TabName={"View Resume"}      icon="📄" isSidebarOpen={isSidebarOpen} onClick={() => navigate("/resume")} />
                        <AddTabToSideBar TabName={"Download Resume"}  icon="⬇️" isSidebarOpen={isSidebarOpen} onClick={() => navigate("/resume?download=true")} />
                        <AddTabToSideBar TabName={"Browse Templates"} icon="🎨" isSidebarOpen={isSidebarOpen} onClick={() => navigate("/templates")} />
                        <AddTabToSideBar TabName={"Upgrade Plan"}     icon="⚡" isSidebarOpen={isSidebarOpen} onClick={() => navigate("/subscription")} />
                        <AddTabToSideBar TabName={"Logout"}           icon="🚪" isSidebarOpen={isSidebarOpen} onClick={handleLogout} />
                    </section>


                    <section className="Grid">
                        <Details userData={userData} />
                        <ProfileImg url={userData.profileImage || profileImg} />
                        <SocialMedia socialLinks={userData.socialLinks || {}} />
                        <Education education={userData.education || []} />
                        <Projects projects={userData.projects || []} />
                        <Experince experience={userData.experience || []} />
                        <Skills skills={userData.skills || []} />
                        <LikedTemplates likedIds={likedIds} userData={userData} handleUnlike={handleUnlike} />
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
            <Btn_Primary title={"Home"}      to={"/"} />
            <Btn_Primary title={"Upgrade ⚡"} to={"/subscription"} />
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
    const navigate = useNavigate();
    return (
        <div id="skillsDetails">
            <h2>Skills:</h2>
            <ul>
                {skills.length > 0
                    ? skills.map((s, i) => {
                        if (!s.name) return null;
                        return <Bars key={i} icon={s.icon || '💻'} name={s.name} prog={s.progress || 50} />;
                      })
                    : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '10px' }}>
                            <p style={{ margin: 0, color: 'var(--text-3)' }}>No skills added yet.</p>
                            <button onClick={() => navigate("/collect-info")} style={{ background: 'var(--amber)', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                                ➕ Add Skills
                            </button>
                        </div>
                    )
                }
            </ul>
        </div>
    );
}

function Bars({ icon, name, prog }) {
    const isUrl = icon && icon.startsWith('http');
    const [animatedProg, setAnimatedProg] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => { setAnimatedProg(Math.max(1, prog)); }, 100);
        return () => clearTimeout(timer);
    }, [prog]);

    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span className="icon" style={{ minWidth: 28 }}>
                {isUrl ? <img src={icon} alt="skill" style={{ width: '24px', height: '24px', objectFit: 'contain' }} /> : icon}
            </span>
            <span style={{ color: 'var(--text-2)', fontSize: '0.85rem', minWidth: 80 }}>{name}</span>
            <div className="bar" style={{ flex: 1 }}>
                <div className="bar-fill" style={{ width: `${animatedProg}%`, height: '100%', background: 'linear-gradient(50deg, var(--violet), var(--coral), var(--amber))', borderRadius: '20px', transition: 'width 1s ease-in-out' }} />
            </div>
            <p className="progress" style={{ minWidth: 36, textAlign: 'right' }}>{prog}%</p>
        </li>
    );
}


function SocialMedia({ socialLinks }) {
    const navigate = useNavigate();
    const links = socialLinks || {};

    return (
        <div id="SocialMedia">
            <ul>
                {links.instagram ? (
                    <li>
                        <a href={links.instagram} target="_blank" rel="noreferrer">
                            <span className="icon"><img src={Insta} alt="" /></span>
                            <div className="ref">
                                <p>INSTAGRAM</p>
                                <p>{links.instagram.substring(0, 20)}...</p>
                            </div>
                        </a>
                    </li>
                ) : (
                    <li onClick={() => navigate('/collect-info')} style={{ cursor: 'pointer', borderStyle: 'dashed', borderColor: 'var(--coral)' }}>
                        <span className="icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>➕</span>
                        <div className="ref">
                            <p>INSTAGRAM</p>
                            <p style={{ color: 'var(--coral)', fontSize: '0.75rem', fontWeight: 600 }}>Add Instagram</p>
                        </div>
                    </li>
                )}

                {links.facebook ? (
                    <li>
                        <a href={links.facebook} target="_blank" rel="noreferrer">
                            <span className="icon"><img src={faceB} alt="" /></span>
                            <div className="ref">
                                <p>FACEBOOK</p>
                                <p>{links.facebook.substring(0, 20)}...</p>
                            </div>
                        </a>
                    </li>
                ) : (
                    <li onClick={() => navigate('/collect-info')} style={{ cursor: 'pointer', borderStyle: 'dashed', borderColor: 'var(--violet)' }}>
                        <span className="icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>➕</span>
                        <div className="ref">
                            <p>FACEBOOK</p>
                            <p style={{ color: 'var(--violet)', fontSize: '0.75rem', fontWeight: 600 }}>Add Facebook</p>
                        </div>
                    </li>
                )}
            </ul>

            <ul>
                {links.github ? (
                    <li>
                        <a href={links.github} target="_blank" rel="noreferrer">
                            <span className="icon"><img src={git} alt="" /></span>
                            <div className="ref">
                                <p>GITHUB</p>
                                <p>{links.github.substring(0, 20)}...</p>
                            </div>
                        </a>
                    </li>
                ) : (
                    <li onClick={() => navigate('/collect-info')} style={{ cursor: 'pointer', borderStyle: 'dashed', borderColor: 'var(--sky)' }}>
                        <span className="icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>➕</span>
                        <div className="ref">
                            <p>GITHUB</p>
                            <p style={{ color: 'var(--sky)', fontSize: '0.75rem', fontWeight: 600 }}>Add GitHub</p>
                        </div>
                    </li>
                )}

                {links.linkedin ? (
                    <li>
                        <a href={links.linkedin} target="_blank" rel="noreferrer">
                            <span className="icon"><img src={Linked} alt="" /></span>
                            <div className="ref">
                                <p>LINKED-IN</p>
                                <p>{links.linkedin.substring(0, 20)}...</p>
                            </div>
                        </a>
                    </li>
                ) : (
                    <li onClick={() => navigate('/collect-info')} style={{ cursor: 'pointer', borderStyle: 'dashed', borderColor: 'var(--violet)' }}>
                        <span className="icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>➕</span>
                        <div className="ref">
                            <p>LINKED-IN</p>
                            <p style={{ color: 'var(--violet)', fontSize: '0.75rem', fontWeight: 600 }}>Add LinkedIn</p>
                        </div>
                    </li>
                )}
            </ul>

            <ul>
                {links.portfolio ? (
                    <li>
                        <a href={links.portfolio} target="_blank" rel="noreferrer">
                            <span className="icon"><img src={port} alt="" /></span>
                            <div className="ref">
                                <p>PORTFOLIO</p>
                                <p>{links.portfolio.substring(0, 20)}...</p>
                            </div>
                        </a>
                    </li>
                ) : (
                    <li onClick={() => navigate('/collect-info')} style={{ cursor: 'pointer', borderStyle: 'dashed', borderColor: 'var(--mint)' }}>
                        <span className="icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>➕</span>
                        <div className="ref">
                            <p>PORTFOLIO</p>
                            <p style={{ color: 'var(--mint)', fontSize: '0.75rem', fontWeight: 600 }}>Add Portfolio</p>
                        </div>
                    </li>
                )}

                {links.extra ? (
                    <li>
                        <a href={links.extra} target="_blank" rel="noreferrer">
                            <span className="icon"><img src={link} alt="" /></span>
                            <div className="ref">
                                <p>EXTRA</p>
                                <p>{links.extra.substring(0, 20)}...</p>
                            </div>
                        </a>
                    </li>
                ) : (
                    <li onClick={() => navigate('/collect-info')} style={{ cursor: 'pointer', borderStyle: 'dashed', borderColor: 'var(--amber)' }}>
                        <span className="icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>➕</span>
                        <div className="ref">
                            <p>EXTRA</p>
                            <p style={{ color: 'var(--amber)', fontSize: '0.75rem', fontWeight: 600 }}>Add Extra Link</p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}



function Education({ education }) {
    const navigate = useNavigate();
    return (
        <>
            <div id="educationDetails">
                <h2 className="headTag">Education:</h2>
                <div className="EduCards">
                    {education.length > 0 ? education.map((edu, i) => {
                        if (!edu.name) return null;
                        return (
                            <div key={i} className="edu_card">
                                <h1>{edu.level}</h1>
                                <h2 className="name">{edu.name}</h2>
                                <h3 className="address">{edu.address}</h3>
                                <h4 className="status">{edu.status}</h4>
                            </div>
                        );
                    }) : (
                        <div className="edu_card no-data-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px', flex: 1, padding: '20px', minHeight: '120px' }}>
                            <p style={{ margin: 0, color: 'var(--text-2)' }}>No education details added yet.</p>
                            <button onClick={() => navigate("/collect-info")} style={{ background: 'var(--violet)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                                ➕ Add Education
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}





function Projects({ projects }) {
    const navigate = useNavigate();
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
                    }) : (
                        <div className="proj_card no-data-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px', flex: 1, padding: '20px', minHeight: '120px' }}>
                            <p style={{ margin: 0, color: 'var(--text-2)' }}>No projects added yet.</p>
                            <button onClick={() => navigate("/collect-info")} style={{ background: 'var(--mint)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                                ➕ Add Projects
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

function Experince({ experience }) {
    const navigate = useNavigate();
    return (
        <>
            <div id="experinceDetails">
                <h2 className="headTag">Experince:</h2>

                <div className="Exp_Tabs">
                    {experience.length > 0 ? experience.map((exp, i) => {
                        if (!exp.company) return null;
                        return <Exp_tabs key={i} company={exp.company} text={exp.description} certificate={exp.certificate} />;
                    }) : (
                        <div className="exp_card no-data-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px', padding: '20px', minHeight: '100px' }}>
                            <p style={{ margin: 0, color: 'var(--text-2)' }}>No experience added yet.</p>
                            <button onClick={() => navigate("/collect-info")} style={{ background: 'var(--coral)', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                                ➕ Add Experience
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

function Exp_tabs({ company, text, certificate }) {
    return (
        <>
            <div className="exp_card exp_3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <h2>{company}</h2>
                    <p>{text}</p>
                </div>
                {certificate && (
                    <div className="cert" style={{ width: '60px', height: '60px', flexShrink: 0, marginLeft: '10px' }}>
                        <a href={certificate} target="_blank" rel="noreferrer">
                            <img src={certificate} alt="Certificate" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px', border: '1px solid var(--border)' }} />
                        </a>
                    </div>
                )}
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

function LikedTemplates({ likedIds, userData, handleUnlike }) {
    const navigate = useNavigate();
    const [downloadingId, setDownloadingId] = useState(null);

    const likedList = TEMPLATES.filter(t => likedIds.includes(t.id));

    const hasTemplateAccess = (userPlan, templatePlan) => {
        if (!userPlan) return false;
        const plan = userPlan.toLowerCase();
        const tPlan = templatePlan.toLowerCase();

        if (plan === 'pro') return true;
        if (plan === 'studio') {
            return tPlan === 'free' || tPlan === 'studio';
        }
        return tPlan === 'free';
    };

    const handlePreview = (id) => {
        navigate(`/templates/template${id}/demo`);
    };

    const handlePreviewProfile = (id) => {
        navigate(`/templates/template${id}/preview`);
    };

    const handleDownloadZIP = async (id, name, templatePlan, injectEnabled) => {
        const currentPlan = userData?.plan || 'free';
        if (!hasTemplateAccess(currentPlan, templatePlan)) {
            alert(`The ${name} template is only available for ${templatePlan.toUpperCase()} members. Please upgrade your plan to download this template!`);
            navigate('/subscription');
            return;
        }

        setDownloadingId(id);
        try {
            const zip = new JSZip();
            
            const [htmlRes, cssRes, jsRes] = await Promise.all([
                fetch(`/templates/template${id}/index.html`),
                fetch(`/templates/template${id}/style.css`),
                fetch(`/templates/template${id}/script.js`)
            ]);

            if (!htmlRes.ok || !cssRes.ok || !jsRes.ok) {
                throw new Error("Failed to load template source files.");
            }

            let htmlText = await htmlRes.text();
            const cssText = await cssRes.text();
            const jsText = await jsRes.text();

            // Fetch and bundle the centralized core script libraries for standard offline execution
            const coreFiles = ['normalize.js', 'theme.js', 'visibility.js', 'helpers.js', 'registry.js', 'renderer.js'];
            const coreTexts = await Promise.all(
                coreFiles.map(file => fetch(`/templates/core/${file}`).then(res => res.text()))
            );

            // Add all core files to a dedicated local directory inside the compiled ZIP archive
            coreFiles.forEach((file, idx) => {
                zip.file(`core/${file}`, coreTexts[idx]);
            });

            // Fetch and bundle the static profile pic binary file for complete offline stock rendering
            try {
                const picRes = await fetch('/templates/core/DemoProfileImg.png');
                if (picRes.ok) {
                    const picBlob = await picRes.blob();
                    zip.file('core/DemoProfileImg.png', picBlob);
                }
            } catch (err) {
                console.error("Failed to bundle static profile image", err);
            }

            // Fetch and bundle the social link icons for complete offline rendering
            try {
                const socialIcons = ['Github.png', 'Instagram.png', 'LinkedIn.png', 'facebook.png', 'Portfolio.png', 'Link.png'];
                await Promise.all(
                    socialIcons.map(async (icon) => {
                        const iconRes = await fetch(`/templates/core/dashLinkIcons/${icon}`);
                        if (iconRes.ok) {
                            const iconBlob = await iconRes.blob();
                            zip.file(`core/dashLinkIcons/${icon}`, iconBlob);
                        }
                    })
                );
            } catch (err) {
                console.error("Failed to bundle social link icons", err);
            }

            // Update base HTML scripts to point locally rather than referencing external parents
            htmlText = htmlText.replaceAll('../core/', 'core/');

            // If downloading real dynamic profile data, pre-hydrate it as a persistent global payload script
            if (injectEnabled && userData) {
                const context = {
                    mode: 'profile',
                    data: userData,
                    templateId: `template${id}`,
                    previewState: false
                };
                const dataSnippet = `<script>window.__PORTFOLIO_CONTEXT__ = ${JSON.stringify(context)};</script>\n`;
                htmlText = htmlText.replace("</head>", `${dataSnippet}</head>`);
            }

            zip.file("index.html", htmlText);
            zip.file("style.css", cssText);
            zip.file("script.js", jsText);

            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${name.toLowerCase().replace(/\s+/g, '_')}_${injectEnabled ? 'profile' : 'stock'}_template.zip`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Failed to download template source code. Please try again.");
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <div id="likedTemplates">
            <h2 className="headTag">Liked Templates</h2>
            {likedList.length > 0 ? (
                <div className="liked-templates-list">
                    {likedList.map(t => (
                        <div key={t.id} className="liked-template-card">
                            <img src={t.image} alt={t.name} className="liked-template-img" />
                            <div className="liked-template-info">
                                <h4>{t.name}</h4>
                                <p>{t.category}</p>
                                <div className="liked-template-actions" style={{ flexWrap: 'wrap', gap: '6px' }}>
                                    <button 
                                        onClick={() => handlePreview(t.id)} 
                                        title="Preview Stock Template" 
                                        style={{ flex: '1 1 calc(50% - 3px)' }}
                                    >
                                        🔍 Stock Pre
                                    </button>
                                    <button 
                                        onClick={() => handlePreviewProfile(t.id, t.name)} 
                                        title="Preview with your Dashboard details" 
                                        style={{ flex: '1 1 calc(50% - 3px)', background: 'var(--violet-dim)', color: 'var(--violet)' }}
                                    >
                                        👤 Profile Pre
                                    </button>
                                    <button 
                                        onClick={() => handleDownloadZIP(t.id, t.name, t.plan, false)} 
                                        disabled={downloadingId === t.id}
                                        title="Download Stock ZIP"
                                        style={{ flex: '1 1 calc(50% - 3px)' }}
                                    >
                                        📦 Stock ZIP
                                    </button>
                                    <button 
                                        onClick={() => handleDownloadZIP(t.id, t.name, t.plan, true)} 
                                        disabled={downloadingId === t.id}
                                        title="Download Code as per Profile"
                                        style={{ flex: '1 1 calc(50% - 3px)', background: 'var(--violet-dim)', color: 'var(--violet)' }}
                                    >
                                        👤 Profile ZIP
                                    </button>
                                    <button onClick={() => handleUnlike(t.id)} title="Unlike" style={{ color: 'var(--coral)', flex: '1 1 100%' }}>🤍 Unlike</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-liked-templates">
                    <span>✨</span>
                    <p style={{ margin: 0 }}>You haven't liked any templates yet.</p>
                    <button onClick={() => navigate('/templates')}>Browse Masterpieces</button>
                </div>
            )}
        </div>
    );
}
