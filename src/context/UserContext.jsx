import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext("IJONEL906 ");
const linkDefaultForm = {
  url: "",
  header: "",
};
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState(linkDefaultForm);
  const [linkValid, setLinkValid] = useState(false);
  const [toggleCreateURL, setToggleCreateURL] = useState(false);
  const [updatedURL, setUpdatedURL] = useState("");
  const [updatedHeader, setUpdatedHeader] = useState("");
  const [editedLink, setEditedLink] = useState({
    url: "",
    header: "",
  });

  // EDIT CHANGE

  useEffect(() => {
    axios
      .get(`/api/users`)
      .then((res) => {
        const user = res.data[0];
        setUser(user);
        setLinks(user.links);
      })
      .catch((err) => {
        console.log(err.res);
      });
  }, []);

  useEffect(() => {
    setLinkValid(
      link.url?.includes("/@") && link.url[link.url.length - 1] !== "@"
    );
  }, [link.url]);
  const onChangeHandler = (e) => {
    const newLink = { ...link };
    newLink[e.target.name] = e.target.value;
    setLink(newLink);
  };
  const onAppPlaceholder = (social) => {
    let url = `https://www.${social}.com/@${user.username}`;
    console.log("social", url);
    // setURL(url);
    setLink({ ...link, url: url });
  };
  const onSubmitHandler = (e) => {
    if (!linkValid) return;
    e.preventDefault();
    console.log("onsubmit");
    let updatedLinks = [...links, link];
    if (linkValid) {
      axios
        .put(`/api/create/link/${user._id}`, updatedLinks)
        .then((res) => {
          console.log("UPDATE COMPLETE");
          navigate(0);
          setLink(linkDefaultForm);
        })
        .catch((err) => console.log("UPDATE FAILED", err));
    }
    setEditedLink({ url: "", header: "" });
  };
  // EDIT FUNCTIONS

  const onChangeEditHeaderHandler = (e, id) => {
    let updatedValue = e.target.value;
    console.log(updatedValue);
    setUpdatedHeader(updatedValue);
    // setLinks(
    //   links.map((li) => (li._id === id ? { ...li, header: updatedValue } : li))
    // );
  };
  const onChangeEditURLHandler = (e, id) => {
    let updatedValue = e.target.value;
    console.log(updatedValue);
    setUpdatedURL(updatedValue);

    // setLinks(
    //   links.map((li) => (li._id === id ? { ...li, url: updatedValue } : li))
    // );
  };
  const onChangeUpdateHandler = (e) => {
    e.preventDefault();
    const updateLink = { ...editedLink };
    updateLink[e.target.name] = e.target.value;
    console.log(updateLink);
    setEditedLink(updateLink);
    console.log(updateLink);
  };

  const onSubmitEditHandler = (e, linkId) => {
    e.preventDefault();

    setLinks(
      links.map((link) =>
        link._id == linkId
          ? { ...link, url: editedLink.url, header: editedLink.header }
          : link
      )
    );
    const previousData = links.find((link) => link._id === linkId);
    console.log(previousData);
    console.log("ON SUBMIT EDIT HANDLER", editedLink);
    if (e.target.name == "header") {
      setEditedLink({
        header: editedLink.header,
        url: previousData.url,
      });
    } else {
      setEditedLink({
        url: editedLink.url,
        header: previousData.header,
      });
    }
    console.log("previous data", previousData);
    console.log("new data", editedLink);
    // axios
    //   .patch(`/api/update/link/${linkId}`, { ...editedLink, _id: linkId })
    //   .then((res) => {
    //     console.log("UPDATE COMPLETE");
    //   })
    //   .catch((err) => console.log("UPDATE FAILED", err));
  };

  const onDeleteLinkHandler = (id) => {
    setLinks(links.filter((link) => link._id !== id));
    const updatedLinks = links.filter((link) => link._id !== id);
    console.log(updatedLinks);
    axios
      .put(`/api/create/link/${user._id}`, updatedLinks)
      .then((res) => {
        console.log("UPDATE COMPLETE");
        setLink(linkDefaultForm);
      })
      .catch((err) => console.log("UPDATE FAILED", err));
  };

  return (
    <UserContext.Provider
      value={{
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
        setLinkValid,
        toggleCreateURL,
        setToggleCreateURL,
        link,
        links,
        editedLink,
        setEditedLink,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
