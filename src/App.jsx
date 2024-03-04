import { useState, useEffect } from "react";
import "./App.scss";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";

import Analytics from "./pages/Analytics/Analytics.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Appearance from "./pages/Appearance/Appearance.jsx";
import Links from "./pages/Links/Links.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import SignUp from "./components/Authentication/Sign-up/SignUp.jsx";
import Login from "./components/Authentication/Log-in/Login.jsx";
import LinkTree from "./pages/LinkTree/LinkTree.jsx";
function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route element={<RootLayout />} path="/">
          <Route index element={<Links />} path="/admin" />
          <Route element={<Appearance />} path="appearance" />
          <Route element={<Analytics />} path="analytics" />
          <Route element={<Settings />} path="settings" />
        </Route>
        <Route element={<Home />} path="/" />
        <Route index element={<SignUp />} path="/signup" />
        <Route index element={<Login />} path="/login" />
        <Route index element={<LinkTree />} path="/:usernameParam" />
      </Routes>
    </div>
  );
}

export default App;
