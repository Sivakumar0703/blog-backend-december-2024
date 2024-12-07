import User from "../Models/user.model.js";
import { generateToken } from "../Services/generateToken.js";
import { compareHashedPassword, hashPassword } from "../Services/hashPassword.js";

const errorMessage = "internal server error".toUpperCase();

// get all user
export const getAllUser = async(req,res) => {
    try {
        const getAllUser = await User.find({} , {__v:0});
        res.status(200).json({message:"fetched every user details".toUpperCase() , users:getAllUser});
    } catch (error) {
        res.status(500).json({message:errorMessage})
    }
}


// user registeration
export const registerUser = async(req,res) => {
    const {name, email, password} = req.body;
    try {
        // check for existence of the registered user
        const isEmailExists = await User.findOne({email:email});
        console.log(isEmailExists)

        // if the email id is already in our database
        if(isEmailExists){
            return res.status(400).json({message:"this email id already exists".toUpperCase()});
        }

        // if it is a new email then register the new user to our database
        // before saving user detail, hash the password
        const hashedPassword = await hashPassword(password);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        newUser.save();
        res.status(200).json({message:"registeration done".toUpperCase()});
        
    } catch (error) {
       res.status(500).json({message:errorMessage , error}); 
    }
}


// login user
export const userLogin = async(req,res) => {
    const {email , password} = req.body;
    try {
        // check th email is in database
        const loggingUser = await User.findOne({email:email});
        if(!loggingUser){
            return  res.status(500).json({message:"invalid email".toUpperCase()}); 
        }

        // validate the password by comparing it with the hashed password from the database
        const isPasswordMatched = await compareHashedPassword(password , loggingUser.password );
        if(!isPasswordMatched){
            return  res.status(500).json({message:"incorrect password".toUpperCase()}); 
        }

        // if email and password matched successfully create a token for the user and save it in database
        const data = {
            name: loggingUser.name,
            email: loggingUser.email,
            id: loggingUser._id
        }
        const token = await generateToken(data);
        loggingUser.token = token;
        loggingUser.save(); // saving token in database
        const dataToClient = {
            name: loggingUser.name,
            email: loggingUser.email,
            token: token
        }
        // sending user name , email address and token
        res.status(200).json({message:"login successful".toUpperCase() , userDetail:dataToClient})

    } catch (error) {
        res.status(500).json({message:errorMessage , error}); 
    }
}


// update user
export const updateUserData = async(req,res) => {
    const {id} = req.user;
    
    try {
        // check the user existance
        const user = await User.findById(id);
        if(!user){
            return  res.status(500).json({message:"user not found. updation failed".toUpperCase()}); 
        }
        // updating user data. updatedData(object) from request body. 
        // updatedData contain data to be updated
        let updatedUserData;
        if((!req.body._id) && (!req.body.token)){ // stopping user from updating _id and token field
            updatedUserData = {
                ...user._doc,
                ...req.body
            }
            await User.findByIdAndUpdate(id , updatedUserData);
        } else {
            return  res.status(500).json({message:"you have no access to update these data".toUpperCase()}); 
        }
        res.status(200).json({message:"updated successfully".toUpperCase()});

    } catch (error) {
        res.status(500).json({error:errorMessage});
    }
}


// delete user
export const deleteUser = async(req,res) => {
    const {id} = req.user;
    try {
        // check for the user existance
        const user = await User.findById(id);
        if(!user){
            res.status(500).json({message:"not a valid user. cannot delete".toUpperCase()});
        } 
        // performing delete operation on valid user
        await User.findByIdAndDelete(id);
        res.status(200).json({message:"user deleted".toUpperCase()});  
    } catch (error) {
        res.status(500).json({message:errorMessage});
    }
}