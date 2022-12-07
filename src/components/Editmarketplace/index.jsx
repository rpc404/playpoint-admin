import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMarketplace } from "../../api/Marketplace";

export default function EditMarketplace() {
  const navigate = useNavigate();
  const params = useLocation();
  const [editMarketplaceItem, setEditMarketplaceItem] = React.useState({
    marketplaceName: "",
    marketplaceSlug: "",
    marketplaceCoverImage: null,
    tags: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleResetInputs = () => {
    setEditMarketplaceItem({
      marketplaceName: "",
      marketplaceSlug: "",
      tags: "",
      marketplaceCoverImage:null,
    });
  };

  React.useEffect(() => {
    const marketplaceItem = localStorage.getItem("marketplace_for_edit");
    setEditMarketplaceItem(JSON.parse(marketplaceItem));
  }, []);

  const handleMarketplaceSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { marketplaceName, marketplaceSlug, tags, marketplaceCoverImage } =
      editMarketplaceItem;
    await updateMarketplace({
      marketplaceSlug,
      marketplaceName,
      tags,
      marketplaceCoverImage,
    });
    setLoading(false);
    toast("Marketplace updated successfully!");
    localStorage.removeItem("marketplace_for_edit");

    navigate("/marketplaces");
  };

  return (
    <div className="newMarketplace__container">
      <h1 className="header">Edit Markteplace</h1>

      <Box
        aria-disabled={loading && "disabled"}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className="newMarketplaceForm__container"
        onSubmit={handleMarketplaceSubmit}
      >
        <label>Marketplace Cover Image</label>
        {/* <img
          src={
            editMarketplaceItem.marketplaceCoverImage
              ? URL.createObjectURL(editMarketplaceItem.marketplaceCoverImage)
              : "https://images.unsplash.com/photo-1611071536600-036ef2b47de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
          }
          loading="lazy"
        /> */}
        <input
          type="file"
          name="marketplaceSlug"
          id=""
          onChange={(e) =>
            setEditMarketplaceItem({
              ...editMarketplaceItem,
              marketplaceCoverImage: e.target.files[0],
            })
          }
        />
        <TextField
          id="outlined-basic"
          label="Marketplace Slug"
          variant="outlined"
          value={params?.state.marketplaceSlug || ""}
          disabled
        />
        <TextField
          id="outlined-basic"
          label="Marketplace Name"
          variant="outlined"
          // value={editMarketplaceItem.marketplaceName || ""}
          onChange={(e) =>
            setEditMarketplaceItem({
              ...editMarketplaceItem,
              marketplaceName: e.target.value,
            })
          }
        />
        <TextField
          id="outlined-basic"
          label="Tags"
          variant="outlined"
          // value={editMarketplaceItem.tags || ""}
          onChange={(e) =>
            setEditMarketplaceItem({
              ...editMarketplaceItem,
              tags: e.target.value,
            })
          }
        />
        <Button className="submitBtn" type="submit">
          Submit
        </Button>
        <Button onClick={() => handleResetInputs()}>Reset</Button>
      </Box>
    </div>
  );
}
