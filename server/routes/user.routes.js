const UserController = require("../controllers/user.controllers");

module.exports = (app) => {
  // GET ALL LINKS
  app.get("/admin/:username", UserController.getUser);
  app.post("/user/create", UserController.createUser);

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
};

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
