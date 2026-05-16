import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyles/adminPanel.css';

const API = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";

function AdminLogin() {
    const [step, setStep]       = useState('credentials');
    const [email, setEmail]     = useState('');
    const [password, setPass]   = useState('');
    const [otp, setOtp]         = useState('');
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('adminToken')) navigate('/admin/dashboard', { replace: true });
    }, []);

    const handleCredentials = async () => {
        if (!email || !password) return setError('All fields are required');
        setError(''); setLoading(true);
        try {
            const res  = await fetch(`${API}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) { setStep('otp'); }
            else setError(data.message || 'Invalid credentials');
        } catch { setError('Server error. Try again.'); }
        finally { setLoading(false); }
    };

    const handleOTP = async () => {
        if (!otp) return setError('Enter the verification code');
        setError(''); setLoading(true);
        try {
            const res  = await fetch(`${API}/api/admin/verify-otp`, {
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
            <div className="admin-card">

                <div className="admin-logo">
                    <span>⚙️</span>
                    <h1>Admin <em>Panel</em></h1>
                    <p>Portfolio Builder — Restricted Access</p>
                </div>

                {step === 'credentials' ? (
                    <div className="admin-form">
                        <div className="admin-field">
                            <label>Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => handleKey(e, handleCredentials)}
                                placeholder="admin@example.com"
                                autoComplete="off"
                            />
                        </div>
                        <div className="admin-field">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPass(e.target.value)}
                                onKeyDown={e => handleKey(e, handleCredentials)}
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <div className="admin-error">⚠ {error}</div>}
                        <button className="admin-btn" onClick={handleCredentials} disabled={loading}>
                            {loading ? 'Verifying...' : 'Continue →'}
                        </button>
                    </div>

                ) : (
                    <div className="admin-form">
                        <div className="admin-otp-info">
                            <span>📧</span>
                            <p>Check your email for the verification code</p>
                        </div>
                        <div className="admin-field">
                            <label>Verification Code</label>
                            <input
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
                        <button className="admin-btn" onClick={handleOTP} disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify & Enter →'}
                        </button>
                        <button className="admin-back" onClick={() => { setStep('credentials'); setError(''); otp && setOtp(''); }}>
                            ← Back
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
