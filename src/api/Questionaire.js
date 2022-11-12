import axios from "axios";

export const getQuestionaires = async () => {
    var questionaires = await axios.get(
      import.meta.env.VITE_API_URI + "api/v1/questionaires"
    );
  
    return questionaires;
  };
export const newQuestionaire = async (data) => {
    await axios
    .post(import.meta.env.VITE_API_URI + "api/v1/new-questionaire", data)
  }

  export const deleteQuestionaire = async (data) => {
    await axios.delete(import.meta.env.VITE_API_URI + "api/v1/delete-questionaire", {
      data: {
        _id: data,
      },
    });
  };