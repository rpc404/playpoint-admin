import axios from "axios";

export const getQuestionaires = async () => {
  var questionaires = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/questionaires"
  );

  return questionaires;
};
export const newQuestionaire = async (data) => {
  console.log(data);
  return await axios.post(
    import.meta.env.VITE_API_URI + "api/v1/new-questionaire",
    data,
    {
      headers: { authorization: "Admin-v1_playpoint_admin" },
    }
  );
};

export const deleteQuestionaire = async (data) => {
  await axios.delete(
    import.meta.env.VITE_API_URI + `api/v1/delete-questionaire/${data}`,
    {
      headers: { authorization: "Admin-v1_playpoint_admin" },
    }
  );
};
