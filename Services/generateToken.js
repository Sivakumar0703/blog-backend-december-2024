import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;


// generate token
export const generateToken = async(data) => {
    try {
        const token = jwt.sign(data , secretKey);
        return token
    } catch (error) {
        throw new Error("error in token generation".toUpperCase());
    }
}

// verify the token which is sent by the client
export const verifyToken = async(token) => {
    try {
        const user = jwt.verify(token , secretKey);
        return user.id
    } catch (error) {
        throw new Error("error in token verification".toUpperCase());
    }
}
