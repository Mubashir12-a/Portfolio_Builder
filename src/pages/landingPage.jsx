import '../pagesStyles/landingPage.css'
import logo from '../assets/Logo.png'
import ProfileImg from '../assets/profileImg.png'
import MubashirImg from '../assets/MubashirProPic.jpeg'
import HammadImg from '../assets/HammadProPic.jpeg'
import AbrarImg from '../assets/AbrarProPic.jpeg'
import Bento from '../assets/Bento.png'
import Github from '../assets/Github.png'
import Insta from '../assets/Instagram.png'
import LinkedIn from '../assets/LinkedIn.png'

import {useState} from 'react';

function LandingPage() {
  return (
    <>
      
        <div className="PageLayout">
            <header>
              <div className="logoContainer">
                  <img src={logo} alt="logo" />
                  <span className="logoName">Portfolio<em>Builder</em></span>
              </div>
              <div className="Buttons">
                  <button id='LoginBtn'>Login</button>
                  <button id='SubscripBtn'>Subscription</button>
                  <button onClick={toggleTheme} id='toggle'>☀️</button>
              </div>
            </header>

            <nav>
              <a href="#Home">Home</a>
              <a href="#About">About</a>
              <a href="#WAW">Who & Why</a>
              <a href="#credits">Credits</a>
              <a href="#GetInTouch">Feedback</a>
              <a href="#GetInTouch">Contact</a>
              <a href="#Resources">Resources</a>
            </nav>

            <section id='Home'>
              <div className='IntroSec'>
                <div className='versionInfo'>
                  <div>
                    Version 2.22.14 Public Beta
                  </div>
                </div>

                <div className='TagLine'>
                  <div>
                    <em>Your Portfolio,</em>
                    <span>Without The Code.</span>
                  </div>
                </div>

                <div className='IntroPara'>
                  <p>Pick a template, fill in your story, and publish a professional portfolio in minutes — no coding required. Built for students, freshers & creators.</p>
                </div>

                <div className='RedirectBtns'>
                  <button>☣ Build My PortFolio</button>
                  <button>Browse Templates →</button>
                </div>
                
                <div className='feedCard'>
                  <div>
                    <span>2<strong>K+</strong></span>
                    <p>Portfolios built</p>
                  </div>
                  <div>
                    <span>12<strong>+</strong></span>
                    <p>Templates</p>
                  </div>
                  <div>
                    <span>4<strong>min</strong></span>
                    <p>Average setup</p>
                  </div>
                </div>
              </div>

              <div className='AttractSec'>
                <div className='AttractBlock'>
                  <div className="float">
                  <p>✔ Published</p>
                </div>
                <div className='URLHead'>
                  <div className='dots'>
                    <span></span><span></span><span></span>
                  </div>
                  <div className='Dem-URL'>
                    <p>https://portfoliobuilder.app/MubashirAhmad</p>
                  </div>
                </div>
                <div className='Container'>
                  <div className="AttractProfile">
                    <img src={ProfileImg} alt="" />
                    <div>
                      <p>Mubashir Ahmad</p>
                      <p>MERN-Stack Developer</p>
                    </div>
                  </div>
                  <div className="AttractSkill">
                    <span>React.js</span>
                    <span>Node.js</span>
                    <span>JavaScript</span>
                  </div>
                  <div className="AttractProject">
                    <div>Wheather Web-App</div>
                    <div>E-Com Web-App</div>
                    <div>DashBoard</div>
                  </div>
                </div>
                </div>
              </div>
            </section>


            <section id="About">
              <div className="heading">
                <h2>✦ About the Platform</h2>
              </div>

              <div className="container">
                <div className='Left'>
                  <div className="HeadTag">
                    <h3>What is <br/><em>Portfolio Builder?</em></h3>
                  </div>
                  <div className="Para">
                    <p>Portfolio Builder is a web platform that empowers students, developers, and professionals to create polished, shareable portfolio websites — without writing a single line of code.</p>
                  </div>
                  <div className="cards">
                    <div className='card card1'>
                      <span>🎨</span>
                      <div>
                        <h5>Pick a Template</h5>
                        <p>Choose from 12+ professionally designed templates suited to every style.</p>
                      </div>
                    </div>
                    <div className='card card2'>
                      <span>✍️</span>
                      <div>
                        <h5>Fill Your Details</h5>
                        <p>Add projects, skills, experience, and links through a guided form flow.</p>
                      </div>
                    </div>
                    <div className='card card3'>
                      <span>🚀</span>
                      <div>
                        <h5>Build & Share</h5>
                        <p>Get a live portfolio link instantly. Share it in applications, LinkedIn, or anywhere.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='Right'>
                  <div className="parentCard">
                    <div className='cont-1'> 
                      <span>12+</span>
                      <p>Beautiful templates for every role and industry</p>
                    </div>
                    <div  className='cont-2'>
                      <div>
                        <span>80%</span>
                        <p>No coding needed</p>
                      </div>
                      <div>
                        <span>Free</span>
                        <p>Free trail limited features</p>
                      </div>
                    </div>
                    <div  className='cont-3'>
                      <span>4 min</span>
                      <p>Average time to Build</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <section id="WAW">
              <div className="heading">
                <h2>✦ Who & Why</h2>
              </div>

              <div className="title">
                <p>Built <em>for you,</em><br/>If you're one of these.</p>
              </div>

              <div className="container">
                <div className="card card_1">
                  <span>🎓</span>
                  <h6>Students</h6>
                  <p>Just graduated or still studying? Stand out from the crowd with a portfolio that shows your projects and potential before you even have work experience.</p>
                </div>
                <div className="card card_2">
                  <span>💼</span>
                  <h6>Freshers & Job Seekers</h6>
                  <p>Recruiters Google you. Make what they find count. A polished portfolio link on your resume or LinkedIn drastically improves callback rates.</p>
                </div>
                <div className="card card_3">
                  <span>🎨</span>
                  <h6>Creators & Freelancers</h6>
                  <p>Designers, writers, photographers, developers — if your work deserves to be seen, you need a place to put it. Portfolio Builder makes it instant.</p>
                </div>
              </div>

              <div className="title title_2">
                <p>Why <em>Portfolio Builder?</em></p>
                <p>Because you should spend your time doing great work, not fighting with HTML.</p>
              </div>

              <div className="tags">
                <div className="tagcard">
                  <div>⚡</div>
                  <div>
                    <h4>Lightning Fast Setup</h4>
                    <p>Go from zero to published portfolio in under 5 minutes.</p>
                  </div>
                </div>
                <div className="tagcard">
                  <div>🎨</div>
                  <div>
                    <h4>Style Customization</h4>
                    <p>Adjust colors, fonts, and layouts through a visual editor — no CSS needed.</p>
                  </div>
                </div>
                <div className="tagcard">
                  <div>📱</div>
                  <div>
                    <h4>Fully Responsive</h4>
                    <p>Every template looks perfect on mobile, tablet, and desktop.</p>
                  </div>
                </div>
                <div className="tagcard">
                  <div>📦</div>
                  <div>
                    <h4>Export Your Code</h4>
                    <p>Download clean HTML + CSS to host anywhere.</p>
                  </div>
                </div>
              </div>
            </section>


            <section id="credits">
              <div className="heading">
                <h2>✦ CREDITS</h2>
              </div>

              <div className="title">
                <p>The team behind<br/><em>the builder.</em></p>
                <p>Three developers, one shared mission — make online portfolios accessible to everyone.</p>
              </div>

              <div className="DevCards">
                <div className="card">
                    <div className="profilePic">
                      <img src={MubashirImg} alt="" />
                      <span></span>
                    </div>
                    <h2 className='name'>Mubashir</h2>
                    <div className="role">Lead Developer</div>
                    <p className="discrip">Architect of the Portfolio Builder platform. Handles full-stack development, system design, and the core template engine.</p>
                    <div className="skills">
                      <span>React.js</span>
                      <span>TypeScript</span>
                      <span>SQL</span>
                    </div>
                    <button>
                      <span>View</span>
                    </button>
                </div>
                <div className="card">
                    <div className="profilePic">
                      <img src={AbrarImg} alt="" />
                      <span></span>
                    </div>
                    <h2 className='name'>Abrar</h2>
                    <div className="role">DataBase</div>
                    <p className="discrip">Architect of the Portfolio Builder platform. Handles full-stack development, system design, and the core template engine.</p>
                    <div className="skills">
                      <span>React.js</span>
                      <span>TypeScript</span>
                      <span>SQL</span>
                    </div>
                    <button>
                      <span>View</span>
                    </button>
                </div>
                <div className="card">
                    <div className="profilePic">
                      <img src={HammadImg} alt="" />
                      <span></span>
                    </div>
                    <h2 className='name'>Hammad</h2>
                    <div className="role">DataBase</div>
                    <p className="discrip">Architect of the Portfolio Builder platform. Handles full-stack development, system design, and the core template engine.</p>
                    <div className="skills">
                      <span>React.js</span>
                      <span>TypeScript</span>
                      <span>SQL</span>
                    </div>
                    <button>
                      <span>View</span>
                    </button>
                </div>
              </div>
            </section>



            <section id="GetInTouch">
              <div className="heading">
                <h2>✦ Get In Touch</h2>
              </div>

              <div className="title">
                <p>Contact &<em> Feedback.</em></p>
                <p>Have a question, bug report, or just want to say hello? Switch between contact and feedback below.</p>
              </div>

              <div className="ToggleContainer">
                <button className='contact' autoFocus><span>📧</span> <span>Contact Us</span></button>
                <button className='feedback'><span>💭</span> <span>Feedback</span></button>
              </div>

              <div className="container">
                <div className="effect"></div>

                {/* <Contact/> */}
                <Feedback/>
              </div>

            </section>



            <section id="Resources">
              <div className="heading">
                <h2>✦ Resources</h2>
              </div>

              <div className="title">
                <p>Everything you need to<br/><em>get started.</em></p>
                <p>Guides, templates, and tools to help you build the best portfolio possible.</p>
              </div>

              <div className="container">

                <div className='cardCont'>
                  <div className="shade"></div>
                  <div className='card'>
                    <div className="icon">📚</div>
                    <h4>Getting Started Guide</h4>
                    <p>Step-by-step walkthrough of creating your first portfolio from scratch.</p>
                    <span>→</span>
                  </div>
                </div>

                <div className='cardCont'>
                  <div className="shade"></div>
                  <div className='card'>
                    <div className="icon">🎨</div>
                    <h4>Template Gallery</h4>
                    <p>Browse all 12+ templates, filter by role, and preview before picking.</p>
                    <span>→</span>
                  </div>
                </div>

                <div className='cardCont'>
                  <div className="shade"></div>
                  <div className='card'>
                    <div className="icon">🎓</div>
                    <h4>Portfolio Tips for Students</h4>
                    <p>What to put in a student portfolio — even with zero work experience.</p>
                    <span>→</span>
                  </div>
                </div>

                <div className='cardCont'>
                  <div className="shade"></div>
                  <div className='card'>
                    <div className="icon">💼</div>
                    <h4>Recruiter Insights</h4>
                    <p>What recruiters actually look for in a portfolio. Real advice, not fluff.</p>
                    <span>→</span>
                  </div>
                </div>

                <div className='cardCont'>
                  <div className="shade"></div>
                  <div className='card'>
                    <div className="icon">🔧</div>
                    <h4>Export & Hosting Guide</h4>
                    <p>How to download your portfolio code and host it on GitHub Pages, Vercel, or Netlify.</p>
                    <span>→</span>
                  </div>
                </div>

                <div className='cardCont'>
                  <div className="shade"></div>
                  <div className='card'>
                    <div className="icon">❓</div>
                    <h4>FAQ</h4>
                    <p>Answers to the most common questions about Portfolio Builder and how it works.</p>
                    <span>→</span>
                  </div>
                </div>
                
                
              </div>
            </section>

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

        </div>        
    </>
  )
}

export default LandingPage;

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");

  if (current === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById('toggle').innerHTML = '☀️';
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.getElementById('toggle').innerHTML = '🌙';
  }
}



function Contact(){
  return (
    <>
      <form action="" id='Contact'>
        <div className="name">
          <label htmlFor="name" id='nameLabel'>Name:</label>
          <input type="text" name="name" id="nameInput" />
        </div>
        <div className="mail">
          <label htmlFor="mail" id='emailLabel'>Email:</label>
          <input type="email" name="mail" id="emailInput" />
        </div>
        <textarea name="" id="textarea" placeholder='Message'></textarea>
        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>

      <div className="refLinks">
        <a href="">
          <div>📧</div>
          <div>
            <h6>Email</h6>
            <p>ma2625645@gmail.com</p>
          </div>
        </a>
        <a href="">
          <div>📞</div>
          <div>
            <h6>Contact</h6>
            <p>+91-7889825292 - +91-0000000000 - +91-0000000000</p>
          </div>
        </a>
        <a href="">
          <div>💬</div>
          <div>
            <h6>Twitter</h6>
            <p>@portfoliobuilderHQ</p>
          </div>
        </a>
        <a href="">
          <div>🔗</div>
          <div>
            <h6>LinkedIn</h6>
            <p>https://linked.in/PortfolioBuilderHQ</p>
          </div>
        </a>
        <a href="">
          <div>📍</div>
          <div>
            <h6>Based In</h6>
            <p>Kashmir</p>
          </div>
        </a>
      </div>
    </>
  )
}



function Feedback() {
  const [cardActive, setCardActive] = useState(null);

  return (
    <>
    
      <section id='Feedback'>
        <p>Your feedback shapes Portfolio Builder. Tell us what you think — we read every submission.</p>
        
        <div className="FeedbackType">
          <div className={`FeedCard ${cardActive === 0 ? "active" : ""}`}
            onClick={
              () => {
                setCardActive(0);
              }
            }>
            <span>🚀</span>
            <h3>Feature Request</h3>
          </div>
          <div className={`FeedCard ${cardActive === 1 ? "active" : ""}`}
            onClick={
              () => {
                setCardActive(1);
              }
            }>
            <span>🪲</span>
            <h3>Bug Report</h3>
          </div>
          <div className={`FeedCard ${cardActive === 2 ? "active" : ""}`}
            onClick={
              () => {
                setCardActive(2);
              }
            }>
            <span>💡</span>
            <h3>Suggestion</h3>
          </div>
          <div className={`FeedCard ${cardActive === 3 ? "active" : ""}`}
            onClick={
              () => {
                setCardActive(3);
              }
            }>
            <span>💖</span>
            <h3>General Love</h3>
          </div>
        </div>

        <p>Your Feedback</p>

        <textarea name="feedback" id="feedbackBox" placeholder='Share your thoughts - Every word matters...'></textarea>

        <div className="submitFeed">
          <button>Submit Feedback →</button>
          <p>Anonymous submissions welcome</p>
        </div>
      </section>
    
    </>
  )
}

