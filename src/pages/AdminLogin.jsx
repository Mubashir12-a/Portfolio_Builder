import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyles/adminPanel.css';

import logo      from '../assets/AdminImg/LaptopSecurityfeature.gif';
import watchPass from '../assets/AdminImg/watchPass.gif';
import hidePass  from '../assets/AdminImg/hidePass.gif';

const API = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";

function AdminLogin() {
    const [step, setStep] = useState('credentials');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('adminToken')) navigate('/admin/dashboard', { replace: true });
    }, []);

    const handleCredentials = async () => {
        if (!email || !password) return setError('All fields are required');
        setError(''); setLoading(true);
        try {
            const res = await fetch(`${API}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) setStep('otp');
            else setError(data.message || 'Invalid credentials');
        } catch { setError('Server error. Try again.'); }
        finally { setLoading(false); }
    };

    const handleOTP = async () => {
        if (!otp) return setError('Enter the verification code');
        setError(''); setLoading(true);
        try {
            const res = await fetch(`${API}/api/admin/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp })
            });
            const data = await res.json();
            if (data.success) {
                sessionStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard', { replace: true });
            } else setError(data.message || 'Invalid OTP');
        } catch { setError('Server error. Try again.'); }
        finally { setLoading(false); }
    };

    const handleKey = (e, action) => { if (e.key === 'Enter') action(); };

    return (
        <div id="adminLogin">
            <div className="al-grid" />

            <div className="admin-card">
                <div className="admin-logo">
                    <div className="al-icon-wrap"><img src={logo} alt="Logo" /></div>
                    <h1>Admin <em>Panel</em></h1>
                    <p>Portfolio Builder · Restricted Access</p>
                </div>

                <div className="al-divider" />

                {step === 'credentials' ? (
                    <div className="admin-form">
                        <div className="admin-field">
                            <label>Admin Email</label>
                            <input
                                id="adminEmail"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => handleKey(e, handleCredentials)}
                                placeholder="admin@portfoliobuilder.com"
                                autoComplete="off"
                            />
                        </div>

                        <div className="admin-field">
                            <label>Password</label>
                            <div className="pass-wrap">
                                <input
                                    id="adminPassword"
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPass(e.target.value)}
                                    onKeyDown={e => handleKey(e, handleCredentials)}
                                    placeholder="••••••••••••"
                                    style={{ paddingRight: '52px' }}
                                />
                                <button
                                    type="button"
                                    className="pass-toggle"
                                    onClick={() => setShowPass(p => !p)}
                                    tabIndex={-1}
                                    aria-label={showPass ? 'Hide password' : 'Show password'}
                                >
                                    <img src={showPass ? hidePass : watchPass} alt={showPass ? 'Hide' : 'Show'} />
                                </button>
                            </div>
                        </div>

                        {error && <div className="admin-error">⚠ {error}</div>}

                        <button
                            id="adminLoginBtn"
                            className="admin-btn"
                            onClick={handleCredentials}
                            disabled={loading}
                        >
                            {loading ? 'Verifying…' : 'Continue →'}
                        </button>
                    </div>

                ) : (
                    <div className="admin-form">
                        <div className="admin-otp-info">
                            <span>📧</span>
                            <p>A verification code was sent to your admin email.</p>
                        </div>

                        <div className="admin-field">
                            <label>Verification Code</label>
                            <input
                                id="adminOtp"
                                type="text"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                                onKeyDown={e => handleKey(e, handleOTP)}
                                placeholder="6-digit code"
                                maxLength={6}
                                autoFocus
                            />
                        </div>

                        {error && <div className="admin-error">⚠ {error}</div>}

                        <button
                            id="adminVerifyBtn"
                            className="admin-btn"
                            onClick={handleOTP}
                            disabled={loading}
                        >
                            {loading ? 'Verifying…' : 'Verify & Enter →'}
                        </button>

                        <button
                            className="admin-back"
                            onClick={() => { setStep('credentials'); setError(''); setOtp(''); }}
                        >
                            ← Back to credentials
                        </button>
                    </div>
                )}

                <div className="admin-warning">
                    ⚠ Unauthorised access is strictly prohibited
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
