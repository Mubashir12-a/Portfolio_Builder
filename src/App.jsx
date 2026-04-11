import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import './pagesStyles/landingPage.css'

// import LandingPage from "../src/pages/landingPage"
import Subscription from './pages/subscriptionPage'
import LandingPage from './pages/landingPage';


function App() {
  return (
    <>
      {/* <LandingPage/> */}
      {/* <Subscription/> */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/subscription' element={<Subscription/>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
