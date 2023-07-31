import React, { useState, useEffect } from "react";
import DisplayCard from "./DisplayCard";
import "../App.css";

// const API_URL = "https://jsonplaceholder.typicode.com/posts";

const CardList = () => {
  const [datalist, setDatalist] = useState([]);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatalist(data.slice(0, 10));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Display List</h1>

      {datalist?.length > 0 ? (
        <div className="container">
          {datalist.map((dataLt) => (
            <DisplayCard dataLt={dataLt} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Data not found</h2>
        </div>
      )}
    </div>
  );
};

export default CardList;
