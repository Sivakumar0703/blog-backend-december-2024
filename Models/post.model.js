import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:[{
        type:String,
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

// adding index to title and content
postSchema.index({title:'text' , content:'text'});

// adding index to tags
postSchema.index({tags:1});

const Post = mongoose.model("posts",postSchema);
export default Post