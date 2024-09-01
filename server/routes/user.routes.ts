import express from "express";
const normaluserRouter = express.Router();
import { registerUser, activateUser ,LoginRequest,logoutUser, retriveUserInfo,updateUserInfo,updatePassword,updateProfilePic} from "../controllers/UserController";
import { accessTokenUpdate, isAuthenticated,rolesAuthorized } from "../middleware/auth";

normaluserRouter.post('/userregisteration',registerUser);

normaluserRouter.post('/user-activate',activateUser);

normaluserRouter.post('/user-login',LoginRequest);

normaluserRouter.get('/user-logout',isAuthenticated, logoutUser);

normaluserRouter.get('/refresh-token',accessTokenUpdate);

normaluserRouter.get('/userdetails',isAuthenticated,retriveUserInfo);

normaluserRouter.put('/update-info',isAuthenticated, updateUserInfo);

normaluserRouter.put('/update-password',isAuthenticated, updatePassword);

normaluserRouter.put('/update-profilepic',isAuthenticated, updateProfilePic);

export default normaluserRouter;