// ═══ Modern Dark Developer Theme Script ═══

// Particle Canvas Animation
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#8b5cf6';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particlesArray = [];
    const count = Math.min(Math.floor(window.innerWidth / 15), 60);
    for (let i = 0; i < count; i++) {
      particlesArray.push(new Particle());
    }
  }
  init();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// Dyn Hydration via Core Engine
(function hydratePortfolio() {
  if (typeof renderPortfolio !== 'function') return;

  renderPortfolio({
    id: 'template1',
    defaultTheme: 'dark',
    titleSuffix: 'Portfolio',
    logoBuilder: (name) => name.split(' ').map(n => n[0]).join('') + '.',
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
      <a class="social-btn" href="${link}" target="_blank">
        <span class="social-icon-box">${meta.emoji}</span>
        <span>${meta.label}</span>
      </a>
    `,
    postSocialRender: (linkCount) => {
      const aboutSocialsBlock = document.querySelector('.socials-card');
      const mainAbout = document.querySelector('.main-about');
      if (linkCount === 0) {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'none';
        if (mainAbout) mainAbout.style.gridColumn = 'span 2';
      } else {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'block';
        if (mainAbout) mainAbout.style.gridColumn = '';
      }
    },
    renderEduItem: (e) => `
      <div class="timeline-item">
        <div class="timeline-header">
          <h3>${e.level || 'Degree'}</h3>
          <span class="timeline-badge">${e.status || 'Completed'}</span>
        </div>
        <div class="timeline-sub">${e.name} ${e.address ? `· ${e.address}` : ''}</div>
      </div>
    `,
    renderProjItem: (p) => `
      <div class="project-card">
        <img class="project-thumbnail" src="${p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'}" alt="${p.title}">
        <div class="project-content">
          <h3>${p.title}</h3>
          <p>${p.description || ''}</p>
          ${p.link ? `<a class="project-link" href="${p.link}" target="_blank">Explore Codebase →</a>` : ''}
        </div>
      </div>
    `,
    renderExpItem: (e) => `
      <div class="timeline-item">
        <div class="timeline-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${e.image ? `<img src="${e.image}" class="experience-image" style="width: 32px; height: 32px; object-fit: cover; border-radius: 6px;" />` : ""}
            <h3>${e.company}</h3>
          </div>
          <span class="timeline-badge">${e.role || 'Lead Role'}</span>
        </div>
        <div class="timeline-body">${e.description || ''}</div>
      </div>
    `,
    renderSkillItem: (s) => `
      <div class="skill-card">
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
