import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
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
  const params = useLocation();
  console.log(params);

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
      {formData.questionType === 3
        ? ["", "", ""].map((data, index) => {
            return (
              <div className="formQuestion__container" key={index}>
                <input
                  type="text"
                  value={
                    index === 0
                      ? questionOne
                      : index === 1
                      ? questionTwo
                      : questionThree
                  }
                  placeholder="Question"
                  label={`Question ${index + 1}`}
                  onChange={(e) => handleQuestionInput(index, e.target.value)}
                />
                <input
                  type="text"
                  value={
                    index === 0
                      ? pointsOne
                      : index === 1
                      ? pointsTwo
                      : pointsThree
                  }
                  placeholder="points"
                  onChange={(e) => handlePointsInput(index, e.target.value)}
                />
              </div>
            );
          })
        : ["", "", "", ""].map((data, index) => {
            return (
              <div className="formQuestion__container" key={index}>
                <input
                  type="text"
                  placeholder="Question"
                  value={
                    index === 0
                      ? questionOne
                      : index === 1
                      ? questionTwo
                      : index === 2
                      ? questionThree
                      : questionFour
                  }
                  label={`Question ${index + 1}`}
                  onChange={(e) => handleQuestionInput(index, e.target.value)}
                />
                <input
                  type="text"
                  value={
                    index === 0
                      ? pointsOne
                      : index === 1
                      ? pointsTwo
                      : index === 2
                      ? pointsThree
                      : pointsFour
                  }
                  placeholder="points"
                  onChange={(e) => handlePointsInput(index, e.target.value)}
                />
              </div>
            );
          })}
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
