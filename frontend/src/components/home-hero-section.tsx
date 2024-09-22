import React from "react";
import "./../App.css";
import MarqueeAnimation from "./marquee_icons_animation/marquee-icon";
import { useNavigate } from "react-router-dom";

interface HomePageHeroSectionProps {
  isAuthenticated: boolean;
}

const HomePageHeroSection: React.FC<HomePageHeroSectionProps> = ({
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  return (
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
          platform for synchronized playback, video chat, and seamless controls.
        </h3>
        {/* buttons containers */}
        <div
          className="buttons-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <button className="button-m button-outline">
            <h3 className="regular">
              {isAuthenticated ? "Join a room" : "Learn more"}
            </h3>
          </button>
          <button className="button-m " onClick={() => navigate("/signup")}>
            <h3 className="regular">
              {" "}
              {isAuthenticated ? "Create a room" : "Get Started"}
            </h3>
          </button>
        </div>
      </div>
      {/* side animation section */}
      <MarqueeAnimation />
    </div>
  );
};

export default HomePageHeroSection;
