import React from "react";
import SignupPanel from "./Components/signup-panel/signUp";

interface LoginScreenProps {}

const SignupScreen: React.FC<LoginScreenProps> = ({}) => {
  return (
    <div className="wrapper">
      <SignupPanel />
    </div>
  );
};

export default SignupScreen;
