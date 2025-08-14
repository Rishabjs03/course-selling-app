const { Router } = require("express");
const { AdminModel, CourseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config.js");
const { adminmiddleware } = require("../middleware/admin.js");
const AdminRouter = Router();

AdminRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const passowrd = req.body.passowrd;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  try {
    const hashedpassword = await bcrypt.hash(passowrd, 5);
    await AdminModel.create({
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
AdminRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const passowrd = req.body.passowrd;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const admin = await AdminModel.findOne({
    email: email,
    firstname: firstname,
    lastname: lastname,
  });

  if (!admin) {
    res.status(403).json({
      message: "user email not found",
    });
  }
  const passwordmatched = await bcrypt.compare(passowrd, response.password);

  if (passwordmatched) {
    const token = jwt.sign(
      {
        id: admin._id.toString(),
      },
      JWT_ADMIN_SECRET
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
AdminRouter.post("/course", adminmiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, imageUrl, price } = req.body;

  await CourseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });
  res.json({
    message: "course created",
    courseId: course._id,
  });
});
AdminRouter.put("/course", async (req, res) => {
  const adminId = req.userId;
  const { title, description, imageUrl, price, courseId } = req.body;

  await CourseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      description,
      imageUrl,
      price,
    }
  );
  res.json({
    message: "course created",
    courseId: course._id,
  });
});
AdminRouter.get("/course/bulk", async (req, res) => {
  const adminId = req.userId;
  const courses = await CourseModel.find({
    creatorId: adminId,
  });
  res.json({
    message: "course created",
    courses,
  });
});

module.exports = {
  AdminRouter: AdminRouter,
};
