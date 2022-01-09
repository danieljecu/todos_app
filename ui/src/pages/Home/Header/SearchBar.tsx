import React, { useState } from "react";


export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  return (
    <div>
         <input
        type="text"
        value={searchValue}
        placeholder="Search"
        onChange={handleInput}
      />
    </div>
  );
}
