import Post from "../Models/post.model.js";
import Comment from "../Models/comment.model.js";
import Like from "../Models/like.model.js";

async function populateCommentsAndLikes(query={}){

    // get all posts
    const posts = await Post.find(query , {__v:0})
    .populate('author' , 'name email -_id')
    .lean();

    // infusing comments and like into post object
    for(let post of posts){
        // populate comments
        console.log(post._id)
        const comments = await Comment.find({post:post._id},{__v:0,post:0})
        .populate('author' , 'name email -_id')
        .lean();

        post.comments = comments;
        

        // populate likes
        const likes = await Like.find({post:post._id},{__v:0})
        .populate('user' , 'name email -_id')
        .lean();
        // here we are adding like count only
        post.likes = likes.length;
    }

    return posts

}

export default populateCommentsAndLikes