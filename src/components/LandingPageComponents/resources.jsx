export default function Resources(){
    return (
        <>
            <section id="Resources">
                <div className="heading">
                  <h2>✦ Resources</h2>
                </div>

                <div className="title">
                  <p>Everything you need to<br/><em>get started.</em></p>
                  <p>Guides, templates, and tools to help you build the best portfolio possible.</p>
                </div>

                <div className="container">

                  <div className='cardCont' onClick={() => {
                    console.log("pre");
                  }}>
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
        </>
    )
}