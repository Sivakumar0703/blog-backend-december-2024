import Like from "../Models/like.model.js";

const errorMessage = "internal server error".toUpperCase();

// add like
export const putLike = async(req,res) => {
    const {id} = req.user;
    const {postId} = req.params;
    try {
        // check the user has already liked the post or not
        const isAlreadyliked = await Like.findOne({user:id,post:postId}).lean();
        if(isAlreadyliked){
            return res.status(400).json({message:"you have already liked this post".toUpperCase()});
        }
        // create and save the new like object in database
        const newLike = {
            user:id,
            post:postId
        }
        const likePost = await Like.create(newLike);
        likePost.save();
        res.status(200).json({message:"you liked a post"});

    } catch (error) {
        res.status(500).json({message:errorMessage})        
    }
}

// delete the like (or) unlike
export const deleteLike = async(req,res) => {
    const {postId} = req.params;
    const {id} = req.user;
    try {
        // finding the like object from database
        const findLikeObject = await Like.findOne({user:id , post:postId}).lean();
        if(!findLikeObject){
            return res.status(404).json({message:"post not found".toUpperCase()});
        }
        // performing delete operation
        await Like.findByIdAndDelete(findLikeObject._id);
        res.status(200).json({message:"you have unliked the post".toUpperCase()});
    } catch (error) {
        res.status(500).json({message:errorMessage})        
    }
}