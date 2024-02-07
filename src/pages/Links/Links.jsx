import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Links.scss";
import { regex } from "../../utils/regex";
import { HiDotsHorizontal } from "react-icons/hi";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { SiLinktree } from "react-icons/si";
import AddLink from "../../components/Forms/AddLink";
import { userData } from "../../utils/data";
import EditLink from "../../components/Forms/EditLink";
import { Link } from "react-router-dom";
const linkDefaultForm = {
  url: "",
  header: "",
};

const Links = () => {
  const [toggleCreateURL, setToggleCreateURL] = useState(false);
  const [username, setUsername] = useState("JonelKindaCodes");
  const [link, setLink] = useState(linkDefaultForm);
  const [url, setURL] = useState("");
  const [header, setHeader] = useState("");
  const [links, setLinks] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [linkValid, setLinkValid] = useState(false);
  const linktreeURL = `https://linktr.ee/${userInfo.username}`;
  useEffect(() => {
    setLinks(userData.links);
    let { username, email, password, backgroundTheme } = userData;
    setUserInfo({ username, email, password, backgroundTheme });

    // axios
    //   .get(`http://localhost:5173/admin`)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.res);
    //   });
  }, [userData]);

  useEffect(() => {
    console.log(linkValid);

    setLinkValid(
      link.url?.includes("/@") && link.url[link.url.length - 1] !== "@"
    );
  }, [link.url]);
  const onChangeHandler = (e) => {
    const newLink = { ...link };
    newLink[e.target.name] = e.target.value;
    console.log(newLink);
    setLink(newLink);
  };
  const onAppPlaceholder = (social) => {
    let url = `https://www.${social}.com/@`;
    console.log("social", url);
    // setURL(url);
    setLink({ ...link, url: url });
  };
  const onSubmitHandler = (e) => {
    if (!linkValid) return;
    console.log(url);
    e.preventDefault();
    console.log("onsubmit");
    if (linkValid) {
      let addLink = { ...link, id: Math.floor(Math.random() * 10_000_000) };
      setLinks([...links, addLink]);
      setLink(linkDefaultForm);
    }
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

  const onDeleteHeaderHandler = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };
  const onDeleteURLHandler = (id) => {};

  const onSubmitEditHandler = (e) => {
    // e.preventDefault();
    console.log(links);
    // setLinks(...links)
  };

  const copyURL = () => {
    navigator.clipboard.writeText(linktreeURL);
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
                <Link
                  to={`https://linktr.ee/${userInfo.username}`}
                  target="_blank"
                  className="url-link"
                >
                  linktr.ee/{userInfo.username}
                </Link>
              </p>
              <p>Share your Linktree to your socials</p>
            </div>
            <button className="circle-btn" onClick={copyURL}>
              Copy URL
            </button>
          </div>
        </div>
        <section>
          <p>Set up your Linktree</p>
          <div className="">
            <button
              onClick={() => setToggleCreateURL(true)}
              className={`create-link-btn ${toggleCreateURL ? "hide" : "show"}`}
            >
              + Add link
            </button>
          </div>
          {toggleCreateURL && (
            <div className="create-link-container">
              <AddLink
                setToggleCreateURL={setToggleCreateURL}
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onSubmitHandler}
                link={link}
                linkValid={linkValid}
                onAppPlaceholder={onAppPlaceholder}
              />
            </div>
          )}
          <div className="edit-container">
            {links?.map((link) => (
              <EditLink
                link={link}
                key={link.id}
                onSubmitEditHandler={onSubmitEditHandler}
                onChangeEditHeaderHandler={onChangeEditHeaderHandler}
                onChangeEditURLHandler={onChangeEditURLHandler}
                onDeleteHeaderHandler={onDeleteHeaderHandler}
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
          <div className="links">
            {links.map((link) => (
              <div key={link.id} className="links-card">
                <Link to={link.url} target="_blank">
                  {link.header}
                </Link>
                <HiDotsHorizontal className="options" />
              </div>
            ))}
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
