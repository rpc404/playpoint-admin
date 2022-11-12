import { Button, Typography } from "@mui/material";
import React from "react";
import "./styles/style.css";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { deleteMarketplace, getMarketplaces } from "../../api/Marketplace";
import { toast } from "react-toastify";

export default function Markteplaces() {
  const [marketplaces, setMarketplaces] = React.useState([]);
  const [filteredMarketplaces, setFilteredMarketplaces] = React.useState([]);
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
      setMarketplaces(res.data.data.reverse());
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
                <div className="marketplace__item" key={index}>
                  <img
                    src={data?.item?.marketplaceCoverImage?.url}
                    alt={data?.item?.marketplaceName}
                    loading="lazy"
                  />
                  <Typography variant="p">
                    <i className="ri-gamepad-line"></i>{" "}
                    {data?.item?.marketplaceName}
                  </Typography>
                  <ul>
                    <li>
                      <b>Fixture</b>: 125
                    </li>
                    <li>
                      <b>Questionaires</b>: 125
                    </li>
                    <li>
                      <b>Results</b>: 125
                    </li>
                    <li>
                      <b>Volume</b>: 1,25,255
                    </li>
                  </ul>
                  <div className="actions">
                    <Button
                      className="editBtn"
                      onClick={() => navigate("edit")}
                    >
                      <i className="ri-settings-line"></i> Edit
                    </Button>
                    <Button
                      onClick={() => navigate("/fixtures/new")}
                      className="navigateBtn"
                    >
                      <i className="ri-attachment-line"></i> Add Fixture
                    </Button>
                    <Button
                      onClick={() =>
                        handleMarketplaceDelete(data.item.marketplaceSlug)
                      }
                      className="deleteBtn"
                    >
                      <i className="ri-delete-bin-5-line"></i> Delete
                    </Button>
                  </div>
                </div>
              );
            })
          : marketplaces.map((data, index) => (
              <div className="marketplace__item" key={index}>
                <img
                  src={data?.marketplaceCoverImage?.url}
                  alt=""
                  loading="lazy"
                />
                <Typography variant="p">
                  <i className="ri-gamepad-line"></i> {data?.marketplaceName}
                </Typography>
                <ul>
                  <li>
                    <b>Fixture</b>: 125
                  </li>
                  <li>
                    <b>Questionaires</b>: 125
                  </li>
                  <li>
                    <b>Results</b>: 125
                  </li>
                  <li>
                    <b>Volume</b>: 1,25,255
                  </li>
                </ul>
                <div className="actions">
                  <Button
                    className="editBtn"
                    onClick={() => {
                      localStorage.setItem(
                        "marketplace_for_edit",
                        JSON.stringify(data)
                      );
                      navigate("edit");
                    }}
                  >
                    <i className="ri-settings-line"></i> Edit
                  </Button>
                  <Button
                    onClick={() => navigate("/fixtures/new")}
                    className="navigateBtn"
                  >
                    <i className="ri-attachment-line"></i> Add Fixture
                  </Button>
                  <Button
                    onClick={() =>
                      handleMarketplaceDelete(data.marketplaceSlug)
                    }
                    className="deleteBtn"
                  >
                    <i className="ri-delete-bin-5-line"></i> Delete
                  </Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
