import express from "express";
const courseRouter = express.Router();
import {
  uploadCourse,
  editCourse,
  getSingleCourseWithoutPurchase,
  getAllCourseWithoutPurchase,
  getCourseAccordingtoUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyReview,
} from "../controllers/CourseController";
import { isAuthenticated, rolesAuthorized } from "../middleware/auth";

courseRouter.use("", (req, res, next) => {
  next();
});
courseRouter.post(
  "/create-courses",
  isAuthenticated,
  rolesAuthorized("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-courses/:id",
  isAuthenticated,
  rolesAuthorized("admin"),
  editCourse
);

courseRouter.get("/get-courses/:id", getSingleCourseWithoutPurchase);

courseRouter.get("/all-courses", getAllCourseWithoutPurchase);

courseRouter.get(
  "/get-coursewithcontent/:id",
  isAuthenticated,
  getCourseAccordingtoUser
);

courseRouter.put("/add-question", isAuthenticated, addQuestion);

courseRouter.put("/add-answer", isAuthenticated, addAnswer);

courseRouter.put("/add-review/:id", isAuthenticated, addReview);

courseRouter.put(
  "/add-reply/:id",
  isAuthenticated,
  rolesAuthorized("admin"),
  addReplyReview
);

export default courseRouter;
