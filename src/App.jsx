import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import EditFixture from "./components/EditFixture";
import EditMarketplace from "./components/Editmarketplace";
import EditQuestionaire from "./components/EditQuestionaire";
import EditResult from "./components/EditResults";

import Navbar from "./components/Navbar";
import NewFixture from "./components/NewFixture";
import NewMarketplace from "./components/NewMarketplace";
import NewQuestionaire from "./components/NewQuestionaire";
import NewResult from "./components/NewResult";
import Topbar from "./components/Topbar";
import Fixture from "./pages/Fixtures";
import Home from "./pages/Home";
import Markteplaces from "./pages/Marketplaces";
import Questionaires from "./pages/Questionaires";
import Results from "./pages/Results";

export default function App() {
  return (
    <div className="app__container">
      <Topbar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="marketplaces" element={<Markteplaces />}/>
        <Route path="marketplaces/new" element={<NewMarketplace />}/>
        <Route path="marketplaces/edit" element={<EditMarketplace />}/>
        <Route path="fixtures" element={<Fixture />} />
        <Route path="fixtures/new" element={<NewFixture />} />
        <Route path="fixtures/edit" element={<EditFixture />} />
        <Route path="questionaires" element={<Questionaires />} />
        <Route path="questionaires/new" element={<NewQuestionaire />} />
        <Route path="questionaires/edit" element={<EditQuestionaire />} />
        <Route path="results" element={<Results />} />
        <Route path="results/new" element={<NewResult />} />
        <Route path="results/edit" element={<EditResult />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}
