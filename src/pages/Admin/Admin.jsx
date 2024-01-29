import React, { useState } from "react";
import NavbarAdmin from "../../components/Navbar/Admin/NavbarAdmin.components";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div>
      {/* {loggedIn ? <NavbarAdmin /> : <h1>please log in</h1>} */}
      <main>
        <h1>Admin Page</h1>
      </main>
    </div>
  );
};

export default Admin;
