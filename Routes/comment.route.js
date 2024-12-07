import express from "express";
import { addComment, deleteComment, updateComment } from "../Controllers/comment.controller.js";
import verification from "../Middleware/authorization.js";
import isAdmin from "../Middleware/isAdmin.js";

const commentRoute = express.Router();

commentRoute.post('/add' , verification , addComment);
commentRoute.patch('/update/:commentId' , verification , updateComment);
commentRoute.delete('/delete/:commentId' , verification , deleteComment);

// for admin
commentRoute.delete('/delete/comment/:commentId' , verification , isAdmin , deleteComment);


export default commentRoute