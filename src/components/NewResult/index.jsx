import { Button, TextField } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { newResults } from "../../api/Results";
import { useLocation } from "react-router-dom";
import "./styles/style.css";

export default function NewResult() {
  const params = useLocation();
  let _results = [];

  const data = {
    questionaireId: params.state?.qid,
    questions: params.state?.questions,
    results: _results,
  };


  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(data);

  // const handleResetInputs = () => {
  //   setResult({
  //     questionaireId: "",
  //     results: _results,
  //   });
  // };

  const handleNewResultSubmit = async () => {
    setLoading(true);

    const __data = {
      results: data.results.join(","),
      questionaireId: data.questionaireId,
    };
    // console.log(data)
     const value = await newResults(__data);
     console.log(value);

    setLoading(false);
    toast("New Result created successfully!");
    // window.location.reload();
  };

  return (
    <div className="newresult__container">
      <h1>New Result</h1>
      <TextField
        label="Questionaire ID"
        value={result.questionaireId}
        onChange={(e) =>
          setResult({ ...result, questionaireId: e.target.value })
        }
      />
      {result.questions.map((question, i) => {
        return (
          <div key={i} className="textfield__container">
            <p>Q: {question}</p>
            <TextField onChange={(e) => (_results[i] = e.target.value)} />
          </div>
        );
      })}
      <Button
        className="submitBtn"
        type="submit"
        onClick={() => handleNewResultSubmit()}
      >
        Submit
      </Button>
      <Button onClick={() => handleResetInputs()}>Reset</Button>
    </div>
  );
}
