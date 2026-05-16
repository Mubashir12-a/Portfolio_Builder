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
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'The Rise of Neo-Brutalism in Web Design',
    date: 'Sep 28, 2026',
    excerpt: 'Explore why bold borders, high contrast, and raw layouts are making a comeback. We discuss how to balance these aggressive styles with user-friendly accessibility principles.',
    category: 'Design',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Scaling our Backend: From 100 to 10,000 Users',
    date: 'Sep 15, 2026',
    excerpt: 'A technical deep-dive into how our senior backend engineer, Abrar, optimized our Node.js environment and MongoDB indexing to handle the influx of new builders.',
    category: 'Engineering',
    readTime: '12 min read'
  }
];

export default function BlogPage() {
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
                <button className="read-more">Read Full Story →</button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
