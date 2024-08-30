import express from "express";
const normaluserRouter = express.Router();
import { registerUser, activateUser } from "../controllers/UserController";


normaluserRouter.post('/userregisteration',registerUser);

normaluserRouter.post('/user-activate',activateUser);
export default normaluserRouter;