//Imported Libraries
import React from "react";

//Functional Component
const Search = ({ searchValue, handleChangeValue }) => (
  <form className="search">
    <input
      className="search__input--name"
      type="text"
      name="name"
      value={searchValue.name}
      onChange={(e) => handleChangeValue(e)}
      autoComplete="off"
      placeholder="Search by name"
      autoFocus
    />
    <input
      className="search__input--tags"
      type="text"
      name="tags"
      value={searchValue.tags}
      onChange={(e) => handleChangeValue(e)}
      autoComplete="off"
      placeholder="Search by tag"
    />
  </form>
);

export default Search;
