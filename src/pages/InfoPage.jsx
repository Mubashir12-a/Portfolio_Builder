import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/LandingPageComponents/header.jsx';
import Footer from '../components/LandingPageComponents/footer.jsx';
import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';
import '../pagesStyles/infoPage.css';

const CONTENT = {
  docs: {
    title: 'Documentation',
    subtitle: 'The comprehensive guide to mastering the Portfolio Builder platform.',
    sections: [
      {
        h: '1. Onboarding & Data Collection',
        p: 'Our unique multi-step wizard is designed to capture your professional essence without overwhelming you. In Step 1, define your core identity (Name, Bio, Profile Picture). In Step 2, map your digital footprint with social media handles. Step 3 focuses on your technical and soft skills, while Step 4 captures your contact details. This data is then securely stored in our MongoDB cluster, ready to be injected into any template you choose.'
      },
      {
        h: '2. The Template Engine',
        p: 'Each template in our gallery is built using a "Live Injection" system. When you select a template, your stored data is instantly mapped to the design components. You can switch between Modern, Minimal, and Professional layouts in real-time without ever re-entering your information.'
      },
      {
        h: '3. Advanced Export Options',
        p: 'We offer three tiers of export: (1) PNG Screenshots for quick social sharing, (2) Semantic PDF resumes for job applications, and (3) Full Source Code (HTML/CSS/React) for hosting on your own servers. Pro users receive the React/JSX bundle, which includes a pre-configured Vite project structure.'
      },
      {
        h: '4. Hosting and Deployment',
        p: 'If you export your code, you can deploy it for free using services like GitHub Pages, Vercel, or Netlify. Simply drag and drop your exported folder into their deployment dashboards. For those who want zero-hassle hosting, our Pro plan includes automated deployment to a custom subdomain (yourname.portfoliobuilder.com).'
      }
    ]
  },
  tips: {
    title: 'Pro Tips',
    subtitle: 'Strategic advice to help you stand out in a crowded job market.',
    sections: [
      {
        h: 'Building for the 6-Second Scan',
        p: 'Research shows recruiters spend an average of 6 seconds on their initial scan of a resume or portfolio. Place your most impressive skill and your most complex project in the "Above the Fold" section (the area visible without scrolling). Use our "Executive Suite" or "Modern Dark" templates to ensure your key value proposition is front and center.'
      },
      {
        h: 'The "Student" Advantage',
        p: 'If you lack commercial experience, treat your education and personal projects as your "Job." Use the project description fields to explain the *problem* you solved, the *stack* you used, and the *result* you achieved. A well-documented personal project often carries more weight than a generic internship.'
      },
      {
        h: 'SEO for Portfolios',
        p: 'If you are using a custom domain, ensure your Bio includes keywords related to your field (e.g., "Full Stack Developer", "UI Designer"). Our platform automatically generates semantic HTML meta tags based on your profile info to help you rank higher on Google search results.'
      }
    ]
  },
  faq: {
    title: 'FAQ',
    subtitle: 'Common questions about accounts, billing, and technical features.',
    sections: [
      {
        h: 'Can I change my data after I finish the wizard?',
        p: 'Absolutely. You can return to the "Collect Info" section at any time to update your bio, skills, or contact details. Your live portfolio will reflect these changes instantly.'
      },
      {
        h: 'What happens if my subscription expires?',
        p: 'If your Studio or Pro subscription ends, your account will revert to the Free tier. You will still have access to your primary portfolio, but advanced features like React exports and premium templates will be locked until you renew.'
      },
      {
        h: 'How secure is my data?',
        p: 'We use industry-standard encryption for all data transit. Your passwords are never stored in plain text (we use bcrypt hashing), and your session is protected by a secure JWT (JSON Web Token).'
      },
      {
        h: 'Do you offer a refund policy?',
        p: 'Since we process payments manually via UPI to keep costs low for students, we handle refunds on a case-by-case basis. If you are not satisfied with your plan within the first 48 hours, contact our support team.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Transparent data practices for a secure experience.',
    sections: [
      {
        h: 'Information We Collect',
        p: 'We collect personal information that you voluntarily provide, including your name, email address, and professional details. We also collect non-identifiable usage data to help us improve the platform experience.'
      },
      {
        h: 'How We Use Your Data',
        p: 'Your data is used exclusively to generate your portfolio and manage your account. We never sell your personal information to third-party advertisers or data brokers.'
      },
      {
        h: 'Third-Party Services',
        p: 'We use Cloudinary for secure image hosting and MongoDB Atlas for database management. These services comply with global privacy standards (GDPR/CCPA) to ensure your assets are protected.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'The legal framework for using our platform.',
    sections: [
      {
        h: 'Acceptable Use',
        p: 'By using Portfolio Builder, you agree not to upload content that is defamatory, obscene, or infringes on intellectual property rights. We reserve the right to terminate accounts that violate these guidelines.'
      },
      {
        h: 'Subscription & Payments',
        p: 'Payments for premium tiers are made manually. Access is granted once the transaction is verified by our admin team. Subscriptions are non-transferable.'
      },
      {
        h: 'Limitation of Liability',
        p: 'Portfolio Builder is provided "as is." While we strive for 99.9% uptime, we are not responsible for any data loss or business interruption resulting from service outages.'
      }
    ]
  }
};

export default function InfoPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const data = CONTENT[type] || CONTENT['docs'];

  return (
    <div className="info-page">
      <Header comp={() => <Btn_Primary title={"Home"} to={"/"} />} />

      <main className="info-main">
        <div className="info-hero">
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>

        <div className="info-content">
          {data.sections.map((s, i) => (
            <section key={i} className="info-section">
              <h2>{s.h}</h2>
              <div className="info-body">
                <p>{s.p}</p>
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
