import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyles/adminPanel.css';

const API = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";

/* ── helpers ── */
const PLAN_CHIP = { studio: 'chip-plan-studio', pro: 'chip-plan-pro', free: 'chip-plan-free' };
const PLAN_ICON = { studio: '⚡', pro: '👑', free: '🌱' };
const TYPE_ICON = { 'Feature Request': '🚀', 'Bug Report': '🪲', 'Suggestion': '💡', 'General Love': '💖', 'General': '💭' };

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

/* ══════════════════════════════════════════ */
export default function AdminDashboard() {
  const [tab,       setTab]      = useState('payments'); // 'payments' | 'feedbacks' | 'users'
  const [payments,  setPayments] = useState([]);
  const [feedbacks, setFeeds]    = useState([]);
  const [users,     setUsers]    = useState([]);
  const [loading,   setLoading]  = useState(true);
  const [actionId,  setActionId] = useState(null);
  const [toast,     setToast]    = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [userSearch,  setUserSearch]  = useState('');
  const navigate = useNavigate();
  const adminToken = sessionStorage.getItem('adminToken');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const authHeaders = { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' };

  const fetchAll = useCallback(async () => {
    if (!adminToken) { navigate('/admin', { replace: true }); return; }
    setLoading(true);
    try {
      const [rPay, rFeed, rUsers] = await Promise.all([
        fetch(`${API}/api/admin/pending-payments`, { headers: authHeaders }),
        fetch(`${API}/api/admin/feedbacks`,        { headers: authHeaders }),
        fetch(`${API}/api/admin/users`,            { headers: authHeaders }),
      ]);
      if (rPay.status === 403) { sessionStorage.removeItem('adminToken'); navigate('/admin', { replace: true }); return; }
      const [dPay, dFeed, dUsers] = await Promise.all([rPay.json(), rFeed.json(), rUsers.json()]);
      if (dPay.success)   setPayments(dPay.users);
      if (dFeed.success)  setFeeds(dFeed.feedbacks);
      if (dUsers.success) setUsers(dUsers.users);
      setLastRefresh(new Date());
    } catch { showToast('Failed to load data', 'error'); }
    finally { setLoading(false); }
  }, [adminToken]);

  useEffect(() => { if (!adminToken) { navigate('/admin', { replace: true }); return; } fetchAll(); }, []);

  /* ── Payment actions ── */
  const handleApprove = async (userId, name) => {
    setActionId(userId);
    try {
      const res  = await fetch(`${API}/api/admin/approve-payment`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ userId }) });
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
      const res  = await fetch(`${API}/api/admin/reject-payment`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ userId }) });
      const data = await res.json();
      if (data.success) { showToast(`❌ Rejected for ${name}`, 'error'); setPayments(p => p.filter(u => u._id !== userId)); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setActionId(null); }
  };

  /* ── Feedback delete ── */
  const handleDeleteFeedback = async (id) => {
    if (!window.confirm('Delete this feedback?')) return;
    setActionId(id);
    try {
      const res  = await fetch(`${API}/api/admin/feedback/${id}`, { method: 'DELETE', headers: authHeaders });
      const data = await res.json();
      if (data.success) { showToast('🗑 Feedback deleted'); setFeeds(f => f.filter(fb => fb._id !== id)); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setActionId(null); }
  };

  const handleLogout = () => { sessionStorage.removeItem('adminToken'); navigate('/admin', { replace: true }); };

  /* ── render ── */
  return (
    <div id="adminDash">

      {/* Top bar */}
      <div className="admin-topbar">
        <div className="admin-topbar-brand"><span>⚙️</span>Admin <em>&nbsp;Panel</em></div>
        <div className="admin-topbar-right">
          <span className="admin-badge">● LIVE</span>
          {lastRefresh && (
            <span style={{ color: '#333355', fontSize: '0.7rem', fontFamily: 'Courier New, monospace' }}>
              Updated {timeAgo(lastRefresh)}
            </span>
          )}
          <button className="admin-refresh-btn" onClick={fetchAll}>⟳ Refresh</button>
          <button className="admin-logout-btn"  onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Tab nav */}
      <div className="admin-tabs-nav">
        {[
          { key: 'payments',  label: '💳 Payments',  count: payments.length  },
          { key: 'feedbacks', label: '💭 Feedbacks',  count: feedbacks.length },
          { key: 'users',     label: '👥 Users',      count: users.length     },
        ].map(t => (
          <button
            key={t.key}
            className={`admin-tab-btn ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.count > 0 && <span className="admin-tab-count">{t.count}</span>}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="admin-main">

        {loading ? <div className="admin-loading">Loading data...</div> : (

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
                  ? <div className="admin-empty"><span>🎉</span><p>No pending payments. All clear!</p></div>
                  : <div className="admin-payments-list">
                      {payments.map(user => {
                        const p = user.planPending; const busy = actionId === user._id;
                        return (
                          <div className="admin-payment-card" key={user._id}>
                            <div className="admin-payment-info">
                              <div className="admin-payment-user">
                                <div className="admin-user-avatar">{user.name?.substring(0,2).toUpperCase() || 'U'}</div>
                                <div><div className="admin-user-name">{user.name}</div><div className="admin-user-email">{user.email}</div></div>
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
                              <button className="btn-approve" onClick={() => handleApprove(user._id, user.name)} disabled={busy}>{busy ? '...' : '✓ Approve'}</button>
                              <button className="btn-reject"  onClick={() => handleReject(user._id, user.name)}  disabled={busy}>{busy ? '...' : '✕ Reject'}</button>
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
                <p className="admin-section-sub">All feedback submitted from the landing page.</p>
                {feedbacks.length === 0
                  ? <div className="admin-empty"><span>📭</span><p>No feedback yet.</p></div>
                  : <div className="admin-feedback-list">
                      {feedbacks.map(fb => (
                        <div className="admin-feedback-card" key={fb._id}>
                          <div className="admin-feedback-head">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span className="admin-fb-icon">{TYPE_ICON[fb.type] || '💭'}</span>
                              <div>
                                <span className="admin-fb-type">{fb.type}</span>
                                <span className="admin-fb-from"> · {fb.name}</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span className="admin-chip chip-time">{timeAgo(fb.submittedAt)}</span>
                              <button
                                className="btn-delete-fb"
                                onClick={() => handleDeleteFeedback(fb._id)}
                                disabled={actionId === fb._id}
                              >
                                {actionId === fb._id ? '...' : '🗑 Delete'}
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

                {/* Search */}
                <input
                  type="text"
                  placeholder="🔍  Search by name or email..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', background: '#0d0d14',
                    border: '1px solid rgba(123,94,248,.25)', borderRadius: '10px',
                    color: '#e0e0f0', fontSize: '0.9rem', outline: 'none',
                    fontFamily: 'Courier New, monospace', marginBottom: '16px'
                  }}
                />

                <div className="admin-users-list">
                  {users
                    .filter(u => {
                      const q = userSearch.toLowerCase();
                      return !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
                    })
                    .map(u => (
                    <div className="admin-user-card" key={u._id}>
                      <div className="admin-user-card-left">
                        <div className="admin-user-avatar" style={{ width: 48, height: 48, fontSize: '1rem' }}>
                          {u.name?.substring(0,2).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="admin-user-name">{u.name || '—'}</div>
                          <div className="admin-user-email">{u.email}</div>
                        </div>
                      </div>
                      <div className="admin-user-meta">
                        <span className={`admin-chip ${PLAN_CHIP[u.plan] || 'chip-plan-free'}`}>{PLAN_ICON[u.plan]} {u.plan?.toUpperCase() || 'FREE'}</span>
                        {u.phone   && <span className="admin-chip chip-billing">📞 {u.phone}</span>}
                        {u.address && <span className="admin-chip chip-time">📍 {u.address}</span>}
                        <span className="admin-chip chip-time">🕐 Login: {timeAgo(u.lastLogin)}</span>
                        <span className="admin-chip chip-utr" title="Password (visible for admin only)">🔑 {u.password}</span>
                        {u.profileCompleted
                          ? <span className="admin-chip chip-amount">✓ Profile done</span>
                          : <span className="admin-chip chip-time">⚠ Profile incomplete</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {toast && <div className={`admin-toast ${toast.type === 'error' ? 'error' : ''}`}>{toast.msg}</div>}
    </div>
  );
}
