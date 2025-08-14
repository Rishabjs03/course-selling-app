const { Router } = require("express");
const { usermiddleware } = require("../middleware/user");
const { PurchaseModel, CourseModel } = require("../db");

const CourseRouter = Router();
CourseRouter.get("/purchase", usermiddleware, async (req, res) => {
  const userId = req.body.userId;
  const courseId = req.body.courseId;

  await PurchaseModel.create({
    userId,
    courseId,
  });
  res.json({
    message: "you have successfully bought the course",
  });
});
CourseRouter.get("/courses", async (req, res) => {
  const courses = await CourseModel.find({});
  res.json({ courses });
});
module.exports = {
  CourseRouter: CourseRouter,
};
