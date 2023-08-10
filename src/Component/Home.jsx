import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Welcome to the Task</h1>
      <div className="welcomebtn">
        <Link to="/CardList">
          <button className="search btns">CardList</button>
        </Link>
        <Link to="/TabsPage">
          <button className="search btns">TabsPage</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
