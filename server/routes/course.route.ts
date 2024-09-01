import express from "express";
const courseRouter = express.Router();
import { uploadCourse, editCourse, getSingleCourseWithoutPurchase,getAllCourseWithoutPurchase } from "../controllers/CourseController";
import { isAuthenticated, rolesAuthorized } from "../middleware/auth";

courseRouter.post('/create-courses',isAuthenticated, rolesAuthorized('admin'), uploadCourse);

courseRouter.put('/edit-courses/:id',isAuthenticated, rolesAuthorized('admin'), editCourse);

courseRouter.get('/get-courses/:id', getSingleCourseWithoutPurchase);

courseRouter.get('/all-courses', getAllCourseWithoutPurchase);

export default courseRouter;