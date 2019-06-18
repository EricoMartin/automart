import { Router } from 'express';
import AuthRouter from './authrouter';
import carController from '../controllers/cars';
import userController from '../controllers/users';
import Flag from '../controllers/flags';
import orderController from '../controllers/order';
import checkAuth from '../middlewares/auth';
import validate from '../middlewares/index';
import jwt from 'jsonwebtoken';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const route = Router();

const options = {
  swaggerDefinition: {
    
    info: {
      title: 'Automart API',
      version: '1.0.0',
      description: 'Test Automart API Endpoints',
    },
  },
  
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

route.use('/authrouter', AuthRouter);

//user signup, singin and admin signup
/**
 * @swagger
 * /users:
 *    post:
 *      description: This should sign up new users
 */
route.post('/auth/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
/**
 * @swagger
 * /users:
 *    post:
 *      description: This should sign up a new admin user
 */
route.post('/auth/admin/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
/**
 * @swagger
 * /users:
 *    post:
 *      description: This should signin users
 */
route.post('/auth/signin', validate.Email, userController.login);


//car routes
/**
 * @swagger
 * /cars:
 *    post:
 *      description: This should post a new car ad
 */
route.post('/car', checkAuth, validate.Car, carController.createAd);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: This should return a specific car
 */
route.get('/car/:id', checkAuth, carController.findSpecificCar);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: This should return different cars based on search query
 */
route.get('/car/', checkAuth, carController.find);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: This should update the car status sold, pending or avialbel
 */
route.patch('/car/:id/status', checkAuth, validate.Status, carController.updateStatus);
/**
 * @swagger
 * /cars:
 *    patch:
 *      description: This should update the car ad price
 */
route.patch('/car/:id/price', checkAuth, validate.Price, carController.updateCarPrice);
/**
 * @swagger
 * /cars:
 *    patch:
 *      description: This should return different cars based on search query
 */
route.delete('/car/:id', checkAuth, carController.deleteAd);
/**
 * @swagger
 * /cars:
 *    delete:
 *      description: This should delete a car
 */

//flag routes

/**
 * @swagger
 * /flags:
 *    post:
 *      description: This should post a reported fraudulent ad
 */
route.post('/flag/report', checkAuth, validate.CarId, validate.Flag, Flag.createFlag);

//order routes

/**
 * @swagger
 * /orders:
 *    post:
 *      description: This should create a new purchase order
 */
route.post('/order', checkAuth, validate.CarId, validate.Order, orderController.makeOrder);
/**
 * @swagger
 * /orders:
 *    post:
 *      description: This should update the priceof a purchase order
 */
route.patch('/order/:id/price', checkAuth, validate.NewPrice, orderController.updateOrder);


export default route;
