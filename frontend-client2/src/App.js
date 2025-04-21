
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
import FrontPagesHome from './FrontpageHomepage/FrontpageHome/FrontPagesHome';
import AboutPages from './FrontpageHomepage/FrontAboutPages/AboutPages';
import TeamHome from './FrontpageHomepage/TeamHomePage/TeamHome';
import { useEffect } from 'react';
import CardQuiz from './Components/Quizzes-pages/cardquiz/CardQuiz';
import CardQuizFolder from './Home/Quizzes-Dashboard/cardquiz-folder/CardQuizFolder';
import IdentificationFolder from './Home/Quizzes-Dashboard/Identification-folder/IdentificationFolder';
import MatchingTypeFolder from './Home/Quizzes-Dashboard/matchingtype-folder/MatchingTypeFolder';
import CardAnalytics from './Home/card-analytic/CardAnalytics';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://capstone2-client.onrender.com/keep-alive")
      .then(res => console.log("keeping backend awake..."))
      .catch(err => console.error("Failed to ping backend:", err));
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
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

    <Route path="/analytics" element={<CardAnalytics />} />
    <Route path="/quizzes-intro" element={<QuizzesIntroDashboard />} />
    <Route path="/quizzes" element={<QuizzesDashboard />} />
    <Route path="/cardquizzes" element={<CardQuizFolder />} />
    <Route path="/cardquizzes/identification" element={<IdentificationFolder />} />
    <Route path="/cardquizzes/matchingtype" element={<MatchingTypeFolder />} />

    


    <Route path="/" element={<FrontPagesHome/>} />
    <Route path="/about-the-project" element={<AboutPages/>} />
    <Route path="/team" element={<TeamHome/>} />
    
    
    

    </Routes>
    </BrowserRouter>
  );
}

export default App;
