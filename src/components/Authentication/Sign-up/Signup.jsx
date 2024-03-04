import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import "../authform.scss";
import { SiLinktree } from "react-icons/si";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const defaultForm = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  usernameExist: "",
  emailExist: "",
};

const SignUp = () => {
  const { navigate, setUser, setUserLogged } = useContext(UserContext);
  const [signIn, setSignIn] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    const user = { ...signIn };
    user[e.target.name] = e.target.value;
    setSignIn(user);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // if (!signIn.email || !signIn.username) return;
    axios
      .post("api/register", signIn, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setUserLogged(true);
        navigate("/admin");
      })
      .catch((err) => {
        // let error = err.response.data?.errors;
        let error = err.response.data;
        console.log(err.response.data);
        // console.log(error);
        setErrors(error);
        // setErrors(err);
        // setSignIn(defaultForm);
        console.log(error);
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
          <h1>Join Linktree</h1>
          <p>Sign up for free!</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          {errors?.email && <label>{errors.email.message}</label>}

          <input
            type="text"
            value={signIn.email}
            placeholder="Email"
            name="email"
            onChange={onChangeHandler}
          />
          {errors?.username && <label>{errors.username.message}</label>}
          {errors?.usernameExist && <label>{errors.usernameExist}</label>}
          <input
            type="text"
            value={signIn.username}
            placeholder="Linktr.ee/ username"
            name="username"
            onChange={onChangeHandler}
          />
          {errors?.password && <label>{errors.password.message}</label>}
          <input
            type="text"
            value={signIn.password}
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
          />
          {errors?.confirmPassword && (
            <label>{errors.confirmPassword.message}</label>
          )}
          <input
            type="text"
            value={signIn.confirmPassword}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={onChangeHandler}
          />

          <button type="submit">Create account</button>
        </form>
        <div className="extra-forms">
          <p className="privacy-notes">
            By clicking <span>Create account</span>, you agree to Linktree's{" "}
            <span>Terms and Conditions</span> and confirm you have read our{" "}
            <span>Privacy Notice</span>. You may receive offers, news and
            updates from us.
          </p>
          <span className="or">OR</span>
          <button>Sign up with Google</button>
          <button>Sign up with Apple</button>
        </div>
        <div className="link-to-login">
          <p>Already have an account?</p>
          <Link>Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
