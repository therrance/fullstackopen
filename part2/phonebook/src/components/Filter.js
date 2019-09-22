import React from "react";

const Filter = ({ filterValue, handleFilter }) => (
  <div>
    filter shown with: <input onChange={handleFilter} value={filterValue} />
  </div>
);

export default Filter;
