// ═══ Glassmorphism Futuristic UI Theme Script ═══

// Mouse Movement Parallax for Background Orbs (Optimized & Disabled on Mobile)
(function initOrbParallax() {
  const orbs = document.querySelectorAll('.glow-orb');
  if (orbs.length === 0 || window.innerWidth < 768) return;

  let ticking = false;

  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
          const depth = (index + 1) * 15;
          const xTrans = (mouseX - 0.5) * depth;
          const yTrans = (mouseY - 0.5) * depth;
          orb.style.transform = `translate(${xTrans}px, ${yTrans}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// Dyn Hydration via Core Engine
(function hydratePortfolio() {
  if (typeof renderPortfolio !== 'function') return;

  renderPortfolio({
    id: 'template3',
    defaultTheme: 'dark',
    titleSuffix: 'Specs',
    logoBuilder: (name) => name.split(' ').map(n => n[0]).join('') + '.io',
    stockRole: 'Full-Stack Architect & Product Engineer',
    socialMeta: {
      github: { label: 'GitHub', emoji: '🐙' },
      linkedin: { label: 'LinkedIn', emoji: '💼' },
      instagram: { label: 'Instagram', emoji: '📸' },
      facebook: { label: 'Facebook', emoji: '📘' },
      portfolio: { label: 'Website', emoji: '🌐' },
      extra: { label: 'Link', emoji: '🔗' }
    },
    renderSocialItem: (key, link, meta) => {
      const iconMap = {
        github: 'Github.png',
        linkedin: 'LinkedIn.png',
        instagram: 'Instagram.png',
        facebook: 'facebook.png',
        portfolio: 'Portfolio.png',
        extra: 'Link.png'
      };
      const iconFile = iconMap[key] || 'Link.png';
      return `
        <a class="social-btn" href="${link}" target="_blank">
          <span class="social-icon-box">
            <img src="../core/dashLinkIcons/${iconFile}" alt="${meta.label}" style="width: 20px; height: 20px; object-fit: contain;" />
          </span>
          <span>${meta.label}</span>
        </a>
      `;
    },
    postSocialRender: (linkCount) => {
      const aboutSocialsBlock = document.getElementById('about-socials-block');
      const mainSpecs = document.querySelector('.main-specs');
      if (linkCount === 0) {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'none';
        if (mainSpecs) mainSpecs.style.gridColumn = 'span 2';
      } else {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'block';
        if (mainSpecs) mainSpecs.style.gridColumn = '';
      }
    },
    renderEduItem: (e) => `
      <div class="glass-card timeline-card">
        <div class="timeline-header">
          <h3>${e.level || 'Degree'}</h3>
          <span class="timeline-badge">${e.status || 'Completed'}</span>
        </div>
        <div class="timeline-sub">${e.name} ${e.address ? `· ${e.address}` : ''}</div>
      </div>
    `,
    renderProjItem: (p) => `
      <div class="glass-card project-card">
        <img class="project-thumbnail" src="${p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'}" alt="${p.title}">
        <div class="project-content">
          <h3>${p.title}</h3>
          <p>${p.description || ''}</p>
          ${p.link ? `<a class="project-link" href="${p.link}" target="_blank">Access Repository →</a>` : ''}
        </div>
      </div>
    `,
    renderExpItem: (e) => `
      <div class="glass-card timeline-card">
        <div class="timeline-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${e.image ? `<img src="${e.image}" class="experience-image" style="width: 32px; height: 32px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15);" />` : ""}
            <h3>${e.company}</h3>
          </div>
          <span class="timeline-badge">${e.role || 'Lead Role'}</span>
        </div>
        <div class="timeline-body">${e.description || ''}</div>
      </div>
    `,
    renderSkillItem: (s) => `
      <div class="glass-card skill-card">
        <div class="skill-header">
          <span class="skill-title">${s.name}</span>
          <span class="skill-pct">${s.progress}%</span>
        </div>
        <div class="skill-track">
          <div class="skill-fill" style="width: ${s.progress}%"></div>
        </div>
      </div>
    `
  });
})();
