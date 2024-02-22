// const { res } = require("express");
import User from "../models/user.models.js";

async function createUser(req, res) {
  const user = await User.create(req.body);
  console.log("creating user...", req.body.username);
  res.json({ message: "User successfully created!" });
}
async function updateLinks(req, res) {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  console.log("updating user's links...");
  res.json({ message: "User successfully created!" });
}
async function getUsers(req, res) {
  console.log("retrieving users...");
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("couldnt retrieve users...", err);
    res.status(400);
    res.status(400).json(err);
  }
}

export { createUser, getUsers, updateLinks };
// module.exports.getUser = (req, res) => {
//   User.findOne({ username: req.params.username })
//     .then((user) => res.json(user))
//     .catch((err) => res.json(`${err} does not exist...`));
// };

// module.exports.createUser = (req, res) => {
//   console.log("creating user...");
//   User.create(req.body)
//     .then((user) => {
//       const result = res.json(user);
//       console.log("Created User!", result);
//     })
//     .catch((err) => {
//       const result = res.json(err);
//       console.log("Eror while creating user!", result);
//     });
// };

// module.exports.updateUserLinks = (req, res) => {
//   console.log("creating user...");
//   User.save(req.body)
//     .then((user) => {
//       const result = res.json(user);
//       console.log("Added to user's list!", result);
//     })
//     .catch((err) => {
//       const result = res.json(err);
//       console.log("Eror while adding to user's list!", result);
//     });
// };
