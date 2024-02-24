import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Links.scss";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SiLinktree } from "react-icons/si";
import AddLink from "../../components/Forms/AddLink";
// import { userData } from "../../utils/data";
import EditLink from "../../components/Forms/EditLink";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Links = () => {
  const {
    user,
    setUser,
    onChangeHandler,
    onAppPlaceholder,
    onSubmitHandler,
    onChangeEditHeaderHandler,
    onChangeEditURLHandler,
    onDeleteLinkHandler,
    onSubmitEditHandler,
    onChangeUpdateHandler,
    linkValid,
    editedLink,
    toggleCreateURL,
    setToggleCreateURL,
    link,
    links,
    setEditedLink,
  } = useContext(UserContext);

  const linktreeURL = `https://linktr.ee/${user.username}`;

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
                  to={`https://linktr.ee/${linktreeURL}`}
                  target="_blank"
                  className="url-link"
                >
                  linktr.ee/{linktreeURL}
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
                user={user}
                link={link}
                key={link._id}
                onSubmitEditHandler={onSubmitEditHandler}
                onChangeEditHeaderHandler={onChangeEditHeaderHandler}
                onChangeEditURLHandler={onChangeEditURLHandler}
                onDeleteLinkHandler={onDeleteLinkHandler}
                onChangeUpdateHandler={onChangeUpdateHandler}
                editedLink={editedLink}
                setEditedLink={setEditedLink}
              />
            ))}
          </div>
        </section>
      </div>
      <div className="preview">
        <div className="iphone">
          <div className="description">
            <h2>P</h2>
            <p>@{user.username}</p>
          </div>
          <div className="links">
            {links?.map((link) => (
              <div key={link._id} className="links-card">
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
