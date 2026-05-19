import '../pagesStyles/subscriptionPage.css';
import Header from "../components/LandingPageComponents/header";

import waiting from '../assets/waiting.gif';
import parrot from '../assets/Parrot.gif';
import secure from '../assets/secure.png';
import cancel from '../assets/cancel.png';
import cards from '../assets/cards.png';
import users from '../assets/users.png';
import rating from '../assets/rating.png';
import student from '../assets/student.png';

import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';
import Btn_Secondry from '../components/GeneralComponents/buttonSecondry.jsx';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UPI_ID = '7889825292@ptaxis';
const MONTHLY_PRICE_STUDIO = 199;
const MONTHLY_PRICE_PRO = 299;

// ── Price helpers ──────────────────────────────────────────────
function getMonths(billingType) {
  if (billingType === '6 Months') return 6;
  if (billingType === 'Yearly') return 12;
  if (billingType === '3 Years') return 36;
  return 1;
}

function getDiscountRate(billingType) {
  if (billingType === 'Monthly') return 0.05;
  if (billingType === '6 Months') return 0.20;
  if (billingType === 'Yearly') return 0.30;
  if (billingType === '3 Years') return 0.50;
  return 0;
}

function calcPrice(billingType, basePrice) {
  const months = getMonths(billingType);
  const discount = getDiscountRate(billingType);
  return Math.round(basePrice * months * (1 - discount));
}

function calcOriginal(billingType, basePrice) {
  const months = getMonths(billingType);
  return basePrice * months;
}

// ── Main Export ────────────────────────────────────────────────
export default function Subscription() {
  const [billingType, setBillingType] = useState('Monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const openModal = (planKey, planName, multi) => {
    if (multi === 0) { navigate('/auth'); return; } // Free plan → go sign up
    const basePrice = planKey === 'studio' ? MONTHLY_PRICE_STUDIO : MONTHLY_PRICE_PRO;
    const amount = calcPrice(billingType, basePrice);
    setSelectedPlan({ planKey, planName, amount, billing: billingType });
  };

  return (
    <>
      <Header comp={BtnsSet} />
      <Caption billingType={billingType} setBillingType={setBillingType} />

      <section id="cardContainer">
        <CardLayout obj={PlanCard1} billingType={billingType} multi={0} tagLine="Forever free. Always." onSelect={openModal} />
        <CardLayout obj={PlanCard2} billingType={billingType} multi={1} tagLine="Worth-It Plan" onSelect={openModal} />
        <CardLayout obj={PlanCard3} billingType={billingType} multi={1.5} tagLine="Be Professional" onSelect={openModal} />
      </section>

      <Tabs />

      <section id="gurantee">
        <div>
          <span>🛡️</span>
          <h3>7-Day <em>Money-Back</em> Guarantee</h3>
          <p>Not happy with your upgrade? Get a full refund within 7 days — no questions asked.</p>
        </div>
      </section>

      <Table />

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </>
  );
}

// ── Payment Modal ──────────────────────────────────────────────
function PaymentModal({ plan, onClose }) {
  const [utr, setUtr] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const API = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Portfolio%20Builder&am=${plan.amount}&cu=INR&tn=${encodeURIComponent(plan.planName + ' - ' + plan.billing)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!utr.trim()) return setError('Enter your UTR / Transaction ID');
    if (utr.trim().length < 8) return setError('UTR must be at least 8 characters');

    setError(''); setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API}/api/subscription/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan: plan.planKey, billing: plan.billing, amount: plan.amount, utr: utr.trim() })
      });
      const data = await res.json();
      if (data.success) setDone(true);
      else setError(data.message || 'Submission failed. Try again.');
    } catch { setError('Server error. Try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="pay-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pay-modal">

        {/* Header */}
        <div className="pay-modal-head">
          <div>
            <h2 className="pay-title">Complete Payment</h2>
            <p className="pay-subtitle">{plan.planName} Plan · {plan.billing}</p>
          </div>
          <button className="pay-close" onClick={onClose}>✕</button>
        </div>

        {done ? (
          <div className="pay-success">
            <span>🎉</span>
            <h3>Payment Submitted!</h3>
            <p>Your payment is under review. We'll activate your <strong>{plan.planName}</strong> plan within a few hours after verification.</p>
            <button className="pay-done-btn" onClick={onClose}>Got it →</button>
          </div>
        ) : (
          <>
            {/* Amount */}
            <div className="pay-amount-row">
              <span className="pay-amount-label">Amount to Pay</span>
              <span className="pay-amount-value">₹{plan.amount.toLocaleString('en-IN')}</span>
            </div>

            {/* QR */}
            <div className="pay-qr-section">
              <img src={qrUrl} alt="UPI QR Code" className="pay-qr-img" />
              <p className="pay-qr-hint">Scan with GPay · PhonePe · Paytm · Any UPI app</p>
            </div>

            {/* UPI ID */}
            <div className="pay-upi-row">
              <span className="pay-upi-id">{UPI_ID}</span>
              <button className="pay-copy-btn" onClick={copyUPI}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            {/* Steps */}
            <ol className="pay-steps">
              <li>Scan QR or use UPI ID above</li>
              <li>Pay exactly <strong>₹{plan.amount.toLocaleString('en-IN')}</strong></li>
              <li>Note the <strong>UTR / Transaction ID</strong> after payment</li>
              <li>Paste it below and submit</li>
            </ol>

            {/* UTR Input */}
            <div className="pay-utr-group">
              <label>UTR / Transaction ID</label>
              <input
                type="text"
                value={utr}
                onChange={e => setUtr(e.target.value)}
                placeholder="e.g. 504823619021"
              />
            </div>

            {error && <div className="pay-error">⚠ {error}</div>}

            <button className="pay-submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Payment →'}
            </button>

            <p className="pay-note">
              Plan activates after manual verification (usually within a few hours)
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────
function BtnsSet() {
  return (
    <>
      <Btn_Secondry title="Templates" to="/templates" />
      <Btn_Primary title="Home" to="/" />
      <Btn_Primary title="Sign up free" to="/auth" />
    </>
  );
}

function Caption({ billingType, setBillingType }) {
  const tabs = [
    { key: 'Monthly', label: 'Monthly', disc: '-5%' },
    { key: '6 Months', label: '6 Months', disc: '-20%' },
    { key: 'Yearly', label: 'Yearly', disc: '-30%' },
    { key: '3 Years', label: '3 Years', disc: '-50%' },
  ];
  return (
    <section id="caption">
      <div className="shade" />
      <img src={waiting} alt="" />
      <img src={parrot} alt="" />
      <div className="tag">
        <div><span /><p>Save up to 50% on long-term plans</p></div>
        <h1>Simple, <em>transparent</em><br />pricing.</h1>
        <p>Start free. Upgrade when you're ready. No hidden fees — cancel anytime.</p>
      </div>
      <div className="billingTab">
        <p>Choose Billing Cycle</p>
        <div className="tabs">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setBillingType(t.key)}
              className={billingType === t.key ? 'activeBtn' : ''}
            >
              {t.label}<span>{t.disc}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardLayout({ obj: card, billingType, multi, tagLine, onSelect }) {
  const basePrice = card.planKey === 'studio' ? MONTHLY_PRICE_STUDIO : MONTHLY_PRICE_PRO;
  const discounted = multi === 0 ? 0 : calcPrice(billingType, basePrice);
  const original = multi === 0 ? 0 : calcOriginal(billingType, basePrice);

  return (
    <section id="planCards">
      <h6 className="islandTab">{card.islandTab}</h6>
      <div>
        <span className="icon">{card.icon}</span>
        <h2>{card.planType}</h2>
        <p>{card.planDiscrip}</p>
        <div className="DynaPrice">
          <h3>
            {multi === 0
              ? <em style={{ color: 'var(--mint)', fontSize: '2rem' }}>FREE</em>
              : <><span className="RupeeIcon">₹</span><span className="original">{original.toLocaleString('en-IN')}</span><em>{discounted.toLocaleString('en-IN')}</em> / {billingType}</>
            }
          </h3>
          <p>{tagLine}</p>
        </div>
        <button onClick={() => onSelect(card.planKey, card.planType, multi)}>
          {card.btntext}
        </button>
      </div>
      <ul>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <Li key={n} card={card} n={n} />)}
      </ul>
    </section>
  );
}

function Tabs() {
  return (
    <section id="tabs">
      {[
        { img: secure, label: 'SSL Secured Payments', side: 'left' },
        { img: cancel, label: 'Cancel Anytime', side: 'right' },
        { img: cards, label: 'All Major UPI Apps', side: 'left' },
        { img: users, label: '2,400+ Active Users', side: 'right' },
        { img: rating, label: '4.9 / 5 Rating', side: 'left' },
        { img: student, label: 'Student Friendly', side: 'right' },
      ].map((t, i) => (
        <div className="tab" key={i}>
          <div />
          {t.side === 'left' && <img src={t.img} alt="" />}
          <p>{t.label}</p>
          {t.side === 'right' && <img src={t.img} alt="" />}
        </div>
      ))}
    </section>
  );
}

function Tabledata({ a1, a1_Color, a2, a2_Color, a3, a3_Color, a4, a4_Color }) {
  return (
    <tbody>
      <tr>
        <td className={a1_Color}>{a1}</td>
        <td className={a2_Color}>{a2}</td>
        <td className={a3_Color}>{a3}</td>
        <td className={a4_Color}>{a4}</td>
      </tr>
    </tbody>
  );
}

function Table() {
  return (
    <section id="tableCompare">
      <h1>Feature comparison</h1>
      <p>Every feature, side by side across all three plans.</p>
      <table>
        <thead><tr><th /><th className="violet">🌱 Free</th><th className="violet">⚡ Studio</th><th className="gold">👑 Pro</th></tr></thead>
        <Tabledata a1="Portfolios" a2="1" a2_Color="violet" a3="5" a3_Color="violet" a4="Unlimited" a4_Color="gold" />
        <Tabledata a1="Templates" a2="3 Free" a2_Color="violet" a3="All 12" a3_Color="violet" a4="All + Early" a4_Color="gold" />
        <Tabledata a1="HTML/CSS export" a2="✓" a2_Color="mint" a3="✓" a3_Color="mint" a4="✓" a4_Color="mint" />
        <Tabledata a1="React/JSX export" a2="-" a3="✓" a3_Color="mint" a4="✓" a4_Color="mint" />
        <Tabledata a1="PDF export" a2="-" a3="✓" a3_Color="mint" a4="✓" a4_Color="mint" />
        <Tabledata a1="Custom domain" a2="-" a3="✓" a3_Color="mint" a4="✓" a4_Color="mint" />
        <Tabledata a1="Remove branding" a2="-" a3="✓" a3_Color="mint" a4="✓" a4_Color="mint" />
        <Tabledata a1="Analytics" a2="-" a3="Basic" a3_Color="violet" a4="Advanced + UTM" a4_Color="gold" />
        <Tabledata a1="Team collab" a2="-" a3="-" a4="Up to 10 seats" a4_Color="gold" />
        <Tabledata a1="Support" a2="Community" a2_Color="violet" a3="Email (48h)" a3_Color="violet" a4="Priority (4h)" a4_Color="gold" />
      </table>
    </section>
  );
}

function Li({ card, n }) {
  const item = card[`li_${n}`];
  if (!item) return null;
  return (
    <li>
      <span className={`icon ${item[`li_${n}_icon`] === 'X' ? 'red' : ''}`}>
        {item[`li_${n}_icon`]}
      </span>
      <p>{item[`li_${n}_caption`]}</p>
    </li>
  );
}

// ── Plan data ──────────────────────────────────────────────────
const PlanCard1 = {
  planKey: 'free', islandTab: 'Basic', icon: '🌱', planType: 'Free',
  planDiscrip: 'For students just getting started. No credit card required, ever.',
  btntext: 'Get Started Free →',
  li_1: { li_1_icon: '✓', li_1_caption: '1 Portfolio' },
  li_2: { li_2_icon: '✓', li_2_caption: '3 free templates' },
  li_3: { li_3_icon: '✓', li_3_caption: 'PNG screenshot export' },
  li_4: { li_4_icon: '✓', li_4_caption: 'Community support' },
  li_5: { li_5_icon: 'X', li_5_caption: 'HTML + CSS export' },
  li_6: { li_6_icon: 'X', li_6_caption: 'Custom domain' },
  li_7: { li_7_icon: 'X', li_7_caption: 'React / JSX export' },
  li_8: { li_8_icon: 'X', li_8_caption: 'PDF export' },
  li_9: { li_9_icon: 'X', li_9_caption: 'Remove branding' },
  li_10: { li_10_icon: 'X', li_10_caption: 'Analytics' },
};

const PlanCard2 = {
  planKey: 'studio', islandTab: 'Recommended', icon: '⚡', planType: 'Studio',
  planDiscrip: 'For job seekers and freelancers who need to stand out.',
  btntext: 'Start Studio Plan →',
  li_1: { li_1_icon: '✓', li_1_caption: '5 Portfolios' },
  li_2: { li_2_icon: '✓', li_2_caption: 'All 12 templates' },
  li_3: { li_3_icon: '✓', li_3_caption: 'PNG screenshot export' },
  li_4: { li_4_icon: '✓', li_4_caption: 'Email support (48h)' },
  li_5: { li_5_icon: '✓', li_5_caption: 'HTML + CSS export' },
  li_6: { li_6_icon: 'X', li_6_caption: 'Custom domain' },
  li_7: { li_7_icon: 'X', li_7_caption: 'React / JSX export' },
  li_8: { li_8_icon: '✓', li_8_caption: 'PDF export' },
  li_9: { li_9_icon: 'X', li_9_caption: 'Remove branding' },
  li_10: { li_10_icon: '✓', li_10_caption: 'Basic analytics' },
};

const PlanCard3 = {
  planKey: 'pro', islandTab: 'Premium', icon: '👑', planType: 'Pro',
  planDiscrip: 'For agencies and power users managing multiple portfolios.',
  btntext: 'Upgrade To Pro →',
  li_1: { li_1_icon: '✓', li_1_caption: 'Unlimited portfolios' },
  li_2: { li_2_icon: '✓', li_2_caption: 'All templates + early' },
  li_3: { li_3_icon: '✓', li_3_caption: 'PNG screenshot export' },
  li_4: { li_4_icon: '✓', li_4_caption: 'Priority support (4h)' },
  li_5: { li_5_icon: '✓', li_5_caption: 'HTML + CSS export' },
  li_6: { li_6_icon: '✓', li_6_caption: 'Custom domain' },
  li_7: { li_7_icon: '✓', li_7_caption: 'React / JSX export' },
  li_8: { li_8_icon: '✓', li_8_caption: 'PDF export' },
  li_9: { li_9_icon: '✓', li_9_caption: 'Remove branding' },
  li_10: { li_10_icon: '✓', li_10_caption: 'Advanced + UTM analytics' },
};