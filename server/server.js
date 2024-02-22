// init app & middleware
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./config/mongoose.config.js";
import router from "./routes/user.routes.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT;
dbConnect();

app.use(
  cors({ credentials: true, origin: "http://localhost:5173" }),
  express.json(),
  express.urlencoded({ extended: true })
);
app.use("/api", router);

app.listen(PORT, () => {
  console.log("listening on port:", PORT);
});
