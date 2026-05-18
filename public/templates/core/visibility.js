// ═══ Section Visibility & Navbar Management Engine ═══

/**
 * Toggles visibility of a specific content section and its corresponding navigation link
 * @param {string} sectionSelector - DOM selector for the section element (e.g., '#education')
 * @param {string} navSelector - DOM selector for the nav link element (e.g., '#nav-education')
 * @param {boolean} isVisible - True to show, false to completely hide
 */
function toggleSectionVisibility(sectionSelector, navSelector, isVisible) {
  const sectionEl = document.querySelector(sectionSelector);
  const navEl = document.querySelector(navSelector);

  if (sectionEl) {
    if (isVisible) {
      // Revert to CSS default display style
      sectionEl.style.display = '';
    } else {
      sectionEl.style.display = 'none';
    }
  }

  if (navEl) {
    if (isVisible) {
      navEl.style.display = '';
    } else {
      navEl.style.display = 'none';
    }
  }
}

if (typeof window !== 'undefined') {
  window.toggleSectionVisibility = toggleSectionVisibility;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { toggleSectionVisibility };
}
