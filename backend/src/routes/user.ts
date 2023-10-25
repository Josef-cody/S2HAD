import express from 'express';
// @ts-ignore
import { getUsers,getUserById,deleteUserById,updateUserById } from '../controllers/user_controller';
import { verify,} from '../middlewares/auth';

export default (router: express.Router) => {
    router.get('/users', verify, getUsers);
    router.get('/users', verify, getUserById);
    router.delete('/users/delete/:id', verify, deleteUserById);
    router.patch('/users/update', verify, updateUserById);
};