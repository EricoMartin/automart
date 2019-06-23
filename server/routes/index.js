import { Router } from 'express';
import AuthRouter from './authRouter';
import carController from '../controllers/cars';
import userController from '../controllers/users';
import Flag from '../controllers/flags';
import orderController from '../controllers/order';
import checkAuth from '../middlewares/auth';
import validate from '../middlewares/index';
import jwt from 'jsonwebtoken';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bcrypt from 'bcryptjs';
import multipart from 'connect-multiparty';

const multiparty = multipart();

const route = Router();

const options = {
  swaggerDefinition: {
    
    info: {
      title: 'Automart API',
      version: '1.0.0',
      description: 'Test Automart API Endpoints',
    },
  },
  
  apis: ['./routes/index.js'],
};

const specs = swaggerJsdoc(options);

route.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

route.use('/authrouter', AuthRouter);

//user signup, singin and admin signup
/**
 * @swagger
 * /users:
 *    post:
 *      description: sign up new users
 */
route.post('/auth/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
/**
 * @swagger
 * /users:
 *    post:
 *      description: sign up new admin user
 */
route.post('/auth/admin/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
/**
 * @swagger
 * /users
 *    post:
 *      description: user signin 
 */
route.post('/auth/signin', validate.Email, userController.login);
/**
 * @swagger
 * /users:
 *    get:
 *      description: user signout 
 */

route.get('/auth/logout', validate.Email, userController.logout);

/**
 * @swagger
 * /users:
 *    patch:
 *      description: change a user password
 */
route.patch('/user', validate.Email, userController.changeUserPassword);




//car routes
/**
 * @swagger
 * /cars:
 *    post:
 *      description: This should post a new car ad
 */
route.post('/car', checkAuth, multiparty, validate.Car, carController.createAd);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: returns a specific car ad based on search criteria
 */
route.get('/car/:id', checkAuth, carController.findSpecificCar);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: return cars based on manufacturers 
 */
route.get('/car/manufacturer/:manufacturer', checkAuth, validate.Car, carController.find);
/**
 * @swagger
 * /cars:
 *    get:
 *      description: return cars based on its bodytype
 */

route.get('/car/bodytype/:body_type', checkAuth, carController.find);

/**
 * @swagger
 * /cars:
 *    get:
 *      description: return cars based on its state i.e New / Used
 */
route.get('/car/state/:state', checkAuth,  carController.find);


/**
 * @swagger
 * /cars:
 *    get:
 *      description: should update the car status sold, pending or available
 */
route.patch('/car/:id/status', checkAuth, carController.updateStatus);
/**
 * @swagger
 * /cars:
 *    patch:
 *      description: should update the car ad price
 */
route.patch('/car/:id/price', checkAuth, carController.updateCarPrice);
/**
 * @swagger
 * /cars:
 *    patch:
 *      description: should return different cars based on search query
 */
route.delete('/car/:id', checkAuth, carController.deleteAd);
/**
 * @swagger
 * /cars:
 *    delete:
 *      description: should delete a car
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

route.get('/', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to Automart API',
}));

route.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Not Found',
}));


export default route;
