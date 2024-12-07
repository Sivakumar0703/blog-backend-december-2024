import Comment from "../Models/comment.model.js";
import Like from "../Models/like.model.js";
import Post from "../Models/post.model.js";
import User from "../Models/user.model.js";
import manipulateTags from "../Services/manipulateTags.js";
import populateCommentsAndLikes from "../Services/populateCommentsAndLikes.js";

const errorMessage = "internal server error".toUpperCase();

// create new post
export const createNewPost = async(req,res) => {
    const {id} = req.user;
    const {title,content} = req.body;
    try {
        // check the user account is active
        const author = await User.findById(id);
        if(!author){
            return res.status(404).json({message:"user not found".toUpperCase()});
        } 
        // validate the post
        if(!title && !content){
            return res.status(400).json({message:"title or content is missing".toUpperCase()});
        }
        // save the post to database
        const newPost = {
            title,
            content,
            tags: req.body?.tags ? req.body.tags  : [],
            author:id
        };
        const post = await Post.create(newPost);
        post.save();
        res.status(200).json({message:"successfully posted".toUpperCase()});

    } catch (error) {
        res.status(500).json({message:errorMessage})
    }
}


// get all post
export const getAllPosts = async(req,res) => {
    try {
       const posts = await Post.find({} , {__v:0}).populate('author' , 'name email -_id');
       res.status(200).json({message:"fetched all post" , length:posts.length , posts:posts })  
    } catch (error) {
        res.status(500).json({message:errorMessage , error})        
    }
}


// get post by user id
export const getPostsByUserId = async(req,res) => {
    const {id} = req.user;
    try {
        const posts = await Post.find({author:id} , {__v:0 , author:0});
        res.status(200).json({message:"fetched all your posts".toUpperCase() , length:posts.length , posts:posts}) 
    } catch (error) {
        res.status(500).json({message:errorMessage})        
    }
}


// update the existing post
export const updatePost = async(req,res) => {
    const {postId} = req.params;
    try {
       const post = await Post.findById(postId);
       if(!post){
        return res.status(404).json({message:"post not found".toUpperCase()});
       }
       let updatedPost;
       if(!req.body._id && !req.body.author){ // restrict user not to change post id or author
            updatedPost = {
                ...post._doc,
                ...req.body
            }
       }
       await Post.findByIdAndUpdate(postId , updatedPost);
       res.status(200).json({message:"post updated successfully".toUpperCase() , updatedPost:updatedPost});

    } catch (error) {
        res.status(500).json({message:errorMessage});
    }
}


// delete post
export const deletePost = async(req,res) => {
    const {postId} = req.params;
    const {_id,isAdmin} = req.user;
    try {
       const post = await Post.findById(postId);
       if(!post){
        return res.status(404).json({message:"post not found".toUpperCase()});
       } 
    //  check the author and the user(who sent the request) are same 
    //  author can delete his own post  (or) admin can delete the post
    if(!isAdmin){
        if(post.author !== _id){
            return res.status(403).json({message:"unathorised request".toUpperCase()});
        }
    }  
    //    deleting post along with its comments and likes
       await Post.findByIdAndDelete(postId);
       await Comment.findOneAndDelete({post:postId});
       await Like.findOneAndDelete({post:postId});
       res.status(200).json({message:"post deleted"})
    } catch (error) {
        res.status(500).json({message:errorMessage})        
    }
}


// get post along with its comments and like
export const getCompletePostDetails = async(req,res) => {
    try {
      const query = {}
      const posts = await populateCommentsAndLikes(query);    
      res.status(200).json({message:"fetching posts completed".toUpperCase() , length:posts.length , posts:posts});

    } catch (error) {
       res.status(500).json({message:errorMessage}); 
    }
}


// get posts based on search string
export const searchForPost = async(req,res) => {
    const {searchString} = req.query;
    try {
        if(!searchString){
            return res.status(404).json({message:"missing search string".toUpperCase()});
        }
        const query = {$text : {$search : searchString}};
        const posts = await populateCommentsAndLikes(query);
        res.status(200).json({message:"searching finished".toUpperCase() , length:posts.length , posts:posts});
        
    } catch (error) {
        res.status(500).json({message:errorMessage});
    }
}


// get posts based on tags
export const getTaggedPosts = async(req,res) => {
    const {tags} = req.query;
    try {
        let tagsList;
        // tags are seperated by commas
        if(tags){
            tagsList = tags.split(',');
        } else {
            return res.status(404).json({message:"tags are missing".toUpperCase()});
        }
        const query = {tags:{$in:tagsList}};
        const posts = await populateCommentsAndLikes(query);
        res.status(200).json({message:"filtered the post based on tags".toUpperCase() , length:posts.length , posts:posts});
        
    } catch (error) {
        res.status(500).json({message:errorMessage});
    }
}

// ---------------------------------------------------------------------------------------------------------

// we can use the updatePost function to add and remove the tags but we are writing this to provide dedicated route for add/remove tags

// add new tags to post
export const addtags = async(req,res) => {
    const {tags} = req.query;
    const {postId} = req.params;
    try {
        const tagsArray = tags.split(',');
        const operation = 'add';
        // check the post exists or not
        const post = await Post.findById(postId).lean();
        if(!post){
            return res.status(404).json({message:"post not found".toUpperCase()});
        }
        const performTagAddition = await manipulateTags(operation,post,tagsArray);
        if(!performTagAddition){
            return res.status(400).json({message:"invalid parameter is passed".toUpperCase()});
        }
        res.status(200).json({message:"tags are added".toUpperCase()});
        
    } catch (error) {
       res.status(500).json({message:errorMessage}); 
    }
}


// remove tag from post
export const removetags = async(req,res) => {
    const {tags} = req.query;
    const {postId} = req.params;

    try {
        const tagsArray = tags.split(',');
        const operation = 'remove';
        // check the post exists or not
        const post = await Post.findById(postId).lean();
        if(!post){
            return res.status(404).json({message:"post not found".toUpperCase()});
        }
        const performTagAddition = await manipulateTags(operation,post,tagsArray);
        if(!performTagAddition){
            return res.status(400).json({message:"invalid parameter is passed".toUpperCase()});
        }
        res.status(200).json({message:"tags are removed".toUpperCase()});
        
    } catch (error) {
       res.status(500).json({message:errorMessage}); 
    }
}