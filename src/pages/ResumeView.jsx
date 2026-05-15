import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import '../pagesStyles/resume.css';

export default function ResumeView() {
    const [userData, setUserData] = useState(null);
    const resumeRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/auth');
                    return;
                }
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
    }, [navigate]);

    const handleDownload = () => {
        const element = resumeRef.current;
        const opt = {
            margin:       0,
            filename:     `${userData.name.replace(/\\s+/g, '_')}_Resume.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    if (!userData) {
        return <div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Loading Resume...</div>;
    }

    return (
        <div className="resume-container">
            <div className="resume-actions">
                <button onClick={() => navigate('/dash')}>Back to Dashboard</button>
                <button onClick={handleDownload}>Download PDF</button>
            </div>

            <div className="resume-document" ref={resumeRef}>
                <div className="resume-header">
                    <h1>{userData.name}</h1>
                    <p>{userData.email} {userData.phone ? `| ${userData.phone}` : ''} {userData.address ? `| ${userData.address}` : ''}</p>
                    <p>{userData.socialLinks?.portfolio || userData.socialLinks?.linkedin || ''}</p>
                </div>

                {userData.about && (
                    <div className="resume-section">
                        <h2>Professional Summary</h2>
                        <p>{userData.about}</p>
                    </div>
                )}

                {userData.experience && userData.experience.length > 0 && userData.experience[0].company && (
                    <div className="resume-section">
                        <h2>Experience</h2>
                        {userData.experience.map((exp, i) => {
                            if (!exp.company) return null;
                            return (
                                <div key={i} className="resume-item">
                                    <h3>{exp.company}</h3>
                                    <p>{exp.description}</p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {userData.education && userData.education.length > 0 && userData.education[0].name && (
                    <div className="resume-section">
                        <h2>Education</h2>
                        {userData.education.map((edu, i) => {
                            if (!edu.name) return null;
                            return (
                                <div key={i} className="resume-item">
                                    <h3>{edu.name}</h3>
                                    <h4>{edu.level} - {edu.status}</h4>
                                    <p>{edu.address}</p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {userData.projects && userData.projects.length > 0 && userData.projects[0].title && (
                    <div className="resume-section">
                        <h2>Projects</h2>
                        {userData.projects.map((proj, i) => {
                            if (!proj.title) return null;
                            return (
                                <div key={i} className="resume-item">
                                    <h3>{proj.title}</h3>
                                    <p>{proj.description}</p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {userData.skills && userData.skills.length > 0 && userData.skills[0].name && (
                    <div className="resume-section">
                        <h2>Skills</h2>
                        <div className="resume-skills">
                            {userData.skills.map((skill, i) => {
                                if (!skill.name) return null;
                                return <div key={i} className="resume-skill">{skill.name}</div>;
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
