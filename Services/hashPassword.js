import bcrypt from "bcryptjs";

// hashing the user password to store in database
export const hashPassword = async(userPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword , salt);
        return hashedPassword
    } catch (error) {
       throw new Error("error in hashing password".toUpperCase()); 
    }
}

// comparing user entered password from request body and hashed password from database
export const compareHashedPassword = async(password,hashedPassword) => {
    try {
       const areSame = await bcrypt.compare(password,hashedPassword);
       return areSame  
    } catch (error) {
        throw new Error("error in comparing hashed password".toUpperCase()); 
    }
}