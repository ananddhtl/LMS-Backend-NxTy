import express from "express";
const normaluserRouter = express.Router();
import { registerUser, activateUser ,LoginRequest,logoutUser, retriveUserInfo} from "../controllers/UserController";
import { accessTokenUpdate, isAuthenticated,rolesAuthorized } from "../middleware/auth";

normaluserRouter.post('/userregisteration',registerUser);

normaluserRouter.post('/user-activate',activateUser);

normaluserRouter.post('/user-login',LoginRequest);

normaluserRouter.get('/user-logout',isAuthenticated,rolesAuthorized("admin"), logoutUser);

normaluserRouter.get('/refresh-token',accessTokenUpdate);

normaluserRouter.get('/userdetails',isAuthenticated,retriveUserInfo);
export default normaluserRouter;