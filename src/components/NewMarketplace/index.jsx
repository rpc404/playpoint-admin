import React from "react";
import { Box, Button, TextField } from "@mui/material";
import "./styles/style.css";
import { toast } from "react-toastify";
import { newMarketplaces } from "../../api/Marketplace";

export default function NewMarketplace() {
  const [newMarketplaceItem, setNewMarketplaceItem] = React.useState({
    marketplaceSlug: "",
    marketplaceName: "",
    marketplaceCoverImage: null,
    tags: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleMarketplaceSlug = (e) => {
    setNewMarketplaceItem({
      ...newMarketplaceItem,
      marketplaceSlug:
        e.target.value.replace(/ /g, "-") +
        Math.floor(Math.random() * (999 - 100 + 1) + 100),
      marketplaceName: e.target.value,
    });
  };

  const handleResetInputs = () => {
    setNewMarketplaceItem({
      marketplaceSlug: "",
      marketplaceName: "",
      marketplaceCoverImage: null,
    });
  };

  const handleMarketplaceSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    const { marketplaceName, marketplaceCoverImage, marketplaceSlug, tags } =
      newMarketplaceItem;

    formData.append("marketplaceSlug", marketplaceSlug);
    formData.append("marketplaceName", marketplaceName);
    formData.append("marketplaceCoverImage", marketplaceCoverImage);
    formData.append("tags", tags);

    await newMarketplaces(formData)

    setLoading(false);
    toast("Marketplace created successfully!");

    handleResetInputs()
  };

  return (
    <div className="newMarketplace__container">
      <h1 className="header">New Markteplace</h1>

      <Box
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
          src={
            newMarketplaceItem.marketplaceCoverImage
              ? URL.createObjectURL(newMarketplaceItem.marketplaceCoverImage)
              : "https://images.unsplash.com/photo-1611071536600-036ef2b47de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
          }
          loading="lazy"
        />
        <input
          type="file"
          name="marketplaceSlug"
          id=""
          onChange={(e) =>
            setNewMarketplaceItem({
              ...newMarketplaceItem,
              marketplaceCoverImage: e.target.files[0],
            })
          }
        />
        <TextField
          disabled={loading && true}
          id="outlined-basic"
          label="Marketplace Slug"
          variant="outlined"
          value={newMarketplaceItem.marketplaceSlug}
        />
        <TextField
          disabled={loading && true}
          id="outlined-basic"
          label="Marketplace Name"
          variant="outlined"
          value={newMarketplaceItem.marketplaceName}
          onChange={handleMarketplaceSlug}
        />
        <TextField
          disabled={loading && true}
          id="outlined-basic"
          label="Tags"
          variant="outlined"
          value={newMarketplaceItem.tags}
          onChange={(e) =>
            setNewMarketplaceItem({
              ...newMarketplaceItem,
              tags: e.target.value,
            })
          }
        />
        <Button disabled={loading && true} className="submitBtn" type="submit">
          Submit
        </Button>
        <Button disabled={loading && true} onClick={() => handleResetInputs()}>
          Reset
        </Button>
      </Box>
    </div>
  );
}
