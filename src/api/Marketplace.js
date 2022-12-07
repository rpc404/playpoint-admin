import axios from "axios";

export const getMarketplaces = async () => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/marketplace"
  );

  return marketplaces;
};

export const newMarketplaces = async (data) => {
  console.log(data);
  return await axios.post(
    import.meta.env.VITE_API_URI + "api/v1/new-marketplace",
    data,
    {
      headers: { authorization: "Admin-v1_playpoint_admin" },
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
  await axios.patch(
    import.meta.env.VITE_API_URI + "api/v1/update-marketplace",
    data
  );
};

export const deleteMarketplace = async (slug) => {
  await axios.delete(
    import.meta.env.VITE_API_URI + "api/v1/delete-marketplace",
    {
      data: {
        marketplaceSlug: slug,
      },
    }
  );
};
