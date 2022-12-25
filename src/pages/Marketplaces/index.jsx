import { Button, Typography } from "@mui/material";
import React from "react";
import "../../dest/pages/Marketplaces/styles/style.css"
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import {
  deleteMarketplace,
  getMarketplaces,
  getMarketplaceStat,
} from "../../api/Marketplace";
import { toast } from "react-toastify";
import MarketplaceCard from "../../components/MarketplaceCard";

export default function Markteplaces() {
  const [marketplaces, setMarketplaces] = React.useState([]);
  const [filteredMarketplaces, setFilteredMarketplaces] = React.useState([]);
  const [stat, setStat] = React.useState({});
  const navigate = useNavigate();

  const filter = (e) => {
    const options = {
      includeScore: true,
      keys: ["tags", "marketplaceSlug", "marketplaceName"],
    };

    const fuse = new Fuse(marketplaces, options);
    const result = fuse.search(e.target.value);
    setFilteredMarketplaces(result);
  };

  const handleMarketplaceDelete = async (marketplaceSlug) => {
    toast("Marketplace added to delete queue!");
    setMarketplaces(
      marketplaces.filter((i) => i.marketplaceSlug !== marketplaceSlug)
    );
    await deleteMarketplace(marketplaceSlug);
    toast("Marketplace deleted successfully!");
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const res = await getMarketplaces();
      setMarketplaces(res.data.marketplaces);
    })();
  }, []);

  return (
    <div className="marketplaces__container">
      <h1 className="header">Active Markteplaces</h1>

      <div className="search__container">
        <i className="ri-search-line"></i>{" "}
        <input
          onChange={filter}
          type="text"
          placeholder="Search Marketplace..."
        />
      </div>

      <div className="marketplaces__items">
        <Button
          className="marketplace__item newMarketplace"
          onClick={() => navigate("new")}
        >
          <i className="ri-add-line"></i>
          <Typography variant="p">New Marketplaces</Typography>
        </Button>

        {filteredMarketplaces.length > 0
          ? filteredMarketplaces.map((data, index) => {
              return (
                <MarketplaceCard
                  marketplace={data}
                  key={index}
                  handleMarketplaceDelete={handleMarketplaceDelete}
                />
              );
            })
          : marketplaces.map((data, index) => {
            console.log(data)
            return (
                <MarketplaceCard
                  marketplace={data}
                  key={index}
                  handleMarketplaceDelete={handleMarketplaceDelete}
                />
              );
            })}
      </div>
    </div>
  );
}
