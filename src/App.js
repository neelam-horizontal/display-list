import React from "react";
import "./App.css";

import TabsPage from "./Component/TabsPage";
import CardList from "./Component/CardList";

const App = () => {
  return (
    <div className="app">
      <CardList />
      <TabsPage />
    </div>
  );
};

export default App;
