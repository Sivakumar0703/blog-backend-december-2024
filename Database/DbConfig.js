import mongoose from "mongoose";

const dbConnectionString = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.lysrb.mongodb.net/${process.env.DB_NAME}`;

const connectDB = async() => {
    try {
        await mongoose.connect(dbConnectionString);
        console.log("Database Connected!");
    } catch (error) {
        console.log("Error in connecting database",error);
    }
}

export default connectDB