import axios from "axios";
export const getFixtures = async () => {
  var fixtures = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/fixture"
  );

  return fixtures;
};
export const newFixture = async (data) => {
  await axios.post(import.meta.env.VITE_API_URI + "api/v1/new-fixture", data);
};

export const deleteFixture = async (data) => {
  await axios.delete(import.meta.env.VITE_API_URI + "api/v1/delete-fixture", {
    data: {
      _id: data,
    },
  });
};
