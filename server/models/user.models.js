import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// create user schema object
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email",
    },
  },
  username: {
    type: String,
    required: [true, "Username cannot be blank"],
    minLength: [3, "Username must be at least 3 characters long"],
    maxLength: [20, "Username must be at least 3 characters long"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
    minLength: [3, "Password must be at least 5 characters long"],
  },
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
async function checkUsernameExist(reqUsername) {
  console.log("checking username in db");
  let user = await User.findOne({ username: reqUsername });

  return user?.username == reqUsername;
}

UserSchema.pre("validate", function (next) {
  if (this.password !== this._confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }

  // Username validations
  // console.log("username", checkUsernameExist());
  // if (checkUsernameExist()) {
  //   this.invalidate("username", "Username is taken!");
  // } else
  if (this.username == "") {
    this.invalidate("username", "Username cannot be blank!");
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
