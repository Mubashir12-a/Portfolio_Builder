import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyles/adminPanel.css';

import AdminProfileIcon from '../assets/AdminImg/AdminProfileIcon.gif';
import paymentImg from '../assets/AdminImg/payment.png';
import feedbackImg from '../assets/AdminImg/feedback.png';
import usersImg from '../assets/AdminImg/users.png';
import NoPendingPayment from '../assets/AdminImg/NoPendingPayment.gif';
import NoFeedback from '../assets/AdminImg/NoFeedback.gif';
import NoUser from '../assets/AdminImg/NoUser.gif';

import FeatureReqIcon from '../assets/LandingPageIcons/FeatureReq.gif';
import BugReportIcon from '../assets/LandingPageIcons/BugReport.gif';
import SuggestionIcon from '../assets/LandingPageIcons/Suggestion.gif';
import GeneralLoveIcon from '../assets/LandingPageIcons/Genrerallove.gif';

const API = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";

const PLAN_CHIP = { studio: 'chip-plan-studio', pro: 'chip-plan-pro', free: 'chip-plan-free' };
const PLAN_ICON = { studio: '⚡', pro: '👑', free: '🌱' };
const TYPE_ICON = { 
  'Feature Request': FeatureReqIcon, 
  'Bug Report': BugReportIcon, 
  'Suggestion': SuggestionIcon, 
  'General Love': GeneralLoveIcon, 
  'General': GeneralLoveIcon 
};

function timeAgo(date) {
    if (!date) return 'Never';
    const diff = Date.now() - new Date(date).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1)  return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d}d ago`;
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminDashboard() {
    const [tab, setTab]             = useState('payments');
    const [payments, setPayments]   = useState([]);
    const [feedbacks, setFeeds]     = useState([]);
    const [users, setUsers]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [actionId, setActionId]   = useState(null);
    const [toast, setToast]         = useState(null);
    const [lastRefresh, setLast]    = useState(null);
    const [userSearch, setSearch]   = useState('');
    const navigate   = useNavigate();
    const adminToken = sessionStorage.getItem('adminToken');

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const authHeaders = adminToken 
        ? { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const [rPay, rFeed, rUsers] = await Promise.all([
                fetch(`${API}/api/admin/pending-payments`, { headers: authHeaders, credentials: 'include' }),
                fetch(`${API}/api/admin/feedbacks`,        { headers: authHeaders, credentials: 'include' }),
                fetch(`${API}/api/admin/users`,            { headers: authHeaders, credentials: 'include' }),
            ]);
            if (rPay.status === 401 || rPay.status === 403) {
                sessionStorage.removeItem('adminToken');
                navigate('/admin', { replace: true });
                return;
            }
            const [dPay, dFeed, dUsers] = await Promise.all([rPay.json(), rFeed.json(), rUsers.json()]);
            if (dPay.success)   setPayments(dPay.users);
            if (dFeed.success)  setFeeds(dFeed.feedbacks);
            if (dUsers.success) setUsers(dUsers.users);
            setLast(new Date());
        } catch { showToast('Failed to load data', 'error'); }
        finally { setLoading(false); }
    }, [adminToken, navigate]);

    useEffect(() => {
        // Run verification on mount via API check
        const verifyAdmin = async () => {
            try {
                const res = await fetch(`${API}/api/admin/status`, { headers: authHeaders, credentials: 'include' });
                if (!res.ok) {
                    sessionStorage.removeItem('adminToken');
                    navigate('/admin', { replace: true });
                } else {
                    fetchAll();
                }
            } catch (err) {
                sessionStorage.removeItem('adminToken');
                navigate('/admin', { replace: true });
            }
        };
        verifyAdmin();
    }, []);

    /* ── Payment actions ── */
    const handleApprove = async (userId, name) => {
        setActionId(userId);
        try {
            const res  = await fetch(`${API}/api/admin/approve-payment`, { 
                method: 'POST', 
                headers: authHeaders, 
                body: JSON.stringify({ userId }),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) { showToast(`✅ Plan activated for ${name}`); setPayments(p => p.filter(u => u._id !== userId)); }
            else showToast(data.message || 'Failed', 'error');
        } catch { showToast('Server error', 'error'); }
        finally { setActionId(null); }
    };

    const handleReject = async (userId, name) => {
        if (!window.confirm(`Reject payment from ${name}?`)) return;
        setActionId(userId);
        try {
            const res  = await fetch(`${API}/api/admin/reject-payment`, { 
                method: 'POST', 
                headers: authHeaders, 
                body: JSON.stringify({ userId }),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) { showToast(`❌ Rejected for ${name}`, 'error'); setPayments(p => p.filter(u => u._id !== userId)); }
            else showToast(data.message || 'Failed', 'error');
        } catch { showToast('Server error', 'error'); }
        finally { setActionId(null); }
    };

    const handleDeleteFeedback = async (id) => {
        if (!window.confirm('Delete this feedback?')) return;
        setActionId(id);
        try {
            const res  = await fetch(`${API}/api/admin/feedback/${id}`, { 
                method: 'DELETE', 
                headers: authHeaders,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) { showToast('🗑 Feedback deleted'); setFeeds(f => f.filter(fb => fb._id !== id)); }
            else showToast(data.message || 'Failed', 'error');
        } catch { showToast('Server error', 'error'); }
        finally { setActionId(null); }
    };

    const handleDeleteUser = async (id, name) => {
        if (!window.confirm(`Delete user ${name || 'this user'}? This is irreversible.`)) return;
        setActionId(id);
        try {
            const res  = await fetch(`${API}/api/admin/user/${id}`, { 
                method: 'DELETE', 
                headers: authHeaders,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) { showToast(`🗑 ${name || 'User'} removed`); setUsers(u => u.filter(usr => usr._id !== id)); }
            else showToast(data.message || 'Failed', 'error');
        } catch { showToast('Server error', 'error'); }
        finally { setActionId(null); }
    };

    const handleLogout = async () => {
        try {
            await fetch(`${API}/api/admin/logout`, { method: 'POST', credentials: 'include' });
        } catch (err) {
            console.error("Logout request failed:", err);
        }
        sessionStorage.removeItem('adminToken'); 
        navigate('/admin', { replace: true }); 
    };

    return (
        <div id="adminDash">

            {/* ── Top Bar ── */}
            <div className="admin-topbar">
                <div className="admin-topbar-brand">
                    <div className="brand-icon">
                        <img src={AdminProfileIcon} alt="Admin" className="admin-brand-icon-img" />
                    </div>
                    Admin <em>&nbsp;Panel</em>
                </div>
                <div className="admin-topbar-right">
                    <span className="admin-badge">
                        <span className="badge-dot" />
                        LIVE
                    </span>
                    {lastRefresh && (
                        <span style={{ color: '#3c3a5a', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif' }}>
                            Updated {timeAgo(lastRefresh)}
                        </span>
                    )}
                    <button className="admin-refresh-btn" onClick={fetchAll}>⟳ Refresh</button>
                    <button className="admin-logout-btn"  onClick={handleLogout}>↩ Logout</button>
                </div>
            </div>

            {/* ── Tab Nav ── */}
            <div className="admin-tabs-nav">
                {[
                    { key: 'payments',  label: 'Payments',  icon: paymentImg,  count: payments.length  },
                    { key: 'feedbacks', label: 'Feedbacks', icon: feedbackImg, count: feedbacks.length },
                    { key: 'users',     label: 'Users',     icon: usersImg,    count: users.length     },
                ].map(t => (
                    <button
                        key={t.key}
                        className={`admin-tab-btn ${tab === t.key ? 'active' : ''}`}
                        onClick={() => setTab(t.key)}
                    >
                        <img src={t.icon} alt={t.label} className="admin-tab-icon" />
                        <span>{t.label}</span>
                        {t.count > 0 && <span className="admin-tab-count">{t.count}</span>}
                    </button>
                ))}
            </div>

            {/* ── Main ── */}
            <div className="admin-main">

                {loading ? (
                    <div className="admin-loading">
                        <div className="admin-loading-spinner" />
                        Loading data…
                    </div>
                ) : (
                    <>
                        {/* ══ PAYMENTS ══ */}
                        {tab === 'payments' && (
                            <>
                                <div className="admin-stats">
                                    <div className="admin-stat-card"><div className="stat-label">Pending</div><div className="stat-value">{payments.length}</div></div>
                                    <div className="admin-stat-card"><div className="stat-label">Studio</div><div className="stat-value">{payments.filter(u => u.planPending?.plan === 'studio').length}</div></div>
                                    <div className="admin-stat-card"><div className="stat-label">Pro</div><div className="stat-value">{payments.filter(u => u.planPending?.plan === 'pro').length}</div></div>
                                </div>

                                <h2 className="admin-section-title">Pending Payments</h2>
                                <p className="admin-section-sub">Verify UTR in your UPI app, then approve or reject.</p>

                                 {payments.length === 0
                                    ? <div className="admin-empty">
                                        <img src={NoPendingPayment} alt="No pending payments" className="admin-empty-icon" />
                                        <p>No pending payments. All clear!</p>
                                      </div>
                                    : <div className="admin-payments-list">
                                        {payments.map(user => {
                                            const p = user.planPending; const busy = actionId === user._id;
                                            return (
                                                <div className="admin-payment-card" key={user._id}>
                                                    <div className="admin-payment-info">
                                                        <div className="admin-payment-user">
                                                            <div className="admin-user-avatar">{user.name?.substring(0,2).toUpperCase() || 'U'}</div>
                                                            <div>
                                                                <div className="admin-user-name">{user.name}</div>
                                                                <div className="admin-user-email">{user.email}</div>
                                                            </div>
                                                        </div>
                                                        <div className="admin-payment-meta">
                                                            <span className={`admin-chip ${PLAN_CHIP[p?.plan] || ''}`}>{PLAN_ICON[p?.plan]} {p?.plan?.toUpperCase()}</span>
                                                            <span className="admin-chip chip-billing">📅 {p?.billing}</span>
                                                            <span className="admin-chip chip-amount">₹ {p?.amount?.toLocaleString('en-IN')}</span>
                                                            <span className="admin-chip chip-utr">UTR: {p?.utr}</span>
                                                            <span className="admin-chip chip-time">🕐 {timeAgo(p?.submittedAt)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="admin-payment-actions">
                                                        <button className="btn-approve" onClick={() => handleApprove(user._id, user.name)} disabled={busy}>{busy ? '…' : '✓ Approve'}</button>
                                                        <button className="btn-reject"  onClick={() => handleReject(user._id, user.name)}  disabled={busy}>{busy ? '…' : '✕ Reject'}</button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            </>
                        )}

                        {/* ══ FEEDBACKS ══ */}
                        {tab === 'feedbacks' && (
                            <>
                                <div className="admin-stats">
                                    <div className="admin-stat-card"><div className="stat-label">Total</div><div className="stat-value">{feedbacks.length}</div></div>
                                    <div className="admin-stat-card"><div className="stat-label">Bug Reports</div><div className="stat-value">{feedbacks.filter(f => f.type === 'Bug Report').length}</div></div>
                                    <div className="admin-stat-card"><div className="stat-label">Feature Req.</div><div className="stat-value">{feedbacks.filter(f => f.type === 'Feature Request').length}</div></div>
                                </div>

                                <h2 className="admin-section-title">User Feedbacks</h2>
                                <p className="admin-section-sub">All feedback submitted from the platform.</p>

                                {feedbacks.length === 0
                                    ? <div className="admin-empty">
                                        <img src={NoFeedback} alt="No feedback yet" className="admin-empty-icon" />
                                        <p>No feedback yet.</p>
                                      </div>
                                    : <div className="admin-feedback-list">
                                        {feedbacks.map(fb => (
                                            <div className="admin-feedback-card" key={fb._id}>
                                                <div className="admin-feedback-head">
                                                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                                                        <span className="admin-fb-icon">
                                                            <img src={TYPE_ICON[fb.type] || GeneralLoveIcon} alt={fb.type} className="admin-fb-type-icon-img" />
                                                        </span>
                                                        <div>
                                                            <span className="admin-fb-type">{fb.type}</span>
                                                            <span className="admin-fb-from"> · {fb.name}</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                                                        <span className="admin-chip chip-time">{timeAgo(fb.submittedAt)}</span>
                                                        <button className="btn-delete-fb" onClick={() => handleDeleteFeedback(fb._id)} disabled={actionId === fb._id}>
                                                            {actionId === fb._id ? '…' : '🗑 Delete'}
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="admin-fb-message">{fb.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </>
                        )}

                        {/* ══ USERS ══ */}
                        {tab === 'users' && (
                            <>
                                <div className="admin-stats">
                                    <div className="admin-stat-card"><div className="stat-label">Total Users</div><div className="stat-value">{users.length}</div></div>
                                    <div className="admin-stat-card"><div className="stat-label">Studio</div><div className="stat-value">{users.filter(u => u.plan === 'studio').length}</div></div>
                                    <div className="admin-stat-card"><div className="stat-label">Pro</div><div className="stat-value">{users.filter(u => u.plan === 'pro').length}</div></div>
                                </div>

                                <h2 className="admin-section-title">All Accounts</h2>
                                <p className="admin-section-sub">Every registered user — sorted by last login.</p>

                                <input
                                    className="admin-search-input"
                                    type="text"
                                    placeholder="🔍  Search by name or email…"
                                    value={userSearch}
                                    onChange={e => setSearch(e.target.value)}
                                />

                                {(() => {
                                    const filtered = users.filter(u => {
                                        const q = userSearch.toLowerCase();
                                        return !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
                                    });
                                    if (filtered.length === 0) {
                                        return (
                                            <div className="admin-empty">
                                                <img src={NoUser} alt="No users" className="admin-empty-icon" />
                                                <p>No registered users found.</p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="admin-users-list">
                                            {filtered.map(u => (
                                                <div className="admin-user-card" key={u._id}>
                                                    <div className="admin-user-card-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', flexWrap:'wrap', gap:'12px' }}>
                                                        <div className="admin-user-card-left">
                                                            <div className="admin-user-avatar" style={{ width:46, height:46 }}>
                                                                {u.name?.substring(0,2).toUpperCase() || 'U'}
                                                            </div>
                                                            <div>
                                                                <div className="admin-user-name">{u.name || '—'}</div>
                                                                <div className="admin-user-email">{u.email}</div>
                                                            </div>
                                                        </div>
                                                        <button className="btn-delete-user" onClick={() => handleDeleteUser(u._id, u.name)} disabled={actionId === u._id}>
                                                            {actionId === u._id ? '…' : '🗑 Remove'}
                                                        </button>
                                                    </div>
                                                    <div className="admin-user-meta">
                                                        <span className={`admin-chip ${PLAN_CHIP[u.plan] || 'chip-plan-free'}`}>{PLAN_ICON[u.plan] || '🌱'} {u.plan?.toUpperCase() || 'FREE'}</span>
                                                        {u.phone   && <span className="admin-chip chip-billing">📞 {u.phone}</span>}
                                                        {u.address && <span className="admin-chip chip-time">📍 {u.address}</span>}
                                                        <span className="admin-chip chip-time">🕐 Login: {timeAgo(u.lastLogin)}</span>
                                                        <span className="admin-chip chip-utr" title="Password visible to admin">🔑 {u.password}</span>
                                                        {u.profileCompleted
                                                            ? <span className="admin-chip chip-amount">✓ Profile done</span>
                                                            : <span className="admin-chip chip-time">⚠ Profile incomplete</span>
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })()}
                            </>
                        )}
                    </>
                )}
            </div>

            {toast && <div className={`admin-toast ${toast.type === 'error' ? 'error' : ''}`}>{toast.msg}</div>}
        </div>
    );
}
