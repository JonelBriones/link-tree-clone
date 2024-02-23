import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext("IJONEL906 ");
const linkDefaultForm = {
  url: "",
  header: "",
};
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState(null);
  const [link, setLink] = useState(linkDefaultForm);
  const [linkValid, setLinkValid] = useState(false);
  const [toggleCreateURL, setToggleCreateURL] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users`)
      .then((res) => {
        const user = res.data[1];
        setUser(user);
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
    console.log(url);
    e.preventDefault();
    console.log("onsubmit");
    if (linkValid) {
      axios
        .put(`http//localhost:8000/api/create/:${user._id}`, link)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setLinks([...links, link]);
      setLink(linkDefaultForm);
    }
  };
  // EDIT FUNCTIONS

  const onChangeEditHeaderHandler = (e, id) => {
    let updatedValue = e.target.value;
    setLinks(
      links.map((li) => (li._id === id ? { ...li, header: updatedValue } : li))
    );
    console.log(id);
  };
  const onChangeEditURLHandler = (e, id) => {
    let updatedValue = e.target.value;
    setLinks(
      links.map((li) => (li._id === id ? { ...li, url: updatedValue } : li))
    );
    console.log(id);
  };

  const onDeleteHeaderHandler = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };
  const onSubmitEditHandler = (e) => {
    // e.preventDefault();
    console.log(links);
    // setLinks(...links)
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
        onDeleteHeaderHandler,
        onSubmitEditHandler,
        linkValid,
        setLinkValid,
        toggleCreateURL,
        setToggleCreateURL,
        link,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
