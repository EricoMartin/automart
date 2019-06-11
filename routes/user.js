import express from 'express';
import validate from '../middlewares/index';
import userController from '../controllers/users';

const Route = express.Router();


Route.post('/auth/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
Route.post('/auth/admin/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
Route.post('/auth/signin', validate.Email, userController.login);

export default Route;