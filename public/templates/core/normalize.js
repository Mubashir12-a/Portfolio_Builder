// ═══ Universal Portfolio Normalization Engine ═══

/**
 * Premium Mock Data for Stock Mode
 */
const STOCK_DATA = {
  name: "Mubashir Ahmad",
  profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
  about: "I craft high-performance, pixel-perfect web experiences with modern architecture and cutting-edge aesthetics.",
  phone: "+44 7911 123456",
  email: "mubashir.ahmad@example.com",
  location: "London, United Kingdom",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    portfolio: "https://example.com",
    extra: "https://google.com"
  },
  education: [
    { level: "Master of Science", name: "Oxford University", address: "Oxford, UK", status: "First Class Honors" },
    { level: "Bachelor of Engineering", name: "Imperial College London", address: "London, UK", status: "Distinction" }
  ],
  projects: [
    { title: "AI Portfolio Builder", description: "Next-gen responsive developer workspace with modular template compilers.", link: "https://github.com", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600" },
    { title: "DeFi Liquidity Engine", description: "High-throughput algorithmic transaction ledger running on Solidity.", link: "https://github.com", image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600" },
    { title: "SaaS Design System", description: "A gorgeous, cohesive HSL-styled micro-component design token architecture.", link: "https://github.com", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600" }
  ],
  experience: [
    { company: "Google Deepmind", description: "Spearheaded premium frontend components, layout optimization, and high-end AI rendering systems.", certificate: "Senior Frontend Architect" },
    { company: "Stripe Payments", description: "Developed highly extensible dashboard components and custom client SDK configurations.", certificate: "Lead Product Engineer" }
  ],
  skills: [
    { name: "React.js", progress: 95 },
    { name: "TypeScript", progress: 90 },
    { name: "Tailwind CSS", progress: 85 },
    { name: "Node.js", progress: 88 },
    { name: "System Design", progress: 92 }
  ]
};

/**
 * Helper to identify if a field contains an image URL (e.g. from Cloudinary)
 */
function isImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim().toLowerCase();
  return clean.startsWith('http://') || 
         clean.startsWith('https://') || 
         clean.includes('cloudinary.com') ||
         /\.(jpeg|jpg|gif|png|webp|svg)/i.test(clean);
}

/**
 * Normalizes raw dashboard data or handles mock data fallback
 */
function normalizePortfolioData(rawData) {
  if (!rawData) return STOCK_DATA;

  // Handle checking name
  let rawName = rawData.fullName || rawData.name || "";
  if (rawName === "Developer Guest") {
    rawName = ""; // Empty out guest name so it handles fallback cleanly
  }

  return {
    name: rawName || "",
    profileImage: rawData.profileImage || "",
    about: rawData.about || rawData.bio || "",
    phone: rawData.phone || "",
    email: rawData.email || "",
    location: rawData.location || rawData.address || "",
    socialLinks: {
      github: rawData.socialLinks?.github || rawData.github || "",
      linkedin: rawData.socialLinks?.linkedin || rawData.linkedin || "",
      instagram: rawData.socialLinks?.instagram || rawData.instagram || "",
      facebook: rawData.socialLinks?.facebook || rawData.facebook || "",
      portfolio: rawData.socialLinks?.portfolio || rawData.portfolio || "",
      extra: rawData.socialLinks?.extra || rawData.extra || ""
    },
    education: Array.isArray(rawData.education) 
      ? rawData.education
          .map(e => ({
            level: e.level || "",
            name: e.name || "",
            address: e.address || "",
            status: e.status || ""
          }))
          .filter(e => e.name && e.name.trim() !== "") 
      : [],
    projects: Array.isArray(rawData.projects) 
      ? rawData.projects
          .map(p => ({
            title: p.title || "",
            description: p.description || "",
            link: p.link || "",
            image: p.image || ""
          }))
          .filter(p => p.title && p.title.trim() !== "") 
      : [],
    experience: Array.isArray(rawData.experience) 
      ? rawData.experience
          .map(e => {
            const rawCert = e.certificate || "";
            const rawImage = e.image || e.companyImage || "";
            const certIsImage = isImageUrl(rawCert);
            
            const resolvedImage = rawImage || (certIsImage ? rawCert : "");
            const resolvedRole = e.role || e.position || (!certIsImage ? rawCert : "") || "";
            const resolvedCertText = !certIsImage ? rawCert : "";

            return {
              company: e.company || "",
              role: resolvedRole,
              description: e.description || "",
              image: resolvedImage, // Map dynamic Cloudinary image
              certificate: resolvedCertText
            };
          })
          .filter(e => e.company && e.company.trim() !== "") 
      : [],
    skills: Array.isArray(rawData.skills) 
      ? rawData.skills
          .map(s => ({
            name: s.name || "",
            progress: parseInt(s.progress) || 90
          }))
          .filter(s => s.name && s.name.trim() !== "") 
      : []
  };
}

// Make available globally in both browser contexts and node exports
if (typeof window !== 'undefined') {
  window.STOCK_DATA = STOCK_DATA;
  window.normalizePortfolioData = normalizePortfolioData;

  // Initialize unified PORTFOLIO_CONTEXT if not injected by parent shell
  if (!window.__PORTFOLIO_CONTEXT__) {
    const pathMatch = window.location.pathname.match(/template(\d+)/);
    const templateIdStr = pathMatch ? `template${pathMatch[1]}` : 'template1';
    const rawData = window.portfolioData || null;
    
    window.__PORTFOLIO_CONTEXT__ = {
      mode: rawData ? "profile" : "stock",
      data: normalizePortfolioData(rawData),
      templateId: templateIdStr,
      previewState: false
    };
  } else {
    // If the context exists, make sure data is fully normalized
    if (window.__PORTFOLIO_CONTEXT__.mode === 'profile' && window.__PORTFOLIO_CONTEXT__.data) {
      window.__PORTFOLIO_CONTEXT__.data = normalizePortfolioData(window.__PORTFOLIO_CONTEXT__.data);
    } else {
      window.__PORTFOLIO_CONTEXT__.data = STOCK_DATA;
    }
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STOCK_DATA, normalizePortfolioData };
}
