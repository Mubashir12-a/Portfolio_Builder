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

  const handlePreview = async (id) => {
    try {
      const htmlRes = await fetch(`/templates/template${id}/index.html`);
      if (!htmlRes.ok) throw new Error("Failed to load template.");
      let htmlText = await htmlRes.text();

      // Inject stock fallback data (Mubashir Ahmad & beautiful demo images)
      htmlText = injectUserData(htmlText, true);

      // Inject base tag so relative files resolve correctly
      const baseTag = `<base href="${window.location.origin}/templates/template${id}/">`;
      htmlText = htmlText.replace("<head>", `<head>${baseTag}`);

      // Create a Blob URL and open it in a new window
      const blob = new Blob([htmlText], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      window.open(`/templates/template${id}/index.html`, '_blank');
    }
  };

  const handlePreviewProfile = async (id, name) => {
    try {
      const htmlRes = await fetch(`/templates/template${id}/index.html`);
      if (!htmlRes.ok) throw new Error("Failed to load template.");
      let htmlText = await htmlRes.text();

      // Inject real user dashboard data or fallback gracefully to the default Mubashir Ahmad profile
      htmlText = injectUserData(htmlText, false);

      // Inject base tag so relative files resolve correctly
      const baseTag = `<base href="${window.location.origin}/templates/template${id}/">`;
      htmlText = htmlText.replace("<head>", `<head>${baseTag}`);

      // Create a Blob URL and open it in a new window
      const blob = new Blob([htmlText], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      showToast("Failed to generate profile preview. Please try again.", "error");
    }
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

  const injectUserData = (htmlText, forceStock = false) => {
    let injected = htmlText;

    const activeUserData = (userData && !forceStock) ? userData : {
      name: 'Mubashir Ahmad',
      address: 'London, United Kingdom',
      profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
      about: 'I craft high-performance, pixel-perfect web experiences with modern architecture and cutting-edge aesthetics.',
      phone: '+44 7911 123456',
      email: 'mubashir.ahmad@example.com',
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      },
      education: [],
      projects: [],
      experience: [],
      skills: []
    };

    // Construct the payload structure from dashboard inputs, defaulting to 'Mubashir Ahmad' and beautiful demo images
    const payload = {
      name: (!activeUserData.name || activeUserData.name === 'Developer Guest') ? 'Mubashir Ahmad' : activeUserData.name,
      address: activeUserData.address || 'London, United Kingdom',
      profileImage: (!activeUserData.profileImage || activeUserData.profileImage.includes('profileImg')) ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300' : activeUserData.profileImage,
      about: activeUserData.about || 'I craft high-performance, pixel-perfect web experiences with modern architecture and cutting-edge aesthetics.',
      phone: activeUserData.phone || '+44 7911 123456',
      email: activeUserData.email || 'mubashir.ahmad@example.com',
      socialLinks: activeUserData.socialLinks || {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      },
      education: (activeUserData.education && activeUserData.education.length > 0) ? activeUserData.education.filter(e => e.name && e.name.trim()).slice(0, 4) : [
        { level: 'Master of Science', name: 'Oxford University', address: 'Oxford, UK', status: 'First Class Honors' },
        { level: 'Bachelor of Engineering', name: 'Imperial College London', address: 'London, UK', status: 'Distinction' }
      ],
      projects: (activeUserData.projects && activeUserData.projects.length > 0) ? activeUserData.projects.filter(p => p.title && p.title.trim()).slice(0, 3) : [
        { title: 'AI Portfolio Builder', description: 'Next-gen responsive developer workspace with modular template compilers.', link: 'https://github.com', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600' },
        { title: 'DeFi Liquidity Engine', description: 'High-throughput algorithmic transaction ledger running on Solidity.', link: 'https://github.com', image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600' },
        { title: 'SaaS Design System', description: 'A gorgeous, cohesive HSL-styled micro-component design token architecture.', link: 'https://github.com', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600' }
      ],
      experience: (activeUserData.experience && activeUserData.experience.length > 0) ? activeUserData.experience.filter(e => e.company && e.company.trim()).slice(0, 3) : [
        { company: 'Google Deepmind', description: 'Spearheaded premium frontend components, layout optimization, and high-end AI rendering systems.', certificate: 'Senior Frontend Architect' },
        { company: 'Stripe Payments', description: 'Developed highly extensible dashboard components and custom client SDK configurations.', certificate: 'Lead Product Engineer' }
      ],
      skills: (activeUserData.skills && activeUserData.skills.length > 0) ? activeUserData.skills.filter(s => s.name && s.name.trim()) : [
        { name: 'React.js', progress: 95 },
        { name: 'TypeScript', progress: 90 },
        { name: 'Tailwind CSS', progress: 85 },
        { name: 'Node.js', progress: 88 },
        { name: 'System Design', progress: 92 }
      ]
    };

    // 1. Inject isolated theme styles into <head>
    const themeStyles = `
<style id="isolated-theme-styles">
  body.light-mode {
    filter: invert(0.9) hue-rotate(180deg) !important;
    background-color: #f7f7f7 !important;
  }
  body.light-mode img, 
  body.light-mode canvas, 
  body.light-mode iframe,
  body.light-mode #theme-toggle,
  body.light-mode .project-img,
  body.light-mode .work-img,
  body.light-mode .card-image,
  body.light-mode .hero-visual,
  body.light-mode [style*="background"] {
    filter: invert(0.9) hue-rotate(180deg) !important;
  }
</style>
`;
    injected = injected.replace("</head>", `${themeStyles}</head>`);

    // 2. Inject payload script at the bottom of the body
    const engineScript = `
<!-- Dynamic User Data Payload -->
<script id="dashboard-customizer-payload">
window.portfolioData = ${JSON.stringify(payload)};
</script>

<!-- Floating Dual Theme Toggle Button -->
<button id="theme-toggle" aria-label="Toggle Theme" style="position: fixed; bottom: 24px; right: 24px; z-index: 99999; background: #000; color: #fff; border: 2px solid #fff; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.3); transition: all 0.3s ease;">🌓</button>
<script>
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('local-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });
  if (localStorage.getItem('local-theme') === 'light') {
    document.body.classList.add('light-mode');
  }
</script>

<!-- Universal Rendering Engine for Dashboard Items -->
<script id="dashboard-customizer-engine">
(function() {
  const data = window.portfolioData;
  if (!data) return;

  // Update text elements recursively
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      let txt = node.textContent;
      if (txt.includes("John Developer") || txt.includes("Alex") || txt.includes("John")) {
        txt = txt.replace(/John\\s+Developer|Alex|John/g, data.name || "Developer");
      }
      if (txt.includes("hello@example.com") || txt.includes("hello@studio.com")) {
        txt = txt.replace(/hello@example\\.com|hello@studio\\.com/g, data.email || "hello@example.com");
      }
      if (txt.includes("San Francisco, CA")) {
        txt = txt.replace("San Francisco, CA", data.address || "Global Citizen");
      }
      if (node.textContent !== txt) node.textContent = txt;
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }
  walk(document.body);

  // Update profile image
  if (data.profileImage) {
    document.querySelectorAll(".hero img, .hero-visual img, .about-img, .profile-img, .hero-image-placeholder").forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = data.profileImage;
      } else {
        el.style.backgroundImage = 'url(' + data.profileImage + ')';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    });
  }

  // Render Education (Max 4)
  const validEdu = data.education || [];
  const eduContainer = document.querySelector(".milestones-timeline, .education-grid, .about-details, .about-info");
  if (eduContainer && validEdu.length > 0) {
    if (eduContainer.classList.contains("milestones-timeline")) {
      eduContainer.innerHTML = validEdu.map(e => \`
        <div class="timeline-item">
          <div class="timeline-date">\${e.status || 'Completed'}</div>
          <div class="timeline-content">
            <h3>\${e.level || 'Degree'}</h3>
            <h4>\${e.name}</h4>
            <p>\${e.address || ''}</p>
          </div>
        </div>
      \`).join('');
    } else if (eduContainer.classList.contains("about-details") || eduContainer.classList.contains("about-info")) {
      eduContainer.innerHTML = validEdu.map(e => \`
        <div><span>\${e.level || 'Education'}</span><strong>\${e.name} (\${e.status})</strong></div>
      \`).join('');
    }
  } else if (validEdu.length === 0) {
    document.querySelectorAll("#education, .education, #experience").forEach(el => {
      if (el.textContent.toLowerCase().includes("milestone") || el.textContent.toLowerCase().includes("education")) {
        el.style.display = 'none';
      }
    });
  }

  // Render Projects (Max 3)
  const validProj = data.projects || [];
  const projContainer = document.querySelector(".projects-grid, .work-grid, .project-list, .jobs-list");
  if (projContainer && validProj.length > 0) {
    if (projContainer.classList.contains("project-list")) {
      projContainer.innerHTML = validProj.map((p, idx) => \`
        <div class="project-row" data-color="#6366f1" onclick="if('\${p.link}') window.open('\${p.link}', '_blank')">
          <span class="project-num">0\${idx+1}</span>
          <h3>\${p.title}</h3>
          <span class="project-cat">\${p.description || 'Featured Project'}</span>
        </div>
      \`).join('');
    } else if (projContainer.classList.contains("jobs-list")) {
      projContainer.innerHTML = validProj.map((p, idx) => \`
        <div class="job-item cyan-bg" onclick="if('\${p.link}') window.open('\${p.link}', '_blank')" style="cursor: pointer;">
          <div class="job-num">0\${idx+1}</div>
          <div class="job-meta">
            <h3>\${p.title}</h3>
            <p>\${p.description || ''}</p>
          </div>
          <a href="#" class="job-arrow">→</a>
        </div>
      \`).join('');
    } else {
      projContainer.innerHTML = validProj.map(p => \`
        <div class="project-card work-item card-image-holder" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; margin-bottom: 20px; overflow: hidden; display: flex; flex-direction: column;">
          <div class="project-img work-img card-image" style="background: \${p.image ? 'url(' + p.image + ') center/cover no-repeat' : 'linear-gradient(135deg, #667eea, #764ba2)'}; height: 200px; width: 100%;"></div>
          <div class="project-info card-content" style="padding: 20px;">
            <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 8px;">\${p.title}</h3>
            <p style="font-size: 0.95rem; opacity: 0.8; margin-bottom: 12px;">\${p.description || ''}</p>
            \${p.link ? \`<a href="\${p.link}" target="_blank" style="color: var(--violet, #7b5ef8); font-weight: bold; text-decoration: none;">View Live →</a>\` : ''}
          </div>
        </div>
      \`).join('');
    }
  } else if (validProj.length === 0) {
    document.querySelectorAll("#projects, .projects, #work, .work").forEach(el => el.style.display = 'none');
  }

  // Render Experience (Max 3)
  const validExp = data.experience || [];
  const expContainer = document.querySelector(".milestones-timeline, .experience-grid, .manifesto-grid, .about-cards");
  if (expContainer && validExp.length > 0) {
    if (expContainer.classList.contains("manifesto-grid")) {
      expContainer.innerHTML = validExp.map((e, idx) => \`
        <div class="manifesto-card white-bg" style="padding: 24px; border: 2px solid #000; border-radius: 8px; margin-bottom: 16px;">
          <h3>0\${idx+1} / \${e.company.toUpperCase()}</h3>
          <p>\${e.description || 'Professional operations strategy.'}</p>
        </div>
      \`).join('');
    } else if (expContainer.classList.contains("milestones-timeline")) {
      expContainer.innerHTML = validExp.map(e => \`
        <div class="timeline-item">
          <div class="timeline-date">EXPERIENCE</div>
          <div class="timeline-content">
            <h3>\${e.company}</h3>
            <p>\${e.description || ''}</p>
          </div>
        </div>
      \`).join('');
    } else {
      expContainer.innerHTML = validExp.map(e => \`
        <div class="info-card glass-card" style="padding: 20px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
          <span class="card-icon card-emoji">💼</span>
          <h3>\${e.company}</h3>
          <p>\${e.description || ''}</p>
        </div>
      \`).join('');
    }
  } else if (validExp.length === 0) {
    document.querySelectorAll("#experience, .experience, .milestones-timeline").forEach(el => {
      if (!el.querySelector('.timeline-date') || el.textContent.toLowerCase().includes("milestone")) {
         el.style.display = 'none';
      }
    });
  }

  // Render Skills
  const validSkills = data.skills || [];
  const skillsContainer = document.querySelector(".skills-grid, .skills-list, .services-grid");
  if (skillsContainer && validSkills.length > 0) {
    skillsContainer.innerHTML = validSkills.map((s, idx) => \`
      <div class="skill-item service-card" style="padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 12px;">
        <div class="skill-icon">⚡</div>
        <span>\${s.name}</span>
        <div class="skill-bar" style="margin-top: 10px; background: rgba(255,255,255,0.1); height: 6px; border-radius: 3px; overflow: hidden;">
          <div class="skill-fill" style="width: \${s.progress || 90}%; height: 100%; background: var(--violet, #7b5ef8);"></div>
        </div>
      </div>
    \`).join('');
  } else if (validSkills.length === 0) {
    document.querySelectorAll("#skills, .skills, #services, .services").forEach(el => el.style.display = 'none');
  }
})();
</script>
`;
    injected = injected.replace("</body>", `${engineScript}</body>`);

    return injected;
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

      // Inject real user dashboard data if requested and logged in
      if (injectEnabled) {
        htmlText = injectUserData(htmlText);
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


