import Bento from '../../assets/Bento.png'
import Github from '../../assets/Github.png'
import Insta from '../../assets/Instagram.png'
import LinkedIn from '../../assets/LinkedIn.png'

import logo from '../../assets/Logo.gif';


export default function Footer(){
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
                    <li>Templates</li>
                    <li>Style Editor</li>
                    <li>Export Code</li>
                    <li>Pricing</li>
                  </ul>
                </div>

                <div className="Company footercard">
                  <h2>Company</h2>

                  <ul>
                    <li>About</li>
                    <li>Team</li>
                    <li>Contact</li>
                    <li>Blog</li>
                  </ul>
                </div>

                <div className="Legal footercard">
                  <h2>Legal</h2>

                  <ul>
                    <li>Privacy Policy</li>
                    <li>Terms Of Use</li>
                    <li>Cookie Policy</li>
                  </ul>
                </div>
              </section>

              <section className='footerBottom'>
                <p>© 2026 PortfolioBuilder. Developer Mubashir Ahmad.</p>
                <div>
                  <a href="http://">
                    <img src={Bento} alt="" />
                  </a>
                  <a href="http://">
                    <img src={Github} alt="" />
                  </a>
                  <a href="http://">
                    <img src={Insta} alt="" />
                  </a>
                  <a href="http://">
                    <img src={LinkedIn} alt="" />
                  </a>
                </div>
              </section>
            </footer>
        </>
    )
}