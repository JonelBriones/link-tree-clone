import React, { useState, useEffect } from "react";
import "./Links.scss";
import { regex } from "../../utils/regex";
import { RxCross2 } from "react-icons/rx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SiLinktree } from "react-icons/si";
import AddLink from "../../components/Forms/AddLink";
const Links = () => {
  const [toggleCreateURL, setToggleCreateURL] = useState(false);
  const [cancelToggle, setCancelToggle] = useState(false);
  const [username, setUsername] = useState("JonelKindaCodes");
  const [link, setLink] = useState("");
  const [url, setURL] = useState(`linktr.ee/${username}`);
  const [linkValid, setLinkValid] = useState(false);
  const [links, setLinks] = useState([]);
  const onChangeHandler = (e) => {
    setLink(e.target.value);
  };
  const onAppPlaceholder = (e) => {
    setLink(e);
  };
  const onSubmitHandler = (e) => {
    console.log("onsubmit");
    e.preventDefault();

    console.log("onsubmit", link);
    setLinks([...links, link]);
    setLink("");
  };

  useEffect(() => {
    if (link.includes("/@") && link[link.length - 1] !== "@") {
      console.log("is not end with @");
      let result = regex.test(link);
      setLinkValid(true);
    } else {
      setLinkValid(false);
    }
  }, [link]);
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
          <button onClick={() => setToggleCreateURL(true)}>
            Create a link
          </button>
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
              linkValid={linkValid}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
              link={link}
              onAppPlaceholder={onAppPlaceholder}
            />
          </div>
        )}
        {links?.map((url, idx) => (
          <div key={url}>
            <p>{url}</p>
          </div>
        ))}
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
