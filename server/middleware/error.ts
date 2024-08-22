import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const MiddleWareError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Wrong Status Code
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "There is a internal server error";

  //key error
  if (err.code === 11000) {
    const message = `The duplicate key ${Object.keys(
      err.keyValue
    )} has been entered`;
    err = new ErrorHandler(message, 400);
  }

  //incorrect mongo db id

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //jwt jsonnweb token..

  if (err.name === "JsonWebTokenError") {
    const message = `JWT Token is Invalid`;
    err = new ErrorHandler(message, 400);
  }

  //jwt erpiration
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    sucess: false,
    message: err.message,
  });
};
