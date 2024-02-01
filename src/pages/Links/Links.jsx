import React, { useState, useEffect } from "react";
import axios from "axios";
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
  useEffect(() => {
    setLinks(userData.links);
    let { id, header, network } = userData;
    setUserInfo({ id, header, network });

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

  return (
    <div className="links-container">
      e
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
          <p>
            Linktree <SiLinktree />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Links;
