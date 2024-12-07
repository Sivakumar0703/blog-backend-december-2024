import express from "express";
import verification from "../Middleware/authorization.js";
import { addtags, createNewPost, deletePost, getAllPosts, getCompletePostDetails, getPostsByUserId, getTaggedPosts, removetags, searchForPost, updatePost } from "../Controllers/post.controller.js";
import isAdmin from "../Middleware/isAdmin.js";

const postRoute = express.Router();

postRoute.get('/get_my_posts' , verification , getPostsByUserId);
postRoute.get('/get_all_posts' , verification , getAllPosts);
postRoute.get('/fetch/detailed_posts' , verification , getCompletePostDetails);
postRoute.post('/save_post' , verification , createNewPost);
postRoute.patch('/update_post/:postId' , verification , updatePost);
postRoute.delete('/delete_post/:postId' , verification , deletePost);
postRoute.get('/search' , verification , searchForPost);
postRoute.get('/tags' , verification , getTaggedPosts);
postRoute.patch('/add_tags/:postId' , verification , addtags);
postRoute.patch('/remove_tags/postId' , verification , removetags);

// for admin
postRoute.delete('/delete/post/:postId' , verification , isAdmin , deletePost);


export default postRoute