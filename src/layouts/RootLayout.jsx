import React from "react";
import NavbarAdmin from "../components/Navbar/Admin/NavbarAdmin.components";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <NavbarAdmin />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
