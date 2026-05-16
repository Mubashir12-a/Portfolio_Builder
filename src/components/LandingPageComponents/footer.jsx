import Bento   from '../../assets/Bento.png'
import Github  from '../../assets/Github.png'
import Insta   from '../../assets/Instagram.png'
import LinkedIn from '../../assets/LinkedIn.png'
import logo    from '../../assets/Logo.gif';
import { useNavigate } from 'react-router-dom';

export default function Footer(){
    const navigate = useNavigate();

    return (
        <>
            <footer>
              <section className='footerTop'>
                <div className="quickAbout">
                  <div className="iconName">
                    <img src={logo} alt="" />
                    <h3>Portfolio<em>Builder</em></h3>
                  </div>
                  <p>Build your online presence in minutes. No code, no fuss — just a beautiful portfolio that opens doors.</p>
                </div>

                <div className="Products footercard">
                  <h2>Product</h2>
                  <ul>
                    <li onClick={() => navigate('/templates')} style={{cursor:'pointer'}}>Templates</li>
                    <li onClick={() => navigate('/info/stack')} style={{cursor:'pointer'}}>Tech Stack</li>
                    <li onClick={() => navigate('/info/docs')} style={{cursor:'pointer'}}>Export Code</li>
                    <li onClick={() => navigate('/subscription')} style={{cursor:'pointer'}}>Pricing</li>
                  </ul>
                </div>

                <div className="Company footercard">
                  <h2>Company</h2>
                  <ul>
                    <li onClick={() => navigate('/')} style={{cursor:'pointer'}}>About</li>
                    <li onClick={() => navigate('/team/mubashir')} style={{cursor:'pointer'}}>Team</li>
                    <li onClick={() => navigate('/')} style={{cursor:'pointer'}}>Contact</li>
                    <li onClick={() => navigate('/blog')} style={{cursor:'pointer'}}>Blog</li>
                  </ul>
                </div>

                <div className="Legal footercard">
                  <h2>Legal</h2>
                  <ul>
                    <li onClick={() => navigate('/info/privacy')} style={{cursor:'pointer'}}>Privacy Policy</li>
                    <li onClick={() => navigate('/info/terms')} style={{cursor:'pointer'}}>Terms Of Use</li>
                    <li onClick={() => navigate('/info/faq')} style={{cursor:'pointer'}}>Cookie Policy</li>
                  </ul>
                </div>
              </section>

              <section className='footerBottom'>
                <p>© 2026 PortfolioBuilder. Developer Mubashir Ahmad.</p>
                <div>
                  <a href="https://bento.me" target="_blank" rel="noreferrer">
                    <img src={Bento} alt="Bento" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer">
                    <img src={Github} alt="GitHub" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <img src={Insta} alt="Instagram" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <img src={LinkedIn} alt="LinkedIn" />
                  </a>
                </div>
              </section>
            </footer>
        </>
    )
}