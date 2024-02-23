import NavbarAdmin from "../components/Navbar/Admin/NavbarAdmin.components";
import { Outlet } from "react-router-dom";
import { userData } from "../utils/data";
import Home from "../pages/Home/Home";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
// import { userData } from "../utils/data";
const RootLayout = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="root-layout">
      {user ? (
        <div>
          <NavbarAdmin />
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <Home />
      )}

      {/* use footer on welcome page */}
      {/* <footer>
        <div className="about">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, ut dolor tempora excepturi saepe, quo harum adipisci
          non nesciunt a corporis molestiae doloribus suscipit, facilis optio
          culpa nisi eos cum.
        </div>
        <div className="quick-links">
          <ul>
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
            <li>
              <a href="">Contribute</a>
            </li>
            <li>
              <a href="">Privacy Policy</a>
            </li>
            <li>
              <a href="">Created by Jonel Briones</a>
            </li>
          </ul>
        </div>
      </footer> */}
    </div>
  );
};

export default RootLayout;
