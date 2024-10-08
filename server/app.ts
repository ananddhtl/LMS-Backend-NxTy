require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import {MiddleWareError} from "./middleware/error"
import normaluserRouter from "./routes/user.routes";
import courseRouter from "./routes/course.route";
//body parser
app.use(express.json({limit:"50mb"}));


//cookie parser
app.use(cookieParser());

app.use(cors({
    origin:process.env.ORIGIN
}))

app.use("/api/v1", normaluserRouter);

app.use("/api/v1", courseRouter);
//testing api

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    });
})


app.all("*",(req: Request, res: Response, next: NextFunction) => {
   const err = new Error(`Route ${req.originalUrl} not found`) as any;
   err.statusCode = 404;
   next(err);
});




app.use(MiddleWareError);