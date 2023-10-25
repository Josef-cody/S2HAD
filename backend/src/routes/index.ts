import express from 'express';

import users from './user';
import authentication from './authentication';
import record from './records';
import todolist from './todolist';

const router = express.Router();

export default (): express.Router => {
  users(router);
  authentication(router);
  record(router);
  todolist(router);
  return router;
};