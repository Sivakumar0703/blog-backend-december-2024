import express from "express";
import verification from "../Middleware/authorization.js";
import { deleteLike, putLike } from "../Controllers/like.controller.js";

const likeRoute = express.Router();

likeRoute.post('/add/:postId' , verification , putLike);
likeRoute.delete('/delete/:postId' , verification , deleteLike);


export default likeRoute