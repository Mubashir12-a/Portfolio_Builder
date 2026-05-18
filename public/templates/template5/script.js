// ═══ Corporate Professional Resume Theme Script ═══

(function hydratePortfolio() {
  if (typeof renderPortfolio !== 'function') return;

  renderPortfolio({
    id: 'template5',
    defaultTheme: 'light',
    titleSuffix: 'Executive Profile',
    logoBuilder: (name) => name.toUpperCase(),
    stockRole: 'Full-Stack Architect & Product Engineer',
    socialMeta: {
      github: { label: 'GitHub Profile', emoji: '🐙' },
      linkedin: { label: 'LinkedIn Professional', emoji: '💼' },
      instagram: { label: 'Instagram Studio', emoji: '📸' },
      facebook: { label: 'Facebook Hub', emoji: '📘' },
      portfolio: { label: 'Personal Website', emoji: '🌐' },
      extra: { label: 'External Resource', emoji: '🔗' }
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
        <a class="social-link-row" href="${link}" target="_blank" style="display: flex; align-items: center; gap: 10px;">
          <img src="../core/dashLinkIcons/${iconFile}" alt="${meta.label}" style="width: 20px; height: 20px; object-fit: contain;" />
          <span>${meta.label}</span>
        </a>
      `;
    },
    postSocialRender: (linkCount) => {
      const aboutSocialsBlock = document.getElementById('about-socials-block');
      if (aboutSocialsBlock) {
        aboutSocialsBlock.style.display = linkCount > 0 ? 'block' : 'none';
      }
    },
    renderEduItem: (e) => `
      <div class="timeline-row">
        <div class="timeline-row-header">
          <h3>${e.level || 'Degree'}</h3>
          <span class="timeline-date">${e.status || 'Completed'}</span>
        </div>
        <div class="timeline-sub">${e.name} ${e.address ? `· ${e.address}` : ''}</div>
      </div>
    `,
    renderProjItem: (p) => `
      <div class="project-item">
        <img class="project-thumbnail" src="${p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'}" alt="${p.title}">
        <div class="project-details">
          <h4>${p.title}</h4>
          <p>${p.description || ''}</p>
          ${p.link ? `<a class="project-link" href="${p.link}" target="_blank">View Case Study →</a>` : ''}
        </div>
      </div>
    `,
    renderExpItem: (e) => `
      <div class="timeline-row">
        <div class="timeline-row-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${e.image ? `<img src="${e.image}" class="experience-image" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px;" />` : ""}
            <h3>${e.company}</h3>
          </div>
          <span class="timeline-date">${e.role || 'Lead Role'}</span>
        </div>
        <div class="timeline-body">${e.description || ''}</div>
      </div>
    `,
    renderSkillItem: (s) => `
      <div class="skill-row">
        <div class="skill-row-header">
          <span class="skill-name">${s.name}</span>
          <span class="skill-badge">${s.progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${s.progress}%"></div>
        </div>
      </div>
    `
  });
})();
