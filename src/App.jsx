import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import './pagesStyles/landingPage.css'

import LandingPage from "../src/pages/landingPage"
import Subscription from './pages/subscriptionPage'
import AuthPage from './pages/authPage.jsx';
import UserDash from './pages/userDash.jsx';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/subscription' element={<Subscription/>}></Route>
          <Route path='/auth' element={<AuthPage/>}></Route>
          <Route path='/userDash' element={<UserDash/>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
