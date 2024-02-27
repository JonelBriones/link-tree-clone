import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarAdmin.scss";
import { FaBars } from "react-icons/fa6";
import { SiLinktree } from "react-icons/si";
import { IoShapesOutline } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { UserContext } from "../../../context/UserContext";

const NavbarAdmin = () => {
  const [currentPage, setCurrentPage] = useState("admin");
  const changePage = (param) => {
    setCurrentPage(param);
  };
  const { user } = useContext(UserContext);

  return (
    <div>
      <nav>
        <ul>
          <Link
            to={"/admin"}
            className={currentPage == "admin" ? "current-nav-link logo" : ""}
            onClick={() => changePage("admin")}
          >
            <SiLinktree color="#119da4" size={"1.5rem"} />
          </Link>
          <Link
            to={"/admin"}
            className={currentPage == "admin" ? "current-nav-link " : ""}
            onClick={() => changePage("admin")}
          >
            <FaBars color="#119da4" />
            <span>Links</span>
          </Link>
          <Link
            to={"/appearance"}
            className={currentPage == "appearance" ? "current-nav-link " : ""}
            onClick={() => changePage("appearance")}
          >
            <IoShapesOutline />
            <span>Appearance</span>
          </Link>
          <Link
            to={"/analytics"}
            className={currentPage == "analytics" ? "current-nav-link " : ""}
            onClick={() => changePage("analytics")}
          >
            <BsBarChart />
            <span>Analytics</span>
          </Link>
          <Link
            to={"/settings"}
            className={currentPage == "settings" ? "current-nav-link " : ""}
            onClick={() => changePage("settings")}
          >
            <IoSettingsOutline />
            <span>Settings</span>
          </Link>
        </ul>
        <ul>
          <li className="nav-btns">
            <button>
              <FiBell size={"1.5rem"} />
              {/* <span>Notifications</span> */}
            </button>
          </li>
          <li className="nav-btns">
            <button>
              <AiFillThunderbolt size={"1.5rem"} />
              <h3>Try Pro for free</h3>
            </button>
          </li>
          <li className="nav-btns">
            <button>
              <IoMdShareAlt size={"1.5rem"} />
              <span>Share</span>
            </button>
          </li>
          <li className="nav-btns" onClick={() => console.log("logout")}>
            <button className="profile">P</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
