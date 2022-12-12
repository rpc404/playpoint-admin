import { Button, TextField } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { newResults } from "../../api/Results";
import { useLocation } from "react-router-dom";
import "./styles/style.css";
import pusherJs from "pusher-js";

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
  const [transactions, setTransaction] = React.useState([]);
  let t = [];
  React.useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    const pusher = new pusherJs("e6640b48a82cccbb13d0", {
      cluster: "ap2",
    });
    pusher.connection.bind("connected", function () {
      console.log("Weboscket Connected");
    });
    const predictionChannel = pusher.subscribe("result-channel");
    // console.log(predictionChannel.handleSubscriptionSucceededEvent("new-result"))
    predictionChannel.bind("newresult", (data) => {
      t.push(data);
      setTransaction(t)
    });
  }, []);

  // const handleResetInputs = () => {
  //   setResult({
  //     questionaireId: "",
  //     results: _results,
  //   });
  // };

  const handleNewResultSubmit = async () => {
    setLoading(true);
    const __data = {
      results: data.results.join(",").toString(),
      questionaireId: data.questionaireId,
    };
    console.log(__data)
     const value = await newResults(__data);
     console.log(value)
    setLoading(false);
    toast("New Result created successfully!");
    // window.location.reload();
  };

  return (
    <div className="newResult_wrapper">
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
        { loading ? "....." :  "Submit"}
      </Button>
      <Button onClick={() => handleResetInputs()}>Reset</Button>
    </div>
    <div className="newResult_response">
    {
        transactions.length > 0 && (
          transactions.map((trans,key)=>{
            return <div key={key}>
            <h2>Wallet: {trans.wallet}</h2>
            <p>Points: {trans.points}</p>
            <p>Reward: {trans.reward}</p>
            <a href={"https://sepolia.etherscan.io/tx/"+trans.hash} target={'_blank'}>Txn Hash: {trans.hash}</a>
            </div>
          })
        )
      }
    </div>
    </div>
  );
}
