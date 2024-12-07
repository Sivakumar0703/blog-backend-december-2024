import Post from "../Models/post.model.js";

// add or remove tags from post
async function manipulateTags(operation , post , tags){
    try {
        let updatedTags;
        if(operation === "add"){
          // adding new tags to the exisiting tags
            updatedTags = [...post.tags , ...tags ];
            await Post.findByIdAndUpdate( post._id , {...post , tags:updatedTags} ); 
        } else if (operation === "remove"){
            updatedTags = post.tags?.filter( tag => !tags.includes(tag));
            await Post.findByIdAndUpdate( post._id , {...post , tags:updatedTags} ); 
        } else {
            return false
        }
        return true
    } catch (error) {
       throw new Error(`error in ${operation === "add" ? 'adding' : 'removing'} tags failed`.toUpperCase() ); 
    }
}

export default manipulateTags