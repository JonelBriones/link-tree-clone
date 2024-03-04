import React from "react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { SiLinktree } from "react-icons/si";
import "./Preview.scss";
const Preview = ({ user, button }) => {
  return (
    <div className="preview">
      <div className="iphone">
        <div className="description">
          <h2>P</h2>
          <p>@{user.username}</p>
        </div>
        <div className="links">
          {user.links?.map((link) => (
            <div key={link._id} className="links-card">
              <Link to={link.url} target="_blank">
                {link.header}
              </Link>
              <HiDotsHorizontal className="options" />
            </div>
          ))}
        </div>
        {!button ? (
          <p>
            Linktree <SiLinktree />
          </p>
        ) : (
          <button className="create-link-btn">
            {" "}
            <SiLinktree /> Create your Linktree
          </button>
        )}
      </div>
    </div>
  );
};

export default Preview;
