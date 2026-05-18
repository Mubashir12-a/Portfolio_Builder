// ═══ Centralized Dynamic Portfolio Hydration Loop ═══

/**
 * Bootstraps and hydratively renders a specific template based on its configuration
 * @param {Object} config - Template-specific rendering config and lifecycle hooks
 */
function renderPortfolio(config) {
  const isProfileMode = !!window.portfolioData;
  // Get normalized data - resolves to stock fallback if no window.portfolioData exists
  const data = normalizePortfolioData(isProfileMode ? window.portfolioData : null);

  console.log(`[Core Engine] Bootstrapping ${config.id} in ${isProfileMode ? 'PROFILE' : 'STOCK'} mode.`);

  // 1. Persistent Theme Management Setup
  if (typeof initTheme === 'function') {
    initTheme(config.id, config.defaultTheme || 'dark');
  }

  // 2. Base Fields Hydration (Name, Title, Footer)
  if (data.name) {
    safeSetText('#user-name', data.name);
    document.title = `${data.name} | ${config.titleSuffix || 'Specs'}`;
    
    if (config.logoBuilder) {
      safeSetText('#logo-text', config.logoBuilder(data.name));
    } else {
      safeSetText('#logo-text', data.name);
    }
    
    safeSetText('#footer-name', data.name);
  }

  safeSetText('#user-bio', data.about);
  
  if (data.about) {
    const roleText = isProfileMode 
      ? (data.role || "Software Professional") 
      : (config.stockRole || "Full-Stack Architect & Product Engineer");
    safeSetText('#user-role', roleText);
  }

  if (data.profileImage) {
    safeSetSrc('#user-image', data.profileImage, config.profileImageFallback || "");
  }

  // 3. Contact Details Hydration with Autohide
  const hasLoc = hasValue(data.location);
  if (hasLoc) {
    safeSetText('#user-location', data.location);
  }
  toggleSectionVisibility('#meta-location-container', null, hasLoc);

  const hasPhone = hasValue(data.phone);
  if (hasPhone) {
    safeSetText('#user-phone', data.phone);
    safeSetHref('#user-phone', `tel:${data.phone}`);
  }
  toggleSectionVisibility('#meta-phone-container', null, hasPhone);

  const hasEmail = hasValue(data.email);
  if (hasEmail) {
    safeSetText('#user-email', data.email);
    safeSetHref('#user-email', `mailto:${data.email}`);
  }
  toggleSectionVisibility('#meta-email-container', null, hasEmail);

  // 4. Social Links Hydration with Autohide
  const socialsContainer = document.querySelector('#socials-container');
  if (socialsContainer && typeof config.renderSocialItem === 'function') {
    socialsContainer.innerHTML = '';
    let linkCount = 0;
    const links = data.socialLinks || {};

    const socialMeta = config.socialMeta || {
      github: { label: 'GitHub' },
      linkedin: { label: 'LinkedIn' },
      instagram: { label: 'Instagram' },
      facebook: { label: 'Facebook' },
      portfolio: { label: 'Portfolio' },
      extra: { label: 'Link' }
    };

    Object.entries(socialMeta).forEach(([key, meta]) => {
      if (hasValue(links[key])) {
        linkCount++;
        const cardHtml = config.renderSocialItem(key, links[key], meta);
        if (typeof cardHtml === 'string') {
          socialsContainer.insertAdjacentHTML('beforeend', cardHtml);
        }
      }
    });

    const socialBlock = document.querySelector('#about-socials-block');
    if (socialBlock) {
      socialBlock.style.display = linkCount > 0 ? '' : 'none';
    }

    if (config.postSocialRender) {
      config.postSocialRender(linkCount);
    }
  }

  // 5. Section Hydrations (Education, Projects, Experience, Skills)
  const sections = [
    {
      key: 'education',
      containerSelector: '#education-container',
      sectionSelector: '#education',
      navSelector: '#nav-education',
      renderFn: config.renderEduItem
    },
    {
      key: 'projects',
      containerSelector: '#projects-container',
      sectionSelector: '#projects',
      navSelector: '#nav-projects',
      renderFn: config.renderProjItem
    },
    {
      key: 'experience',
      containerSelector: '#experience-container',
      sectionSelector: '#experience',
      navSelector: '#nav-experience',
      renderFn: config.renderExpItem
    },
    {
      key: 'skills',
      containerSelector: '#skills-container',
      sectionSelector: '#skills',
      navSelector: '#nav-skills',
      renderFn: config.renderSkillItem
    }
  ];

  sections.forEach(sec => {
    const list = data[sec.key] || [];
    const container = document.querySelector(sec.containerSelector);
    const isValid = list.length > 0 && typeof sec.renderFn === 'function';

    if (container && isValid) {
      container.innerHTML = list.map(item => sec.renderFn(item)).join('');
      toggleSectionVisibility(sec.sectionSelector, sec.navSelector, true);
    } else {
      toggleSectionVisibility(sec.sectionSelector, sec.navSelector, false);
      if (isProfileMode) {
        console.warn(`[Core Engine] ${sec.key.toUpperCase()} section skipped: empty data.`);
      }
    }
  });

  // 6. Set current copyright year
  const yearEl = document.querySelector('#footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  console.log(`[Core Engine] ${config.id} hydration complete.`);
}

if (typeof window !== 'undefined') {
  window.renderPortfolio = renderPortfolio;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderPortfolio };
}
