import React, { useState, useEffect } from "react";
import "./Links.scss";
import { regex } from "../../utils/regex";
import { RxCross2 } from "react-icons/rx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SiLinktree } from "react-icons/si";
import AddLink from "../../components/Forms/AddLink";
import { userData } from "../../utils/data";
import EditLink from "../../components/Forms/EditLink";
const linkDefaultForm = {
  url: "",
  image: "",
  network: "",
};

const Links = () => {
  const [toggleCreateURL, setToggleCreateURL] = useState(false);
  const [username, setUsername] = useState("JonelKindaCodes");
  const [link, setLink] = useState(linkDefaultForm);
  const [url, setURL] = useState("");
  const [links, setLinks] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setLinks(userData.links);
    let { id, header, network } = userData;
    setUserInfo({ id, header, network });
  }, [userData]);

  const onChangeHandler = (e) => {
    const newLink = e.target.value;
    setURL(newLink);
  };
  const onAppPlaceholder = (social) => {
    let url = `https://www.${social}.com/@`;
    console.log("social", url);
    setURL(url);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("onsubmit");
    setLinks([
      ...links,
      {
        ...link,
        url: url,
      },
    ]);
    setLink(linkDefaultForm);
  };
  // EDIT FUNCTIONS

  const onChangeEditHeaderHandler = (e, id) => {
    let updatedValue = e.target.value;
    setLinks(
      links.map((li) => (li.id === id ? { ...li, header: updatedValue } : li))
    );
    console.log(id);
  };
  const onChangeEditURLHandler = (e, id) => {
    let updatedValue = e.target.value;
    setLinks(
      links.map((li) => (li.id === id ? { ...li, url: updatedValue } : li))
    );
    console.log(id);
  };

  const onSubmitEditHandler = (e) => {
    // e.preventDefault();
    console.log(links);
    // setLinks(...links)
  };

  return (
    <div className="links-container">
      <div className="links-edit-container">
        <div className="linktree-live-information">
          <IoIosInformationCircleOutline size={"1.2rem"} />
          <div className="description">
            <div>
              <p>
                Your Linktree is live:{" "}
                <span className="url-link">linktr.ee/{userData.username}</span>
              </p>
              <p>Share your Linktree to your socials</p>
            </div>
            <button className="circle-btn">Copy URL</button>
          </div>
        </div>
        <section>
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
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onSubmitHandler}
                link={link}
                url={url}
                onAppPlaceholder={onAppPlaceholder}
              />
            </div>
          )}
          <div className="links-edit-container">
            {links?.map((link) => (
              <EditLink
                link={link}
                key={link.id}
                onSubmitEditHandler={onSubmitEditHandler}
                onChangeEditHeaderHandler={onChangeEditHeaderHandler}
                onChangeEditURLHandler={onChangeEditURLHandler}
              />
            ))}
          </div>
        </section>
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
