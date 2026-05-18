import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import Header from '../components/LandingPageComponents/header.jsx';
import Footer from '../components/LandingPageComponents/footer.jsx';
import '../pagesStyles/templatesPage.css';

import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';

// 6 Templates with Netlify Preview URLs (Grouped here for easy manual editing)
const TEMPLATES = [
  { 
    id: 1, 
    name: 'Modern Dark', 
    category: 'Tech', 
    plan: 'pro', 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
    previewUrl: 'https://portfolio-modern-dark.netlify.app' 
  },
  { 
    id: 2, 
    name: 'Minimal White', 
    category: 'Minimal', 
    plan: 'free', 
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=600',
    previewUrl: 'https://portfolio-minimal-white.netlify.app' 
  },
  { 
    id: 3, 
    name: 'Glassmorphism', 
    category: 'Modern', 
    plan: 'studio', 
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
    previewUrl: 'https://portfolio-glassmorphism.netlify.app' 
  },
  { 
    id: 4, 
    name: 'Creative Studio', 
    category: 'Design', 
    plan: 'free', 
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600',
    previewUrl: 'https://portfolio-creative.netlify.app' 
  },
  { 
    id: 5, 
    name: 'Executive Suite', 
    category: 'Professional', 
    plan: 'pro', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
    previewUrl: 'https://portfolio-executive.netlify.app' 
  },
  { 
    id: 6, 
    name: 'Cyberpunk Terminal', 
    category: 'Tech', 
    plan: 'studio', 
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600',
    previewUrl: 'https://portfolio-neobrutalist.netlify.app' 
  },
];

const PLAN_BADGES = {
  free: { label: '🌱 FREE', class: 'plan-free' },
  studio: { label: '⚡ STUDIO', class: 'plan-studio' },
  pro: { label: '👑 PRO', class: 'plan-pro' }
};

// Helper: check plan access permissions
const hasTemplateAccess = (userPlan, templatePlan) => {
  if (!userPlan) return false;
  const plan = userPlan.toLowerCase();
  const tPlan = templatePlan.toLowerCase();

  if (plan === 'pro') return true;
  if (plan === 'studio') {
    return tPlan === 'free' || tPlan === 'studio';
  }
  return tPlan === 'free'; // Basic / free plan
};

// Helper: check liked templates limit based on user plan
const getLikeLimit = (userPlan) => {
  if (!userPlan) return 1;
  const plan = userPlan.toLowerCase();
  if (plan === 'pro') return Infinity;
  if (plan === 'studio') return 3;
  return 1; // free / basic plan
};

export default function TemplatesPage() {
  const [filter, setFilter] = useState('All');
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem('likedTemplates');
    return saved ? JSON.parse(saved) : [];
  });
  const [userData, setUserData] = useState(null);
  const [loadingCodeId, setLoadingCodeId] = useState(null);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info', action = null) => {
    setToast({ message, type });
    if (action) {
      setTimeout(() => {
        action();
      }, 2200);
    } else {
      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";
        const res = await fetch(`${apiUrl}/api/user/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setUserData(data.user);
        }
      } catch (err) {
        console.error("Failed to load user profile", err);
      }
    };
    fetchProfile();
  }, []);

  const toggleLike = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      showToast("Please log in or create an account to like templates!", "warning", () => navigate('/auth'));
      return;
    }

    const currentPlan = userData?.plan || 'free';
    const currentLimit = getLikeLimit(currentPlan);
    const isAlreadyLiked = liked.includes(id);

    if (!isAlreadyLiked && liked.length >= currentLimit) {
      showToast(`Your ${currentPlan.toUpperCase()} plan only allows liking up to ${currentLimit} template(s). Please purchase a higher plan to unlock more liked templates!`, "warning", () => navigate('/subscription'));
      return;
    }

    setLiked(prev => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('likedTemplates', JSON.stringify(updated));
      return updated;
    });
  };

  const handlePreview = (id) => {
    navigate(`/templates/template${id}/demo`);
  };

  const handlePreviewProfile = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      showToast("Please log in or create an account to preview templates with your profile data!", "warning", () => navigate('/auth'));
      return;
    }
    navigate(`/templates/template${id}/preview`);
  };

  const handleUseTemplate = (t) => {
    const token = localStorage.getItem('token');
    if (!token) {
      showToast("Please log in or create an account to use templates!", "warning", () => navigate('/auth'));
      return;
    }

    const currentPlan = userData?.plan || 'free';
    if (!hasTemplateAccess(currentPlan, t.plan)) {
      showToast(`The ${t.name} template is only available for ${t.plan.toUpperCase()} members. Please purchase a plan to unlock access!`, "warning", () => navigate('/subscription'));
      return;
    }

    navigate('/collect-info');
  };

  const handleDownloadPNG = async (name, imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.toLowerCase().replace(/\s+/g, '_')}_thumbnail.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, '_blank');
    }
  };

  const handleGetCode = async (id, name, templatePlan, injectEnabled) => {
    const token = localStorage.getItem('token');
    if (!token) {
      showToast("Please log in or create an account to download templates!", "warning", () => navigate('/auth'));
      return;
    }

    const currentPlan = userData?.plan || 'free';
    if (!hasTemplateAccess(currentPlan, templatePlan)) {
      showToast(`The ${name} template is only available for ${templatePlan.toUpperCase()} members. Please purchase a plan to unlock access!`, "warning", () => navigate('/subscription'));
      return;
    }

    setLoadingCodeId(id);
    try {
      const zip = new JSZip();
      
      const [htmlRes, cssRes, jsRes] = await Promise.all([
        fetch(`/templates/template${id}/index.html`),
        fetch(`/templates/template${id}/style.css`),
        fetch(`/templates/template${id}/script.js`)
      ]);

      if (!htmlRes.ok || !cssRes.ok || !jsRes.ok) {
        throw new Error("Failed to load template source files.");
      }

      let htmlText = await htmlRes.text();
      const cssText = await cssRes.text();
      const jsText = await jsRes.text();

      // Fetch and bundle the centralized core script libraries for standard offline execution
      const coreFiles = ['normalize.js', 'theme.js', 'visibility.js', 'helpers.js', 'registry.js', 'renderer.js'];
      const coreTexts = await Promise.all(
        coreFiles.map(file => fetch(`/templates/core/${file}`).then(res => res.text()))
      );

      // Add all core files to a dedicated local directory inside the compiled ZIP archive
      coreFiles.forEach((file, idx) => {
        zip.file(`core/${file}`, coreTexts[idx]);
      });

      // Fetch and bundle the static profile pic binary file for complete offline stock rendering
      try {
        const picRes = await fetch('/templates/core/DemoProfileImg.png');
        if (picRes.ok) {
          const picBlob = await picRes.blob();
          zip.file('core/DemoProfileImg.png', picBlob);
        }
      } catch (err) {
        console.error("Failed to bundle static profile image", err);
      }

      // Update base HTML scripts to point locally rather than referencing external parents
      htmlText = htmlText.replaceAll('../core/', 'core/');

      // If downloading real dynamic profile data, pre-hydrate it as a persistent global payload script
      if (injectEnabled && userData) {
        const context = {
          mode: 'profile',
          data: userData,
          templateId: `template${id}`,
          previewState: false
        };
        const dataSnippet = `<script>window.__PORTFOLIO_CONTEXT__ = ${JSON.stringify(context)};</script>\n`;
        htmlText = htmlText.replace("</head>", `${dataSnippet}</head>`);
      }

      zip.file("index.html", htmlText);
      zip.file("style.css", cssText);
      zip.file("script.js", jsText);

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.toLowerCase().replace(/\s+/g, '_')}_${injectEnabled ? 'profile' : 'stock'}_template.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      showToast("Failed to download template source code. Please try again.", "error");
    } finally {
      setLoadingCodeId(null);
    }
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
                <div className="overlay" style={{ gap: '8px' }}>
                  <button className="preview-btn" style={{ width: '180px', padding: '8px', fontSize: '0.75rem' }} onClick={() => handlePreview(t.id)}>
                    🔍 Stock Preview
                  </button>
                  <button className="preview-btn" style={{ width: '180px', padding: '8px', fontSize: '0.75rem', background: 'var(--violet)', color: 'white', border: '1px solid var(--violet)' }} onClick={() => handlePreviewProfile(t.id, t.name)}>
                    👤 Profile Preview
                  </button>
                  <button className="use-btn" style={{ width: '180px', padding: '8px', fontSize: '0.75rem' }} onClick={() => handleUseTemplate(t)}>
                    🚀 Use Now
                  </button>
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
                <div className="card-actions" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                   <button className="action-btn" title="Download PNG" onClick={() => handleDownloadPNG(t.name, t.image)} style={{ flex: '1 1 auto' }}>
                     🖼️ <span>PNG</span>
                   </button>
                   <button 
                     className="action-btn" 
                     title="Get Stock Code" 
                     onClick={() => handleGetCode(t.id, t.name, t.plan, false)}
                     disabled={loadingCodeId === t.id}
                     style={{ flex: '1 1 auto' }}
                   >
                     📦 <span>Stock</span>
                   </button>
                   <button 
                     className="action-btn" 
                     title="Get Code as per Profile" 
                     onClick={() => handleGetCode(t.id, t.name, t.plan, true)}
                     disabled={loadingCodeId === t.id}
                     style={{ flex: '1 1 auto', background: 'var(--violet-dim)', color: 'var(--violet)', borderColor: 'rgba(123,94,248,0.2)' }}
                   >
                     👤 <span>Profile</span>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {toast && (
        <div className={`custom-toast toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'error' ? '❌' : toast.type === 'warning' ? '⚠️' : '✨'}
          </div>
          <div className="toast-message">{toast.message}</div>
          <button className="toast-close" onClick={() => setToast(null)}>×</button>
        </div>
      )}

      <Footer />
    </div>
  );
}


