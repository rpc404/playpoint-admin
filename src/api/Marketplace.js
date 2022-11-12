import axios from "axios";

export const getMarketplaces = async () => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/marketplace"
  );

  return marketplaces;
};

export const newMarketplaces = async (data) => {
  await axios
  .post(import.meta.env.VITE_API_URI + "api/v1/new-marketplace", data)
}

export const updateMarketplace = async (data) => {
  await axios
      .patch(import.meta.env.VITE_API_URI + "api/v1/update-marketplace", data)
}

export const deleteMarketplace = async (slug) => {
  await axios.delete(
    import.meta.env.VITE_API_URI + "api/v1/delete-marketplace",
    {
      data: {
        marketplaceSlug: slug,
      }
    }
  );
};
