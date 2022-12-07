import axios from "axios";
export const getProfiles = async () => {
  var fixtures = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/profile"
  );
  return fixtures;
};