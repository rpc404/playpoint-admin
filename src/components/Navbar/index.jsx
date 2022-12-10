import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";

export default function Navbar() {
  const [activeTab, setActiveTab] = React.useState("h");

  const [user, setUser] = React.useState(false);
  const navigate = useNavigate();
  const url = window.location.pathname;
  React.useEffect(() => {
    const _user = localStorage.getItem("user");
    if (_user) {
      setUser(JSON.parse(_user));
    } else {
      if (url !== "/login") {
        navigate("/login");
      }
    }
  }, [url]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(false);
    navigate("/login");
  };
  const handleActiveTab = (e) => {
    switch (e) {
      case "h":
        navigate("/");
        break;
      case "m":
        navigate("/marketplaces");
        break;
      case "f":
        navigate("/fixtures");
        break;
      case "q":
        navigate("/questionaires");
        break;
      case "r":
        navigate("/results");
        break;
      case "a":
        navigate("/admin");
        break;
      default:
        break;
    }

    setActiveTab(e);
  };

  return (
    <>
    {
      user ?   <div className="navbar__container">
      <div
        className={activeTab === "h" ? "active": ""}
        onClick={() => handleActiveTab("h")}
      >
        <i className="ri-home-line"></i> Home
      </div>
      <div
        className={activeTab === "m" ? "active": ""}
        onClick={() => handleActiveTab("m")}
      >
        <i className="ri-store-2-line"></i> Marketplaces
      </div>
      <div
        className={activeTab === "f" ? "active": ""}
        onClick={() => handleActiveTab("f")}
      >
        <i className="ri-attachment-line"></i> Fixtures
      </div>
      <div
        className={activeTab === "q" ? "active": ""}
        onClick={() => handleActiveTab("q")}
      >
        <i className="ri-question-answer-line"></i> Questionaires
      </div>
      <div
        className={activeTab === "r" ? "active": ""}
        onClick={() => handleActiveTab("r")}
      >
        <i className="ri-folder-chart-line"></i>Results
      </div>
      {
        user.role="superadmin" &&  <div
        className={activeTab === "a" ? "active": ""}
        onClick={() => handleActiveTab("a")}
      >
        <i className="ri-admin-line"></i>Admins
      </div>
      }
     
      <div
        className={""}
      >
       <p>{user.name}</p> 
      </div>
      <div
        className={""}
        onClick={() => handleLogout()}
      >
        <i className="ri-logout-circle-r-line"></i>
      </div>
    </div> : ""
    }
    </>
  );
}
