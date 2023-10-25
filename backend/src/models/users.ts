import mongoose from "mongoose";

const User = new mongoose.Schema({
    username:{ 
        type:String,
        require:true,
        trim:true
    },
    email:{ 
        type:String,
        require:true,
        unique: true,
        trim:true
    },
    password:{
            type:String,
            required:true,
            trim:true
        },
    profilePic:{
            type:String
        }
});

export const UserModel = mongoose.model("Users", User);