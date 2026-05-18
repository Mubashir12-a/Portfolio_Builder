// ═══ Minimal White Elegant Theme Script ═══

(function hydratePortfolio() {
  if (typeof renderPortfolio !== 'function') return;

  renderPortfolio({
    id: 'template2',
    defaultTheme: 'light',
    titleSuffix: 'Portfolio',
    logoBuilder: (name) => name.split(' ')[0] + '.',
    stockRole: 'Full-Stack Architect & Product Engineer',
    socialMeta: {
      github: { label: 'GitHub' },
      linkedin: { label: 'LinkedIn' },
      instagram: { label: 'Instagram' },
      facebook: { label: 'Facebook' },
      portfolio: { label: 'Portfolio' },
      extra: { label: 'Link' }
    },
    renderSocialItem: (key, link, meta) => `
      <a href="${link}" target="_blank">${meta.label}</a>
    `,
    postSocialRender: (linkCount) => {
      const aboutSocialsBlock = document.getElementById('about-socials-block');
      const mainCol = document.querySelector('.about-content-col');
      if (linkCount === 0) {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'none';
      } else {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'block';
      }
    },
    renderEduItem: (e) => `
      <div class="timeline-entry">
        <div class="entry-header">
          <h3 class="entry-title">${e.level || 'Academic Program'}</h3>
          <span class="entry-badge">${e.status || 'Completed'}</span>
        </div>
        <div class="entry-sub">${e.name} ${e.address ? `· ${e.address}` : ''}</div>
      </div>
    `,
    renderProjItem: (p) => `
      <div class="project-item">
        <div class="project-info">
          <h3>${p.title}</h3>
          <p>${p.description || ''}</p>
          ${p.link ? `<a class="project-link" href="${p.link}" target="_blank">View Case Study →</a>` : ''}
        </div>
        <img class="project-thumbnail" src="${p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'}" alt="${p.title}">
      </div>
    `,
    renderExpItem: (e) => `
      <div class="timeline-entry">
        <div class="entry-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${e.image ? `<img src="${e.image}" class="experience-image" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px;" />` : ""}
            <h3 class="entry-title">${e.company}</h3>
          </div>
          <span class="entry-badge">${e.role || 'Lead Role'}</span>
        </div>
        <div class="entry-body">${e.description || ''}</div>
      </div>
    `,
    renderSkillItem: (s) => `
      <div class="minimal-skill-row">
        <span class="minimal-skill-name">${s.name}</span>
        <span class="minimal-skill-progress">${s.progress}%</span>
      </div>
    `
  });
})();
