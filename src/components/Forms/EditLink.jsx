import React, { useRef, useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import "./EditLink.scss";
import axios from "axios";
const EditLink = (props) => {
  const { user, link, onDeleteLinkHandler } = props;
  const { header, url, _id } = link;

  const [headerEditToggle, setHeaderEditToggle] = useState(false);
  const [urlEditToggle, setURLEditToggle] = useState(false);
  const headerRef = useRef();
  const urlRef = useRef();

  const [updateLink, setUpdateLink] = useState({
    header: "",
    url: "",
  });

  const headerFocus = () => {
    setHeaderEditToggle(true);
    headerRef.current.focus();
  };
  const urlFocus = () => {
    setURLEditToggle(true);
    urlRef.current.focus();
  };

  useEffect(() => {
    setUpdateLink(user.links.find((link) => link._id == _id));
  }, []);
  const onChangeUpdateHandler = (e) => {
    e.preventDefault();
    const link = { ...updateLink };
    link[e.target.name] = e.target.value;
    setUpdateLink(link);
  };

  const onSubmitEditHandler = (e) => {
    e.preventDefault();
    let linkValid =
      updateLink.url?.includes("/@") &&
      updateLink.url[updateLink.url.length - 1] !== "@";
    if (!linkValid || updateLink.header == "") return;

    axios
      .patch(`/api/update/link/${_id}`, { ...updateLink, _id: _id })
      .then((res) => {
        console.log("UPDATE COMPLETE");
      })
      .catch((err) => console.log("UPDATE FAILED", err));
  };

  return (
    <div className="link-container">
      <form onBlur={(e) => onSubmitEditHandler(e)}>
        <div className="edit-header">
          <input
            ref={headerRef}
            type="text"
            value={updateLink.header}
            placeholder={header}
            name="header"
            onChange={onChangeUpdateHandler}
            onClick={() => setHeaderEditToggle(true)}
            onBlur={() => setHeaderEditToggle(false)}
            autoComplete="off"
          />
          {!headerEditToggle && (
            <CiEdit size={"1.5rem"} onClick={headerFocus} autoFocus />
          )}
        </div>
        <div className="edit-url">
          <input
            ref={urlRef}
            type="text"
            value={updateLink.url}
            placeholder={url}
            name="url"
            onChange={onChangeUpdateHandler}
            onClick={() => setURLEditToggle(true)}
            onBlur={() => setURLEditToggle(false)}
            autoComplete="off"
          />
          {!urlEditToggle && (
            <CiEdit size={"1.5rem"} onClick={urlFocus} autoFocus />
          )}
        </div>
        <button onSubmit={onSubmitEditHandler}></button>
      </form>

      <div className="buttons">
        <button onClick={() => onDeleteLinkHandler(_id)} className="delete">
          Delete
        </button>
        <button className="archive">Archive</button>
      </div>
    </div>
  );
};

export default EditLink;
