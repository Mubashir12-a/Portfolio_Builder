// ═══ General Portfolio Helper Utilities ═══

/**
 * Checks if a dynamic value is non-empty and valid
 * Supports strings, arrays, objects, and numbers
 */
function hasValue(v) {
  if (v === undefined || v === null) return false;
  if (typeof v === 'string') return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'object') return Object.keys(v).length > 0;
  return true;
}

/**
 * Safely sets the text content of a DOM element selected by query
 */
function safeSetText(selector, text) {
  const el = document.querySelector(selector);
  if (el) {
    el.textContent = text || "";
  }
}

/**
 * Safely sets the href of a link element
 */
function safeSetHref(selector, href) {
  const el = document.querySelector(selector);
  if (el) {
    if (href) {
      el.href = href;
    } else {
      el.removeAttribute('href');
    }
  }
}

/**
 * Safely sets the src of an image element, with optional fallback
 */
function safeSetSrc(selector, src, fallback = "") {
  const el = document.querySelector(selector);
  if (el) {
    el.src = src || fallback;
  }
}

if (typeof window !== 'undefined') {
  window.hasValue = hasValue;
  window.safeSetText = safeSetText;
  window.safeSetHref = safeSetHref;
  window.safeSetSrc = safeSetSrc;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { hasValue, safeSetText, safeSetHref, safeSetSrc };
}
