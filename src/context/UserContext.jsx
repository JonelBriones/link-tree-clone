import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext("IJONEL906 ");
const linkDefaultForm = {
  url: "https://",
  header: "",
};
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userLogged, setUserLogged] = useState(null);
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState(linkDefaultForm);
  const [linkValid, setLinkValid] = useState(false);
  const [toggleCreateURL, setToggleCreateURL] = useState(false);

  // EDIT CHANGE
  useEffect(() => {
    axios
      .get(`/api/user`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLinks(res.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userLogged]);

  const resetForm = () => {
    setToggleCreateURL(false);
    setLink(linkDefaultForm);
  };

  const onChangeHandler = (e) => {
    const newLink = { ...link };
    newLink[e.target.name] = e.target.value;
    setLink(newLink);
  };
  const onAppPlaceholder = (social) => {
    let url = `https://www.${social}.com/${user.username}`;
    setLink({ ...link, url: url });
  };
  const onSubmitHandler = (e) => {
    if (link.header == "" || link.url == "") return;
    e.preventDefault();
    let updatedLinks = [...links, link];

    axios
      .put(`/api/create/link/${user._id}`, updatedLinks)
      .then((res) => {
        console.log("UPDATE COMPLETE");
        navigate(0);
        setLink(linkDefaultForm);
      })
      .catch((err) => console.log("UPDATE FAILED", err));
  };
  // EDIT FUNCTIONS

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
  const login = () => {};

  return (
    <UserContext.Provider
      value={{
        user,
        userLogged,
        setUserLogged,
        onChangeHandler,
        onAppPlaceholder,
        onSubmitHandler,
        onDeleteLinkHandler,
        linkValid,
        toggleCreateURL,
        setToggleCreateURL,
        links,
        link,
        navigate,
        setUser,
        resetForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
