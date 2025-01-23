
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
import EnterEmail from './Create-New-Password/Enter-New-Email/EnterEmail';
import EnterOtp from './Create-New-Password/Enter-Otp/EnterOtp';
import EnterNewPassword from './Create-New-Password/Enter-New-Password/EnterNewPassword';
import QuizzesIntroDashboard from './Home/Quizzes-Dashboard/Quizzes-Intro-Dashboard/QuizzesIntroDashboard';
import QuizzesDashboard from './Home/Quizzes-Dashboard/Quizzes-Folder-Dashboard/QuizzesDashboard';
import GrapClient from './Home/AnalyticsHome/GrapClient';
import FrontpageNavbar from './Components/frontpage/Front-page/FrontpageNavbar';
import FrontPage from '../FrontpageHomepage/FrontpageHome/FrontPage';

function App() {
  return (
  <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/mapping" element={<MapHome />} />
    <Route path="/database" element={<DatabaseHome />} />
    <Route path="/About-us" element={<AboutUsDashboard />} />
    <Route path="/Features" element={<FeaturesDashboard />} />
    <Route path="/Feedback" element={<FeedbackDashboard />} />
    <Route path="/My-Profile" element={<MyprofileDashboard />} />
    <Route path="/Edit-Profile" element={<EditProfileDashboard />} />
    <Route path="/change-password" element={<ChangePasswordDashboard />} />
    <Route path="/Enter-Email" element={<EnterEmail />} />
    <Route path="/Enter-Otp" element={<EnterOtp />} />
    <Route path="/Enter-new-password" element={<EnterNewPassword />} />

    <Route path="/analytics" element={<GrapClient />} />
    <Route path="/quizzes-intro" element={<QuizzesIntroDashboard />} />
    <Route path="/quizzes" element={<QuizzesDashboard />} />

    <Route path="/" element={<FrontpageNavbar />} />
    <Route path="/home" element={<FrontPage/>} />
    
    
    

    </Routes>
    </BrowserRouter>
  );
}

export default App;
