import { Button, Typography } from "@mui/material";
import React from "react";
import ResultsList from "../../mocks/Results.json";
import Fuse from "fuse.js";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import { deleteResults, getResults } from "../../api/Results";
import { toast } from "react-toastify";

export default function Results() {
  const [results, setResults] = React.useState([]);
  const [filteredResults, setFilteredResults] = React.useState([]);
  const navigate = useNavigate()

  const filter = (e) => {
    const options = {
      includeScore: true,
      keys: ["questionaireId"],
    };

    const fuse = new Fuse(ResultsList, options);
    const result = fuse.search(e.target.value);
    setFilteredResults(result);
  };

  const handleResultDelete = async (_id) => {
    toast("Result added to delete queue!");
    setResults(
      results.filter((i) => i._id !== _id)
    );
    await deleteResults(_id);
    toast("Result deleted successfully!");
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      const res = await getResults();
      setResults(res.data.data.reverse());
    })();
  }, []);
  return (
    <div className="result__container">
      <h1 className="title">Active Results</h1>

      <div className="search__container">
        <i className="ri-search-line"></i>{" "}
        <input onChange={filter} type="text" placeholder="Search Results..." />
      </div>

      <div className="result__items">
        {filteredResults.length > 0
          ? filteredResults.map((data, index) => {
              return (
                <div key={index} className="result__item">
                  <p>
                    <b>Questionaire</b>: {data.item.questionaireId}
                  </p>
                  <p>
                    <b>Pool Type</b>: Duo
                  </p>
                  <p>
                    <b>Questionaire Type</b>: 4
                  </p>

                  <ul>
                    {data.item.results.map((data, index) => {
                      return <li key={index}>{data}</li>;
                    })}
                  </ul>
                  <div className="actions">
                    <Button onClick={() => navigate("edit")} className="editBtn">
                      <i className="ri-settings-line"></i> Edit
                    </Button>
                    <Button className="deleteBtn" onClick={() => handleResultDelete(data.item._id)}>
                      <i className="ri-delete-bin-5-line"></i> Delete
                    </Button>
                  </div>
                </div>
              );
            })
          : results.map((data, index) => {
              return (
                <div key={index} className="result__item">
                  <p>
                    <b>Questionaire</b>: {data.questionaireId}
                  </p>
                  <p>
                    <b>Pool Type</b>: Duo
                  </p>
                  <p>
                    <b>Questionaire Type</b>: 4
                  </p>

                  <ul>
                    {data.results.map((data, index) => {
                      return <li key={index}>{data}</li>;
                    })}
                  </ul>
                  <div className="actions">
                    <Button onClick={() => navigate("edit")} className="editBtn">
                      <i className="ri-settings-line"></i> Edit
                    </Button>
                    <Button className="deleteBtn" onClick={() => handleResultDelete(data._id)}>
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
