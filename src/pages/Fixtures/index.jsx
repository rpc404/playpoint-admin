import { Button, Typography } from "@mui/material";
import React from "react";
import CountryFlags from "../../mocks/CountryFlags.json";
import "./styles/style.css";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteFixture, getFixtures } from "../../api/Fixture";

export default function Fixture() {
  const [fixtures, setFixtures] = React.useState([]);
  const [filteredFixtures, setFilteredFixtures] = React.useState([]);
  const navigate = useNavigate();

  const filter = (e) => {
    const options = {
      includeScore: true,
      keys: ["tags", "HomeTeam", "AwayTeam"],
    };

    const fuse = new Fuse(fixtures, options);
    const result = fuse.search(e.target.value);
    setFilteredFixtures(result);
  };

  const handleFixtureDelete = async (_id) => {
    toast("Marketplace added to delete queue!");
    setFixtures(fixtures.filter((i) => i._id !== _id));
    await deleteFixture(_id);
    toast("Marketplace deleted successfully!");
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const res = await getFixtures();
      setFixtures(res.data.data.reverse());
    })();
  }, []);
  return (
    <div className="fixture__container">
      <h1 className="title">Active Fixtures</h1>

      <div className="search__container">
        <i className="ri-search-line"></i>{" "}
        <input onChange={filter} type="text" placeholder="Search Fixtures..." />
      </div>

      <div className="fixture__items">
        <Button
          className="fixture__item newFixture"
          onClick={() => navigate("new")}
        >
          <i className="ri-add-line"></i>
          <Typography variant="p">New Fixture</Typography>
        </Button>

        {filteredFixtures.length > 0
          ? filteredFixtures.map((data, index) => {
              return (
                <div key={index} className="fixture__item">
                  <p className="title">
                    <b>
                      <i className="ri-gamepad-line"></i> Marketplace
                    </b>
                    : {data?.item?.marketplaceSlug}
                  </p>
                  <div className="gameDetails">
                    <span className="homeTeam">
                      <p>{data?.item?.HomeTeam}</p>
                      {CountryFlags.map((country, i) => {
                        return (
                          (country.name === data.item.HomeTeam ||
                            (country.name === "United States" &&
                              data.item.HomeTeam === "USA") ||
                            (country.name === "South Korea" &&
                              data.item.HomeTeam === "Korea Republic")) && (
                            <img
                              src={country.image}
                              alt={country.name}
                              key={i}
                              loading="lazy"
                              className="home__Image"
                            />
                          )
                        );
                      })}
                    </span>
                    <span>VS</span>
                    <span className="awayTeam">
                      {CountryFlags.map((country, i) => {
                        return (
                          (country.name === data.item.AwayTeam ||
                            (country.name === "United States" &&
                              data.item.AwayTeam === "USA") ||
                            (country.name === "South Korea" &&
                              data.item.AwayTeam === "Korea Republic")) && (
                            <img
                              src={country?.image}
                              alt={country.name}
                              key={i}
                              loading="lazy"
                              className="Away__Image"
                            />
                          )
                        );
                      })}
                      <p>{data?.item?.AwayTeam}</p>
                    </span>
                  </div>

                  <div className="summary">
                    <p>
                      Users
                      <br /> <b>2158</b>
                    </p>
                    <p>
                      Questions
                      <br /> <b>12</b>
                    </p>
                    <p>
                      Results
                      <br /> <b>3</b>
                    </p>
                  </div>

                  <div className="actions">
                    <Button className="editBtn" onClick={() => navigate("edit")}>
                      <i className="ri-settings-line"></i> Edit
                    </Button>
                    <Button onClick={() => navigate("/questionaires/new")} className="editBtn">
                      <i className="ri-message-3-line"></i> Add Questionaire
                    </Button>
                    <Button
                      className="deleteBtn"
                      onClick={() => handleFixtureDelete(data.item._id)}
                    >
                      <i className="ri-delete-bin-5-line"></i> Delete
                    </Button>
                  </div>
                </div>
              );
            })
          : fixtures.map((data, index) => {
              return (
                <div key={index} className="fixture__item">
                  <p className="title">
                    <b>
                      <i className="ri-gamepad-line"></i> Marketplace
                    </b>
                    : {data.marketplaceSlug}
                  </p>
                  <div className="gameDetails">
                    <span className="homeTeam">
                      <p>{data.HomeTeam}</p>
                      {CountryFlags.map((country, i) => {
                        return (
                          (country.name === data.HomeTeam ||
                            (country.name === "United States" &&
                              data.HomeTeam === "USA") ||
                            (country.name === "South Korea" &&
                              data.HomeTeam === "Korea Republic")) && (
                            <img
                              src={country.image}
                              alt={country.name}
                              key={i}
                              loading="lazy"
                              className="home__Image"
                            />
                          )
                        );
                      })}
                    </span>
                    <span>VS</span>
                    <span className="awayTeam">
                      {CountryFlags.map((country, i) => {
                        return (
                          (country.name === data.AwayTeam ||
                            (country.name === "United States" &&
                              data.AwayTeam === "USA") ||
                            (country.name === "South Korea" &&
                              data.AwayTeam === "Korea Republic")) && (
                            <img
                              src={country?.image}
                              alt={country.name}
                              key={i}
                              loading="lazy"
                              className="Away__Image"
                            />
                          )
                        );
                      })}
                      <p>{data.AwayTeam}</p>
                    </span>
                  </div>

                  <div className="summary">
                    <p>
                      Users
                      <br /> <b>2158</b>
                    </p>
                    <p>
                      Questions
                      <br /> <b>12</b>
                    </p>
                    <p>
                      Results
                      <br /> <b>3</b>
                    </p>
                  </div>

                  <div className="actions">
                    <Button className="editBtn" onClick={() => navigate("edit")}>
                      <i className="ri-settings-line"></i> Edit
                    </Button>
                    <Button onClick={() => navigate("/questionaires/new")} className="editBtn">
                      <i className="ri-message-3-line"></i> Add Questionaire
                    </Button>
                    <Button
                      className="deleteBtn"
                      onClick={() => handleFixtureDelete(data._id)}
                    >
                      <i className="ri-delete-bin-5-line"></i> Delete
                    </Button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
