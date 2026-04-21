
import '../pagesStyles/landingPage.css'

import Header from '../components/LandingPageComponents/header.jsx';
import Navbar from '../components/LandingPageComponents/navbar.jsx';
import Home from '../components/LandingPageComponents/home.jsx';
import About from '../components/LandingPageComponents/about.jsx';
import WAW from '../components/LandingPageComponents/whowhy.jsx';
import Credits from '../components/LandingPageComponents/credits.jsx';
import GetInTouch from '../components/LandingPageComponents/getInTouch.jsx';
import Resources from '../components/LandingPageComponents/resources.jsx';
import Footer from '../components/LandingPageComponents/footer.jsx';

import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';
import Btn_Secondry from '../components/GeneralComponents/buttonSecondry.jsx';

export default function LandingPage() {

  return (
    <>
        <div className="PageLayout">
            <Header comp={BtnsSet}/>
            <Navbar/>
            <Home/>
            <About/>
            <WAW/>
            <Credits/>
            <GetInTouch/>
            <Resources/>
            <Footer/>
        </div>        
    </>
  )
}

function BtnsSet(){
    return (
        <>
            <Btn_Primary title={"Login"} to={"/auth"}/>
            <Btn_Secondry title={"Subscription"} to={"/subscription"}/>
        </>
    )
}