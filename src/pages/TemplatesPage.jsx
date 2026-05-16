import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/LandingPageComponents/header.jsx';
import Footer from '../components/LandingPageComponents/footer.jsx';
import '../pagesStyles/templatesPage.css';

import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';

const TEMPLATES = [
  { id: 1, name: 'Modern Dark', category: 'Tech', plan: 'pro', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600' },
  { id: 2, name: 'Minimal White', category: 'Minimal', plan: 'free', image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=600' },
  { id: 3, name: 'Glassmorphism', category: 'Modern', plan: 'studio', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600' },
  { id: 4, name: 'Creative Portfolio', category: 'Design', plan: 'free', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600' },
  { id: 5, name: 'Executive Suite', category: 'Professional', plan: 'pro', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  { id: 6, name: 'Neo Brutalist', category: 'Design', plan: 'studio', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600' },
];

const PLAN_BADGES = {
  free: { label: '🌱 FREE', class: 'plan-free' },
  studio: { label: '⚡ STUDIO', class: 'plan-studio' },
  pro: { label: '👑 PRO', class: 'plan-pro' }
};

export default function TemplatesPage() {
  const [filter, setFilter] = useState('All');
  const [liked, setLiked] = useState([]);
  const navigate = useNavigate();

  const toggleLike = (id) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDownloadPNG = (name) => {
    alert(`Downloading ${name} as PNG...`);
    // In a real app, you'd use a library like html2canvas or a backend screenshot service
  };

  const handleGetCode = (name) => {
    alert(`Generating source code for ${name}...\n(Includes placeholder profile info)`);
  };

  const filtered = filter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.plan === filter.toLowerCase());
  const categories = ['All', 'Free', 'Studio', 'Pro'];

  return (
    <div className="templates-page">
      <Header comp={() => <Btn_Primary title={"Home"} to={"/"} />} />

      <main className="templates-main">
        <section className="templates-hero">
          <div className="tag"><span>✨</span> PRE-BUILT DESIGNS</div>
          <h1>Choose your <em>Masterpiece.</em></h1>
          <p>Pick a template that matches your personality. Every design is fully customizable and responsive.</p>
        </section>

        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={filter === cat ? 'active' : ''}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="templates-grid">
          {filtered.map(t => (
            <div className="template-card" key={t.id}>
              <div className="image-wrapper">
                <img src={t.image} alt={t.name} />
                <div className="overlay">
                  <button className="preview-btn">Preview Mode</button>
                  <button className="use-btn" onClick={() => navigate('/auth')}>Use Now</button>
                </div>
                <span className={`plan-badge ${PLAN_BADGES[t.plan].class}`}>
                  {PLAN_BADGES[t.plan].label}
                </span>
                <button 
                  className={`like-btn ${liked.includes(t.id) ? 'liked' : ''}`} 
                  onClick={() => toggleLike(t.id)}
                >
                  {liked.includes(t.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="template-info">
                <div className="info-head">
                  <div>
                    <h3>{t.name}</h3>
                    <p>{t.category}</p>
                  </div>
                </div>
                <div className="card-actions">
                   <button className="action-btn" title="Download PNG" onClick={() => handleDownloadPNG(t.name)}>
                     🖼️ <span>PNG</span>
                   </button>
                   <button className="action-btn" title="Get Source Code" onClick={() => handleGetCode(t.name)}>
                     💻 <span>Code</span>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
