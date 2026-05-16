import { useState } from 'react';

const TYPE_MAP = {
  0: 'Feature Request',
  1: 'Bug Report',
  2: 'Suggestion',
  3: 'General Love'
};

const API = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";

export default function Feedback() {
  const [cardActive, setCardActive] = useState(null);
  const [message,    setMessage]    = useState('');
  const [name,       setName]       = useState('');
  const [loading,    setLoading]    = useState(false);
  const [status,     setStatus]     = useState(null); // 'success' | 'error' | null
  const [errMsg,     setErrMsg]     = useState('');

  const handleSubmit = async () => {
    if (!message.trim()) { setErrMsg('Please write something before submitting.'); setStatus('error'); return; }
    if (message.trim().length < 5) { setErrMsg('Message is too short.'); setStatus('error'); return; }

    setLoading(true); setStatus(null); setErrMsg('');
    try {
      const res  = await fetch(`${API}/api/feedback`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          type:    cardActive !== null ? TYPE_MAP[cardActive] : 'General',
          message: message.trim(),
          name:    name.trim() || 'Anonymous'
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage('');
        setName('');
        setCardActive(null);
      } else {
        setErrMsg(data.message || 'Submission failed.');
        setStatus('error');
      }
    } catch {
      setErrMsg('Server error. Please try again.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='Feedback'>
      <p>Your feedback shapes Portfolio Builder. Tell us what you think — we read every submission.</p>

      <div className="FeedbackType">
        {[
          { icon: '🚀', label: 'Feature Request' },
          { icon: '🪲', label: 'Bug Report'      },
          { icon: '💡', label: 'Suggestion'      },
          { icon: '💖', label: 'General Love'    },
        ].map((item, i) => (
          <div
            key={i}
            className={`FeedCard ${cardActive === i ? 'active' : ''}`}
            onClick={() => setCardActive(cardActive === i ? null : i)}
          >
            <span>{item.icon}</span>
            <h3>{item.label}</h3>
          </div>
        ))}
      </div>

      {/* Optional name */}
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: '10px',
          border: '1px solid var(--border)', background: 'var(--surface2)',
          color: 'var(--text-2)', fontSize: '0.95rem', outline: 'none',
          marginBottom: '8px'
        }}
      />

      <p>Your Feedback</p>

      <textarea
        id="feedbackBox"
        placeholder="Share your thoughts — Every word matters..."
        value={message}
        onChange={e => { setMessage(e.target.value); setStatus(null); }}
      />

      {/* Status messages */}
      {status === 'success' && (
        <div style={{ background: 'rgba(46,223,163,.1)', border: '1px solid rgba(46,223,163,.3)', color: 'var(--mint)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center' }}>
          ✅ Thank you! Your feedback has been submitted.
        </div>
      )}
      {status === 'error' && (
        <div style={{ background: 'rgba(255,92,108,.1)', border: '1px solid rgba(255,92,108,.3)', color: 'var(--coral)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center' }}>
          ⚠ {errMsg}
        </div>
      )}

      <div className="submitFeed">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback →'}
        </button>
        <p>Anonymous submissions welcome</p>
      </div>
    </section>
  );
}
