import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Database/DbConfig.js";
import userRoute from "./Routes/user.route.js";
import postRoute from "./Routes/post.route.js";
import commentRoute from "./Routes/comment.route.js";
import likeRoute from "./Routes/like.route.js";

const port = process.env.PORT;

// creating an app
const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use('/api/users' , userRoute);
app.use('/api/posts' , postRoute);
app.use('/api/comments' , commentRoute);
app.use('/api/likes' , likeRoute);

// connecting database
connectDB();


app.listen(port , () => {
    console.log(`Server is running at port - ${port}`)
});