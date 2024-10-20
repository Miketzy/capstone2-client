
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './Home/home/Home';
import DatabaseHome from './Home/DatabaseHome/DatabaseHome';
import MapHome from './Home/MappingHome/MapHome';
import AboutUsDashboard from './Home/Navbar-text-Dashboard/AboutUs-Dashboard/AboutUsDashboard';
import FeaturesDashboard from './Home/Navbar-text-Dashboard/Features-Dasgboard/FeaturesDashboard';
import FeedbackDashboard from './Home/Navbar-text-Dashboard/Feedback-Dashboard/FeedbackDashboard';
import MyprofileDashboard from './Home/Profile-Dashboard/MyProfileDashboard/MyprofileDashboard';
import EditProfileDashboard from './Home/Profile-Dashboard/EditProfileDashboard/EditProfileDashboard';
import ChangePasswordDashboard from './Home/Profile-Dashboard/ChangePassword/ChangePasswordDashboard';
import Registration from './Components/Login-register-Form/Registration-Form/Registration';
import Login from './Components/Login-register-Form/Login-Form/Login';

function App() {
  return (
  <BrowserRouter>
    <Routes>
    <Route path="/Home" element={<Home />} />
    <Route path="/mapping" element={<MapHome />} />
    <Route path="/database" element={<DatabaseHome />} />
    <Route path="/About-us" element={<AboutUsDashboard />} />
    <Route path="/Features" element={<FeaturesDashboard />} />
    <Route path="/Feedback" element={<FeedbackDashboard />} />
    <Route path="/My-Profile" element={<MyprofileDashboard />} />
    <Route path="/Edit-Profile" element={<EditProfileDashboard />} />
    <Route path="/change-password" element={<ChangePasswordDashboard />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/" element={<Login />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
