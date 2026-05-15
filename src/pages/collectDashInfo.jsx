import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyles/collectDashInfo.css';

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
        skills: [
            { name: '', icon: '💻', progress: 50 },
            { name: '', icon: '🚀', progress: 50 },
            { name: '', icon: '🎨', progress: 50 },
            { name: '', icon: '⚙️', progress: 50 },
            { name: '', icon: '📈', progress: 50 }
        ]
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
                {step === 7 && <GetSkills setStep={setStep} formData={formData} handleArrayChange={handleArrayChange} handleSubmit={handleSubmit} />}
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
    return (
        <section id="GetContact">
            <h1>Step 2/7: Enter Phone Number (with country code)</h1>
            <div className="inputs">
                <input type="number" placeholder='Enter Phone no.' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="btns">
                <button onClick={() => setStep(1)}>Back</button>
                <button onClick={() => setStep(3)}>NEXT</button>
            </div>
        </section>
    )
}

function GetSocial({ setStep, formData, handleSocialChange }) {
    return (
        <section id="GetSocial">
            <h1>Step 3/7: Paste Social Media Links</h1>
            <div className="inputs">
                <input type="text" name="instagram" placeholder='Instagram' value={formData.socialLinks.instagram} onChange={handleSocialChange} />
                <input type="text" name="facebook" placeholder='Facebook' value={formData.socialLinks.facebook} onChange={handleSocialChange} />
                <input type="text" name="github" placeholder='Github' value={formData.socialLinks.github} onChange={handleSocialChange} />
                <input type="text" name="linkedin" placeholder='Linked-In' value={formData.socialLinks.linkedin} onChange={handleSocialChange} />
                <input type="text" name="portfolio" placeholder='Portfolio' value={formData.socialLinks.portfolio} onChange={handleSocialChange} />
                <input type="text" name="extra" placeholder='Extra' value={formData.socialLinks.extra} onChange={handleSocialChange} />
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

function GetSkills({ setStep, formData, handleArrayChange, handleSubmit }) {
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
                handleArrayChange('skills', idx, 'icon', result.url);
            } else {
                alert(result.message || "Upload failed");
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    return (
        <section id="GetSkills" className="dynamic-section">
            <h1>Step 7/7: Skills</h1>
            {formData.skills.map((skill, idx) => (
                <div key={idx} className="dynamic-item-horizontal">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        {skill.icon && skill.icon.startsWith('http') ? (
                            <img src={skill.icon} alt="icon" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                        ) : (
                            <span style={{ fontSize: '24px' }}>{skill.icon || '💻'}</span>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, idx)} style={{ width: '80px', fontSize: '10px' }} title="Upload Skill Icon" />
                    </div>
                    <input type="text" placeholder="Skill Name" value={skill.name} onChange={(e) => handleArrayChange('skills', idx, 'name', e.target.value)} style={{ flex: 1 }} />
                    <input type="number" placeholder="%" value={skill.progress} onChange={(e) => handleArrayChange('skills', idx, 'progress', parseInt(e.target.value))} style={{ width: '80px', flex: 'none' }} min="0" max="100" />
                </div>
            ))}
            <div className="btns" style={{marginTop: '20px'}}>
                <button onClick={() => setStep(6)}>Back</button>
                <button onClick={handleSubmit} style={{ background: 'var(--violet)', color: '#fff', border: 'none' }}>Complete!</button>
            </div>
        </section>
    )
}