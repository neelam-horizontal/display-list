import React, { useState, useEffect } from "react";
import axios from "axios";

import TabsPagination from "./TabsPagination";
import TabsSearchSort from "./TabsSearchSort";
import TabsList from "./TabsList";

import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from "react-icons/fc";
import SearchIcon from "../search.svg";
import "./TabsPage.css";

const TabsPage = () => {
  const tabs = ["posts", "comments", "albums", "photos", "todos", "users"];
  const itemsPerPage = 10;

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = () => {
    // console.log(activeTab);
    const sortedList = [...data].sort((a, b) => {
      if (sortDirection === "asc" && activeTab === "comments") {
        // console.log(sortDirection);
        // console.log(activeTab);
        return a.name.localeCompare(b.name);
      } else if (sortDirection === "desc" && activeTab === "comments") {
        // console.log(sortDirection);
        // console.log(activeTab);
        return b.name.localeCompare(a.name);
      } else if (sortDirection === "asc" && activeTab === "users") {
        // console.log(sortDirection);
        // console.log(activeTab);
        return a.name.localeCompare(b.name);
      } else if (sortDirection === "desc" && activeTab === "users") {
        // console.log(sortDirection);
        // console.log(activeTab);
        return b.name.localeCompare(a.name);
      } else if (sortDirection === "asc") {
        // console.log(sortDirection);
        return a.title.localeCompare(b.title);
      } else {
        // console.log(sortDirection);
        return b.title.localeCompare(a.title);
      }
    });

    setData(sortedList);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const fetchData = async (resource) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/${resource}`
      );
      setData(response.data);
      setLoading(false);
      setCurrentPage(1);
    } catch (error) {
      setLoading(false);
      // window.location.reload();
      // console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchInput(value);
    if (value.length === 0) {
      fetchData();
      // window.location.reload();
    } else if (activeTab === "comments") {
      // console.log(activeTab);
      // console.log(value);
      const result = data.filter((data) => {
        return (
          value && data && data.name && data.name.toLowerCase().includes(value)
        );
      });
      setData(result);
    } else if (activeTab === "users") {
      // console.log(activeTab);
      // console.log(value);
      const result = data.filter((data) => {
        return (
          value && data && data.name && data.name.toLowerCase().includes(value)
        );
      });
      setData(result);
    } else {
      const result = data.filter((data) => {
        return (
          value && data && data.name && data.title.toLowerCase().includes(value)
        );
      });
      setData(result);
    }
  };

  const handleTabChange = (resource) => {
    setActiveTab(resource);
    // console.log(resource);
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, searchInput.length === 0]);

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToRender = data.slice(startIndex, endIndex);

    switch (activeTab) {
      case "posts":
        return (
          <ul>
            {loading ? (
              <li style={{ padding: "5em" }}>Loading...</li>
            ) : (
              itemsToRender.map((item) => (
                <li key={item.id}>
                  <b>Title: </b>
                  {item.title}
                  <br />
                  <b>Body: </b>
                  {item.body}
                </li>
              ))
            )}
          </ul>
        );
      case "comments":
        return (
          <ul>
            {loading ? (
              <li style={{ padding: "5em" }}>Loading...</li>
            ) : (
              itemsToRender.map((item) => (
                <li key={item.id}>
                  <b>Name: </b>
                  {item.name}
                  <br />
                  <b>Email: </b>
                  {item.email}
                  <br />
                  <b>Description: </b>
                  {item.body}
                </li>
              ))
            )}
          </ul>
        );
      case "albums":
        return (
          <ul>
            {loading ? (
              <li style={{ padding: "5em" }}>Loading...</li>
            ) : (
              itemsToRender.map((item) => (
                <li key={item.id}>
                  {item.id}. {item.title}
                </li>
              ))
            )}
          </ul>
        );
      case "photos":
        return (
          <ul>
            {loading ? (
              <li style={{ padding: "5em" }}>Loading...</li>
            ) : (
              itemsToRender.map((item) => (
                <li key={item.id}>
                  <b>Title: </b>
                  {item.title}
                  <br />
                  <b>URL: </b>
                  {item.url}
                </li>
              ))
            )}
          </ul>
        );
      case "todos":
        return (
          <ul>
            {loading ? (
              <li style={{ padding: "5em" }}>Loading...</li>
            ) : (
              itemsToRender.map((item) => (
                <li key={item.id}>
                  {item.title}
                  <br />- {item.completed ? "Completed" : "Not Completed"}
                </li>
              ))
            )}
          </ul>
        );
      case "users":
        return (
          <ul>
            {loading ? (
              <li style={{ padding: "5em" }}>Loading...</li>
            ) : (
              data.map((user) => (
                <li key={user.id}>
                  <b>Name: </b>
                  {user.name}
                  <br />
                  <b>Email: </b> - {user.email}
                  {user.address ? (
                    <ul>
                      <li>
                        <b>Address: </b>
                        {user.address.suite}, {user.address.street},{" "}
                        {user.address.city} - {user.address.zipcode}
                      </li>
                    </ul>
                  ) : (
                    <p>No address available</p>
                  )}
                </li>
              ))
            )}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h1>Display Tabs</h1>
      <div className="tabContainer">
        {/* <div className="tabs">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => handleTabChange("posts")}
        >
          Posts
        </button>
        <button
          className={activeTab === "comments" ? "active" : ""}
          onClick={() => handleTabChange("comments")}
        >
          Comments
        </button>
        <button
          className={activeTab === "albums" ? "active" : ""}
          onClick={() => handleTabChange("albums")}
        >
          Albums
        </button>
        <button
          className={activeTab === "photos" ? "active" : ""}
          onClick={() => handleTabChange("photos")}
        >
          Photos
        </button>
        <button
          className={activeTab === "todos" ? "active" : ""}
          onClick={() => handleTabChange("todos")}
        >
          Todos
        </button>
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => handleTabChange("users")}
        >
          Users
        </button>
      </div> */}

        <TabsList
          tabs={tabs}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />

        <TabsSearchSort
          searchInput={searchInput}
          handleSearch={handleSearch}
          SearchIcon={SearchIcon}
          handleSort={handleSort}
          sortDirection={sortDirection}
          FcAlphabeticalSortingAz={FcAlphabeticalSortingAz}
          FcAlphabeticalSortingZa={FcAlphabeticalSortingZa}
        />

        <div className="data">{renderData()}</div>

        <TabsPagination
          data={data}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />

        <>
          {/* <div className="data">
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <div>
                <li>
                  <span>
                    <b>
                      {(activeTab === "posts" && <>Title:</>) ||
                        (activeTab === "comments" && <>Email:</>) ||
                        (activeTab === "albums" && <>Title:</>) ||
                        (activeTab === "photos" && <>Title:</>) ||
                        (activeTab === "todos" && <>Title:</>) ||
                        (activeTab === "users" && <>Name:</>)}
                    </b>{" "}
                  </span>
                  {(activeTab === "posts" && item.title) ||
                    (activeTab === "comments" && item.email) ||
                    (activeTab === "albums" && item.title) ||
                    (activeTab === "photos" && item.title) ||
                    (activeTab === "todos" && item.title) ||
                    (activeTab === "users" && item.username)}
                </li>
                <span>
                  <b>
                    {(activeTab === "posts" && <>Description:</>) ||
                      (activeTab === "comments" && <>Description:</>) ||
                      (activeTab === "albums" && "") ||
                      (activeTab === "photos" && <>URL:</>) ||
                      (activeTab === "todos" && <>Completed:</>) ||
                      (activeTab === "users" && <>Address:</>)}
                  </b>{" "}
                </span>
                { (activeTab === "posts" && item.body) ||
                  (activeTab === "comments" && item.body) ||
                  (activeTab === "albums" && "") ||
                  (activeTab === "photos" && item.url) ||
                  (activeTab === "todos" && item.completed) ||
                  (activeTab === "users" && item.address.suite)
                  // (activeTab === "users" && item.address === undefined ? "NA" :
                  //   JSON.stringify(
                  //     item.address.suite +
                  //     ", " +
                  //     item.address.street +
                  //     ", " +
                  //     item.address.city +
                  //     " - " +
                  //     item.address.zipcode
                  //   ))
                    }
              </div>
            </li>
          ))}
        </ul>
      </div> */}
        </>
      </div>
    </>
  );
};

export default TabsPage;
