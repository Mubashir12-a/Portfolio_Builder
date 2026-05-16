import Header from '../components/LandingPageComponents/header.jsx';
import Footer from '../components/LandingPageComponents/footer.jsx';
import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';
import '../pagesStyles/techStackPage.css';

const STACK = [
  {
    category: 'Frontend Core',
    items: [
      { name: 'React.js', logo: 'https://cdn.simpleicons.org/react/61DAFB', desc: 'Component-based UI library for dynamic rendering.', details: 'Used for the multi-step wizard, live template previews, and state management.' },
      { name: 'JavaScript ES6+', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', desc: 'Modern scripting language for platform logic.', details: 'Asynchronous API calls, complex state updates, and interactive UI logic.' },
      { name: 'Vanilla CSS', logo: 'https://cdn.simpleicons.org/css3/1572B6', desc: 'Pure CSS3 for maximum design flexibility.', details: 'Custom glassmorphism effects, CSS variables for theme switching, and Syne/Orbitron typography.' },
      { name: 'Vite', logo: 'https://cdn.simpleicons.org/vite/646CFF', desc: 'Next-gen frontend tool for ultra-fast builds.', details: 'HMR (Hot Module Replacement) and optimized production bundling.' }
    ]
  },
  {
    category: 'Backend & Security',
    items: [
      { name: 'Node.js', logo: 'https://cdn.simpleicons.org/node.js/339933', desc: 'Scalable runtime for server-side operations.', details: 'Powers the core engine and handles high-concurrency requests.' },
      { name: 'Express.js', logo: 'https://cdn.simpleicons.org/express/000000/white', desc: 'Lightweight web framework for API routing.', details: 'Custom middleware for auth, rate limiting, and structured RESTful endpoints.' },
      { name: 'JWT', logo: 'https://cdn.simpleicons.org/jsonwebtokens/000000/white', desc: 'Secure JSON Web Tokens for authentication.', details: 'Stateless user sessions and secure route protection.' },
      { name: 'Bcrypt', logo: 'https://img.icons8.com/color/48/security-shield.png', desc: 'Cryptographic hashing for data security.', details: 'Ensures user passwords are never stored in plain text.' }
    ]
  },
  {
    category: 'Database & Assets',
    items: [
      { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248', desc: 'NoSQL database for flexible data modeling.', details: 'Stores user profiles, portfolio data, and template metadata.' },
      { name: 'Mongoose', logo: 'https://cdn.simpleicons.org/mongoose/880000', desc: 'Elegant MongoDB object modeling for Node.js.', details: 'Schema validation and simplified database queries.' },
      { name: 'Cloudinary', logo: 'https://cdn.simpleicons.org/cloudinary/3448C5', desc: 'Cloud-based image and video management.', details: 'Global CDN for fast asset delivery and real-time image transformations.' },
      { name: 'Multer', logo: 'https://img.icons8.com/color/48/upload-to-cloud.png', desc: 'Middleware for handling multipart form data.', details: 'Used for secure profile picture and project asset uploads.' }
    ]
  },
  {
    category: 'Infrastructure & Tools',
    items: [
      { name: 'Cloudflare', logo: 'https://cdn.simpleicons.org/cloudflare/F38020', desc: 'Performance and security at the edge.', details: 'DNS management, DDoS protection, and SSL/TLS encryption.' },
      { name: 'Render', logo: 'https://cdn.simpleicons.org/render/46E3B7', desc: 'Unified platform for hosting and deployment.', details: 'Automated CI/CD pipelines for both frontend and backend.' },
      { name: 'Resend', logo: 'https://img.icons8.com/color/48/email.png', desc: 'Email API for professional deliverability.', details: 'Used for OTP verification and transactional notifications.' },
      { name: 'Axios', logo: 'https://cdn.simpleicons.org/axios/5A29E4', desc: 'Promise-based HTTP client for API requests.', details: 'Handles all communication between the frontend and backend.' }
    ]
  }
];

export default function TechStackPage() {
  return (
    <div className="stack-page">
      <Header comp={() => <Btn_Primary title={"Home"} to={"/"} />} />
      
      <main className="stack-main">
        <section className="stack-hero">
          <div className="engine-tag">✦ THE ENGINE</div>
          <h1>Powered by <em>Modern Tech.</em></h1>
          <p>A deep dive into the architecture, tools, and libraries that make Portfolio Builder fast, secure, and reliable.</p>
        </section>

        <div className="stack-grid">
          {STACK.map((cat, idx) => (
            <div key={idx} className="stack-group">
              <h2 className="cat-title">{cat.category}</h2>
              <div className="items-grid">
                {cat.items.map((item, i) => (
                  <div key={i} className="tech-card">
                    <div className="tech-header">
                      <img src={item.logo} alt={item.name} className="tech-logo" />
                      <div className="tech-meta">
                        <h3>{item.name}</h3>
                        <p className="tech-desc">{item.desc}</p>
                      </div>
                    </div>
                    <div className="tech-details">
                      <h4>✦ Implementation</h4>
                      <p>{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
