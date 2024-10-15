import React from "react";
import "./../components.css";
import { useNavigate } from "react-router-dom";

const Nav_Bar_Component: React.FC = () => {
  //Route
  const navigate = useNavigate();

  //styles
  return (
    <>
      {/* nav bar components for desktop view */}
      <div className="nav-bar-container only-on-pc-view">
        <img
          className="nav-bar-logo"
          src="/assets/icons/logo-full-icon.svg"
          alt="sync-stream"
        />
        {/* Nav Bar action buttons wrapper */}
        <div
          className="nav-bar-action-section"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <button
            className="navigate-link-button not-on-tablet-and-lesser-view "
            onClick={() => navigate("")}
          >
            <h3 style={{ color: "rgba(40, 54, 24, 0.8)" }}>Features</h3>
          </button>
          <button
            className="navigate-link-button not-on-tablet-and-lesser-view "
            onClick={() => navigate("")}
          >
            <h3 style={{ color: "rgba(40, 54, 24, 0.8)" }}>Pricing</h3>
          </button>
          <button
            className="navigate-link-button not-on-tablet-and-lesser-view "
            onClick={() => navigate("")}
          >
            <h3 style={{ color: "rgba(40, 54, 24, 0.8)" }}>Help</h3>
          </button>
          <button
            className="navigate-link-button not-on-tablet-and-lesser-view "
            onClick={() => navigate("/signup")}
          >
            <h3 style={{ color: "rgba(40, 54, 24, 0.8)" }}>Register</h3>
          </button>
          <button
            className="button-sm"
            style={{ textDecorationLine: "none" }}
            onClick={() => navigate("/login")}
          >
            <h3>Login</h3>
          </button>
        </div>
      </div>
      {/* nav bar components for mobile view */}
      <div className="nav-bar-container-m only-on-tablet-and-lesser-view ">
        <div className="logo-container">
          <img
            className="nav-bar-logo"
            src="/assets/icons/logo-full-icon.svg"
            alt="sync-stream"
          />
        </div>
        <div className="logo-container" style={{ justifyContent: "end" }}>
          <img
            src="/assets/icons/menu-icon.svg"
            className="menu-icon"
            alt="menu"
          />
        </div>
      </div>
      {/* nav bar components for all view when authenticated */}
      <div className="nav-bar-container-m " style={{ display: "none" }}>
        <div className="logo-container">
          <img
            className="nav-bar-logo"
            src="/assets/icons/logo-full-icon.svg"
            alt="sync-stream"
          />
        </div>
        <div className="logo-container" style={{ justifyContent: "end" }}>
          <img
            src="/assets/icons/menu-icon.svg"
            className="menu-icon"
            alt="menu"
          />
        </div>
      </div>
    </>
  );
};

export default Nav_Bar_Component;
// 1024
