import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <Link to={""}>MySocials</Link>
          {/* <Link to={""}>Templates</Link>
          <Link to={""}>Marketplace</Link>
          <Link to={""}>Pricing</Link> */}
        </ul>
        <ul>
          <Link to={"/login"}>Log in</Link>
          <Link to={"/signup"}>Sign up free</Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
