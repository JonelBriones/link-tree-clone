// const { res } = require("express");
import User from "../models/user.models.js";

async function createUser(req, res) {
  const user = await User.create(req.body);
  console.log("creating user...", req.body.username);
  res.json({ message: "User successfully created!" });
}
async function updateLinks(req, res) {
  console.log("updating user's links...");

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { links: req.body },
      {
        new: true,
      }
    );
    res.json({ message: "User successfully created!" });
  } catch (err) {
    console.log("couldnt update user's links...", err);
    res.status(400);
    res.status(400).json(err);
  }
}

async function updateLink(req, res) {
  console.log("UPDATE LINK WITH ID:", req.params.id);
  console.log("UPDATED DATA", req.body);
  try {
    const linkId = req.params.id;
    if (req.body.url == "" || req.body.header == "") {
    } else {
      const link = await User.findOneAndUpdate(
        { "links._id": linkId },
        { $set: { "links.$": req.body } },
        { new: false }
      );
      res.json(link);
    }

    /* 
    get the id of the link to update,
    go into the properties of the link and update
     */
  } catch (err) {
    console.log("couldnt update user's link...", err);
    res.status(400);
    res.status(400).json(err);
  }
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

export { createUser, getUsers, updateLinks, updateLink };
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
