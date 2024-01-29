import React, { useState } from "react";
import "./Links.scss";

import { RxCross2 } from "react-icons/rx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SiLinktree } from "react-icons/si";
import AddLink from "../../components/Forms/AddLink";
const Links = () => {
  const [toggleCreateURL, setToggleCreateURL] = useState(false);
  const [cancelToggle, setCancelToggle] = useState(false);
  const [username, setUsername] = useState("Username123");
  const [url, setURL] = useState(`linktr.ee/${username}`);
  return (
    <div className="links-container">
      <div className="links-edit-container">
        <div className="linktree-live-information">
          <IoIosInformationCircleOutline size={"1.2rem"} />
          <div className="description">
            <div>
              <p>
                Your Linktree is live: <span className="url-link">{url}</span>
              </p>
              <p>Share your Linktree to your socials</p>
            </div>
            <button className="circle-btn">Copy URL</button>
          </div>
        </div>
        <p>Set up your Linktree</p>
        <div className="setup-linktree-btns">
          <button onClick={() => setToggleCreateURL(true)}>Add 3 links</button>
        </div>
        {toggleCreateURL && (
          <div className="create-link-container">
            <div className="create-link-cancel-btn">
              <RxCross2
                onClick={() => setToggleCreateURL(false)}
                size={"1.25rem"}
                className="cancel-btn"
              />
            </div>
            <AddLink
              toggleCreateURL={toggleCreateURL}
              setCancelToggle={setCancelToggle}
              cancelToggle={cancelToggle}
            />
          </div>
        )}
      </div>
      <div className="preview">
        <div className="iphone">
          <div className="description">
            <h2>P</h2>
            <p>@{username}</p>
          </div>
          <p>
            Linktree <SiLinktree />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Links;
