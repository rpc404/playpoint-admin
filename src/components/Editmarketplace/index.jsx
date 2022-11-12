import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateMarketplace } from "../../api/Marketplace";

export default function EditMarketplace() {
  const navigate = useNavigate();
  const [editMarketplaceItem, setEditMarketplaceItem] = React.useState({
    marketplaceName: "",
    tags: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleResetInputs = () => {
    setEditMarketplaceItem({
      marketplaceName: "",
      tags: "",
    });
  };

  React.useEffect(() => {
    const marketplaceItem = localStorage.getItem("marketplace_for_edit");
    setEditMarketplaceItem(JSON.parse(marketplaceItem));
  }, []);

  const handleMarketplaceSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { marketplaceName, marketplaceSlug, tags } = editMarketplaceItem;
    await updateMarketplace({
      marketplaceSlug,
      marketplaceName,
      tags,
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
        <img
          src={editMarketplaceItem?.marketplaceCoverImage?.url}
          loading="lazy"
        />
        <TextField
          id="outlined-basic"
          label="Marketplace Slug"
          variant="outlined"
          value={editMarketplaceItem.marketplaceSlug}
          disabled
        />
        <TextField
          id="outlined-basic"
          label="Marketplace Name"
          variant="outlined"
          value={editMarketplaceItem.marketplaceName}
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
          value={editMarketplaceItem.tags}
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
