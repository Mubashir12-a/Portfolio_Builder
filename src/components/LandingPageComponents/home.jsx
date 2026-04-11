import ProfileImg from '../../assets/profileImg.png'

export default function Home(){
    return (
        <>
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
        </>
    )
}