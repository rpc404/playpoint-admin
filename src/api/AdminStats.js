import axios from "axios";
const config = {
  headers:{
    authorization:"Admin-v1_playpoint_admin"
  }
}
export const getStats = async () => {
  var stats = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/admin-stats"
  );

  return stats;
};

export const addAdmin = async (data) => {
  var stats = await axios.post(
    import.meta.env.VITE_API_URI + "api/v1/admin-add",
    data,
    config
  );

  return stats;
};

export const allAdmins = async () => {
  var stats = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/admins",
    config
  );
  return stats;
};

export const getAdmin = async (wallet) => {
  var stats = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/admin/"+wallet,
    config
  );
  return stats;
};

export const removeAdmin = async (data) => {
  var stats = await axios.post(
    import.meta.env.VITE_API_URI + "api/v1/delete-admin",
    data,
    config
  );
  return stats;
}
