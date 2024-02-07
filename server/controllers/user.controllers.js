// const { res } = require("express");
const User = require("../models/user.models");

module.exports.getUser = (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => res.json(user))
    .catch((err) => res.json(`${err} does not exist...`));
};

module.exports.createUser = (req, res) => {
  console.log("creating user...");
  User.create(req.body)
    .then((user) => {
      const result = res.json(user);
      console.log("Created User!", result);
    })
    .catch((err) => {
      const result = res.json(err);
      console.log("Eror while creating user!", result);
    });
};
