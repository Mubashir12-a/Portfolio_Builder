import '../pagesStyles/landingPage.css'
import logo from '../assets/Logo.png'

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
                    <button>Login</button>
                    <button>Signup</button>
                    <button>Subscription 👑</button>
                    <button onClick={toggleTheme} id='toggle'>☀️</button>
                </div>
            </header>



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
