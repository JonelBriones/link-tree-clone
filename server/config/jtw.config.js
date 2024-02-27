import jtw from "jsonwebtoken";

async function authenticate(req, res, next) {
  jtw.verify(req.cookies.usertoken, env.process.SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
}
export { authenticate };
