import mongoose from "mongoose";

const Todolist = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    type:{
        type:String,
        require:true,
      },
    genre:{
        type:String,
        require:true,
      },
    title:{ 
        type:String,
        require:true,
    },
    priority:{
        type:Number,
        min:[1,"Priority should be between 1 and 4"],
        require:true,
    },
    deadline:{
            type:Date,
            default:Date.now,
            required:true,
        },
    task:{
            type:String,
            trim:true
        },
    status:{
            type:Boolean,
            default:false,
        },
});

export const TodoList = mongoose.model("Todolist", Todolist);