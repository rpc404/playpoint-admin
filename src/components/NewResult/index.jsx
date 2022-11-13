import { Button, TextField } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { newResults } from "../../api/Results";
import { useLocation } from "react-router-dom";
import "./styles/style.css";

export default function NewResult() {
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState({
    results: [],
  });
  const params = useLocation()

  const [resultOne, setResultOne] = React.useState("");
  const [resultTwo, setResultTwo] = React.useState("");
  const [resultThree, setResultThree] = React.useState("");
  const [resultFour, setResultFour] = React.useState("");

  const handleResetInputs = () => {
    setResult({
      questionaireId: "",
      results: [],
    });

    setResultOne("")
    setResultTwo("")
    setResultThree("")
    setResultFour("")
  };

  const handleNewResultSubmit = async () => {
    setLoading(true)

    const data = {
      questionaireId: params.state?.questionaireId,
      results: [resultOne, resultTwo, resultThree, resultFour]
    }

    await newResults(data)

    setLoading(false)
    toast("New Result created successfully!");
    
    handleResetInputs();
  }

  return (
    <div className="newresult__container">
      <h1>New Result</h1>

      <TextField label="Questionaire ID" value={result.questionaireId} onChange={e => setResult({...result, questionaireId: e.target.value})}/>
      <TextField
        label="Answer 1"
        value={resultOne}
        onChange={(e) => setResultOne(e.target.value)}
      />
      <TextField
        label="Answer 2"
        value={resultTwo}
        onChange={(e) => setResultTwo(e.target.value)}
      />
      <TextField
        label="Answer 3"
        value={resultThree}
        onChange={(e) => setResultThree(e.target.value)}
      />
      <TextField
        label="Answer 4"
        value={resultFour}
        onChange={(e) => setResultFour(e.target.value)}
      />
      <Button className="submitBtn" type="submit" onClick={() => handleNewResultSubmit()}>
        Submit
      </Button>
      <Button onClick={() => handleResetInputs()}>Reset</Button>
    </div>
  );
}
