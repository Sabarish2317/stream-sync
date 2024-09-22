import axios from "axios";
import HomePageHeroSection from "../components/home-hero-section";
import Nav_Bar_Component from "../components/navigation_bar/nav-bar";
import Nav_Bar_loggedIn_Component from "../components/navigation_bar/nav-bar-logged-in";
import "./../App.css";
import "./../screens/auth screens/login-screen/Components/login-panel/Module.LoginPanel.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uri from "../utils/constants";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const navigate = useNavigate();
  const [emailData, setEmail] = useState("");
  const [pfp, setPfp] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setLoading(true);
    //fetcing profile on default
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        setLoading(false);
      }
      if (token) {
        try {
          const response = await axios.get(`${uri}/api/home`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            console.log(response.data);
            setEmail(response.data.email);
            setPfp(response.data.profilePicture);
            setIsAuthenticated(true);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, []);

  return loading ? (
    <div className="loader"></div>
  ) : (
    // wrapper for the whole page
    <div className="wrapper">
      {/* <Nav_Bar_Component /> */}
      {isAuthenticated ? (
        <Nav_Bar_loggedIn_Component email={emailData} profilePicture={pfp} />
      ) : (
        <Nav_Bar_Component />
      )}

      {/* hero container section  */}
      <HomePageHeroSection isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default HomePage;
