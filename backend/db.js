const { Schema, default: mongoose, model } = require("mongoose");

console.log("connected to db");
const ObjectId = mongoose.Types.ObjectId;
const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, minlengt: 6 },
  firstname: { type: String },
  lastname: { type: String },
});
const CourseSchema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  creatorId: ObjectId,
});
const AdminSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, minlengt: 6 },
  firstname: { type: String },
  lastname: { type: String },
});
const PurchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const UserModel = mongoose.model("user", UserSchema);
const AdminModel = mongoose.model("admin", AdminSchema);
const CourseModel = mongoose.model("course", CourseSchema);
const PurchaseModel = mongoose.model("Purchase", PurchaseSchema);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
};
