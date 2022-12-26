import React from "react";
import { toast } from "react-toastify";
import { addAdmin, allAdmins, removeAdmin } from "../../api/AdminStats";
import "./styles/style.css";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [wallet, setWallet] = React.useState("");
  const [name, setname] = React.useState("");
  const [role, setRole] = React.useState("");

  const [admins, setAdmins] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    allAdmins().then((res) => setAdmins(res.data));
  }, []);

  const handleSubmit = async () => {
    if (wallet !== "" && role !== "" && name !== "") {
      const user = await addAdmin({ wallet: wallet.toLowerCase(), role, name });
      if (user.status == 201) {
        setAdmins([...admins, user.data]);
        toast("New Admin Added");
      } else if (user.status == 200) {
        toast(user.data.msg);
      }
      setname("");
      setRole("");
      setWallet("");
    } else {
      toast("field is empty!");
    }
  };

  const deleteAdmin = async (id) => {
    const res = await removeAdmin({ wallet: id });
    if (res.status == 200) {
      setAdmins(admins.filter((admin) => admin._id !== id));
      toast("Admin Removed");
    }
  };
  return (
    <div className="container">
      <div className="admin_nav">
        <h3>Playpoint</h3>
        <img
          src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
          alt="playpoint_logo"
        />
      </div>
      <Box className="admin__container">
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Add Admin" {...a11yProps(0)} />
          <Tab label="Admins" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="form__container">
            <div className="form">
              <h3>Add admin</h3>
              <TextField
                id="name"
                variant="outlined"
                label="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <TextField
                label="address"
                onChange={(e) => setWallet(e.target.value)}
              />
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Choose Role
                </InputLabel>
                <Select
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Choose Role"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="superadmin">Super Admin</MenuItem>
                  <MenuItem value="analytics">Analytics</MenuItem>
                </Select>
              </FormControl>
              <button onClick={() => handleSubmit()}>add admin</button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="all_admins">
            <h2>Admins</h2>
            <div className="admins">
              {admins.map((admin, index) => {
                return (
                  <div className="box" key={index}>
                    <p>Name : {admin.name}</p>
                    <p>
                      <i className="ri-wallet-line"></i> {admin.wallet}
                      <i
                        className="ri-clipboard-line"
                        title="copy to clipboard"
                        onClick={() =>
                          window.navigator.clipboard
                            .writeText(admin.wallet)
                            .then(() => {
                              toast("wallet address copied!");
                            })
                        }
                      ></i>
                    </p>
                    <p>Role : {admin.role}</p>
                    <div className="button__container">
                      <button onClick={() => deleteAdmin(admin._id)}>
                        Remove
                      </button>
                      <i className="ri-delete-bin-line"></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default Admin;
