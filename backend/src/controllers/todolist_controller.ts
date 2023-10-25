import express from 'express';
import mongoose, { Date } from 'mongoose';
// @ts-ignore
import {TodoList} from '../models/todolist';

type taskTpes = {
    genre:string;
    type:string;
    title:string;
    status:boolean;
    deadline:Date;
    task:string;
    priority:number;
}
export const createTask = async ( req:express.Request, res:express.Response)=> {
    const user =req.query.userId;
    const {
        genre,
        type,
        title,
        status,
        deadline,
        task,
        priority
        } :taskTpes = req.body;
    //create a list object and save it to the database
    try{
        const list = new TodoList({
        user:user,
        type : type,
        genre : genre,
        title : title,
        status : status,
        deadline : deadline,
        task :task,
        priority : priority,
        });
        list.save()
        res.status(200).json(list)
    
    }
    catch(e:any){
        console.log(e)
    }
}

export const getAllTask = async (req: express.Request, res: express.Response) => {
    const user:string | any = req.query.userId;
    try {
        const tasks = await TodoList.find({user:user});
        res.status(200).json(tasks);
    }
    catch (e: any) { console.log(e) }
};

export const getTaskById = async (req: express.Request, res: express.Response) => {
    const _id = req.params.id
    try {
        const task = await TodoList.findById(_id);
        res.status(200).json(task);
    }
    catch (e: any) { console.log(e) }};



export const deleteTaskById = async (req: express.Request, res: express.Response) =>{ 
    const _id = req.params.id
    await TodoList.findByIdAndDelete(_id);
    res.json({msg:"Task deleted"})
};
export const deleteAllTask = async (req: express.Request, res: express.Response) =>{ 
    const userId = req.query.userId;
    await TodoList.deleteMany({ user: userId});
    res.json({msg:"All tasks deleted"})
};

export const updateTaskById = async (req: express.Request, res: express.Response) => {
    const _id = req.params.id;
    const {status,priority}:taskTpes= req.body;
    const newUpdate = await TodoList.findByIdAndUpdate(_id, {
        status : status,
        priority : priority
    },{new:true});
    res.status(200).json({newUpdate,msg: 'Record updated'})
}
