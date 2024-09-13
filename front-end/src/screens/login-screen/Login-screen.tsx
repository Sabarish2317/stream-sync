import React from "react";
import LoginPanel from "./Components/login-panel-left/LoginPanel";

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  return (
    <div className="wrapper">
      <LoginPanel />
    </div>
  );
};

export default LoginScreen;
