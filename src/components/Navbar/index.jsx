import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";

export default function Navbar() {
  const [activeTab, setActiveTab] = React.useState("h");
  const navigate = useNavigate();

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
      default:
        break;
    }

    setActiveTab(e);
  };

  return (
    <div className="navbar__container">
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
    </div>
  );
}
