import React, { useState } from "react";
import "./../../../../App.css";
import "./../../Module.Login-screen.css";
import "./Module.LoginPanel.css";
import axios from "axios";

interface LoginPanelProps {}

const LoginPanel: React.FC<LoginPanelProps> = ({}) => {
  //
  //STATE MANAGEMENT
  //
  // state-for-login-items
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // calling api to validate the form
  const handleSubmit = async (e: React.FormEvent) => {
    //settin the loading cicle to login
    setLoading(true);
    //preventing the default form bheavious i.e refreshing the page when submit is pressedd
    e.preventDefault();
    // Clear previous errors if this function has called already
    setError("");
    // cheking if the values are null
    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);

      return;
    }
    // Regular expression for basic email validation
    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    //making a post request now
    try {
      const response = await axios.post("http://192.168.29.16:3000/login", {
        email,
        password,
      });
      if (response.status === 200) {
        console.log("login successful");
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      // Handle error and display error messages
      if (err.response) {
        if (err.response.status === 400) {
          setError("Invalid email or password");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };
  // password-visiblity-STATE
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //STATE MANAGEMENT
  // custom-checkbox-STATE
  const [isTicked, toggleTick] = useState(true);
  const toggleCheckBox = () => {
    toggleTick(!isTicked);
  };
  return (
    <div className="Login-panel-container">
      <img src="/assets/icons/logo-icon.svg" alt="Sync-Stream" />
      <div className="Login-panel-hero">
        <h2>Welcome back !</h2>
        <h3>Watch together perfect in sync</h3>
      </div>
      {/* error div to show error from the api */}
      {error && <div className="error-div">{error}</div>}
      {/*  */}
      {/* forms */}
      {/*  */}
      <form id="login-form" onSubmit={handleSubmit} className="login-form">
        {/* mail id input and label*/}
        <div className="input-container">
          <label htmlFor="email">Mail id</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className={error && "error-input"}
          />
        </div>
        {/*  */}
        {/* password input and label*/}
        {/*  */}
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <div className="input-password-wrapper-for-eye-icon ">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className={error && "error-input"}
            />
            <img
              src={
                showPassword
                  ? "/assets/icons/eye-close-icon.svg"
                  : "/assets/icons/eye-open.svg"
              }
              alt={showPassword ? "Hide password" : "Show password"}
              className={showPassword ? "icon-show" : "icon-hide"}
              id="toggle-icon"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>
        {/*  */}
        {/* forgot password row */}
        {/*  */}
        <div className="rem-me-for-pass-row">
          <div
            className="rem-me"
            onClick={toggleCheckBox}
            style={{ cursor: "pointer" }}
          >
            {/* custom icon inside the checkbox */}
            <div className={`custom-checkbox`}>
              <img
                src={
                  isTicked
                    ? "/assets/icons/tick-icon.svg"
                    : "/assets/icons/tick-no.svg"
                }
                alt="checkbox"
                style={{ height: "14.1px", width: "14px", cursor: "pointer" }}
              />
            </div>
            <h4 style={{ color: "rgba(40, 54, 24, 0.50)" }}>Remeber me</h4>
          </div>

          <h4 style={{ color: "rgba(40, 54, 24, 0.80)", cursor: "pointer" }}>
            Forgot password
          </h4>
        </div>
        {/*  */}
        {/* login button */}
        {/*  */}
        <button type="submit" className="login-button">
          {loading ? "Logging in" : "Login"}
        </button>
        {/*  */}
        {/* divider */}
        {/*  */}
        <div className="or-login-with">
          <div className="horizontal-divider"></div>
          <h4 style={{ padding: "0px 12px" }}>Or login with</h4>
          <div className="horizontal-divider"></div>
        </div>
        {/*  */}
        {/* other login options */}
        {/*  */}
        <div className="google-apple-butttons">
          <button className="google-apple-buttton" type="button">
            <img src="/assets/icons/google-icon.svg" alt="google.in" />
            Google
          </button>
          <button className="google-apple-buttton" type="button">
            <img src="/assets/icons/apple-icon.svg" alt="apple.in" />
            Apple
          </button>
        </div>
      </form>
      {/*  */}
      {/* end of the form */}
      {/* signup text */}
      <p>
        Don't have an account <span className="sign-up-span">SignUp</span>
      </p>
    </div>
  );
};

export default LoginPanel;
