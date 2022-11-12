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
import "./styles/style.css";

export default function NewQuestionaire() {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    bidPrice: 5,
    questionType: 3,
    poolType: "duo",
    questionaires: ["", "", ""],
  });

  const [questionOne, setQuestionOne] = React.useState("");
  const [questionTwo, setQuestionTwo] = React.useState("");
  const [questionThree, setQuestionThree] = React.useState("");
  const [questionFour, setQuestionFour] = React.useState("");

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

  const handleResetInputs = () => {
    setFormData({
      bidPrice: 5,
      questionType: 3,
      poolType: "duo",
      questionaires: ["", "", ""],
    });

    setQuestionOne("")
    setQuestionTwo("")
    setQuestionThree("")
    setQuestionFour("")
  }

  const handleQuestionaireSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { fixtureId, bidPrice, questionType, poolType, questions } = formData;

    if (questionType === 3) {
      const data = {
        fixtureId: "124",
        bidPrice,
        questionType,
        poolType,
        questionaires: [questionOne, questionTwo, questionThree],
      };

      await newQuestionaire(data)
    } else {
      const data = {
        fixtureId: "124",
        bidPrice,
        questionType,
        poolType,
        questionaires: [questionOne, questionTwo, questionThree, questionFour],
      };

      await newQuestionaire(data)
    }

    setLoading(false);
    handleResetInputs()
    toast("Questionaire created successfully!");
  };

  return (
    <div className="newQuestionaire__container">
      <h1>New Questionaire</h1>

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
          <MenuItem value={5}>$5</MenuItem>
          <MenuItem value={20}>$20</MenuItem>
          <MenuItem value={50}>$50</MenuItem>
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
              questionaires: e.target.value === 3 ? ["", "", ""] : ["", "", "", ""],
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
              <TextField
                key={index}
                value={
                  index === 0
                    ? questionOne
                    : index === 1
                    ? questionTwo
                    : questionThree
                }
                id="outlined-basic"
                label={`Question ${index + 1}`}
                variant="outlined"
                onChange={(e) => handleQuestionInput(index, e.target.value)}
              />
            );
          })
        : ["", "", "", ""].map((data, index) => {
            return (
              <TextField
              disabled={loading && true}
                key={index}
                value={
                  index === 0
                    ? questionOne
                    : index === 1
                    ? questionTwo
                    : index === 2
                    ? questionThree
                    : questionFour
                }
                id="outlined-basic"
                label={`Question ${index + 1}`}
                variant="outlined"
                onChange={(e) => handleQuestionInput(index, e.target.value)}
              />
            );
          })}
      <Button
        className="submitBtn"
        onClick={(e) => handleQuestionaireSubmit(e)}
      >
        Submit
      </Button>
      <Button>Reset</Button>
    </div>
  );
}
