// ═══ Creative Neo-Brutalist Theme Script ═══

// Playful card hover physics (Delegated for Dynamic Content)
(function initCardPhysics() {
  document.addEventListener('mousedown', (e) => {
    const card = e.target.closest('.neo-border');
    if (card) {
      card.style.transform = 'translate(2px, 2px)';
      card.style.boxShadow = '2px 2px 0px var(--shadow)';
    }
  });

  document.addEventListener('mouseup', (e) => {
    const card = e.target.closest('.neo-border');
    if (card) {
      card.style.transform = '';
      card.style.boxShadow = '';
    }
  });
})();

// Dyn Hydration via Core Engine
(function hydratePortfolio() {
  if (typeof renderPortfolio !== 'function') return;

  renderPortfolio({
    id: 'template4',
    defaultTheme: 'light',
    titleSuffix: 'Studio',
    logoBuilder: (name) => name.split(' ').map(n => n[0]).join('') + '🎨',
    stockRole: 'Full-Stack Architect & Product Engineer',
    socialMeta: {
      github: { label: 'GitHub', emoji: '🐙' },
      linkedin: { label: 'LinkedIn', emoji: '💼' },
      instagram: { label: 'Instagram', emoji: '📸' },
      facebook: { label: 'Facebook', emoji: '📘' },
      portfolio: { label: 'Website', emoji: '🌐' },
      extra: { label: 'Link', emoji: '🔗' }
    },
    renderSocialItem: (key, link, meta) => `
      <a class="social-btn neo-border" href="${link}" target="_blank">
        <span class="social-icon-box">${meta.emoji}</span>
        <span>${meta.label}</span>
      </a>
    `,
    postSocialRender: (linkCount) => {
      const aboutSocialsBlock = document.getElementById('about-socials-block');
      const mainStory = document.querySelector('.main-story');
      if (linkCount === 0) {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'none';
        if (mainStory) mainStory.style.gridColumn = 'span 2';
      } else {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'block';
        if (mainStory) mainStory.style.gridColumn = '';
      }
    },
    renderEduItem: (e) => `
      <div class="neo-card timeline-card neo-border">
        <div class="timeline-header">
          <h3>${e.level || 'Degree'}</h3>
          <span class="timeline-badge">${e.status || 'Completed'}</span>
        </div>
        <div class="timeline-sub">${e.name} ${e.address ? `· ${e.address}` : ''}</div>
      </div>
    `,
    renderProjItem: (p) => `
      <div class="project-card neo-border">
        <img class="project-thumbnail" src="${p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'}" alt="${p.title}">
        <div class="project-content">
          <h3>${p.title}</h3>
          <p>${p.description || ''}</p>
          ${p.link ? `<a class="project-link" href="${p.link}" target="_blank">Access Build →</a>` : ''}
        </div>
      </div>
    `,
    renderExpItem: (e) => `
      <div class="neo-card timeline-card neo-border">
        <div class="timeline-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${e.image ? `<img src="${e.image}" class="experience-image" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px; border: 2px solid #000;" />` : ""}
            <h3>${e.company}</h3>
          </div>
          <span class="timeline-badge">${e.role || 'Lead Role'}</span>
        </div>
        <div class="timeline-body">${e.description || ''}</div>
      </div>
    `,
    renderSkillItem: (s) => `
      <div class="skill-card neo-border">
        <div class="skill-info">
          <span class="skill-name-label">${s.name}</span>
          <span class="skill-percentage">${s.progress}%</span>
        </div>
        <div class="skill-progress-bar">
          <div class="skill-progress-fill" style="width: ${s.progress}%"></div>
        </div>
      </div>
    `
  });
})();
