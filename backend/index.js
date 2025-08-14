const express = require("express");

const mongoose = require("mongoose");
const { UserRouter } = require("./routes/user");
const { CourseRouter } = require("./routes/course");
const { AdminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.use("/course", CourseRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://rishabagarwaljs:rishav1929@practice.0xsvvei.mongodb.net/course-app"
  );
  app.listen(3000);
}
main();
