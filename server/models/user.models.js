import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// create user schema object
const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  // backgroundTheme: String,
  links: [
    {
      header: String,
      url: String,
    },
  ],
});

UserSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

UserSchema.pre("validate", function (next) {
  if (this.password !== this._confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

//create collections of users
const User = model("User", UserSchema);
export default User;
