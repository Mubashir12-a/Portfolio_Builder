import {useState} from 'react';

import Contact from '../LandingPageComponents/contact.jsx';
import Feedback from '../LandingPageComponents/feedback.jsx';

export default function GetInTouch(){
    const [activeCont_Feed, setActiveCont_Feed] = useState('Contact');

    return (
        <>
            <section id="GetInTouch">
              <div className="heading">
                <h2>✦ Get In Touch</h2>
              </div>

              <div className="title">
                <p>Contact &<em> Feedback.</em></p>
                <p>Have a question, bug report, or just want to say hello? Switch between contact and feedback below.</p>
              </div>

              <div className="ToggleContainer">
                <button onClick={() => setActiveCont_Feed('Contact')} className='contact'><span>📧</span> <span>Contact Us</span></button>
                <button onClick={() => setActiveCont_Feed('Feedback')} className='feedback'><span>💭</span> <span>Feedback</span></button>
              </div>

              <div className="container">
                <div className="effect"></div>
                  {activeCont_Feed === 'Contact' ? <Contact/> : null}
                  {activeCont_Feed === 'Feedback' ? <Feedback/> : null}
              </div>
            </section>
        </>
    )
}