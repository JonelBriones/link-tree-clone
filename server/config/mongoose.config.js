import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// creates new / connects to chosen database.
const MONGOD_URI = process.env.MONGOD_URI;

async function dbConnect() {
  try {
    await connect(MONGOD_URI, {
      dbName: "linktree-clone-users",
    });
  } catch (err) {
    console.log("FAILED TO CONNECT TO MONGODB...");
    console.log(err);
    throw err;
  }
}

export default dbConnect;
