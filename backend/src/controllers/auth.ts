import express from 'express';
// @ts-ignore
import {UserModel} from '../models/users';
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

type loginReq = {
  password:String;
  email: String;
  username?:String;
  profilePic?:String;
}
export const register = async ( req:express.Request, res:express.Response)=> {
    const { username, password, email, profilePic } = req.body;
    const newUser = new UserModel({
      username,
      email,
      profilePic,
      password: CryptoJS.AES.encrypt(password, process.env.TOKEN_SECRET).toString(),
    });
    try {
        const existUser = await UserModel.findOne({ email });
        if( existUser ){res.status(400).json({msg:'User exsite already!'})}
      else { const user = await newUser.save();
      res.status(200).json({msg:"User registed"})
    }
    } catch (err) {
      res.status(500).json(err);
    }
  };


export const login = async (req:express.Request,res:express.Response) => {
    const { password, email } :loginReq = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.json({ msg: "User not found!" });
      }
      if (user) {
        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.TOKEN_SECRET
        );
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== password) {
          res.status(401).json({ msg: "Wrong password or username" });
        } else {
          const accessToken = jwt.sign(
            { id: user._id,email:user.email,profilePic:user.profilePic,username:user.username },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          res.status(200).json(accessToken);
        }
      }
    })
    .catch((error) => res.json({ error: error.message }));
};