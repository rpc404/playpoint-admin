import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleRPCWalletLogin } from "../../api/Login";
import "./styles/style.css"

import metamask from "../../images/metamask.png";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const isWalletConnected = localStorage.getItem("token") || false;
    if (isWalletConnected) {
      navigate("/");
    }
    // handleRPCWalletLogin();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    await handleRPCWalletLogin()
      .then((res) => {
        if (res?.status === 200) {
          toast(res.data.msg);
          return;
        } else if (res.status === 201) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.admin));
          navigate("/");
        }
      })
      .catch((err) => toast("Unable to login"));
  };

  return (
    <div className="login__container">
      <div className="login">
        <div className="button__container" onClick={() => handleLogin()}>
          <button>Login with Metamask</button>
          <img src={metamask} alt="metamask" />
        </div>
      </div>
    </div>
  );
};

export default Login;
