import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

/**
 * Responsive Live Portfolio Template Preview Workspace
 */
export default function TemplatePreviewPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const iframeRef = useRef(null);

  // Determine if private authenticated profile preview or public demo
  const isProfileMode = location.pathname.endsWith('/preview');
  const [device, setDevice] = useState('desktop'); // desktop, tablet, mobile
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [templateHtml, setTemplateHtml] = useState('');
  const [error, setError] = useState(null);

  // Retrieve current template details
  const getTemplateName = () => {
    const names = {
      template1: 'Modern Dark',
      template2: 'Minimal White',
      template3: 'Glassmorphism',
      template4: 'Creative Studio',
      template5: 'Executive Suite',
      template6: 'Cyberpunk Terminal'
    };
    return names[templateId] || 'Premium Portfolio';
  };

  // 1. Fetch user data (private mode) or load stock
  const loadUserData = async () => {
    if (!isProfileMode) {
      setUserData(null); // Will fallback to STOCK_DATA inside normalize.js
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Authentication required. Please log in first.");
        setLoading(false);
        setTimeout(() => navigate('/auth'), 2000);
        return;
      }

      // Check if there is local uncommitted onboarding data first for instant reactive reflection
      const localOnboarding = localStorage.getItem('portfolioUserData');
      if (localOnboarding) {
        setUserData(JSON.parse(localOnboarding));
        return;
      }

      // Fallback: Fetch latest profile from DB
      const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-builder-wgp1.onrender.com";
      const res = await fetch(`${apiUrl}/api/user/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success && data.user) {
        setUserData(data.user);
        // Persist locally for next checks
        localStorage.setItem('portfolioUserData', JSON.stringify(data.user));
      } else {
        setError("Failed to fetch profile settings.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error loading preview session.");
    }
  };

  // 2. Fetch original template template index HTML structure
  const fetchTemplateHtml = async () => {
    try {
      const res = await fetch(`/templates/${templateId}/index.html?t=${Date.now()}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      if (!res.ok) throw new Error("Index HTML not found.");
      const text = await res.text();
      setTemplateHtml(text);
    } catch (err) {
      console.error(err);
      setError(`Template structure files for [${templateId}] failed to load on public route.`);
    }
  };

  // Trigger loads on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([loadUserData(), fetchTemplateHtml()]).finally(() => {
      setLoading(false);
    });
  }, [templateId, isProfileMode]);

  // 3. STORAGE BUS LISTENERS - Hot Reload iframe as users edit form fields in onboarding!
  useEffect(() => {
    if (!isProfileMode) return;

    const handleStorageChange = (e) => {
      if (e.key === 'portfolioUserData') {
        console.log("[Live Preview Bus] Local onboarding data modified! Hot-reloading iframe.");
        try {
          if (e.newValue) {
            setUserData(JSON.parse(e.newValue));
          }
        } catch (err) {
          console.error("Failed to parse storage update", err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isProfileMode]);

  // 4. Construct Iframe HTML Injection
  const getIframeSrcdoc = () => {
    if (!templateHtml) return '';

    let html = templateHtml;

    // Inject base tag for relative path resolution
    const baseTag = `<base href="${window.location.origin}/templates/${templateId}/">`;
    html = html.replace("<head>", `<head>${baseTag}`);

    // Inject unified runtime context directly before core script bootstrap runs
    const context = {
      mode: isProfileMode ? 'profile' : 'stock',
      data: userData ? userData : null,
      templateId: templateId,
      previewState: true
    };
    const dataSnippet = `
<script>
  window.__PORTFOLIO_CONTEXT__ = ${JSON.stringify(context)};
</script>
<style id="preview-cloak">
  body { opacity: 0 !important; transition: opacity 0.2s ease; }
</style>
`;
    html = html.replace("</head>", `${dataSnippet}</head>`);

    return html;
  };

  // Device Widths
  const getDeviceWidth = () => {
    if (device === 'mobile') return '375px';
    if (device === 'tablet') return '768px';
    return '100%';
  };

  return (
    <div style={styles.page}>
      {/* Dynamic Navigation Header Panel */}
      <header style={styles.header}>
        <div style={styles.leftNav}>
          <button 
            style={styles.backBtn}
            onClick={() => navigate(isProfileMode ? '/dashboard' : '/templates')}
          >
            ← Back
          </button>
          <div style={styles.titleGroup}>
            <span style={styles.templateTitle}>{getTemplateName()}</span>
            <span style={styles.badge(isProfileMode)}>
              {isProfileMode ? '🟢 LIVE PROFILE' : '🌐 STOCK DEMO'}
            </span>
          </div>
        </div>

        {/* emulated Viewport selector buttons */}
        <div style={styles.deviceGroup}>
          <button 
            style={styles.deviceBtn(device === 'desktop')} 
            onClick={() => setDevice('desktop')}
            title="Desktop Emulation"
          >
            🖥️ Desktop
          </button>
          <button 
            style={styles.deviceBtn(device === 'tablet')} 
            onClick={() => setDevice('tablet')}
            title="Tablet Emulation"
          >
            📟 Tablet
          </button>
          <button 
            style={styles.deviceBtn(device === 'mobile')} 
            onClick={() => setDevice('mobile')}
            title="Mobile Emulation"
          >
            📱 Mobile
          </button>
        </div>

        <div style={styles.rightNav}>
          {isProfileMode && (
            <button 
              style={styles.editBtn}
              onClick={() => navigate('/collect-info')}
            >
              ✏️ Modify Details
            </button>
          )}
        </div>
      </header>

      {/* Frame container holding the template sandbox */}
      <div style={styles.previewContainer}>
        {loading ? (
          <div style={styles.loaderBox}>
            <div style={styles.spinner}></div>
            <p style={styles.loaderText}>Compiling design specs & core layout scripts...</p>
          </div>
        ) : error ? (
          <div style={styles.errorBox}>
            <h3 style={styles.errorTitle}>⚠️ Configuration Notice</h3>
            <p style={styles.errorText}>{error}</p>
            <button style={styles.backBtn} onClick={() => navigate('/templates')}>
              Return to Catalog
            </button>
          </div>
        ) : (
          <div style={styles.deviceFrame(device)}>
            <iframe 
              ref={iframeRef}
              title="Responsive Portfolio Sandbox"
              srcDoc={getIframeSrcdoc()}
              style={styles.iframe(device)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══ High-End UI Styles (Vanilla Styled CSS Object) ═══
const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#0a0b0d',
    color: '#f3f4f6',
    fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: 'rgba(15, 17, 23, 0.95)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    zIndex: 100,
    backdropFilter: 'blur(10px)'
  },
  leftNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  backBtn: {
    padding: '8px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#e5e7eb',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    }
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  templateTitle: {
    fontSize: '18px',
    fontWeight: '600',
    letterSpacing: '-0.3px',
    color: '#ffffff'
  },
  badge: (isActive) => ({
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '700',
    borderRadius: '12px',
    backgroundColor: isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
    color: isActive ? '#34d399' : '#60a5fa',
    border: `1px solid ${isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`
  }),
  deviceGroup: {
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: '4px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.06)'
  },
  deviceBtn: (active) => ({
    padding: '6px 14px',
    fontSize: '13px',
    fontWeight: '600',
    color: active ? '#ffffff' : '#9ca3af',
    backgroundColor: active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease'
  }),
  rightNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  editBtn: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.2s ease',
    outline: 'none',
    ':hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)'
    }
  },
  previewContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: '#050607',
    position: 'relative',
    overflow: 'hidden'
  },
  loaderBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(59, 130, 246, 0.1)',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loaderText: {
    color: '#9ca3af',
    fontSize: '14px'
  },
  errorBox: {
    padding: '32px',
    maxWidth: '450px',
    backgroundColor: '#0f1115',
    borderRadius: '16px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  errorTitle: {
    color: '#ef4444',
    fontSize: '20px',
    marginBottom: '12px',
    fontWeight: '600'
  },
  errorText: {
    color: '#9ca3af',
    fontSize: '15px',
    marginBottom: '24px',
    lineHeight: '1.5'
  },
  deviceFrame: (device) => {
    const isFull = device === 'desktop';
    return {
      width: isFull ? '100%' : device === 'tablet' ? '768px' : '375px',
      height: '100%',
      maxWidth: '100%',
      borderRadius: isFull ? '0px' : '24px',
      border: isFull ? 'none' : '10px solid #1f2937',
      boxShadow: isFull ? 'none' : '0 25px 50px -12px rgba(0,0,0,0.8)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#000000',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    };
  },
  iframe: (device) => ({
    width: '100%',
    height: '100%',
    border: 'none',
    flex: 1,
    backgroundColor: '#ffffff'
  })
};
