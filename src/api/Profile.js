import axios from "axios";
export const getProfiles = async () => {
  var profile = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/admin-profile"
  );
  return profile;
};