const mongoose = require("mongoose");

// create user schema object
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  backgroundTheme: String,
  links: [
    {
      header: String,
      url: String,
      network: String,
    },
  ],
});
//create collections of users
module.exports = mongoose.model("User", UserSchema);
