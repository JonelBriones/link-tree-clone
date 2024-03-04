// const { res } = require("express");
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res) {
  console.log("creating user...", req.body);

  // intitate a try catch block for sending validations errors

  const usernameExist = await User.findOne({ username: req.body.username });

  const emailExist = await User.findOne({ email: req.body.email });
  let email = { message: "Email already in use!" };
  let username = { message: "Username already in use!" };
  if (usernameExist && emailExist) {
    res.status(400).json({ email, username });
  } else if (usernameExist) {
    res.status(400).json({ username: username });
  } else if (emailExist) {
    res.status(400).json({ email: email });
  } else {
    try {
      const user = await User.create(req.body);
      // create token for user when logging in with authentication
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );
      res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
          httpOnly: true,
          expires: new Date(Date.now() + 90000000),
        })
        .json({
          message: "Successfully created user!",
        });
    } catch (err) {
      console.log("SENDING ERRORS ON REGISTER");
      res.status(400).json(err.errors);
    }
  }

  // send requst to mongo to create new user
}
async function login(req, res) {
  const user = await User.findOne({ username: req.body.username });
  if (user === null)
    return res.status(400).json({ message: "invalid username/password" });

  const passwordValid = await bcrypt.compare(req.body.password, user.password);

  if (!passwordValid)
    return res.status(400).json({ message: "invalid username/password" });

  const userToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  res
    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
      httpOnly: true,
      expires: new Date(Date.now() + 90000000),
    })
    .json({
      message: "Successfully logged user!",
    });
}
async function logout(req, res) {
  res.clearCookie("usertoken");
  res.sendStatus(200);
}

async function getLoggedUser(req, res) {
  console.log("retrieving logged user");
  try {
    const decodedJwt = jwt.decode(req.cookies.usertoken, {
      complete: true,
    });
    const user = await User.findById({ _id: decodedJwt?.payload?.id });
    res.json(user);
    console.log(user);
  } catch (err) {
    res.status(400).json({ message: "User not logged in" });
  }
}

async function updateLinks(req, res) {
  console.log("updating user's links...");

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { links: req.body },
      {
        new: true,
      },
      { runValidators: true }
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
async function getUser(req, res) {
  console.log("retrieving users...");
  try {
    const user = await User.findOne({ username: req.params.username });
    console.log("checking", req.body.username);
    console.log("user found in db", user);
    res.json(user);
  } catch (err) {
    console.log("couldnt retrieve user...", err);
    res.status(400);
    res.status(400).json(err);
  }
}

export {
  getUser,
  getUsers,
  updateLinks,
  updateLink,
  register,
  logout,
  login,
  getLoggedUser,
};
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
