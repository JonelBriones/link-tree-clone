import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import "./AddLink.scss";
const onSubmitHandler = (e) => {
  e.preventDefautl();
};
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
  link,
  onAppPlaceholder,
  linkValid,
  onSubmitHandler,
}) => {
  return (
    <div className="create-link">
      <h3>Enter URL</h3>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="URL"
          value={link}
          name="link"
          onChange={onChangeHandler}
        />
        <button
          type="submit"
          className={linkValid ? "circle-btn isValid" : "circle-btn"}
          disabled={!linkValid}
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
                onClick={() => onAppPlaceholder(`https://www.${social}.com/@`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddLink;
