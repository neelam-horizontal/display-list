import React, { useState, useEffect } from "react";
import DisplayCard from "./DisplayCard";

import SearchIcon from "../search.svg";
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from "react-icons/fc";
import "../../App.css";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const CardList = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [datalist, setDatalist] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    fetch(API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatalist(data.slice(0, 35));
      });
  };
  // console.log(datalist);

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(datalist.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = datalist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (value.length === 0) {
      fetchData();
    } else {
      const result = datalist.filter((data) => {
        return data.title.toLowerCase().includes(value);
      });
      setDatalist(result);
    }
  };

  const handleSort = () => {
    const sortedList = [...datalist].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setDatalist(sortedList);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <h1>Display List</h1>
      <div style={{ display: "flex" }}>
        <div className="search">
          <input
            value={searchTerm}
            onChange={(event) => handleSearch(event)}
            placeholder="Search List"
          />
          <img src={SearchIcon} alt="search" />
        </div>
        <div className="search" style={{ marginLeft: "4em" }}>
          <button
            style={{ background: "#31363b", cursor: "pointer" }}
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

      {datalist?.length > 0 ? (
        <div className="container">
          {/* {datalist.map((dataLt) => ( */}
          {paginatedData.map((dataLt) => (
            <DisplayCard key={dataLt.id} dataLt={dataLt} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Data not found</h2>
        </div>
      )}

      <div style={{ display: "flex" }}>
        {datalist.length > itemsPerPage && (
          <div className="pagination card-btn">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                // style={{ marginLeft: "4em" }}
                className={
                  currentPage === index + 1 ? "active pg-btn" : "pg-btn"
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CardList;
