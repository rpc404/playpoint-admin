import React from "react";
import { getStats } from "../../api/AdminStats";
import "./styles/style.css";

export default function Home() {
  const [stats, setStats] = React.useState({
    marketplaceCount: 0,
    questionaireCount: 0,
    resultCount: 0
    })
  React.useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const res = await getStats();
      setStats(res.data.stat);
    })();
  }, []);
  return (
    <div className="home__container">
      <h1 className="greeting__container">Good Morning, Domsan! 😇</h1>
      <div className="summary__container">
        <div>
          <i className="ri-user-3-line"></i>
          <span>
            {/* socket io user connection is requested */}
            <h1>0</h1>
            <p>Active Players</p>
          </span>
        </div>
        <div>
          <i className="ri-store-2-line"></i>
          <span>
            <h1>{stats.marketplaceCount}</h1>
            <p>Active Marketplaces</p>
          </span>
        </div>
        <div>
          <i className="ri-question-answer-line"></i>
          <span>
            <h1>{stats.questionaireCount}</h1>
            <p>Active Questionaires</p>
          </span>
        </div>
        <div>
          <i className="ri-folder-chart-line"></i>
          <span>
            <h1>{stats.resultCount}</h1>
            <p>Active Results</p>
          </span>
        </div>
      </div>
    </div>
  );
}
