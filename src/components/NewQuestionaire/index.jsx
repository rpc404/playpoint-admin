import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { newQuestionaire } from "../../api/Questionaire";
import { useLocation } from "react-router-dom";
import "./styles/style.css";

export default function NewQuestionaire() {
  const [loading, setLoading] = React.useState(false);
  const [questionOne, setQuestionOne] = React.useState("");
  const [questionTwo, setQuestionTwo] = React.useState("");
  const [questionThree, setQuestionThree] = React.useState("");
  const [questionFour, setQuestionFour] = React.useState("");
  const [pointsOne, setPointsOne] = React.useState("");
  const [pointsTwo, setPointsTwo] = React.useState("");
  const [pointsThree, setPointsThree] = React.useState("");
  const [pointsFour, setPointsFour] = React.useState("");
  const [formData, setFormData] = React.useState({
    bidPrice: 5,
    questionType: 3,
    poolType: "duo",
    questionaires: { questions: ["", "", "", ""], points: ["", "", "", ""] },
  });

  const [formatOne, setFormatOne] = React.useState();
  const [formatTwo, setFormatTwo] = React.useState();
  const [formatThree, setFormatThree] = React.useState();
  const [formatFour, setFormatFour] = React.useState();


  
  const params = useLocation();


  const handleQuestionInput = (e, v) => {
    switch (e) {
      case 0:
        setQuestionOne(v);
        break;
      case 1:
        setQuestionTwo(v);
        break;
      case 2:
        setQuestionThree(v);
        break;
      case 3:
        setQuestionFour(v);
        break;
      default:
        break;
    }
  };

  const handlePointsInput = (e, v) => {
    switch (e) {
      case 0:
        setPointsOne(v);
        break;
      case 1:
        setPointsTwo(v);
        break;
      case 2:
        setPointsThree(v);
        break;
      case 3:
        setPointsFour(v);
        break;
      default:
        break;
    }
  };

  const handleResetInputs = () => {

    setFormData({
      bidPrice: 5,
      questionType: 3,
      poolType: "duo",
      questionaires: ["", "", ""],
      points: ["", "", ""],
    });

    setQuestionOne("");
    setQuestionTwo("");
    setQuestionThree("");
    setQuestionFour("");
    setPointsOne("");
    setPointsTwo("");
    setPointsThree("");
    setPointsFour("");
  };

  const handleQuestionaireSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { bidPrice, questionType, poolType } = formData;
    if (questionType === 3) {
      const data = {
        fixtureId: params?.state?.fixtureId,
        bidPrice,
        questionType,
        poolType,
        questionaires: {
          questions: [questionOne, questionTwo, questionThree],
          points: [pointsOne, pointsTwo, pointsThree],
        },
      };
      await newQuestionaire(data);
    } else {
      const data = {
        fixtureId: params?.state?.fixtureId,
        bidPrice,
        questionType,
        poolType,
        questionaires: {
          questions: [questionOne, questionTwo, questionThree, questionFour],
          points: [pointsOne, pointsTwo, pointsThree, pointsFour],
        },
      };

      await newQuestionaire(data);
    }

    setLoading(false);
    handleResetInputs();
    toast("Questionaire created successfully!");
  };

  return (
    <div className="newQuestionaire__container">
      <h1>New Questionaire</h1>
      questionaires
      <p>
        {params?.state.homeTeam} vs {params?.state.awayTeam}
      </p>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Bid Price</InputLabel>
        <Select
          disabled={loading && true}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.bidPrice}
          label="Bid Price"
          onChange={(e) =>
            setFormData({
              ...formData,
              bidPrice: e.target.value,
            })
          }
        >
          <MenuItem value={5}>$10</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
        <Select
          disabled={loading && true}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.questionType}
          label="Question Type"
          onChange={(e) => {
            setFormData({
              ...formData,
              questionType: e.target.value,
              questionaires:
                e.target.value === 3
                  ? [questionOne, questionTwo, questionThree]
                  : [questionOne, questionTwo, questionThree, questionFour],
            });
          }}
        >
          <MenuItem value={3}>3 Questions</MenuItem>
          <MenuItem value={4}>4 Questions</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pool Type</InputLabel>
        <Select
          disabled={loading && true}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.poolType}
          label="Question Type"
          onChange={(e) =>
            setFormData({
              ...formData,
              poolType: e.target.value,
            })
          }
        >
          <MenuItem value="duo">Duo</MenuItem>
          <MenuItem value="trio">Trio</MenuItem>
          <MenuItem value="nonet">Nonet</MenuItem>
          <MenuItem value="unlimited">Unlimited</MenuItem>
        </Select>
      </FormControl>
      <>
      <div className="formQuestion__container">
        <input
          type="text"
          value={questionOne}
          placeholder="Question"
          label={`Question ${1}`}
          onChange={(e) => handleQuestionInput(0, e.target.value)}
        />
        <input
          type="text"
          value={pointsOne}
          placeholder="points"
          onChange={(e) => handlePointsInput(0, e.target.value)}
        />
      </div>
      <select name="" id="" onChange={e=>setFormatOne(e.target.value)}>
        <option>Choose Answer Format</option>
        <option value="1">1 of 2</option>
        <option value="2">1 of 3</option>
        <option value="3">Scores of 2</option>
        <option value="4">Number</option>
      </select>
      <div>
        {
          formatOne==1 && <><p>Enter two options seprated by comma</p>
          <input type={"text"} />
          </>
        }
        {
          formatOne==2 && <><p>Enter three options seprated by comma</p>
          <input type={"text"} />
          </>
        }
         {
          formatOne==3 && <><p>Enter two teams seprated by comma</p>
          <input type={"text"} />
          </>
        }
        {
          formatOne==4 && <><p>Enter Max Number</p>
          <input type={"number"} />
          </>
        }
        
      </div>
      </>
      <>
      <div className="formQuestion__container">
        <input
          type="text"
          value={questionTwo}
          placeholder="Question"
          label={`Question ${2}`}
          onChange={(e) => handleQuestionInput(1, e.target.value)}
        />
        <input
          type="text"
          value={pointsTwo}
          placeholder="points"
          onChange={(e) => handlePointsInput(1, e.target.value)}
        />
      </div>
      <select name="" id="" onChange={e=>setFormatTwo(e.target.value)}>
        <option>Choose Answer Format</option>
        <option value="1">1 of 2</option>
        <option value="2">1 of 3</option>
        <option value="3">Scores of 2</option>
        <option value="4">Number</option>
      </select>
      <div>
        {
          formatTwo==1 && <><p>Enter two options seprated by comma</p>
          <input type={"text"} />
          </>
        }
        {
          formatTwo==2 && <><p>Enter three options seprated by comma</p>
          <input type={"text"} />
          </>
        }
         {
          formatTwo==3 && <><p>Enter two teams seprated by comma</p>
          <input type={"text"} />
          </>
        }
        {
          formatTwo==4 && <><p>Enter Max Number</p>
          <input type={"number"} />
          </>
        }
        
      </div>
      </>
      <>
      <div className="formQuestion__container">
        <input
          type="text"
          value={questionThree}
          placeholder="Question"
          label={`Question ${3}`}
          onChange={(e) => handleQuestionInput(2, e.target.value)}
        />
        <input
          type="text"
          value={pointsThree}
          placeholder="points"
          onChange={(e) => handlePointsInput(2, e.target.value)}
        />
      </div>
      <select name="" id="">
        <option>Choose Answer Format</option>
        <option value="1">1 of 2</option>
        <option value="2">1 of 3</option>
        <option value="3">Scores of 2</option>
        <option value="4">Number</option>
      </select>
      <div>
      {
          formatThree==1 && <><p>Enter two options seprated by comma</p>
          <input type={"text"} />
          </>
        }
        {
          formatThree==2 && <><p>Enter three options seprated by comma</p>
          <input type={"text"} />
          </>
        }
         {
          formatThree==3 && <><p>Enter two teams seprated by comma</p>
          <input type={"text"} />
          </>
        }
        {
          formatThree==4 && <><p>Enter Max Number</p>
          <input type={"number"} />
          </>
        }
      </div>
      </>
      <>
      <div className="formQuestion__container">
        <input
          type="text"
          value={questionFour}
          placeholder="Question"
          label={`Question ${1}`}
          onChange={(e) => handleQuestionInput(3, e.target.value)}
        />
        <input
          type="text"
          value={pointsFour}
          placeholder="points"
          onChange={(e) => handlePointsInput(3, e.target.value)}
        />
      </div>
      <select name="" id="" onChange={e=>setFormatFour(e.target.value)}>
        <option>Choose Answer Format</option>
        <option value="1">1 of 2</option>
        <option value="2">1 of 3</option>
        <option value="3">Scores of 2</option>
        <option value="4">Number</option>
      </select>
      <div>
      {
          formatFour==1 && <><p>Enter two options seprated by comma</p>
          <input type={"text"} />
          </>
        }
        {
          formatFour==2 && <><p>Enter three options seprated by comma</p>
          <input type={"text"} />
          </>
        }
         {
          formatFour==3 && <><p>Enter two teams seprated by comma</p>
          <input type={"text"} />
          </>
        }
        {
          formatFour==4 && <><p>Enter Max Number</p>
          <input type={"number"} />
          </>
        }
      </div>
      </>
      <Button
        className="submitBtn"
        onClick={(e) => handleQuestionaireSubmit(e)}
      >
        Submit
      </Button>
      <Button onClick={() => handleResetInputs()}>Reset</Button>
    </div>
  );
}
