import LoginScreen from "./screens/auth screens/login-screen/Login-screen";
import SignupScreen from "./screens/auth screens/signup-screen/Signup-screen";
import JoinMeetingPage from "./screens/joinMeetingPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./screens/homePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to login */}
        <Route path="/" element={<Navigate to="/home-page" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/rooms" element={<JoinMeetingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
