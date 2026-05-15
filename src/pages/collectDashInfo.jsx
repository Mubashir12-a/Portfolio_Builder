import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyles/collectDashInfo.css';

function CollectDashInfo() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
            { title: '', description: '' },
            { title: '', description: '' },
            { title: '', description: '' }
        ],
        experience: [
            { company: '', description: '' },
            { company: '', description: '' },
            { company: '', description: '' }
        ],
        skills: [
            { name: '', icon: '💻', progress: 50 },
            { name: '', icon: '🚀', progress: 50 },
            { name: '', icon: '🎨', progress: 50 },
            { name: '', icon: '⚙️', progress: 50 },
            { name: '', icon: '📈', progress: 50 }
        ]
    });

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
    return (
        <section id="GetAbout">
            <h1>Step 1/7: About You (Max-50 words)</h1>
            <textarea value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })}></textarea>
            <div className="btns">
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
        <section id="GetEducation" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1>Step 4/7: Education Details</h1>
            {formData.education.map((edu, idx) => (
                <div key={idx} style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#111827', fontSize: '18px' }}>{edu.level}</h3>
                    <input type="text" placeholder="Institution Name" value={edu.name} onChange={(e) => handleArrayChange('education', idx, 'name', e.target.value)} />
                    <input type="text" placeholder="Address / Location" value={edu.address} onChange={(e) => handleArrayChange('education', idx, 'address', e.target.value)} />
                    <select value={edu.status} onChange={(e) => handleArrayChange('education', idx, 'status', e.target.value)} style={{ padding: '12px', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
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
    return (
        <section id="GetProjects" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1>Step 5/7: Projects</h1>
            {formData.projects.map((proj, idx) => (
                <div key={idx} style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#111827', fontSize: '18px' }}>Project {idx + 1}</h3>
                    <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => handleArrayChange('projects', idx, 'title', e.target.value)} />
                    <textarea placeholder="Description" value={proj.description} onChange={(e) => handleArrayChange('projects', idx, 'description', e.target.value)} style={{ height: '80px' }}></textarea>
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
    return (
        <section id="GetExperience" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1>Step 6/7: Experience</h1>
            {formData.experience.map((exp, idx) => (
                <div key={idx} style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#111827', fontSize: '18px' }}>Experience {idx + 1}</h3>
                    <input type="text" placeholder="Company Name" value={exp.company} onChange={(e) => handleArrayChange('experience', idx, 'company', e.target.value)} />
                    <textarea placeholder="Description / Role" value={exp.description} onChange={(e) => handleArrayChange('experience', idx, 'description', e.target.value)} style={{ height: '80px' }}></textarea>
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
    return (
        <section id="GetSkills" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1>Step 7/7: Skills</h1>
            {formData.skills.map((skill, idx) => (
                <div key={idx} style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="text" placeholder="Emoji (💻)" value={skill.icon} onChange={(e) => handleArrayChange('skills', idx, 'icon', e.target.value)} style={{ width: '80px', flex: 'none' }} />
                    <input type="text" placeholder="Skill Name" value={skill.name} onChange={(e) => handleArrayChange('skills', idx, 'name', e.target.value)} style={{ flex: 1 }} />
                    <input type="number" placeholder="%" value={skill.progress} onChange={(e) => handleArrayChange('skills', idx, 'progress', parseInt(e.target.value))} style={{ width: '80px', flex: 'none' }} min="0" max="100" />
                </div>
            ))}
            <div className="btns">
                <button onClick={() => setStep(6)}>Back</button>
                <button onClick={handleSubmit} style={{ background: '#7B5EF8', color: '#fff' }}>Complete!</button>
            </div>
        </section>
    )
}