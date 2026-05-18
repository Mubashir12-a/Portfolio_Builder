// ═══ Template Feature and Capability Registry ═══

const TEMPLATE_REGISTRY = {
  template1: {
    id: "template1",
    name: "Modern Dark",
    themeKey: "template1-theme",
    styleIdentity: "Modern Tech Developer Portfolio",
    supportedFeatures: ["particles", "darkmode", "socials", "timelines"],
    animationCapabilities: { particles: true, customScroll: true },
    performanceSettings: { maxParticles: 60, mobileReduction: true }
  },
  template2: {
    id: "template2",
    name: "Minimal White",
    themeKey: "template2-theme",
    styleIdentity: "Elegant Minimal Editorial Portfolio",
    supportedFeatures: ["darkmode", "socials", "clean-layout"],
    animationCapabilities: { hoverFeedback: true },
    performanceSettings: { mobileReduction: false }
  },
  template3: {
    id: "template3",
    name: "Glassmorphism",
    themeKey: "template3-theme",
    styleIdentity: "Futuristic Glassmorphic specs Portfolio",
    supportedFeatures: ["parallax-orbs", "darkmode", "glassmorphism", "socials"],
    animationCapabilities: { orbParallax: true, hoverGlow: true },
    performanceSettings: { mobileReduction: true, disableExpensiveEffectsOnMobile: true }
  },
  template4: {
    id: "template4",
    name: "Creative Studio",
    themeKey: "template4-theme",
    styleIdentity: "Playful Neo-Brutalist Portfolio",
    supportedFeatures: ["hover-physics", "darkmode", "neo-borders", "socials"],
    animationCapabilities: { cardPhysics: true },
    performanceSettings: { mobileReduction: false }
  },
  template5: {
    id: "template5",
    name: "Executive Suite",
    themeKey: "template5-theme",
    styleIdentity: "Corporate Business Resume",
    supportedFeatures: ["darkmode", "socials", "corporate-timeline"],
    animationCapabilities: { smoothTransitions: true },
    performanceSettings: { mobileReduction: false }
  },
  template6: {
    id: "template6",
    name: "Cyberpunk Terminal",
    themeKey: "template6-theme",
    styleIdentity: "Matrix Cyberpunk Hacker Terminal",
    supportedFeatures: ["matrix-rain", "darkmode", "terminal-layout", "socials"],
    animationCapabilities: { matrixRain: true },
    performanceSettings: { frameThrottle: 33, mobileReduction: true }
  }
};

if (typeof window !== 'undefined') {
  window.TEMPLATE_REGISTRY = TEMPLATE_REGISTRY;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TEMPLATE_REGISTRY };
}
