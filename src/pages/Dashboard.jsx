import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from 'jszip';
import "../pagesStyles/dashboard.css";

const TEMPLATES = [
  { id: 1, name: 'Modern Dark', category: 'Tech', plan: 'pro', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', previewUrl: 'https://portfolio-modern-dark.netlify.app' },
  { id: 2, name: 'Minimal White', category: 'Minimal', plan: 'free', image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=600', previewUrl: 'https://portfolio-minimal-white.netlify.app' },
  { id: 3, name: 'Glassmorphism', category: 'Modern', plan: 'studio', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600', previewUrl: 'https://portfolio-glassmorphism.netlify.app' },
  { id: 4, name: 'Creative Studio', category: 'Design', plan: 'free', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600', previewUrl: 'https://portfolio-creative.netlify.app' },
  { id: 5, name: 'Executive Suite', category: 'Professional', plan: 'pro', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', previewUrl: 'https://portfolio-executive.netlify.app' },
  { id: 6, name: 'Cyberpunk Terminal', category: 'Tech', plan: 'studio', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600', previewUrl: 'https://portfolio-neobrutalist.netlify.app' },
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

    const handlePreview = async (id) => {
        try {
            const htmlRes = await fetch(`/templates/template${id}/index.html`);
            if (!htmlRes.ok) throw new Error("Failed to load template.");
            let htmlText = await htmlRes.text();

            // Inject stock fallback data (Mubashir Ahmad & beautiful demo images)
            htmlText = injectUserData(htmlText, true);

            // Inject base tag so relative files resolve correctly
            const baseTag = `<base href="${window.location.origin}/templates/template${id}/">`;
            htmlText = htmlText.replace("<head>", `<head>${baseTag}`);

            // Create a Blob URL and open it in a new window
            const blob = new Blob([htmlText], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
        } catch (err) {
            console.error(err);
            window.open(`/templates/template${id}/index.html`, '_blank');
        }
    };

    const handlePreviewProfile = async (id, name) => {
        try {
            const htmlRes = await fetch(`/templates/template${id}/index.html`);
            if (!htmlRes.ok) throw new Error("Failed to load template.");
            let htmlText = await htmlRes.text();

            // Inject real user dashboard data or fallback gracefully to the default Mubashir Ahmad profile
            htmlText = injectUserData(htmlText, false);

            // Inject base tag so relative files resolve correctly
            const baseTag = `<base href="${window.location.origin}/templates/template${id}/">`;
            htmlText = htmlText.replace("<head>", `<head>${baseTag}`);

            // Create a Blob URL and open it in a new window
            const blob = new Blob([htmlText], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
        } catch (err) {
            console.error(err);
            alert("Failed to generate profile preview. Please try again.");
        }
    };

    const injectUserData = (htmlText, forceStock = false) => {
        let injected = htmlText;

        const activeUserData = (userData && !forceStock) ? userData : {
            name: 'Mubashir Ahmad',
            address: 'London, United Kingdom',
            profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
            about: 'I craft high-performance, pixel-perfect web experiences with modern architecture and cutting-edge aesthetics.',
            phone: '+44 7911 123456',
            email: 'mubashir.ahmad@example.com',
            socialLinks: {
                github: 'https://github.com',
                linkedin: 'https://linkedin.com',
                instagram: 'https://instagram.com'
            },
            education: [],
            projects: [],
            experience: [],
            skills: []
        };

        // Construct the payload structure from dashboard inputs, defaulting to 'Mubashir Ahmad' and beautiful demo images
        const payload = {
            name: (!activeUserData.name || activeUserData.name === 'Developer Guest') ? 'Mubashir Ahmad' : activeUserData.name,
            address: activeUserData.address || 'London, United Kingdom',
            profileImage: (!activeUserData.profileImage || activeUserData.profileImage.includes('profileImg')) ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300' : activeUserData.profileImage,
            about: activeUserData.about || 'I craft high-performance, pixel-perfect web experiences with modern architecture and cutting-edge aesthetics.',
            phone: activeUserData.phone || '+44 7911 123456',
            email: activeUserData.email || 'mubashir.ahmad@example.com',
            socialLinks: activeUserData.socialLinks || {
                github: 'https://github.com',
                linkedin: 'https://linkedin.com',
                instagram: 'https://instagram.com'
            },
            education: (activeUserData.education && activeUserData.education.length > 0) ? activeUserData.education.filter(e => e.name && e.name.trim()).slice(0, 4) : [
                { level: 'Master of Science', name: 'Oxford University', address: 'Oxford, UK', status: 'First Class Honors' },
                { level: 'Bachelor of Engineering', name: 'Imperial College London', address: 'London, UK', status: 'Distinction' }
            ],
            projects: (activeUserData.projects && activeUserData.projects.length > 0) ? activeUserData.projects.filter(p => p.title && p.title.trim()).slice(0, 3) : [
                { title: 'AI Portfolio Builder', description: 'Next-gen responsive developer workspace with modular template compilers.', link: 'https://github.com', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600' },
                { title: 'DeFi Liquidity Engine', description: 'High-throughput algorithmic transaction ledger running on Solidity.', link: 'https://github.com', image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600' },
                { title: 'SaaS Design System', description: 'A gorgeous, cohesive HSL-styled micro-component design token architecture.', link: 'https://github.com', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600' }
            ],
            experience: (activeUserData.experience && activeUserData.experience.length > 0) ? activeUserData.experience.filter(e => e.company && e.company.trim()).slice(0, 3) : [
                { company: 'Google Deepmind', description: 'Spearheaded premium frontend components, layout optimization, and high-end AI rendering systems.', certificate: 'Senior Frontend Architect' },
                { company: 'Stripe Payments', description: 'Developed highly extensible dashboard components and custom client SDK configurations.', certificate: 'Lead Product Engineer' }
            ],
            skills: (activeUserData.skills && activeUserData.skills.length > 0) ? activeUserData.skills.filter(s => s.name && s.name.trim()) : [
                { name: 'React.js', progress: 95 },
                { name: 'TypeScript', progress: 90 },
                { name: 'Tailwind CSS', progress: 85 },
                { name: 'Node.js', progress: 88 },
                { name: 'System Design', progress: 92 }
            ]
        };

        // 1. Inject isolated theme styles into <head>
        const themeStyles = `
<style id="isolated-theme-styles">
  body.light-mode {
    filter: invert(0.9) hue-rotate(180deg) !important;
    background-color: #f7f7f7 !important;
  }
  body.light-mode img, 
  body.light-mode canvas, 
  body.light-mode iframe,
  body.light-mode #theme-toggle,
  body.light-mode .project-img,
  body.light-mode .work-img,
  body.light-mode .card-image,
  body.light-mode .hero-visual,
  body.light-mode [style*="background"] {
    filter: invert(0.9) hue-rotate(180deg) !important;
  }
</style>
`;
        injected = injected.replace("</head>", `${themeStyles}</head>`);

        // 2. Inject payload script at the bottom of the body
        const engineScript = `
<!-- Dynamic User Data Payload -->
<script id="dashboard-customizer-payload">
window.portfolioData = ${JSON.stringify(payload)};
</script>

<!-- Floating Dual Theme Toggle Button -->
<button id="theme-toggle" aria-label="Toggle Theme" style="position: fixed; bottom: 24px; right: 24px; z-index: 99999; background: #000; color: #fff; border: 2px solid #fff; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.3); transition: all 0.3s ease;">🌓</button>
<script>
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('local-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });
  if (localStorage.getItem('local-theme') === 'light') {
    document.body.classList.add('light-mode');
  }
</script>

<!-- Universal Rendering Engine for Dashboard Items -->
<script id="dashboard-customizer-engine">
(function() {
  const data = window.portfolioData;
  if (!data) return;

  // Update text elements recursively
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      let txt = node.textContent;
      if (txt.includes("John Developer") || txt.includes("Alex") || txt.includes("John")) {
        txt = txt.replace(/John\\s+Developer|Alex|John/g, data.name || "Developer");
      }
      if (txt.includes("hello@example.com") || txt.includes("hello@studio.com")) {
        txt = txt.replace(/hello@example\\.com|hello@studio\\.com/g, data.email || "hello@example.com");
      }
      if (txt.includes("San Francisco, CA")) {
        txt = txt.replace("San Francisco, CA", data.address || "Global Citizen");
      }
      if (node.textContent !== txt) node.textContent = txt;
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }
  walk(document.body);

  // Update profile image
  if (data.profileImage) {
    document.querySelectorAll(".hero img, .hero-visual img, .about-img, .profile-img, .hero-image-placeholder").forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = data.profileImage;
      } else {
        el.style.backgroundImage = 'url(' + data.profileImage + ')';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    });
  }

  // Render Education (Max 4)
  const validEdu = data.education || [];
  const eduContainer = document.querySelector(".milestones-timeline, .education-grid, .about-details, .about-info");
  if (eduContainer && validEdu.length > 0) {
    if (eduContainer.classList.contains("milestones-timeline")) {
      eduContainer.innerHTML = validEdu.map(e => \`
        <div class="timeline-item">
          <div class="timeline-date">\${e.status || 'Completed'}</div>
          <div class="timeline-content">
            <h3>\${e.level || 'Degree'}</h3>
            <h4>\${e.name}</h4>
            <p>\${e.address || ''}</p>
          </div>
        </div>
      \`).join('');
    } else if (eduContainer.classList.contains("about-details") || eduContainer.classList.contains("about-info")) {
      eduContainer.innerHTML = validEdu.map(e => \`
        <div><span>\${e.level || 'Education'}</span><strong>\${e.name} (\${e.status})</strong></div>
      \`).join('');
    }
  } else if (validEdu.length === 0) {
    document.querySelectorAll("#education, .education, #experience").forEach(el => {
      if (el.textContent.toLowerCase().includes("milestone") || el.textContent.toLowerCase().includes("education")) {
        el.style.display = 'none';
      }
    });
  }

  // Render Projects (Max 3)
  const validProj = data.projects || [];
  const projContainer = document.querySelector(".projects-grid, .work-grid, .project-list, .jobs-list");
  if (projContainer && validProj.length > 0) {
    if (projContainer.classList.contains("project-list")) {
      projContainer.innerHTML = validProj.map((p, idx) => \`
        <div class="project-row" data-color="#6366f1" onclick="if('\${p.link}') window.open('\${p.link}', '_blank')">
          <span class="project-num">0\${idx+1}</span>
          <h3>\${p.title}</h3>
          <span class="project-cat">\${p.description || 'Featured Project'}</span>
        </div>
      \`).join('');
    } else if (projContainer.classList.contains("jobs-list")) {
      projContainer.innerHTML = validProj.map((p, idx) => \`
        <div class="job-item cyan-bg" onclick="if('\${p.link}') window.open('\${p.link}', '_blank')" style="cursor: pointer;">
          <div class="job-num">0\${idx+1}</div>
          <div class="job-meta">
            <h3>\${p.title}</h3>
            <p>\${p.description || ''}</p>
          </div>
          <a href="#" class="job-arrow">→</a>
        </div>
      \`).join('');
    } else {
      projContainer.innerHTML = validProj.map(p => \`
        <div class="project-card work-item card-image-holder" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; margin-bottom: 20px; overflow: hidden; display: flex; flex-direction: column;">
          <div class="project-img work-img card-image" style="background: \${p.image ? 'url(' + p.image + ') center/cover no-repeat' : 'linear-gradient(135deg, #667eea, #764ba2)'}; height: 200px; width: 100%;"></div>
          <div class="project-info card-content" style="padding: 20px;">
            <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 8px;">\${p.title}</h3>
            <p style="font-size: 0.95rem; opacity: 0.8; margin-bottom: 12px;">\${p.description || ''}</p>
            \${p.link ? \`<a href="\${p.link}" target="_blank" style="color: var(--violet, #7b5ef8); font-weight: bold; text-decoration: none;">View Live →</a>\` : ''}
          </div>
        </div>
      \`).join('');
    }
  } else if (validProj.length === 0) {
    document.querySelectorAll("#projects, .projects, #work, .work").forEach(el => el.style.display = 'none');
  }

  // Render Experience (Max 3)
  const validExp = data.experience || [];
  const expContainer = document.querySelector(".milestones-timeline, .experience-grid, .manifesto-grid, .about-cards");
  if (expContainer && validExp.length > 0) {
    if (expContainer.classList.contains("manifesto-grid")) {
      expContainer.innerHTML = validExp.map((e, idx) => \`
        <div class="manifesto-card white-bg" style="padding: 24px; border: 2px solid #000; border-radius: 8px; margin-bottom: 16px;">
          <h3>0\${idx+1} / \${e.company.toUpperCase()}</h3>
          <p>\${e.description || 'Professional operations strategy.'}</p>
        </div>
      \`).join('');
    } else if (expContainer.classList.contains("milestones-timeline")) {
      expContainer.innerHTML = validExp.map(e => \`
        <div class="timeline-item">
          <div class="timeline-date">EXPERIENCE</div>
          <div class="timeline-content">
            <h3>\${e.company}</h3>
            <p>\${e.description || ''}</p>
          </div>
        </div>
      \`).join('');
    } else {
      expContainer.innerHTML = validExp.map(e => \`
        <div class="info-card glass-card" style="padding: 20px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
          <span class="card-icon card-emoji">💼</span>
          <h3>\${e.company}</h3>
          <p>\${e.description || ''}</p>
        </div>
      \`).join('');
    }
  } else if (validExp.length === 0) {
    document.querySelectorAll("#experience, .experience, .milestones-timeline").forEach(el => {
      if (!el.querySelector('.timeline-date') || el.textContent.toLowerCase().includes("milestone")) {
         el.style.display = 'none';
      }
    });
  }

  // Render Skills
  const validSkills = data.skills || [];
  const skillsContainer = document.querySelector(".skills-grid, .skills-list, .services-grid");
  if (skillsContainer && validSkills.length > 0) {
    skillsContainer.innerHTML = validSkills.map((s, idx) => \`
      <div class="skill-item service-card" style="padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 12px;">
        <div class="skill-icon">⚡</div>
        <span>\${s.name}</span>
        <div class="skill-bar" style="margin-top: 10px; background: rgba(255,255,255,0.1); height: 6px; border-radius: 3px; overflow: hidden;">
          <div class="skill-fill" style="width: \${s.progress || 90}%; height: 100%; background: var(--violet, #7b5ef8);"></div>
        </div>
      </div>
    \`).join('');
  } else if (validSkills.length === 0) {
    document.querySelectorAll("#skills, .skills, #services, .services").forEach(el => el.style.display = 'none');
  }
})();
</script>
`;
        injected = injected.replace("</body>", `${engineScript}</body>`);

        return injected;
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

            // Inject real user dashboard data if requested
            if (injectEnabled) {
                htmlText = injectUserData(htmlText);
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
