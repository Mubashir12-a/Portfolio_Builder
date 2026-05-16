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
import TemplatesPage from './pages/TemplatesPage.jsx';
import TeamMemberPage from './pages/TeamMemberPage.jsx';
import InfoPage from './pages/InfoPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import TechStackPage from './pages/TechStackPage.jsx';

import ProtectedRoute from './components/Protected/protectedRoute.jsx';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/templates' element={<TemplatesPage />} />
        <Route path='/team/:memberId' element={<TeamMemberPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/info/stack' element={<TechStackPage />} />
        <Route path='/info/:type' element={<InfoPage />} />

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

        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App;
