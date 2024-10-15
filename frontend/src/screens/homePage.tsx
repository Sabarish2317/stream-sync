import "./../App.css";
import "./../screens/auth screens/login-screen/Components/login-panel/Module.LoginPanel.css";
import HomePageHeroSection from "../components/home-hero-section";
import Nav_Bar_Component from "../components/navigation_bar/nav-bar";
import Nav_Bar_loggedIn_Component from "../components/navigation_bar/nav-bar-logged-in";
import React, { useEffect } from "react";
import { fetchUserData } from "./../redux state/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux state/store";

const HomePage: React.FC = () => {
  // Deconstructing the redux states from the store
  const dispatch = useDispatch<AppDispatch>();
  const { userData, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.userData
  );

  useEffect(() => {
    // Calling the fetchUserData function from the userDataSlice when the component mounts
    dispatch(fetchUserData());
  }, [dispatch]);

  // User interface with conditional rendering based on the reducer states
  return loading ? (
    <div className="wrapper" style={{ justifyContent: "center" }}>
      <div className="loader"></div>
    </div>
  ) : (
    // Wrapper for the whole page
    <div className="wrapper">
      {/* <Nav_Bar_Component /> */}

      {isAuthenticated && userData ? (
        <Nav_Bar_loggedIn_Component userData={userData} />
      ) : (
        <Nav_Bar_Component />
      )}

      {/* Hero container section  */}
      <HomePageHeroSection isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default HomePage;
