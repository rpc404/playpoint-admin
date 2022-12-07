import React from "react";
import { toast } from "react-toastify";
import { addAdmin, allAdmins, removeAdmin } from "../../api/AdminStats";
import "./styles/style.css";

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
      const user = await addAdmin({ wallet, role, name });
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
          <input
            placeholder="name"
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
          <input
            placeholder="address"
            onChange={(e) => setWallet(e.target.value)}
            value={wallet}
          />
          <select onChange={(e) => setRole(e.target.value)} value={role}>
            <option value={""}>Choose Role</option>
            <option value={"admin"}>Admin</option>
            <option value={"superadmin"}>Super Admin</option>
            <option value={"analytics"}>Analytics</option>
          </select>
          <button onClick={() => handleSubmit()}>add admin</button>
        </div>
      </div>
      <div className="all_admins">
        <div className="admins">
          {admins.map((admin, index) => {
            return (
              <div className="box" key={index}>
                <p>Name : {admin.name}</p>
                <p>
                  <i class="ri-wallet-line"></i> {admin.wallet}{" "}
                  <i
                    className="ri-clipboard-line"
                    title="copy to clipboard"
                    onClick={() =>
                      window.navigator.clipboard.writeText(admin.wallet).then(() => {
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
