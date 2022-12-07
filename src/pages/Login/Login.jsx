import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleRPCWalletLogin } from "../../api/Login";
import "./styles/style.css";
import metamask from "../../images/metamask.png";


const Login = () => {

  const navigate = useNavigate();
 
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
      const isWalletConnected = localStorage.getItem('user') ||  {}
      if(isWalletConnected!==undefined){
        console.log("Unauthenticated")
      }
      // handleRPCWalletLogin();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const resData = await handleRPCWalletLogin();
    localStorage.setItem("user", JSON.stringify(resData));
    toast("Wallet Connected!");
    setLoading(false);
  };

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
