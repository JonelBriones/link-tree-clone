import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import "./AddLink.scss";
import { RxCross2 } from "react-icons/rx";

let socialMediaList = [
  "instagram",
  "tiktok",
  "x",
  "reddit",
  "snapchat",
  "youtube",
];

const AddLink = ({
  onChangeHandler,
  onAppPlaceholder,
  onSubmitHandler,
  setToggleCreateURL,
  link,
}) => {
  return (
    <div className="create-link">
      <div>
        <button className="create-link-cancel-btn">
          <RxCross2
            onClick={() => setToggleCreateURL(false)}
            size={"1.25rem"}
            className="cancel-btn"
          />
        </button>
      </div>

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Header"
          value={link.header}
          name="header"
          onChange={onChangeHandler}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="URL"
          value={link.url}
          name="url"
          onChange={onChangeHandler}
        />
        <button
          type="submit"
          className={
            link.url !== "" && link.header !== ""
              ? "circle-btn isValid"
              : "circle-btn"
          }
          disabled={!link.url && link.header == ""}
        >
          Add
        </button>
      </form>

      <div className="list-apps-container">
        <p>Most used apps</p>
        <div className="list-apps">
          {socialMediaList.map((social) => (
            <div key={social}>
              <SocialIcon
                network={social}
                onClick={() => onAppPlaceholder(social)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddLink;
