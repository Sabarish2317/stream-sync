import React from "react";
import { useNavigate } from "react-router-dom";

interface Nav_Bar_ComponentProps {}

const Nav_Bar_Component: React.FC<Nav_Bar_ComponentProps> = ({}) => {
  //Route
  const navigate = useNavigate();

  //styles
  return (
    //  Nav Bar wrapper
    <div
      className="nav-bar-container"
      style={{
        display: "flex",
        padding: "12px 16px",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
      }}
    >
      <img src="/assets/icons/logo-full-icon.svg" alt="sync-stream" />
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
          <h3>Features</h3>
        </button>
        <button
          className="navigate-link-button not-on-tablet-and-lesser-view "
          onClick={() => navigate("")}
        >
          <h3>Pricing</h3>
        </button>
        <button
          className="navigate-link-button not-on-tablet-and-lesser-view "
          onClick={() => navigate("")}
        >
          <h3>Help</h3>
        </button>
        <button
          className="navigate-link-button"
          onClick={() => navigate("/signup")}
        >
          <h3>Register</h3>
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
  );
};

export default Nav_Bar_Component;
// 1024
