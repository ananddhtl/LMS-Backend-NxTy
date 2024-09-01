import { Response, NextFunction } from "express";
import courseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";

export const createCourse = async (data: any, res: Response, next:NextFunction) => {
  const course = await courseModel.create(data);

  res.status(201).json({
    sucess: true,
    course,
  });
};
