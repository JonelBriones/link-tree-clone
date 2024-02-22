import { Router } from "express";

import {
  createUser,
  getUsers,
  updateLinks,
} from "../controllers/user.controllers.js";

const router = Router();

// GET ALL LINKS

// users
router.route("/create/user").post(createUser);
router.route("/users").get(getUsers);

router.route("/create/link/:id").put(updateLinks);

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
