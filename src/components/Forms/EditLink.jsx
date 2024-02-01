import React, { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import "./EditLink.scss";
const EditLink = (props) => {
  const {
    link,
    onSubmitEditHandler,
    onChangeEditHeaderHandler,
    onChangeEditURLHandler,
    onDeleteHeaderHandler,
  } = props;
  const { header, url, id } = link;
  const [headerEditToggle, setHeaderEditToggle] = useState(false);
  const [urlEditToggle, setURLEditToggle] = useState(false);

  const headerRef = useRef();
  const urlRef = useRef();
  const headerFocus = () => {
    setHeaderEditToggle(true);
    headerRef.current.focus();
  };
  const urlFocus = () => {
    setURLEditToggle(true);
    urlRef.current.focus();
  };

  return (
    <div className="link-container">
      <form onSubmit={onSubmitEditHandler}>
        <div className="edit-header">
          <input
            ref={headerRef}
            type="text"
            value={header}
            name="header"
            onChange={(e) => onChangeEditHeaderHandler(e, id)}
            onClick={() => setHeaderEditToggle(true)}
            onBlur={() => setHeaderEditToggle(false)}
            autoComplete="off"
            className="edit-input"
          />
          {!headerEditToggle && (
            <CiEdit size={"1.5rem"} onClick={headerFocus} autoFocus />
          )}
        </div>
        <div className="edit-url">
          <input
            ref={urlRef}
            type="text"
            value={url}
            name="url"
            onClick={() => setURLEditToggle(true)}
            onChange={(e) => onChangeEditURLHandler(e, id)}
            onBlur={() => setURLEditToggle(false)}
            autoComplete="off"
            className="edit-input"
          />
          {!urlEditToggle && (
            <CiEdit size={"1.5rem"} onClick={urlFocus} autoFocus />
          )}
        </div>
      </form>
      <button onClick={() => onDeleteHeaderHandler(id)}>delete</button>
    </div>
  );
};

export default EditLink;
