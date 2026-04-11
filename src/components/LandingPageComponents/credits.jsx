import MubashirImg from '../../assets/MubashirProPic.jpeg';
import HammadImg from '../../assets/HammadProPic.jpeg';
import AbrarImg from '../../assets/AbrarProPic.jpeg';

export default function Credits(){
    return (
        <>
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
        </>
    )
}