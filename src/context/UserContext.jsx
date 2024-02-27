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
    setLink({ ...link, url: url });
  };
  const onSubmitHandler = (e) => {
    if (!linkValid) return;
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
  const logout = () => {};

  return (
    <UserContext.Provider
      value={{
        user,
        onChangeHandler,
        onAppPlaceholder,
        onSubmitHandler,
        onDeleteLinkHandler,
        linkValid,
        toggleCreateURL,
        setToggleCreateURL,
        links,
        link,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
