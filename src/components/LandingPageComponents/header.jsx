import logo from '../../assets/Logo.gif';
import ToggleThemeBtn from '../GeneralComponents/toggleThemeBtn';

export default function Header({comp: Btns}){
    return (
        <>
            <header>
              <div className="logoContainer">
                  <img src={logo} alt="logo" />
                  <span className="logoName">Portfolio<em>Builder</em></span>
              </div>
              <div className="Buttons">
                  <Btns/>
                  <ToggleThemeBtn/>
              </div>
            </header>
        </>
    )
}
