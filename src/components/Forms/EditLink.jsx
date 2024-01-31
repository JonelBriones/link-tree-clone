import React from "react";

const EditLink = (props) => {
  const {
    link,
    onSubmitEditHandler,
    onChangeEditHeaderHandler,
    onChangeEditURLHandler,
  } = props;
  const { header, url, id } = link;
  return (
    <div className="link-container">
      <form onSubmit={onSubmitEditHandler}>
        <input
          type="text"
          value={header}
          name="header"
          onChange={(e) => onChangeEditHeaderHandler(e, id)}
        />

        <input
          type="text"
          value={url}
          name="url"
          onChange={(e) => onChangeEditURLHandler(e, id)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default EditLink;
