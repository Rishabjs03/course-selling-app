const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const { default: adminmiddleware } = require("./admin.js");
async function usermiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = await jwt.verify(token, JWT_SECRET);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed up",
    });
  }
}
module.exports = {
  usermiddleware: usermiddleware,
};
