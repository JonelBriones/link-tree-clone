import { model, Schema } from "mongoose";

// create user schema object
const UserSchema = new Schema({
  username: String,
  // password: String,
  // email: String,
  // backgroundTheme: String,
  links: [
    {
      header: String,
      url: String,
      network: String,
    },
  ],
});
//create collections of users
const User = model("User", UserSchema);
export default User;
