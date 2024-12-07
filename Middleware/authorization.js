import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";


const verification = async(req,res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            // taking out the token from request headers
            const token = req.headers.authorization.split(" ")[1];

            // get user data by using the token
            const userDataFromToken = jwt.verify(token , process.env.JWT_SECRET_KEY);
            req.user = await User.findById(userDataFromToken.id);
            next();
        
        } catch (error) {
            res.status(400).json({message:"invalid token. access denied".toUpperCase()});
        }
    } else {
        return res.status(400).json({message:"token is missing".toUpperCase()});
    }
    
}

export default verification