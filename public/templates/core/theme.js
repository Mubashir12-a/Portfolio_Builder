// ═══ Centralized Theme Management Engine ═══

/**
 * Initializes light/dark theme switching and persistence for a specific template
 * @param {string} templateId - Unique ID of the template (e.g. 'template1')
 * @param {string} defaultTheme - Default theme mode ('dark' or 'light')
 */
function initTheme(templateId, defaultTheme = 'dark') {
  const themeToggle = document.getElementById('theme-toggle');
  const storageKey = `${templateId}-theme`;

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
    localStorage.setItem(storageKey, theme);
  }

  // Load saved theme or fallback to default
  const savedTheme = localStorage.getItem(storageKey) || defaultTheme;
  setTheme(savedTheme);

  if (themeToggle) {
    // Remove old listeners to avoid duplicates, then add fresh listener
    const newToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newToggle, themeToggle);
    
    newToggle.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
      setTheme(currentTheme);
    });
  }
}

if (typeof window !== 'undefined') {
  window.initTheme = initTheme;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initTheme };
}
