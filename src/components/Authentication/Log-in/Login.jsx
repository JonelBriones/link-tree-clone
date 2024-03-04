import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../authform.scss";
import { SiLinktree } from "react-icons/si";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
const Login = () => {
  const { user, setUser, navigate, setUserLogged } = useContext(UserContext);
  const [login, setLogin] = useState({
    password: "",
    username: "",
  });
  const [error, setErrors] = useState({});

  const onChangeHandler = (e) => {
    const user = { ...login };
    user[e.target.name] = e.target.value;
    setLogin(user);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!login.password || !login.username) return;
    axios
      .post(`/api/login`, login, { withCredentials: true })
      .then((res) => {
        console.log("success login", res.data);
        setUserLogged(true);
        setUser(res.data);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err.response?.data);
        setErrors(err.response?.data);
      });
  };
  return (
    <div className="signup-container">
      <Link to={"/"}>
        Linktree
        <SiLinktree color="#43E660" size={"1.5rem"} />
      </Link>

      <div>
        <div className="header">
          <h1>Welcome back</h1>
          <p>Log in to your Linktree</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            value={login.username}
            placeholder="Email or username"
            name="username"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            value={login.password}
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
          />
          {error && <label>{error?.message}</label>}
          <button type="submit">Log in</button>
        </form>
        <div className="extra-forms">
          <span className="or">OR</span>
          <button>Login with Google</button>
          <button>Login with Apple</button>
        </div>
        <div className="link-to-login">
          <p>Don't have an account?</p>
          <Link to={"sign-in"}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
