import { redis } from "./redis";
require("dotenv").config();
import { NextFunction, Response, Request } from "express";
import { IUser } from "../models/user.model";

interface IOptionsForToken {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshtoken = user.SignRefreshToken();

  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );

//   redis.set(user._id, JSON.stringify(user) as any);

  const accessTokenOptions: IOptionsForToken = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  const refreshtokenOptions: IOptionsForToken = {
    expires: new Date(Date.now() + refreshTokenExpire * 1000),
    maxAge: refreshTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("accesstoken", accessToken, accessTokenOptions);
  res.cookie("refershtoken", refreshtoken, refreshtokenOptions);
  res.status(statusCode).json({ success: true, user, accessToken });
};
