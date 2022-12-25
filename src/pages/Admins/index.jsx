import React from "react";
import { toast } from "react-toastify";
import { addAdmin, allAdmins, removeAdmin } from "../../api/AdminStats";
import "../../dest/pages/Admins/styles/style.css"
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const Admin = () => {
  const [wallet, setWallet] = React.useState("");
  const [name, setname] = React.useState("");
  const [role, setRole] = React.useState("");

  const [admins, setAdmins] = React.useState([]);

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
    <div className="admin__container">
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
            <InputLabel id="demo-simple-select-label">Choose Role</InputLabel>
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
      <div className="all_admins">
        <h2>Admins</h2>
        <div className="admins">
          {admins.map((admin, index) => {
            return (
              <div className="box" key={index}>
                <p>Name : {admin.name}</p>
                <p>
                  <i className="ri-wallet-line"></i> {admin.wallet}{" "}
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
                  <button onClick={() => deleteAdmin(admin._id)}>Remove</button>
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
