import { useNavigate } from 'react-router-dom';
import ProfileImg from '../../assets/profileImg.png'

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section id='Home'>
        <div className='IntroSec'>
          <div className='versionInfo'>
            <div>
              Version 4.0.0 Public Beta
            </div>
          </div>

          <div className='TagLine'>
            <div>
              <em>Your Portfolio,</em>
              <span>Without The Code.</span>
            </div>
          </div>

          <div className='IntroPara'>
            <p>Pick a template, fill in your story, and publish a professional portfolio in minutes — no coding required. Built for students, freshers &amp; creators.</p>
          </div>

          <div className='RedirectBtns'>
            <button onClick={() => navigate('/auth')}>🚀 Build My Portfolio</button>
            <button onClick={() => navigate('/subscription')}>Browse Templates →</button>
          </div>

          <div className='feedCard'>
            <div>
              <span>100<strong>+</strong></span>
              <p>Portfolios built</p>
            </div>
            <div>
              <span>6<strong>+</strong></span>
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
                <p>https://portfoliobuilder.app/AaravSharma</p>
              </div>
            </div>
            <div className='Container'>
              <div className="AttractProfile">
                <img src={ProfileImg} alt="" />
                <div>
                  <p>Mubashir Ahmad</p>
                  <p>Full-Stack Developer</p>
                </div>
              </div>
              <div className="AttractSkill">
                <span>React.js</span>
                <span>Node.js</span>
                <span>TypeScript</span>
              </div>
              <div className="AttractProject">
                <div>AI Chat App</div>
                <div>E-Commerce</div>
                <div>Dashboard</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}