import express from "express";
const normaluserRouter = express.Router();
import { registerUser, activateUser ,LoginRequest} from "../controllers/UserController";


normaluserRouter.post('/userregisteration',registerUser);

normaluserRouter.post('/user-activate',activateUser);

normaluserRouter.post('/user-login',LoginRequest);
export default normaluserRouter;