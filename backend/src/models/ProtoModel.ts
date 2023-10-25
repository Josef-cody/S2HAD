import mongoose from "mongoose";

const Protorecord = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    dailyRecord: { 
        type: mongoose.Schema.Types.Mixed, 
        ref: "dailyRecord" ,
        default: {}
    },
    typeOfRecord:{
        type: String,
        require:true,
      },
});

export const ProtoRecord = mongoose.model("ProtoRecord", Protorecord);