import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/LandingPageComponents/header.jsx';
import Footer from '../components/LandingPageComponents/footer.jsx';
import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';
import '../pagesStyles/blogPage.css';

const POSTS = [
  {
    id: 1,
    title: 'How to build a portfolio that gets you hired in 2026',
    date: 'Oct 12, 2026',
    excerpt: 'The secret is not just the design, but the narrative you build around your work. Learn how to structure your projects using the STAR method (Situation, Task, Action, Result) to impress technical recruiters.',
    category: 'Guides',
    readTime: '5 min read',
    content: `
      <p>Technical recruiters look at dozens of portfolios daily. If yours is just a list of templates and generic screenshots, it goes straight to the archive. The secret of landing a 6-figure developer role in 2026 is <strong>narrative structure</strong>.</p>
      
      <h3>The STAR Method for Engineering Projects</h3>
      <p>Instead of saying "I built an ecommerce app with React", structure your project highlight section like a case study:</p>
      <ul>
        <li><strong>Situation:</strong> What real-world problem does this solve? (e.g., "Small retailers struggled with bloated checkout pipelines...")</li>
        <li><strong>Task:</strong> What was your exact technical challenge? (e.g., "Create a highly responsive, custom transaction layout...")</li>
        <li><strong>Action:</strong> What cutting-edge tools did you use and why? (e.g., "Implemented an HSL-styled micro-component system using modern React context...")</li>
        <li><strong>Result:</strong> What was the impact? (e.g., "Boosted conversion rates by 18% and reduced build payload size by 35KB.")</li>
      </ul>

      <h3>Key Principles to Stand Out:</h3>
      <p>1. <strong>Custom Domain & Branding:</strong> Deploying on a premium domain immediately elevates you from an entry-level applicant to a seasoned professional.</p>
      <p>2. <strong>Visual Proof over Assertions:</strong> Embed interactive previews, structural diagrams, or high-fidelity screenshots of your work. Action speaks louder than code comments.</p>
      <p>3. <strong>Vibrant Aesthetics:</strong> Do not use standard white-and-gray grids. Ensure your styling utilizes harmony palettes, modern typography (like Outfit or Space Grotesk), and subtle micro-animations that feel alive.</p>
    `
  },
  {
    id: 2,
    title: 'The Rise of Neo-Brutalism in Web Design',
    date: 'Sep 28, 2026',
    excerpt: 'Explore why bold borders, high contrast, and raw layouts are making a comeback. We discuss how to balance these aggressive styles with user-friendly accessibility principles.',
    category: 'Design',
    readTime: '8 min read',
    content: `
      <p>For the past decade, minimal flat design has dominated the web. However, a new challenger has emerged in 2026: <strong>Neo-Brutalism</strong>. Drawing inspiration from raw architectural movements, Neo-Brutalism stands out by breaking traditional UI rules with high-contrast, black-bordered components and striking HSL colors.</p>
      
      <h3>Why Neo-Brutalism Works:</h3>
      <p>In a sea of identical glassmorphic and clean corporate SaaS layouts, Neo-Brutalism commands immediate visual attention. Its core traits include:</p>
      <ul>
        <li>High-contrast heavy dark borders (typically 2px to 4px thick).</li>
        <li>Bold flat color patches instead of subtle modern gradients.</li>
        <li>Aggressive typography layout with extreme size contrasts.</li>
        <li>Offset hard solid dropshadows rather than soft blurry box shadows.</li>
      </ul>

      <h3>Balancing Aesthetics and Accessibility:</h3>
      <p>While Brutalism is highly eye-catching, it carries visual challenges. Always follow these rules to maintain a premium feel:</p>
      <p>1. <strong>Maintain Hierarchy:</strong> Just because a layout is raw doesn't mean it should be messy. Align items on a distinct grid layout.</p>
      <p>2. <strong>Contrast Control:</strong> Ensure text contrast meets WCAG AA standards. Bold contrast is good; flashing neon clashes are not.</p>
    `
  },
  {
    id: 3,
    title: 'Scaling our Backend: From 100 to 10,000 Users',
    date: 'Sep 15, 2026',
    excerpt: 'A technical deep-dive into how our senior backend engineer, Abrar, optimized our Node.js environment and MongoDB indexing to handle the influx of new builders.',
    category: 'Engineering',
    readTime: '12 min read',
    content: `
      <p>Building a prototype is easy. Running a high-performance developer platform that generates custom static zip downloads, handles Cloudinary profile uploads, and performs payment verifications for thousands of concurrent users requires a robust, scalable backend architecture. Here is how Abrar scaled our Node.js environment.</p>
      
      <h3>1. Database Indexing & Mongoose Tuning</h3>
      <p>Originally, user profile lookups took up to 350ms. By establishing smart single and compound indexes on key query selectors like <code>email</code> and Mongoose sub-arrays, query latencies plummeted to under 8ms.</p>
      
      <h3>2. Optimized Image Pipeline</h3>
      <p>Storing raw image payloads directly is a performance bottleneck. We switched to an memory-buffered Multer storage layout that streams raw assets directly to Cloudinary. This bypasses disk write actions, decreasing profile upload times by over 60%.</p>

      <h3>3. Clustering and Worker Threads</h3>
      <p>Since generating zip templates is a CPU-intensive operation (using JSZip to bundle HTML, CSS, and JS files), we isolated ZIP compiling workflows. This keeps the main event loop responsive to incoming API requests, eliminating request blocking entirely.</p>
    `
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="blog-page">
      <Header comp={() => <Btn_Primary title={"Home"} to={"/"} />} />
      
      <main className="blog-main">
        <section className="blog-hero">
          <div className="tag">✦ THE LOG</div>
          <h1>Builder <em>Insights.</em></h1>
          <p>Expert perspectives on design, engineering, and the future of professional portfolios.</p>
        </section>

        <div className="blog-grid">
          {POSTS.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-meta">
                <span className="blog-cat">{post.category}</span>
                <span className="blog-read">{post.readTime}</span>
              </div>
              <div className="blog-body">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
              <div className="blog-footer">
                <span className="blog-date">{post.date}</span>
                <button className="read-more" onClick={() => setSelectedPost(post)}>Read Full Story →</button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Glassmorphic Reading Modal Overlay */}
      {selectedPost && (
        <div className="blog-modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="blog-modal-content" onClick={e => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={() => setSelectedPost(null)} aria-label="Close Modal">×</button>
            <div className="blog-modal-header">
              <div className="blog-meta" style={{ marginBottom: '15px' }}>
                <span className="blog-cat">{selectedPost.category}</span>
                <span className="blog-read">{selectedPost.readTime}</span>
              </div>
              <h1 className="blog-modal-title">{selectedPost.title}</h1>
              <span className="blog-date">{selectedPost.date}</span>
            </div>
            <div className="blog-modal-body" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

