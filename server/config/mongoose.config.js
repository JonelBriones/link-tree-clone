const mongoose = require("mongoose");
// creates new / connects to chosen database.
mongoose
  .connect("mongodb://127.0.0.1:27017/linktree-clone-db")
  .then(() => console.log("connected to database"))
  .catch(() => console.log("failed to connect to database..."));
// decapretated - { useNewUrlParser: true, useUnifiedTopology: true}
