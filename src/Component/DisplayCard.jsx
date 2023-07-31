import React from "react";
import "./TabsPage.css";

const DisplayCard = ({ dataLt: { id, title, body } }) => {
  return (
    <div className="dataLt" key={id}>
      <h3>{title}</h3>
      <small>{body}</small>
    </div>
  );
};

export default DisplayCard;
