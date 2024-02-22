import React from "react";
import { Link } from "react-router-dom";
import "../authform.scss";
import { SiLinktree } from "react-icons/si";

const SignUp = (props) => {
  const { email, username } = props;
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
        <form>
          <input type="text" value={email} placeholder="Email" name="email" />
          <input
            type="text"
            value={username}
            placeholder="Linktr.ee/ username"
            name="username"
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
