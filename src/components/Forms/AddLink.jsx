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

const AddLink = (props) => {
  const { toggleCreateURL, cancelToggle } = props;

  return (
    <div className="create-link">
      <h3>Enter URL</h3>
      <form onSubmit={onSubmitHandler}>
        <input type="text" placeholder="URL" />
        <button className="circle-btn">Add</button>
      </form>

      <div className="list-apps-container">
        <p>Most used apps</p>
        <div className="list-apps">
          {socialMediaList.map((social) => (
            <div key={social}>
              <SocialIcon network={social} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddLink;
