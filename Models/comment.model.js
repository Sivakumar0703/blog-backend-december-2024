import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Comment = mongoose.model('comments',commentSchema);
export default Comment