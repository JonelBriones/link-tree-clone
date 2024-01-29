import { useState } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

import Analytics from "./pages/Analytics/Analytics.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Appearance from "./pages/Appearance/Appearance.jsx";
import Links from "./pages/Links/Links.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<RootLayout />} path="/">
          <Route index element={<Links />} path="/admin" />
          <Route element={<Appearance />} path="appearance" />
          <Route element={<Analytics />} path="analytics" />
          <Route element={<Settings />} path="settings" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
