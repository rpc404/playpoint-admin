import axios from "axios";

export const getMarketplaces = async () => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/marketplace"
  );

  return marketplaces;
};

export const newMarketplaces = async (data) => {
  console.log("formdata", data);
  return await axios.post(
    import.meta.env.VITE_API_URI + "api/v1/new-marketplace",
    data,
    {
      headers: {
        authorization: "Admin-v1_playpoint_admin",
      },
    }
  );
};

export const getMarketplaceStat = async (slug) => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + `api/v1/marketplace-stats/${slug}`,
    {
      headers: { authorization: "Admin-v1_playpoint_admin" },
    }
  );

  return marketplaces;
};

export const getAllPredictionsByFixture = (f_id) => {
  return axios.get(
    import.meta.env.VITE_API_URI + `api/v1/prediction?fixtureid=${f_id}`
  );
};

export const updateMarketplace = async (data) => {
  console.log(data);
  await axios.patch(
    import.meta.env.VITE_API_URI + `api/v1/update-marketplace/${data}`,
    {
      headers: { authorization: "Admin-v1_playpoint_admin" },
    }
  );
};

export const deleteMarketplace = async (slug) => {
  console.log(slug);
  await axios.delete(
    import.meta.env.VITE_API_URI + `api/v1/delete-marketplace/${slug}`,
    {
      headers: { authorization: "Admin-v1_playpoint_admin" },
    }
  );
};
