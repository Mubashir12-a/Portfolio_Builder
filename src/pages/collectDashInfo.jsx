import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyles/collectDashInfo.css';
import { useSkillsList } from '../hooks/useSkillsList';

function CollectDashInfo() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        profileImage: '',
        about: '',
        phone: '',
        socialLinks: {
            instagram: '', facebook: '', github: '',
            linkedin: '', portfolio: '', extra: ''
        },
        education: [
            { level: '10Th', name: '', address: '', status: 'Completed' },
            { level: '11Th/12Th', name: '', address: '', status: 'Completed' },
            { level: 'UG Degree', name: '', address: '', status: 'Ongoing' },
            { level: 'PG Degree', name: '', address: '', status: 'Not yet' }
        ],
        projects: [
            { title: '', description: '', link: '', image: '' },
            { title: '', description: '', link: '', image: '' },
            { title: '', description: '', link: '', image: '' }
        ],
        experience: [
            { company: '', description: '', certificate: '' },
            { company: '', description: '', certificate: '' },
            { company: '', description: '', certificate: '' }
        ],
        skills: []
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";
                const res = await fetch(`${apiUrl}/api/user/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                const data = await res.json();
                if (data.success && data.user.profileCompleted) {
                    const u = data.user;
                    setFormData(prev => ({
                        ...prev,
                        name: u.name || prev.name,
                        address: u.address || prev.address,
                        profileImage: u.profileImage || prev.profileImage,
                        about: u.about || prev.about,
                        phone: u.phone || prev.phone,
                        socialLinks: u.socialLinks || prev.socialLinks,
                        education: u.education?.length ? u.education : prev.education,
                        projects: u.projects?.length ? u.projects : prev.projects,
                        experience: u.experience?.length ? u.experience : prev.experience,
                        skills: u.skills?.length ? u.skills : prev.skills,
                    }));
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
        fetchUserData();
    }, []);

    // Reactively update local storage to trigger the live preview iframe storage bus
    useEffect(() => {
        localStorage.setItem('portfolioUserData', JSON.stringify(formData));
        window.dispatchEvent(new Event('storage'));
    }, [formData]);

    const handleSocialChange = (e) => {
        setFormData({
            ...formData,
            socialLinks: { ...formData.socialLinks, [e.target.name]: e.target.value }
        });
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        const newArray = [...formData[arrayName]];
        newArray[index][field] = value;
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";

            const res = await fetch(`${apiUrl}/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                navigate('/dash');
            } else {
                alert(data.message || 'Failed to update profile');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    return (
        <section id="collectinfo">
            <div className="container" style={{ maxWidth: '800px', padding: '2rem' }}>
                {step === 1 && <GetAbout setStep={setStep} formData={formData} setFormData={setFormData} />}
                {step === 2 && <GetContact setStep={setStep} formData={formData} setFormData={setFormData} />}
                {step === 3 && <GetSocial setStep={setStep} formData={formData} handleSocialChange={handleSocialChange} />}
                {step === 4 && <GetEducation setStep={setStep} formData={formData} handleArrayChange={handleArrayChange} />}
                {step === 5 && <GetProjects setStep={setStep} formData={formData} handleArrayChange={handleArrayChange} />}
                {step === 6 && <GetExperience setStep={setStep} formData={formData} handleArrayChange={handleArrayChange} />}
                {step === 7 && <GetSkills setStep={setStep} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />}
            </div>
        </section>
    )
}

export default CollectDashInfo;

function GetAbout({ setStep, formData, setFormData }) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 1024 * 1024) {
            alert("File is too large (max 1MB).");
            return;
        }

        setUploading(true);
        const data = new FormData();
        data.append("image", file);

        try {
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";
            const res = await fetch(`${apiUrl}/api/user/upload-image`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });
            const result = await res.json();
            if (result.success) {
                setFormData({ ...formData, profileImage: result.url });
            } else {
                alert(result.message || "Upload failed");
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
        setUploading(false);
    };

    return (
        <section id="GetAbout" className="dynamic-section">
            <h1>Step 1/7: Personal Info</h1>
            <div className="step-header">
                <span className="step-badge">Step 1 of 7</span>
                <h2>Tell us about <em>yourself.</em></h2>
                <p style={{color:'var(--text-2)', fontSize:'0.95rem'}}>Upload a photo and fill in your basic details.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--bg2)', overflow: 'hidden', border: '2px solid var(--border)', position: 'relative' }}>
                    {formData.profileImage ? (
                        <img src={formData.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: uploading ? 0.5 : 1 }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}>No Image</div>
                    )}
                    {uploading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '10px' }}>Uploading...</div>}
                    <input type="file" accept="image/*" onChange={handleUpload} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>Click to upload profile picture</span>
            </div>

            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Full Name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '15px', background: 'var(--bg2)', color: 'var(--text-2)', border: '1px solid var(--border)', borderRadius: '10px' }} />
                <input type="text" placeholder="Address (e.g. New York, USA)" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} style={{ width: '100%', padding: '15px', background: 'var(--bg2)', color: 'var(--text-2)', border: '1px solid var(--border)', borderRadius: '10px' }} />
                <textarea placeholder="About You (Max-50 words)" value={formData.about || ''} onChange={(e) => setFormData({ ...formData, about: e.target.value })} style={{ width: '100%', padding: '15px', background: 'var(--bg2)', color: 'var(--text-2)', border: '1px solid var(--border)', borderRadius: '10px', height: '150px', resize: 'none' }}></textarea>
            </div>
            
            <div className="btns" style={{ marginTop: '20px' }}>
                <button disabled>Back</button>
                <button onClick={() => setStep(2)}>NEXT</button>
            </div>
        </section>
    )
}

function GetContact({ setStep, formData, setFormData }) {
    const [countryCode, setCountryCode] = useState('+91');

    const countryCodes = [
        { code: '+1', flag: '🇺🇸', label: 'US' },
        { code: '+44', flag: '🇬🇧', label: 'UK' },
        { code: '+91', flag: '🇮🇳', label: 'IN' },
        { code: '+92', flag: '🇵🇰', label: 'PK' },
        { code: '+971', flag: '🇦🇪', label: 'UAE' },
        { code: '+966', flag: '🇸🇦', label: 'SA' },
        { code: '+61', flag: '🇦🇺', label: 'AU' },
        { code: '+49', flag: '🇩🇪', label: 'DE' },
        { code: '+33', flag: '🇫🇷', label: 'FR' },
        { code: '+81', flag: '🇯🇵', label: 'JP' },
        { code: '+86', flag: '🇨🇳', label: 'CN' },
        { code: '+55', flag: '🇧🇷', label: 'BR' },
        { code: '+7',  flag: '🇷🇺', label: 'RU' },
        { code: '+27', flag: '🇿🇦', label: 'ZA' },
        { code: '+20', flag: '🇪🇬', label: 'EG' },
    ];

    const handlePhoneChange = (num) => {
        setFormData({ ...formData, phone: `${countryCode} ${num}` });
    };

    const handleCodeChange = (code) => {
        setCountryCode(code);
        const numOnly = formData.phone?.replace(/^\+\d+\s*/, '') || '';
        setFormData({ ...formData, phone: `${code} ${numOnly}` });
    };

    const numOnly = formData.phone?.replace(/^\+\d+\s*/, '') || '';

    return (
        <section id="GetContact">
            <div className="step-header">
                <span className="step-badge">Step 2 of 7</span>
                <h2>Your <em>contact number.</em></h2>
                <p style={{color:'var(--text-2)', fontSize:'0.95rem'}}>Select your country code and enter your number.</p>
            </div>
            <div className="inputs">
                <div className="phone-input-group">
                    <select
                        className="country-code-select"
                        value={countryCode}
                        onChange={(e) => handleCodeChange(e.target.value)}
                    >
                        {countryCodes.map(c => (
                            <option key={c.code} value={c.code}>
                                {c.flag} {c.code} ({c.label})
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder='Phone number'
                        value={numOnly}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                    />
                </div>
            </div>
            <div className="btns">
                <button onClick={() => setStep(1)}>Back</button>
                <button onClick={() => setStep(3)}>NEXT</button>
            </div>
        </section>
    )
}

function GetSocial({ setStep, formData, handleSocialChange }) {
    const socialFields = [
        { name: 'instagram', label: 'Instagram', icon: '📸', placeholder: 'https://instagram.com/yourhandle' },
        { name: 'facebook',  label: 'Facebook',  icon: '📘', placeholder: 'https://facebook.com/yourpage' },
        { name: 'github',    label: 'GitHub',    icon: '🐙', placeholder: 'https://github.com/yourusername' },
        { name: 'linkedin',  label: 'LinkedIn',  icon: '💼', placeholder: 'https://linkedin.com/in/yourprofile' },
        { name: 'portfolio', label: 'Portfolio', icon: '🌐', placeholder: 'https://yourportfolio.com' },
        { name: 'extra',     label: 'Extra Link',icon: '🔗', placeholder: 'Any other link' },
    ];

    return (
        <section id="GetSocial">
            <div className="step-header">
                <span className="step-badge">Step 3 of 7</span>
                <h2>Social <em>links.</em></h2>
                <p style={{color:'var(--text-2)', fontSize:'0.95rem'}}>Paste your public profile URLs below.</p>
            </div>
            <div className="social-inputs">
                {socialFields.map(field => (
                    <div key={field.name} className="social-input-row">
                        <div className="social-input-icon">
                            <span>{field.icon}</span>
                            <label>{field.label}</label>
                        </div>
                        <input
                            type="text"
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData.socialLinks[field.name]}
                            onChange={handleSocialChange}
                        />
                    </div>
                ))}
            </div>
            <div className="btns">
                <button onClick={() => setStep(2)}>Back</button>
                <button onClick={() => setStep(4)}>NEXT</button>
            </div>
        </section>
    )
}

function GetEducation({ setStep, formData, handleArrayChange }) {
    return (
        <section id="GetEducation" className="dynamic-section">
            <h1>Step 4/7: Education Details</h1>
            <div className="step-header">
                <span className="step-badge">Step 4 of 7</span>
                <h2>Your <em>education.</em></h2>
                <p style={{color:'var(--text-2)', fontSize:'0.95rem'}}>Fill in your academic qualifications below.</p>
            </div>
            {formData.education.map((edu, idx) => (
                <div key={idx} className="dynamic-item">
                    <h3>{edu.level}</h3>
                    <input type="text" placeholder="Institution Name" value={edu.name} onChange={(e) => handleArrayChange('education', idx, 'name', e.target.value)} />
                    <input type="text" placeholder="Address / Location" value={edu.address} onChange={(e) => handleArrayChange('education', idx, 'address', e.target.value)} />
                    <select value={edu.status} onChange={(e) => handleArrayChange('education', idx, 'status', e.target.value)}>
                        <option value="Completed">Completed</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Not yet">Not yet</option>
                    </select>
                </div>
            ))}
            <div className="btns">
                <button onClick={() => setStep(3)}>Back</button>
                <button onClick={() => setStep(5)}>NEXT</button>
            </div>
        </section>
    )
}

function GetProjects({ setStep, formData, handleArrayChange }) {
    const handleImageUpload = async (e, idx) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 1024 * 1024) {
            alert("File is too large (max 1MB).");
            return;
        }

        const data = new FormData();
        data.append("image", file);

        try {
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";
            const res = await fetch(`${apiUrl}/api/user/upload-image`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });
            const result = await res.json();
            if (result.success) {
                handleArrayChange('projects', idx, 'image', result.url);
            } else {
                alert(result.message || "Upload failed");
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    return (
        <section id="GetProjects" className="dynamic-section">
            <h1>Step 5/7: Projects</h1>
            <div className="step-header">
                <span className="step-badge">Step 5 of 7</span>
                <h2>Your <em>projects.</em></h2>
                <p style={{color:'var(--text-2)', fontSize:'0.95rem'}}>Showcase your best work with links and images.</p>
            </div>
            {formData.projects.map((proj, idx) => (
                <div key={idx} className="dynamic-item">
                    <h3>Project {idx + 1}</h3>
                    <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => handleArrayChange('projects', idx, 'title', e.target.value)} />
                    <textarea placeholder="Description" value={proj.description} onChange={(e) => handleArrayChange('projects', idx, 'description', e.target.value)}></textarea>
                    <input type="text" placeholder="Live Link/URL" value={proj.link || ''} onChange={(e) => handleArrayChange('projects', idx, 'link', e.target.value)} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', fontSize: '12px' }}>
                        {proj.image && <img src={proj.image} alt="Project" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} />}
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, idx)} />
                        <span>Project Image</span>
                    </div>
                </div>
            ))}
            <div className="btns">
                <button onClick={() => setStep(4)}>Back</button>
                <button onClick={() => setStep(6)}>NEXT</button>
            </div>
        </section>
    )
}

function GetExperience({ setStep, formData, handleArrayChange }) {
    const handleImageUpload = async (e, idx) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 1024 * 1024) {
            alert("File is too large (max 1MB).");
            return;
        }

        const data = new FormData();
        data.append("image", file);

        try {
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";
            const res = await fetch(`${apiUrl}/api/user/upload-image`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });
            const result = await res.json();
            if (result.success) {
                handleArrayChange('experience', idx, 'certificate', result.url);
            } else {
                alert(result.message || "Upload failed");
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    return (
        <section id="GetExperience" className="dynamic-section">
            <h1>Step 6/7: Experience</h1>
            <div className="step-header">
                <span className="step-badge">Step 6 of 7</span>
                <h2>Your <em>experience.</em></h2>
                <p style={{color:'var(--text-2)', fontSize:'0.95rem'}}>Add companies and roles you've worked with.</p>
            </div>
            {formData.experience.map((exp, idx) => (
                <div key={idx} className="dynamic-item">
                    <h3>Experience {idx + 1}</h3>
                    <input type="text" placeholder="Company Name" value={exp.company} onChange={(e) => handleArrayChange('experience', idx, 'company', e.target.value)} />
                    <textarea placeholder="Description / Role" value={exp.description} onChange={(e) => handleArrayChange('experience', idx, 'description', e.target.value)}></textarea>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', fontSize: '12px' }}>
                        {exp.certificate && <img src={exp.certificate} alt="Certificate" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} />}
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, idx)} />
                        <span>Experience Certificate</span>
                    </div>
                </div>
            ))}
            <div className="btns">
                <button onClick={() => setStep(5)}>Back</button>
                <button onClick={() => setStep(7)}>NEXT</button>
            </div>
        </section>
    )
}

function GetSkills({ setStep, formData, setFormData, handleSubmit }) {
    const { skillsList } = useSkillsList();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPresetSkills = skillsList.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleSkill = (skill) => {
        const isAlreadySelected = formData.skills.some(s => s.name === skill.name);
        
        if (isAlreadySelected) {
            setFormData(prev => ({
                ...prev,
                skills: prev.skills.filter(s => s.name !== skill.name)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, { name: skill.name, icon: skill.icon, progress: 80 }]
            }));
        }
    };

    const handleSliderChange = (index, val) => {
        setFormData(prev => {
            const updatedSkills = [...prev.skills];
            updatedSkills[index] = { ...updatedSkills[index], progress: val };
            return { ...prev, skills: updatedSkills };
        });
    };

    return (
        <section id="GetSkills" className="dynamic-section">
            <div className="step-header">
                <span className="step-badge">Step 7 of 7 · Final</span>
                <h2>Select your <em>skills.</em></h2>
                <p style={{color:'var(--text-2)', fontSize:'0.95rem'}}>Choose from 60 major developer skills and adjust your proficiency levels.</p>
            </div>

            <input
                type="text"
                placeholder="Search skills (e.g., React, Python, Figma)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="skills-search-input"
            />

            <div className="preset-skills-grid">
                {filteredPresetSkills.map(skill => {
                    const isSelected = formData.skills.some(s => s.name === skill.name);
                    return (
                        <div
                            key={skill.name}
                            className={`preset-skill-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleToggleSkill(skill)}
                        >
                            <img src={skill.icon} alt={skill.name} className="preset-skill-icon" />
                            <span className="preset-skill-name">{skill.name}</span>
                            {isSelected && <span className="preset-skill-check">✓</span>}
                        </div>
                    );
                })}
            </div>

            <div className="selected-skills-section">
                <h3>✦ Adjust Skill Levels ({formData.skills.length} Selected)</h3>
                {formData.skills.length === 0 ? (
                    <p className="no-skills-msg">Click skills in the grid above to select them!</p>
                ) : (
                    <div className="selected-skills-list">
                        {formData.skills.map((skill, idx) => (
                            <div key={skill.name} className="selected-skill-row">
                                <img src={skill.icon} alt={skill.name} className="selected-skill-icon-small" />
                                <span className="selected-skill-name-label">{skill.name}</span>
                                <div className="slider-container">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={skill.progress || 50}
                                        onChange={e => handleSliderChange(idx, parseInt(e.target.value))}
                                        className="skill-progress-slider"
                                    />
                                    <span className="progress-badge">{skill.progress || 50}%</span>
                                </div>
                                <button
                                    className="remove-skill-btn"
                                    onClick={() => handleToggleSkill({ name: skill.name, icon: skill.icon })}
                                    title="Remove Skill"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="btns" style={{marginTop: '20px'}}>
                <button onClick={() => setStep(6)}>Back</button>
                <button onClick={handleSubmit} style={{ background: 'var(--violet)', color: '#fff', border: 'none' }}>Complete!</button>
            </div>
        </section>
    );
}