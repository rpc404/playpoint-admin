import axios from "axios";
export const getStats = async () => {
  var stats = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/admin-stats"
  );

  return stats;
};