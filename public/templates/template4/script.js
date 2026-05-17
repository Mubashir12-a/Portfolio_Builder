// ═══ Creative Neo-Brutalist Theme Script ═══

// Local Persistent Theme Switching
(function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
    localStorage.setItem('template4-theme', theme);
  }

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('template4-theme') || 'light';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    setTheme(currentTheme);
  });
})();

// Playful card hover physics
(function initCardPhysics() {
  // Add quick physical feedback when neo cards are clicked
  document.querySelectorAll('.neo-border').forEach(card => {
    card.addEventListener('mousedown', () => {
      card.style.transform = 'translate(2px, 2px)';
      card.style.boxShadow = '2px 2px 0px var(--shadow)';
    });
    card.addEventListener('mouseup', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
})();

// Dynamic Content Hydration System
(function hydratePortfolio() {
  // 1. Premium Mock Data for Stock Mode
  const STOCK_DATA = {
    name: "Mubashir Ahmad",
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    about: "I craft high-performance, pixel-perfect web experiences with modern architecture and cutting-edge aesthetics.",
    phone: "+44 7911 123456",
    email: "mubashir.ahmad@example.com",
    location: "London, United Kingdom",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      portfolio: "https://example.com",
      extra: "https://google.com"
    },
    education: [
      { level: "Master of Science", name: "Oxford University", address: "Oxford, UK", status: "First Class Honors" },
      { level: "Bachelor of Engineering", name: "Imperial College London", address: "London, UK", status: "Distinction" }
    ],
    projects: [
      { title: "AI Portfolio Builder", description: "Next-gen responsive developer workspace with modular template compilers.", link: "https://github.com", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600" },
      { title: "DeFi Liquidity Engine", description: "High-throughput algorithmic transaction ledger running on Solidity.", link: "https://github.com", image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600" },
      { title: "SaaS Design System", description: "A gorgeous, cohesive HSL-styled micro-component design token architecture.", link: "https://github.com", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600" }
    ],
    experience: [
      { company: "Google Deepmind", description: "Spearheaded premium frontend components, layout optimization, and high-end AI rendering systems.", certificate: "Senior Frontend Architect" },
      { company: "Stripe Payments", description: "Developed highly extensible dashboard components and custom client SDK configurations.", certificate: "Lead Product Engineer" }
    ],
    skills: [
      { name: "React.js", progress: 95 },
      { name: "TypeScript", progress: 90 },
      { name: "Tailwind CSS", progress: 85 },
      { name: "Node.js", progress: 88 },
      { name: "System Design", progress: 92 }
    ]
  };

  // Determine active profile details (Profile Mode vs Stock Mode)
  const isProfileMode = !!window.portfolioData;
  const data = isProfileMode ? window.portfolioData : STOCK_DATA;

  // Render Base Profile Fields
  const nameEl = document.getElementById('user-name');
  if (nameEl && data.name) {
    nameEl.textContent = data.name;
    document.title = `${data.name} | Studio`;
    
    const footerName = document.getElementById('footer-name');
    if (footerName) footerName.textContent = data.name;
    
    // Logo text
    const logoText = document.getElementById('logo-text');
    if (logoText) {
      logoText.textContent = data.name.split(' ').map(n => n[0]).join('') + '🎨';
    }
  }

  const bioEl = document.getElementById('user-bio');
  if (bioEl && data.about) {
    bioEl.textContent = data.about;
  }

  const roleEl = document.getElementById('user-role');
  if (roleEl && data.about) {
    roleEl.textContent = isProfileMode ? "Software Professional" : "Full-Stack Architect & Product Engineer";
  }

  const imgEl = document.getElementById('user-image');
  if (imgEl && data.profileImage) {
    imgEl.src = data.profileImage;
  }

  // Location
  const locContainer = document.getElementById('meta-location-container');
  const locEl = document.getElementById('user-location');
  if (data.location) {
    if (locEl) locEl.textContent = data.location;
    if (locContainer) locContainer.style.display = 'flex';
  } else if (locContainer) {
    locContainer.style.display = 'none';
  }

  // Phone
  const phoneContainer = document.getElementById('meta-phone-container');
  const phoneEl = document.getElementById('user-phone');
  if (data.phone) {
    if (phoneEl) {
      phoneEl.textContent = data.phone;
      phoneEl.href = `tel:${data.phone}`;
    }
    if (phoneContainer) phoneContainer.style.display = 'flex';
  } else if (phoneContainer) {
    phoneContainer.style.display = 'none';
  }

  // Email
  const emailContainer = document.getElementById('meta-email-container');
  const emailEl = document.getElementById('user-email');
  if (data.email) {
    if (emailEl) {
      emailEl.textContent = data.email;
      emailEl.href = `mailto:${data.email}`;
    }
    if (emailContainer) emailContainer.style.display = 'flex';
  } else if (emailContainer) {
    emailContainer.style.display = 'none';
  }

  // Social Links Renderer
  const socialsContainer = document.getElementById('socials-container');
  const aboutSocialsBlock = document.getElementById('about-socials-block');
  if (socialsContainer) {
    socialsContainer.innerHTML = '';
    let linkCount = 0;
    const links = data.socialLinks || {};

    const socialMeta = {
      github: { label: 'GitHub', emoji: '🐙' },
      linkedin: { label: 'LinkedIn', emoji: '💼' },
      instagram: { label: 'Instagram', emoji: '📸' },
      facebook: { label: 'Facebook', emoji: '📘' },
      portfolio: { label: 'Website', emoji: '🌐' },
      extra: { label: 'Link', emoji: '🔗' }
    };

    Object.entries(socialMeta).forEach(([key, meta]) => {
      if (links[key]) {
        linkCount++;
        const card = document.createElement('a');
        card.className = 'social-btn neo-border';
        card.href = links[key];
        card.target = '_blank';
        card.innerHTML = `
          <span class="social-icon-box">${meta.emoji}</span>
          <span>${meta.label}</span>
        `;
        socialsContainer.appendChild(card);
      }
    });

    if (linkCount === 0 && aboutSocialsBlock) {
      aboutSocialsBlock.style.display = 'none';
      const mainStory = document.querySelector('.main-story');
      if (mainStory) mainStory.style.gridColumn = 'span 2';
    } else if (aboutSocialsBlock) {
      aboutSocialsBlock.style.display = 'block';
    }
  }

  // Education Section Hydration
  const eduSection = document.getElementById('education');
  const eduContainer = document.getElementById('education-container');
  const navEdu = document.getElementById('nav-education');
  const validEdu = (data.education || []).filter(e => e.name && e.name.trim());
  
  if (eduContainer && validEdu.length > 0) {
    eduContainer.innerHTML = validEdu.map(e => `
      <div class="neo-card timeline-card neo-border">
        <div class="timeline-header">
          <h3>${e.level || 'Degree'}</h3>
          <span class="timeline-badge">${e.status || 'Completed'}</span>
        </div>
        <div class="timeline-sub">${e.name} ${e.address ? `· ${e.address}` : ''}</div>
      </div>
    `).join('');
    if (eduSection) eduSection.style.display = 'block';
    if (navEdu) navEdu.style.display = 'block';
  } else {
    if (eduSection) eduSection.style.display = 'none';
    if (navEdu) navEdu.style.display = 'none';
  }

  // Projects Section Hydration
  const projSection = document.getElementById('projects');
  const projContainer = document.getElementById('projects-container');
  const navProj = document.getElementById('nav-projects');
  const validProj = (data.projects || []).filter(p => p.title && p.title.trim());

  if (projContainer && validProj.length > 0) {
    projContainer.innerHTML = validProj.map(p => `
      <div class="project-card neo-border">
        <img class="project-thumbnail" src="${p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'}" alt="${p.title}">
        <div class="project-content">
          <h3>${p.title}</h3>
          <p>${p.description || ''}</p>
          ${p.link ? `<a class="project-link" href="${p.link}" target="_blank">Access Build →</a>` : ''}
        </div>
      </div>
    `).join('');
    if (projSection) projSection.style.display = 'block';
    if (navProj) navProj.style.display = 'block';
  } else {
    if (projSection) projSection.style.display = 'none';
    if (navProj) navProj.style.display = 'none';
  }

  // Experience Section Hydration
  const expSection = document.getElementById('experience');
  const expContainer = document.getElementById('experience-container');
  const navExp = document.getElementById('nav-experience');
  const validExp = (data.experience || []).filter(e => e.company && e.company.trim());

  if (expContainer && validExp.length > 0) {
    expContainer.innerHTML = validExp.map(e => `
      <div class="neo-card timeline-card neo-border">
        <div class="timeline-header">
          <h3>${e.company}</h3>
          <span class="timeline-badge">${e.certificate || 'Lead Role'}</span>
        </div>
        <div class="timeline-body">${e.description || ''}</div>
      </div>
    `).join('');
    if (expSection) expSection.style.display = 'block';
    if (navExp) navExp.style.display = 'block';
  } else {
    if (expSection) expSection.style.display = 'none';
    if (navExp) navExp.style.display = 'none';
  }

  // Skills Section Hydration
  const skillsSection = document.getElementById('skills');
  const skillsContainer = document.getElementById('skills-container');
  const navSkills = document.getElementById('nav-skills');
  const validSkills = (data.skills || []).filter(s => s.name && s.name.trim());

  if (skillsContainer && validSkills.length > 0) {
    skillsContainer.innerHTML = validSkills.map(s => `
      <div class="skill-card neo-border">
        <div class="skill-info">
          <span class="skill-name-label">${s.name}</span>
          <span class="skill-percentage">${s.progress}%</span>
        </div>
        <div class="skill-progress-bar">
          <div class="skill-progress-fill" style="width: ${s.progress}%"></div>
        </div>
      </div>
    `).join('');
    if (skillsSection) skillsSection.style.display = 'block';
    if (navSkills) navSkills.style.display = 'block';
  } else {
    if (skillsSection) skillsSection.style.display = 'none';
    if (navSkills) navSkills.style.display = 'none';
  }

  // Footer Year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
