import React from "react";
import "./styles/style.css";
import metamask from "../../images/metamask.png";

const Login = () => {
  return (
    <div className="login__container">
      <div className="login">
        <div className="button__container">
          <button>Login with Metamask</button>
          <img src={metamask} alt="metamask" />
        </div>
      </div>
    </div>
  );
};

export default Login;
