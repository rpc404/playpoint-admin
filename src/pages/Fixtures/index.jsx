import { Button, Typography } from "@mui/material";
import React from "react";
import "./styles/style.css";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteFixture, getFixtures } from "../../api/Fixture";
// import {getProfiles} from "../../api/Profile"
import FixtureCard from "../../components/FixtureCard";

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

  // console.log(fixtures);

  const handleFixtureDelete = async (_id) => {
    toast("Marketplace added to delete queue!");
    setFixtures(fixtures.filter((i) => i._id !== _id));
    const deletedFixture =  await deleteFixture(_id);
    console.log(deletedFixture) 
    toast("Marketplace deleted successfully!");
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const res = await getFixtures();
      console.log(res)
      setFixtures(res.data.fixtures.reverse());
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
                <FixtureCard
                  fixture={data}
                  key={index}
                  handleFixtureDelete={handleFixtureDelete}
                />
              );
            })
          : fixtures.map((data, index) => {
              return (
                <FixtureCard
                  fixture={data}
                  key={index}
                  handleFixtureDelete={handleFixtureDelete}
                />
              );
            })}
      </div>
    </div>
  );
}
