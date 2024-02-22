import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <nav>
      <ul>
        <li>MySocials</li>
        <li>Templates</li>
        <li>Marketplace</li>
        <li>Pricing</li>
      </ul>
      <ul>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Sign up free</Link>
      </ul>
    </nav>
  );
};

export default Home;
