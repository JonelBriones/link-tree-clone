import { Router } from "express";
import { authenticate } from "../config/jtw.config.js";
import {
  register,
  getUser,
  getUsers,
  updateLinks,
  updateLink,
  login,
  logout,
  getLoggedUser,
} from "../controllers/user.controllers.js";

const router = Router();

// GET ALL LINKS

// users
router.route("/register", authenticate).post(register);
router.route("/login", authenticate).post(login);
router.route("/user", authenticate).get(getLoggedUser);
router.route("/logout").post(logout);
router.route("/users").get(getUsers);
router.route("/:username").get(getUser);

router.route("/create/link/:id").put(updateLinks);
router.route("/update/link/:id").patch(updateLink);
// router.route("/update/link/:id").put(updateLinks);

export default router;
// router.route("/api/:id", UserController.getUser);
// router.route("/api/user", UserController.updateUserLinks);

// links

// router.route("/api/links", UserController.updateUserLinks);

//GET ONE USER
// app.get("/admin/:id", (req, res) => {
//   res.json({ msg: "GET USER BY ID" });
// });

// app.post("/admin/user", (req, res) => {
//   console.log(req.body);
//   res.send("POST /admin/user");
// });
// app.delete("/:id", (req, res) => {
//   res.json({ msg: "DELETE LINK" });
// });
// app.patch("/:id", (req, res) => {
//   res.json({ msg: "UPDATE LINK" });
// });

// {
//   "username": "jonelkindacodes",
//   "email": "jonel@gmail.com",
//   "password": "password",
//   "backgroundTheme": "white",
//   "links": [
//     {
//       "id": 0,
//       "header": "Subcribe to my Youtube!",
//       "url": "https://www.youtube.com/@JonelKindaCodes",
//       "network": "youtube"
//     },
//     {
//       "id": 1,

//       "header": "Coding Videos!",
//       "url": "https://www.tiktok.com/@JonelKindaCodes",
//       "network": "tiktok"
//     },
//     {
//       "id": 2,
//       "header": "Follow my Instagram!",
//       "url": "https://www.instagram.com/@JonelKindaCodes",
//       "network": "instagram"
//     }
//   ]
// }
