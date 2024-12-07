import express from "express";
import { deleteUser, getAllUser, registerUser, updateUserData, userLogin } from "../Controllers/user.controller.js";
import verification from "../Middleware/authorization.js";
import isAdmin from "../Middleware/isAdmin.js";

const userRoute = express.Router();

userRoute.get('/get_all_user', verification , isAdmin , getAllUser);
userRoute.post('/register_user' , registerUser);
userRoute.post('/login_user' , userLogin);
userRoute.patch('/update_user' , verification , updateUserData);
userRoute.delete('/delete_user' , verification , deleteUser);


export default userRoute