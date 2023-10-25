import express from 'express';
// @ts-ignore
import {UserModel} from '../models/users';

export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    }
    catch (e: any) { console.log(e) }
};

export const getUserById = async (req: express.Request, res: express.Response) => {
    const id = req.query.userId;
    try {
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    }
    catch (e: any) { console.log(e) }};



export const deleteUserById = async (req: express.Request, res: express.Response) =>{ 
    const id:string = req.params.id
    await UserModel.findByIdAndDelete(id);
    res.json({msg:"user deleted"})
};

type loginReq = {
    password:String;
    email: String;
    username?:String;
    profilePic?:String;
  }
export const updateUserById = async (req: express.Request, res: express.Response) => {
    const id = req.query.userId; 
    const {email,username}:loginReq = req.body;
    const newUpdate = await UserModel.findByIdAndUpdate(id, {
            "email":email,
            "username":username,
    },{new:true});
    res.status(200).json({newUpdate,msg:'User updated, please login again'})
}
