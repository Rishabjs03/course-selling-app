const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const { UserModel } = require("../db.js");
const UserRouter = Router();

UserRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const passowrd = req.body.passowrd;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  try {
    const hashedpassword = await bcrypt.hash(passowrd, 5);
    await UserModel.create({
      email: email,
      password: hashedpassword,
      firstname: firstname,
      lastname: lastname,
    });
    res.json({
      message: "signin succeeded",
    });
  } catch (error) {
    res.json({
      message: "please retry again",
    });
  }
});
UserRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const passowrd = req.body.passowrd;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const user = await UserModel.findOne({
    email: email,
    firstname: firstname,
    lastname: lastname,
  });

  if (!user) {
    res.status(403).json({
      message: "user email not found",
    });
  }
  const passwordmatched = await bcrypt.compare(passowrd, response.password);

  if (passwordmatched) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "invalid credentials",
    });
  }
});
UserRouter.get(" /purchase", async (req, res) => {
  const userId = req.userId;
  const purchases = await PurchaseModel.find({
    userId,
  });
  res.json({
    purchases,
  });
});
module.exports = {
  UserRouter: UserRouter,
};
