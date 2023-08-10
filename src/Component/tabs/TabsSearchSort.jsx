import React from "react";

const TabsSearchSort = ({
  searchInput,
  handleSearch,
  SearchIcon,
  handleSort,
  sortDirection,
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
}) => (
  <>
    <div style={{ display: "flex" }}>
      <div className="searchTab" style={{ width: "71%" }}>
        <input
          className="tabBtn"
          value={searchInput}
          onChange={(event) => handleSearch(event)}
          placeholder="Search List"
        />
        <img src={SearchIcon} alt="search" />
      </div>
      <div className="searchTab" style={{ width: "8%", marginLeft: "20%" }}>
        <button
          style={{ background: "#497977", cursor: "pointer" }}
          onClick={handleSort}
        >
          {sortDirection === "asc" ? (
            <FcAlphabeticalSortingAz size={40} />
          ) : (
            <FcAlphabeticalSortingZa size={40} />
          )}
        </button>
      </div>
    </div>
  </>
);

export default TabsSearchSort;
