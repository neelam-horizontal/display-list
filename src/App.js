import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TabsPage from "./Component/tabs/TabsPage";
import CardList from "./Component/cards/CardList";
import Home from "./Component/Home";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CardList" element={<CardList />} />
          <Route path="/TabsPage" element={<TabsPage />} />
          <Route path="/TabsPage/:activeTab" element={<TabsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
