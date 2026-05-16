import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import './pagesStyles/landingPage.css'

import LandingPage from "./pages/landingPage";
import Subscription from './pages/subscriptionPage';
import AuthPage from './pages/authPage.jsx';
import Dash from "./pages/Dashboard.jsx";
import GetInfo from "./pages/collectDashInfo.jsx";
import ResumeView from "./pages/ResumeView.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import ProtectedRoute from './components/Protected/protectedRoute.jsx';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/auth' element={<AuthPage />} />

        <Route
          path='/collect-info'
          element={
            <ProtectedRoute>
              <GetInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path='/dash'
          element={
            <ProtectedRoute>
              <Dash />
            </ProtectedRoute>
          }
        />

        <Route
          path='/resume'
          element={
            <ProtectedRoute>
              <ResumeView />
            </ProtectedRoute>
          }
        />

        {/* Admin — guarded internally via sessionStorage */}
        <Route path='/admin'           element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App;