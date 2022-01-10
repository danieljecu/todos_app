import React, { useState } from "react";
import { TextField } from "@mui/material";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <TextField
        helperText="search"
        id="search"
        label="search"
      />
      <input
        type="text"
        value={searchValue}
        placeholder="Search"
        onChange={handleInput}
      />
    </div>
  );
}
