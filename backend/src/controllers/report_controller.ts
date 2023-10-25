import express from 'express';
import mongoose, { Date,Types } from 'mongoose';
// @ts-ignore
import { UserModel } from '../models/users';


export const getRecordsResultByTypeAndHour = async (req: express.Request, res: express.Response) => {
    const user:Types.ObjectId | any = req.query.userId;
    const type:string = req.params.typeOfRecord;
    let dateStart = new Date(req.params.dateStart)
    let dateEnd = new Date(req.params.dateEnd)
    let startStamp = dateStart.getTime()
    let endStamp = dateEnd.getTime()
    try {
        const tasks = await UserModel.aggregate([
            {
              $match: {
                '_id': new mongoose.Types.ObjectId(user),
              }
            }, {
              $lookup: {
                'from': 'protorecords', 
                'localField': '_id', 
                'foreignField': 'user', 
                'as': 'result'
              }
            }, {
              $unwind: '$result'
            }, {
              $match: {
                'result.typeOfRecord': type, 
                'result.dailyRecord.unit': 'hour'
              }
            }, {
              $addFields: {
                'convertedDuration': {
                  '$convert': {
                    'input': '$result.dailyRecord.duration', 
                    'to': 'double'
                  }
                }
              }
            }, {
              '$match': {
                'result.dailyRecord.date': {
                  '$gte': startStamp, 
                  '$lte': endStamp
                }
              }
            },{
              $project: {
                'result': 1, 
                'convertedDuration': 1, 
                'totalTime': {
                  '$sum': [
                    '$convertedDuration'
                  ]
                }
              }
            }, {
              $group: {
                '_id': '$_id', 
                'totalTime': {
                  '$sum': '$convertedDuration'
                }, 
                'result': {
                  '$push': '$result'
                }
              }
            }
          ]);
        res.status(200).json(tasks);
    }
    catch (e: any) { console.log(e) }
};

export const getRecordsResultByTypeAndMinute= async (req: express.Request, res: express.Response) => {
    const user:Types.ObjectId | any = req.query.userId;
    const type:string = req.params.typeOfRecord;
    let dateStart = new Date(req.params.dateStart)
    let dateEnd = new Date(req.params.dateEnd)
    let startStamp = dateStart.getTime()
    let endStamp = dateEnd.getTime()
    try {
        const tasks = await UserModel.aggregate([
            {
              '$match': {
                '_id': new mongoose.Types.ObjectId(user)
              }
            }, {
              '$lookup': {
                'from': 'protorecords', 
                'localField': '_id', 
                'foreignField': 'user', 
                'as': 'result'
              }
            }, {
              '$unwind': '$result'
            }, {
              '$match': {
                'result.typeOfRecord': type, 
                'result.dailyRecord.unit': 'minute'
              }
            }, {
              '$addFields': {
                'convertedDuration': {
                  '$convert': {
                    'input': '$result.dailyRecord.duration', 
                    'to': 'double'
                  }
                }
              }
            },{
              '$match': {
                'result.dailyRecord.date': {
                  '$gte': startStamp, 
                  '$lte': endStamp
                }
              }
            }, {
              '$project': {
                'result': 1, 
                'convertedDuration': 1, 
                'totalTime': {
                  '$sum': [
                    '$convertedDuration'
                  ]
                },
                'convertedToHour':{
                  '$divide':[
                    '$totalTime',60
                  ]
                }
              }
            }, 
            {
              '$project': {
                'result': 1, 
                'convertedDuration': 1,
                'convertedToHour':{
                  '$divide':[
                    '$totalTime',60
                  ]
                }
              }
            },{
              '$group': {
                '_id': '$_id', 
                'totalTime': {
                  '$sum': '$convertedDuration'
                },
                'result': {
                  '$push': '$result'
                }
              }
            },{
              '$project': {
                '_id': 1, 
                'result': 1, 
                'totalTime': 1, 
                'convertedToHour': {
                  '$divide': [
                    '$totalTime', 60
                  ]
                }
              }
            }
          ]);
        res.status(200).json(tasks);
    }
    catch (e: any) { console.log(e) }
};
export const getRecordsResultByGenreAndHour = async (req: express.Request, res: express.Response) => {
    const user:Types.ObjectId | any = req.query.userId;
    const type:string = req.params.typeOfRecord;
    const genre:string = req.params.genre;
    let dateStart = new Date(req.params.dateStart)
    let dateEnd = new Date(req.params.dateEnd)
    let startStamp = dateStart.getTime()
    let endStamp = dateEnd.getTime()
    try {
        const tasks = await UserModel.aggregate([
            {
              $match: {
                '_id': new mongoose.Types.ObjectId(user),
              }
            }, {
              $lookup: {
                'from': 'protorecords', 
                'localField': '_id', 
                'foreignField': 'user', 
                'as': 'result'
              }
            }, {
              $unwind: '$result'
            }, {
              $match: {
                'result.typeOfRecord': type, 
                'result.dailyRecord.genre': genre, 
                'result.dailyRecord.unit': 'hour'
              }
            }, {
              $addFields: {
                'convertedDuration': {
                  '$convert': {
                    'input': '$result.dailyRecord.duration', 
                    'to': 'double'
                  }
                }
              }
            }, {
              '$match': {
                'result.dailyRecord.date': {
                  '$gte': startStamp, 
                  '$lte': endStamp
                }
              }
            },{
              $project: {
                'result': 1, 
                'convertedDuration': 1, 
                'totalTime': {
                  '$sum': [
                    '$convertedDuration'
                  ]
                }
              }
            }, {
              $group: {
                '_id': '$_id', 
                'totalTime': {
                  '$sum': '$convertedDuration'
                }, 
                'result': {
                  '$push': '$result'
                }
              }
            }
          ]);
        res.status(200).json(tasks);
    }
    catch (e: any) { console.log(e) }
};

export const getRecordsResultByGenreAndMinute= async (req: express.Request, res: express.Response) => {
    const user:Types.ObjectId | any = req.query.userId;
    const type:string = req.params.typeOfRecord;
    const genre:string = req.params.genre;
    let dateStart = new Date(req.params.dateStart)
    let dateEnd = new Date(req.params.dateEnd)
    let startStamp = dateStart.getTime()
    let endStamp = dateEnd.getTime()
    try {
        const tasks = await UserModel.aggregate([
            {
              '$match': {
                '_id': new mongoose.Types.ObjectId(user)
              }
            }, {
              '$lookup': {
                'from': 'protorecords', 
                'localField': '_id', 
                'foreignField': 'user', 
                'as': 'result'
              }
            }, {
              '$unwind': '$result'
            }, {
              '$match': {
                'result.typeOfRecord': type, 
                'result.dailyRecord.genre': genre, 
                'result.dailyRecord.unit': 'minute'
              }
            }, {
              '$addFields': {
                'convertedDuration': {
                  '$convert': {
                    'input': '$result.dailyRecord.duration', 
                    'to': 'double'
                  }
                }
              }
            },{
              '$match': {
                'result.dailyRecord.date': {
                  '$gte': startStamp, 
                  '$lte': endStamp
                }
              }
            }, {
              '$project': {
                'result': 1, 
                'convertedDuration': 1, 
                'totalTime': {
                  '$sum': [
                    '$convertedDuration'
                  ]
                },
                'convertedToHour':{
                  '$divide':[
                    '$totalTime',60
                  ]
                }
              }
            }, 
            {
              '$project': {
                'result': 1, 
                'convertedDuration': 1,
                'convertedToHour':{
                  '$divide':[
                    '$totalTime',60
                  ]
                }
              }
            },{
              '$group': {
                '_id': '$_id', 
                'totalTime': {
                  '$sum': '$convertedDuration'
                },
                'result': {
                  '$push': '$result'
                }
              }
            },{
              '$project': {
                '_id': 1, 
                'result': 1, 
                'totalTime': 1, 
                'convertedToHour': {
                  '$divide': [
                    '$totalTime', 60
                  ]
                }
              }
            }
          ]);
        res.status(200).json(tasks);
    }
    catch (e: any) { console.log(e) }
};