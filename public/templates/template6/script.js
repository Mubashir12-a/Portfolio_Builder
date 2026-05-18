// ═══ Cyberpunk Neon Hacker Terminal Theme Script ═══

// Fullscreen Matrix Rain Animation Engine (Optimized via requestAnimationFrame)
(function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let columns = 0;
  let drops = [];
  const fontSize = 14;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Lower columns on mobile to conserve memory and layout thread
    const spacing = window.innerWidth < 768 ? fontSize * 2.5 : fontSize;
    columns = Math.floor(canvas.width / spacing);
    drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }
  }
  resize();
  window.addEventListener('resize', resize);

  const matrixChars = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&+-*<>~".split("");

  function draw() {
    const isLight = document.body.classList.contains('light-theme');
    ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(3, 3, 3, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = isLight ? 'rgba(17, 17, 17, 0.15)' : 'rgba(57, 255, 20, 0.28)';
    ctx.font = `${fontSize}px "Share Tech Mono"`;

    for (let i = 0; i < drops.length; i++) {
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      ctx.fillText(char, i * (window.innerWidth < 768 ? fontSize * 2.5 : fontSize), drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // Throttle Matrix loop to ~30 FPS for silky performance on all machines
  let lastTime = 0;
  const fpsInterval = 1000 / 30;

  function animate(timestamp) {
    requestAnimationFrame(animate);
    const elapsed = timestamp - lastTime;
    if (elapsed > fpsInterval) {
      lastTime = timestamp - (elapsed % fpsInterval);
      draw();
    }
  }
  requestAnimationFrame(animate);
})();

// Dyn Hydration via Core Engine
(function hydratePortfolio() {
  if (typeof renderPortfolio !== 'function') return;

  renderPortfolio({
    id: 'template6',
    defaultTheme: 'dark',
    titleSuffix: 'Bios Terminal',
    logoBuilder: (name) => `ROOT@${name.split(' ')[0].toUpperCase()}:~$`,
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
      <a class="social-btn cyber-border" href="${link}" target="_blank">
        <span class="social-icon-box">${meta.emoji}</span>
        <span>${meta.label}</span>
      </a>
    `,
    postSocialRender: (linkCount) => {
      const aboutSocialsBlock = document.getElementById('about-socials-block');
      const bioBlock = document.querySelector('.bio-block');
      if (linkCount === 0) {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'none';
        if (bioBlock) bioBlock.style.gridColumn = 'span 2';
      } else {
        if (aboutSocialsBlock) aboutSocialsBlock.style.display = 'block';
        if (bioBlock) bioBlock.style.gridColumn = '';
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
      <div class="project-card cyber-border">
        <img class="project-thumbnail" src="${p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'}" alt="${p.title}">
        <div class="project-content">
          <h3>${p.title}</h3>
          <p>${p.description || ''}</p>
          ${p.link ? `<a class="project-link" href="${p.link}" target="_blank">Explore Repository →</a>` : ''}
        </div>
      </div>
    `,
    renderExpItem: (e) => `
      <div class="timeline-item">
        <div class="timeline-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${e.image ? `<img src="${e.image}" class="experience-image" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px; border: 1px solid var(--neon);" />` : ""}
            <h3>${e.company}</h3>
          </div>
          <span class="timeline-badge">${e.role || 'Lead Role'}</span>
        </div>
        <div class="timeline-body">${e.description || ''}</div>
      </div>
    `,
    renderSkillItem: (s) => `
      <div class="skill-card cyber-border">
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
