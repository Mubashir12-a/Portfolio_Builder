import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/LandingPageComponents/header.jsx';
import Footer from '../components/LandingPageComponents/footer.jsx';
import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';
import '../pagesStyles/teamMemberPage.css';

import MubashirImg from '../assets/MubashirProPic.jpeg';
import HammadImg from '../assets/HammadProPic.jpeg';
import AbrarImg from '../assets/AbrarProPic.jpeg';

const TEAM_DATA = {
  mubashir: {
    name: 'Mubashir',
    role: 'Founder & Lead Architect',
    image: MubashirImg,
    bio: 'A visionary developer with a passion for simplifying complex digital workflows. Mubashir founded Portfolio Builder to bridge the gap between technical expertise and professional presentation.',
    detailedBio: 'With over 5 years of experience in full-stack development, Mubashir has a deep understanding of the modern web ecosystem. He serves as the primary architect of the platform, overseeing everything from the initial system design to the final UI polish. His philosophy centers on "Functional Elegance"—creating tools that are as beautiful as they are powerful.',
    responsibilities: [
      'Core System Architecture & Logic',
      'API Design and Implementation',
      'Advanced React Component Development',
      'Technology Stack Selection & Optimization',
      'Overall Project Supervision & Quality Control',
      'Backend Logic Support & Debugging'
    ],
    highlights: [
      'Designed the proprietary Template Engine that powers all portfolios.',
      'Implemented the secure authentication and JWT-based session management.',
      'Led the transition from static layouts to the current dynamic, multi-step builder.'
    ],
    skills: ['React.js', 'Node.js', 'System Architecture', 'UI/UX Design', 'Cloud Infrastructure', 'Next.js'],
    social: { github: '#', linkedin: '#', twitter: '#' }
  },
  abrar: {
    name: 'Abrar',
    role: 'Senior Backend Engineer',
    image: AbrarImg,
    bio: 'An expert in building secure, high-performance server-side applications. Abrar ensures the foundation of Portfolio Builder is rock-solid and infinitely scalable.',
    detailedBio: 'Abrar specializes in Node.js and distributed systems. He is responsible for the heavy lifting behind the scenes, including our custom subscription engine, manual payment verification workflows, and secure data transit protocols. His work ensures that user data is handled with the highest level of integrity.',
    responsibilities: [
      'Server-Side Logic & Business Rules',
      'Authentication Flows & JWT Security',
      'Subscription & Payment Engine Development',
      'API Performance Monitoring & Tuning',
      'Database Security & Access Control'
    ],
    highlights: [
      'Built the manual UPI verification system for secure subscription processing.',
      'Architected the backend middleware for protecting sensitive user routes.',
      'Optimized the server response times by over 40% through intelligent caching.'
    ],
    skills: ['Node.js', 'Express', 'JWT Auth', 'RESTful APIs', 'Security Auditing', 'Redis'],
    social: { github: '#', linkedin: '#', twitter: '#' }
  },
  hammad: {
    name: 'Hammad',
    role: 'Database & Cloud Specialist',
    image: HammadImg,
    bio: 'The data mastermind. Hammad ensures our database is efficient, scalable, and secure. He specializes in document-based database architecture and optimization.',
    detailedBio: 'Hammad is a MongoDB specialist who thrives on solving complex data modeling challenges. From designing the initial user schemas to implementing Cloudinary-backed image storage, his expertise is vital to the platforms performance. He focuses on making sure the "Portfolio Engine" can handle thousands of concurrent users without a hitch.',
    responsibilities: [
      'MongoDB Schema Design & Data Modeling',
      'Cloudinary Integration for Image Assets',
      'Database Performance Optimization & Indexing',
      'Data Backup & Disaster Recovery Planning',
      'API Integration for Data Persistence'
    ],
    highlights: [
      'Developed the multi-step data persistence layer for the onboarding wizard.',
      'Implemented an optimized indexing strategy for fast user searches in the Admin Panel.',
      'Successfully migrated thousands of assets to a cloud-based CDN for faster loading.'
    ],
    skills: ['MongoDB', 'NoSQL', 'Mongoose', 'Cloudinary', 'Data Science', 'AWS'],
    social: { github: '#', linkedin: '#', twitter: '#' }
  }
};

export default function TeamMemberPage() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const member = TEAM_DATA[memberId?.toLowerCase()];

  if (!member) {
    return <div className="error-page" style={{color: 'var(--text)', background: 'var(--bg)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Member not found</div>;
  }

  return (
    <div className="team-detail-page">
      <Header comp={() => <Btn_Primary title={"Home"} to={"/"} />} />
      
      <main className="team-detail-main">
        <section className="profile-hero">
          <div className="profile-container">
            <div className="profile-image">
               <img src={member.image} alt={member.name} />
               <div className="glow-effect"></div>
            </div>
            <div className="profile-info">
              <div className="role-tag">{member.role}</div>
              <h1>{member.name}</h1>
              <p className="bio">{member.bio}</p>
              
              <div className="social-links">
                 <button onClick={() => window.open(member.social.github)}>GitHub</button>
                 <button onClick={() => window.open(member.social.linkedin)}>LinkedIn</button>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-details">
          <div className="detailed-bio-section">
             <h3>✦ The Story</h3>
             <p>{member.detailedBio}</p>
          </div>

          <div className="detail-grid">
             <div className="detail-section">
                <h3>✦ Key Responsibilities</h3>
                <ul>
                  {member.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
             </div>
             <div className="detail-section">
                <h3>✦ Career Highlights</h3>
                <ul>
                  {member.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
             </div>
             <div className="detail-section full-width">
                <h3>✦ Technical Toolkit</h3>
                <div className="skills-cloud">
                  {member.skills.map((s, i) => <span key={i}>{s}</span>)}
                </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
