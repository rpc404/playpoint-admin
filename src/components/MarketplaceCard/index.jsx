import React from "react";
import { Button, Typography } from "@mui/material";
import { getMarketplaceStat } from "../../api/Marketplace";
import { useNavigate } from "react-router-dom";

const MarketplaceCard = ({ marketplace ,handleMarketplaceDelete}) => {
  console.log(marketplace);
  const [stat, setStat] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getMarketplaceStat(marketplace.marketplaceSlug).then((res) =>
      setStat(res.data.response)
    );
    setLoading(false);
  }, []);

  const navigate = useNavigate()

  return (
    <div className="marketplace__item">
      <img
        src={marketplace?.marketplaceCoverImage?.url}
        alt={marketplace?.marketplaceName}
        loading="lazy"
      />
      <Typography variant="p">
        <i className="ri-gamepad-line"></i> {marketplace?.marketplaceName}
      </Typography>
      <ul>
        <li>
          <b>Fixture</b>: {stat.totalFixtures}
        </li>
        <li>
          <b>Questionaires</b>: {stat.totalQuestionaires}
        </li>
        {/* <li>
          <b>Results</b>: 125
        </li> */}
        {/* <li>
          <b>Volume</b>: 1,25,255
        </li> */}
      </ul>
      <div className="actions">
        <Button className="editBtn" onClick={() => navigate("edit")}>
          <i className="ri-settings-line"></i> Edit
        </Button>
        <Button
          onClick={() => navigate("/fixtures/new")}
          className="navigateBtn"
        >
          <i className="ri-attachment-line"></i> Add Fixture
        </Button>
        <Button
          onClick={() => handleMarketplaceDelete(marketplace.marketplaceSlug)}
          className="deleteBtn"
        >
          <i className="ri-delete-bin-5-line"></i> Delete
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceCard;
