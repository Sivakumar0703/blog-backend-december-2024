import Comment from "../Models/comment.model.js";

const errorMessage = "internal server error".toUpperCase();

// create new comment
export const addComment = async(req,res) => {
    const {id} = req.user;
    const {postId,comment} = req.body;
    try {
        // check the author has already written a comment for the post or not
        const commented = await Comment.findOne({author:id,post:postId});
        if(commented){
            return res.status(400).json({message:"you have already commented for this post".toUpperCase()});
        }
        // check whether the comment is valid or not
        if(!comment){
            return res.status(400).json({message:"invalid comment".toUpperCase()}); 
        }
        // validate the post id and author id
        if(!id && !postId){
            return res.status(400).json({message:"user id or post id is missing".toUpperCase()});
        }
        // save the comment to database
        const newComment = {
            comment:comment,
            author:id,
            post:postId,
        };
        const addNewComment = await Comment.create(newComment);
        addNewComment.save();
        res.status(200).json({message:" comment posted successfully".toUpperCase()});

    } catch (error) {
        res.status(500).json({message:errorMessage , error})
    }
}


// update the comment
export const updateComment = async(req,res) => {
    const {comment} = req.body;
    const {commentId} = req.params;
    try {
        // check the author has already written a comment for the post or not
        const previousComment = await Comment.findById(commentId).lean();
        if(!previousComment){
            return res.status(404).json({message:"comment not found".toUpperCase()});
        }
        // validate the comment
        if(!comment){
            return res.status(400).json({message:"invalid comment".toUpperCase()});
        }
        // updating the comment
        const updatedComment = {
            ...previousComment,
            comment:comment
        }
        await Comment.findByIdAndUpdate(commentId , updatedComment);
        res.status(200).json({message:"comment updated".toUpperCase()});
    } catch (error) {
        res.status(500).json({message:errorMessage})        
    }
} 


// delete comment
export const deleteComment = async(req,res) => {
    const {commentId} = req.params;
    const {_id,isAdmin} = req.user;
    try {
       const comment = await Comment.findById(commentId).lean();
       // only the author and admin can delete the comment
        if(!isAdmin){
            if(_id !== comment.author){
                return res.status(403).json({message:"you have no access to delete the comment".toUpperCase()});
            }
        }
       await Comment.findOneAndDelete(commentId); 
       res.status(200).json({message:"comment delted".toUpperCase()});
    } catch (error) {
        res.status(500).json({message:errorMessage})        
    }
}