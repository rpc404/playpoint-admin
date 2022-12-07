import axios from "axios";
export const getFixtures = async () => {
  var fixtures = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/fixture"
  );

  return fixtures;
};
export const newFixture = async (data) => {
  return await axios.post(
    import.meta.env.VITE_API_URI + "api/v1/new-fixture",
    data,
    {
      headers: { authorization: "Admin-v1_playpoint_admin" },
    }
  );
};

export const deleteFixture = async (data) => {
   return await axios.delete(
    import.meta.env.VITE_API_URI + `api/v1/delete-fixture/${data}`,
    {
      headers: { authorization: "Admin-v1_playpoint_admin" },
    }
  );
};

export const getFixutreById = async (fixtureId) => {
  var fixture = await axios.get(
    import.meta.env.VITE_API_URI + `api/v1/fixture-specific/${fixtureId}`
  );

  return fixture;
};

export const updateFixtureStatus = async (fixtureId, status) => {
  var _status = await axios.post(
    import.meta.env.VITE_API_URI +
      `api/v1/update-fixture-status/${fixtureId}/${status}`,
    {},
    { headers: { authorization: "Admin-v1_playpoint_admin" } }
  );

  return _status;
};
