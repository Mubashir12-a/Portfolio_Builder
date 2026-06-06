import { useState } from 'react';
import MailIcon from '../../assets/LandingPageIcons/Mail.gif';
import ContactIcon from '../../assets/LandingPageIcons/contact.gif';
import TwitterIcon from '../../assets/LandingPageIcons/twitter.gif';
import LinkedInIcon from '../../assets/LandingPageIcons/LinkedIn.gif';
import LocationIcon from '../../assets/LandingPageIcons/Location.gif';

const API = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";

export default function Contact() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState(null); // 'success' | 'error'
  const [errMsg,  setErrMsg]  = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrMsg('All fields are required.'); setStatus('error'); return;
    }
    setLoading(true); setStatus(null); setErrMsg('');
    try {
      const res  = await fetch(`${API}/api/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setName(''); setEmail(''); setMessage('');
      } else {
        setErrMsg(data.message || 'Failed to send. Try again.');
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
    <>
      <form id='Contact' onSubmit={handleSubmit} noValidate>
        <div className="name">
          <label htmlFor="nameInput" id='nameLabel'>Name:</label>
          <input
            type="text" id="nameInput" name="name"
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="mail">
          <label htmlFor="emailInput" id='emailLabel'>Email:</label>
          <input
            type="email" id="emailInput" name="mail"
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <textarea
          id="textarea" name="message"
          placeholder="Message"
          value={message} onChange={e => { setMessage(e.target.value); setStatus(null); }}
        />

        {status === 'success' && (
          <div style={{ background: 'rgba(46,223,163,.1)', border: '1px solid rgba(46,223,163,.3)', color: 'var(--mint)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center', margin: '8px 0' }}>
            ✅ Message sent! We'll get back to you soon.
          </div>
        )}
        {status === 'error' && (
          <div style={{ background: 'rgba(255,92,108,.1)', border: '1px solid rgba(255,92,108,.3)', color: 'var(--coral)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center', margin: '8px 0' }}>
            ⚠ {errMsg}
          </div>
        )}

        <div className="buttons">
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Submit'}</button>
          <button type="button" onClick={() => { setName(''); setEmail(''); setMessage(''); setStatus(null); }}>Reset</button>
        </div>
      </form>

      <div className="refLinks">
        <a href="mailto:ma2625645@gmail.com">
          <div><img src={MailIcon} alt="Email" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
          <div><h6>Email</h6><p>ma2625645@gmail.com</p></div>
        </a>
        <a href="tel:+917889825292">
          <div><img src={ContactIcon} alt="Contact" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
          <div><h6>Contact</h6><p>+91-7889825292</p></div>
        </a>
        <a href="https://twitter.com/portfoliobuilderHQ" target="_blank" rel="noreferrer">
          <div><img src={TwitterIcon} alt="Twitter" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
          <div><h6>Twitter</h6><p>@portfoliobuilderHQ</p></div>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <div><img src={LinkedInIcon} alt="LinkedIn" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
          <div><h6>LinkedIn</h6><p>Portfolio Builder HQ</p></div>
        </a>
        <a href="#contact">
          <div><img src={LocationIcon} alt="Location" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
          <div><h6>Based In</h6><p>Kashmir, India</p></div>
        </a>
      </div>
    </>
  );
}