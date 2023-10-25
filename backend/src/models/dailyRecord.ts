import mongoose from "mongoose";

const Dailyrecord = new mongoose.Schema({
    genre:{
        type:String,
        require:true,
      },
    title:{ 
        type:String,
        require:true,
    },
    location:{ 
        type:String,
        require:true,
        trim:true
    },
    date:{
            type:Date,
            default:Date.now,
            required:true,
        },
    task:{
            type:String,
            required:true,
            trim:true
        },
    duration:{
            type:Number,
            required:true,
            trim:true
        },
    unit:['hour', 'minute']
});

export const DailyRecord = mongoose.model("DailyRecord", Dailyrecord);