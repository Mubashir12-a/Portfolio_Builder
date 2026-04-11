export default function Contact(){
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