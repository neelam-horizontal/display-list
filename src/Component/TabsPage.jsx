import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TabsPage.css";

const TabsPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const fetchData = async (resource) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/${resource}`
      );
      setData(response.data.slice(0, 10));
      setLoading(false);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleTabChange = (resource) => {
    setActiveTab(resource);
    // console.log(resource);
  };

  useEffect(() => {
    fetchData(activeTab);
    // console.log(activeTab);
  }, [activeTab]);
  
  const renderData = () => {
    switch (activeTab) {
      case "posts":
        return (
          <ul>
            {loading ? (
              <li style={{ padding: "5em" }}>Loading...</li>
            ) : (
              data.map((item) => (
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
              data.map((item) => (
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
              data.map((item) => (
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
              data.map((item) => (
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
              data.map((item) => (
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
                  <b>Name: </b>{user.name}
                  <br />
                  <b>Email: </b> - {user.email}
                  {user.address ? (
                    <ul>
                      <li><b>Address: </b>
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
    <div className="tabContainer">
      <div className="tabs">
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
      </div>

      <div className="data">{renderData()}</div>
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
    </div>
  );
};

export default TabsPage;
