export default function About(){
    return (
        <>
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
        </>
    )
}