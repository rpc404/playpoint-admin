import { Button, TextField } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { newResults } from "../../api/Results";
import { useLocation } from "react-router-dom";
import "./styles/style.css";
import pusherJs from "pusher-js";

export default function NewResult() {
  const params = useLocation();
  const _results = [];

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
    predictionChannel.bind("newresult", (data) => {
      t.push(data);
      setTransaction(t)
    });
  }, []);

  const handleNewResultSubmit = async () => {
    setLoading(true);
    const answer0 = String(sessionStorage.getItem("result-answer0"));
    const answer1 = String(sessionStorage.getItem("result-answer1"));
    const answer2 = String(sessionStorage.getItem("result-answer2"));
    const answer3 = String(sessionStorage.getItem("result-answer3"));
    data.results = [answer0,answer1,answer2,answer3];
    const __data = {
      results: data.results.join(",").toString(),
      questionaireId: data.questionaireId,
    };
     const value = await newResults(__data);
    setLoading(false);
    toast(value.data.message);
    // window.location.reload();
  };

  const handleRadioChange = (question, answer) => {
    sessionStorage.setItem("result-answer" + question, String(answer));
  };


  return (
    <div className="newResult_wrapper">
    <div className="newresult__container">
      <h1>New Result</h1>
      <TextField
        label="Questionaire ID"
        value={result.questionaireId}
        disabled
        onChange={(e) =>
          setResult({ ...result, questionaireId: e.target.value })
        }
      />
        {result.questions.questions.map(
              (q, index) => (
                <div className="questionItem" key={index}>
                  <div className="top">
                    <p>
                      {index + 1}. {q}
                    </p>
                    <p>
                      {
                        result.questions.points[
                          index
                        ]
                      }{" "}
                      Points
                    </p>
                  </div>
                  <div className="answers">

                    {getAnswer(
                      result.questions.answers[
                        index
                      ],
                      handleRadioChange,
                      index
                    )}
                  </div>
                </div>
              )
            )}
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


const getAnswer = (prop, handleRadioChange, index) => {
  if (prop.startsWith("radio")) {
    const tags = String(prop.split("@")[1]).split(",");
    return (
      <div>
        <p>
          <em>*choose one</em>
        </p>
        <div className="row-radio">
          {tags.map((tag, _index) => (
            <div className="wrapper" key={_index}>
              <label className="custom-label">{tag}</label>
              <input
                type="radio"
                name={"q_" + index}
                className="custom-radio"
                value={tag.trim()}
                onChange={(e) => handleRadioChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (prop.startsWith("scoreof2")) {
    const teams = String(prop.split("@")[1]).split(",");
    return (
      <div>
        <p>
          <em>*Enter Scores of both team</em>
        </p>
        <div className="row-input">
          {teams.map((tag, _index) => (
            <div className="wrapper" key={_index}>
              <label className="custom-label">{tag}</label>
              <input
                type="number"
                className="custom-input"
                required
                name={"q_" + index}
                onChange={(e) =>
                  handleScoreChange(_index, tag, index, e.target.value)
                }
               
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (prop.startsWith("number")) {
    return (
      <div>
        <p>
          <em>*Enter any number</em>
        </p>
        <div className="row-input">
          <div className="wrapper">
            <input
              type="number"
              className="custom-input"
              required
              name={"q_" + index}
              onChange={(e) => handleRadioChange(index, e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }
};

const handleScoreChange = (sample, tag, answerNo, value) => {
  value
    ? sessionStorage.setItem(answerNo + "result-answer" + sample, tag + value)
    : sessionStorage.removeItem(answerNo + "result-answer" + sample);
  if (sample == 1) {
    let _prev = sessionStorage.getItem(answerNo + "result-answer" + (sample - 1));
    if (_prev) {
      _prev += "-" + (tag + value);
      sessionStorage.setItem("result-answer" + answerNo, _prev);
    }
  }
  if (sample == 0) {
    let _prev = sessionStorage.getItem(answerNo + "result-answer" + (sample + 1));
    if (_prev) {
      _prev = tag + value + "-" + _prev;
      sessionStorage.setItem("result-answer" + answerNo, _prev);
    } else {
      sessionStorage.setItem("result-answer" + answerNo, tag + value);
    }
  }
};
