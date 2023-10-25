import express from 'express';
import mongoose,{ Date } from 'mongoose';
// @ts-ignore
import {ProtoRecord} from '../models/ProtoModel';

type modelReq = {
    typeOfRecord:string;
    genre:string;
    title:string;
    location:string;
    date:Date;
    task:string;
    unit?:string;
    duration:number;
}
export const createRecord = async ( req:express.Request, res:express.Response)=> {
    const user = req.query.userId;
    const {
            typeOfRecord,
            genre,
            title,
            location,
            date,
            task,
            unit,
            duration
        } : modelReq = req.body;
    //create a record object and save it to the database
    try{
        const record =  new ProtoRecord({
         user:user,
        dailyRecord:{
                genre : genre,
                title : title,
                location : location,
                date : date,
                task :task,
                unit :unit,
                duration : duration,
            },
            typeOfRecord:typeOfRecord
        });
        record.save()
        res.status(200).json(record)
    
    }
    catch(e:any){
        console.log(e)
    }
}

export const getAllRecords = async (req: express.Request, res: express.Response) => {
    const user:any = req.query.userId;
    try {
        const records = await ProtoRecord.find({user:user});
        res.status(200).json(records);
    }
    catch (e: any) { console.log(e) }
};
export const getAllRecordByType= async (req: express.Request, res: express.Response) => {
    
    const id:any = req.query.userId;
    const typeOfRecord:string = req.params.typeOfRecord;
    try {
        const user = new mongoose.Types.ObjectId(id)
        const records = await ProtoRecord.aggregate([
            {
              $match: {
                'user': user,
                'typeOfRecord': typeOfRecord
              },
            }, {
              $sort: {
                'dailyRecord.date': 1
              }
            }
          ]);
        res.status(200).json(records);
    }
    catch (e: any) { console.log(e) }
};
export const getRecordById = async (req: express.Request, res: express.Response) => {
    const _id:string = req.params.id
    try {
        const record = await ProtoRecord.findById(_id);
        res.status(200).json(record);
    }
    catch (e: any) { console.log(e) }};



export const deleteRecordById = async (req: express.Request, res: express.Response) =>{ 
    const _id:string = req.params.id
    await ProtoRecord.findByIdAndDelete(_id);
    res.json({msg:"Record deleted"})
};

export const updateRecordById = async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    const {
        typeOfRecord,
        genre,
        title,
        location,
        date,
        task,
        duration
    } : modelReq = req.body;
    const newUpdate = await ProtoRecord.findByIdAndUpdate(id, {
        typeOfRecord:typeOfRecord,
           dailyRecord:{
            genre : genre,
            title : title,
            location : location,
            date : date,
            task :task,
            duration : duration,
        },
    },{new:true});
    res.status(200).json({newUpdate,msg: 'Record updated'})
}


//rename feild

export const revalueField = async (req:express.Request, res:express.Response ) => {
    const reValue = await ProtoRecord.updateMany(
         {
            'dailyRecord.genre':'Learning'
        },
          { $set: { "dailyRecord.genre": "Coding" } }
          ,{new:true} )
          res.json(reValue)
}