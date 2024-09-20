import MarqueeAnimation from "../components/marquee_icons_animation/marquee-icon";
import Nav_Bar_Component from "../components/navigation_bar/nav-bar";
import "./../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const navigate = useNavigate();
  return (
    // wrapper for the whole page
    <div className="wrapper">
      <Nav_Bar_Component />
      {/* hero container section  */}
      <div
        className="hero-container"
        style={{
          display: "flex",
          padding: "0px 16px",
          gap: "12px",
          alignItems: " flex-start",
          alignSelf: "stretch",
        }}
      >
        {/* hero text */}
        <div
          className="hero-text"
          style={{
            display: "flex",
            padding: "24px 0px",
            gap: "18px",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h1 style={{ fontWeight: "800" }}>
            Watch together,
            <br />
            stay perfectly <br />
            in sync
          </h1>
          <h3 style={{ color: "rgba(40, 54, 24, 0.80)" }}>
            Stream movies together in real-time with friends using{" "}
            <span className="gradient-text">StreamSync</span>, The ultimate
            platform for synchronized playback, video chat, and seamless
            controls.
          </h3>
          {/* buttons containers */}
          <div
            className="buttons-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "24px",
            }}
          >
            <button className="button-m button-outline">
              <h3 className="regular">Learn more</h3>
            </button>
            <button className="button-m " onClick={() => navigate("/signup")}>
              <h3 className="regular">Get Started</h3>
            </button>
          </div>
        </div>
        {/* side animation section */}
        <MarqueeAnimation />
      </div>
    </div>
  );
};

export default HomePage;
