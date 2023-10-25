import express from 'express';
import { get } from 'lodash';
const jwt = require("jsonwebtoken");

export function verify(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err:any, user:any) => {
      if (err) res.status(403).json("Token is not valid!")
      else if (token === null) return res.sendStatus(401);
      // req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}


export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { userId } = req.query;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== userId) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}