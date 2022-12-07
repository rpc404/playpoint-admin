import axios from "axios";

export const getResults = async () => {
  var Results = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/results"
  );

  return Results;
};

export const newResults = async (data) => {
  return await axios.post(import.meta.env.VITE_API_URI + "api/v1/new-result", data, {
    headers: { authorization: "Admin-v1_playpoint_admin" },
  });
};

export const updateResults = async (data) => {
  await axios.patch(
    import.meta.env.VITE_API_URI + "api/v1/update-result",
    data
  );
};

export const deleteResults = async (_id) => {
  await axios.delete(import.meta.env.VITE_API_URI + "api/v1/delete-result", {
    data: {
      _id,
    },
  });
};
