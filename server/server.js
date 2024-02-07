require("dotenv").config();

// init app & middleware
const express = require("express");
const cors = require("cors");
const app = express();

// middlewares
app.use(cors());
app.use(express.json()); //parses json payloads
app.use(express.urlencoded({ extended: true })); //parses url json payloads

require("./config/mongoose.config");
require("./routes/user.routes")(app);
app.listen(process.env.PORT, () => {
  console.log("listening on port:", process.env.PORT);
});
