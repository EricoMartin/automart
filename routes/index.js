import { Router } from 'express';
import AuthRouter from './authrouter';
import carController from '../controllers/cars';
import userController from '../controllers/users';
import Flag from '../controllers/flags';
import orderController from '../controllers/order';
import checkAuth from '../middlewares/auth';
import validate from '../middlewares/index';
import jwt from 'jsonwebtoken';

const route = Router();

route.use('/authrouter', AuthRouter);

//user signup, singin and admin signup
route.post('/auth/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
route.post('/auth/admin/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
route.post('/auth/signin', validate.Email, userController.login);


//car routes
route.post('/car', checkAuth, validate.Car, carController.createAd);
route.get('/car/:id', checkAuth, carController.findSpecificCar);
route.get('/car/', checkAuth, carController.find);
route.patch('/car/:id/status', checkAuth, validate.Status, carController.updateStatus);
route.patch('/car/:id/price', checkAuth, validate.Price, carController.updateCarPrice);
route.delete('/car/:id', checkAuth, carController.deleteAd);

//flag routes
route.post('/flag/report', checkAuth, validate.CarId, validate.Flag, Flag.createFlag);

//order routes
route.post('/order', checkAuth, validate.CarId, validate.Order, orderController.makeOrder);
route.patch('/order/:id/price', checkAuth, validate.NewPrice, orderController.updateOrder);


export default route;
