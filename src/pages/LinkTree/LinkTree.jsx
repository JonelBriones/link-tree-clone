import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preview from "../../components/Preview/Preview";
import "./LinkTree.scss";
const LinkTree = () => {
  const { usernameParam } = useParams();

  console.log(usernameParam);
  const [user, setUser] = useState({
    username: "",
    links: [],
  });
  useEffect(() => {
    axios
      .get(`/api/${usernameParam}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="link-tree-preview">
      <Preview user={user} button={true} />
    </div>
  );
};

export default LinkTree;
