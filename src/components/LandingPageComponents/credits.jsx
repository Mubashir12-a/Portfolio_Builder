import MubashirImg from '../../assets/MubashirProPic.jpeg';
import HammadImg from '../../assets/HammadProPic.jpeg';
import AbrarImg from '../../assets/AbrarProPic.jpeg';
import { useNavigate } from 'react-router-dom';

export default function Credits(){
    const navigate = useNavigate();
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
                    <div className="role">Lead Developer & Supervisor</div>
                    <p className="discrip">Responsible for front end, APIs, Structure, Stack, Supervisor, and Backend support.</p>
                    <div className="skills">
                      <span>React.js</span>
                      <span>System Design</span>
                      <span>APIs</span>
                    </div>
                    <button onClick={() => navigate('/team/mubashir')}>
                      <span>View Profile</span>
                    </button>
                </div>
                <div className="card">
                    <div className="profilePic">
                      <img src={AbrarImg} alt="" />
                      <span></span>
                    </div>
                    <h2 className='name'>Abrar</h2>
                    <div className="role">Backend Engineer</div>
                    <p className="discrip">Handles server-side logic, authentication flows, and ensuring robust backend communication.</p>
                    <div className="skills">
                      <span>Node.js</span>
                      <span>Express</span>
                      <span>Security</span>
                    </div>
                    <button onClick={() => navigate('/team/abrar')}>
                      <span>View Profile</span>
                    </button>
                </div>
                <div className="card">
                    <div className="profilePic">
                      <img src={HammadImg} alt="" />
                      <span></span>
                    </div>
                    <h2 className='name'>Hammad</h2>
                    <div className="role">MongoDB Specialist</div>
                    <p className="discrip">Expert in database schema design, data modeling, and performance optimization for MongoDB.</p>
                    <div className="skills">
                      <span>MongoDB</span>
                      <span>NoSQL</span>
                      <span>Data Modeling</span>
                    </div>
                    <button onClick={() => navigate('/team/hammad')}>
                      <span>View Profile</span>
                    </button>
                </div>
              </div>
            </section>
        </>
    )
}