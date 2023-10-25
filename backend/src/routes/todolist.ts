import express from 'express';
// @ts-ignore
import { getAllTask,createTask,getTaskById,deleteTaskById,updateTaskById,deleteAllTask } from '../controllers/todolist_controller';
import { verify,} from '../middlewares/auth';

export default (router: express.Router) => {
    router.get('/todolist', verify, getAllTask);
    router.get('/todolist/:id', verify, getTaskById);
    router.post('/todolist', verify, createTask);
    router.delete('/todolist/delete/:id', verify, deleteTaskById);
    router.delete('/todolist/delete', verify, deleteAllTask);
    router.patch('/todolist/update/:id', verify, updateTaskById);
};