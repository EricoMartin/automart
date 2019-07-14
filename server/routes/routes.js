import { Router } from 'express';
import carController from '../controllers/car';
import userController from '../controllers/user';
import Flag from '../controllers/flag';
import orderController from '../controllers/order';
import validate from '../middlewares/index';
import verifyAuth from '../middlewares/auth';


const route = Router();

//USER ENDPOINTS

//user signup
route.post('/auth/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
//user signin
route.post('/auth/signin', verifyAuth, validate.Email, validate.PassWord, userController.login);
//user signout
route.get('/auth/signout', userController.logout);
// change password
route.patch('/user', verifyAuth, userController.changePassword);

//ADMIN USER

//admin user signup
route.post('/auth/admin/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
//admin user get all users
route.get('/auth/admin/users', verifyAuth, userController.getAll);
//admin user get all cars
route.get('/auth/admin/cars', verifyAuth, carController.getAllCars);
//get all flags
route.get('/auth/admin/flags', verifyAuth, Flag.getAllFlags);
// update a flag
route.patch('/flag/:flag-id', verifyAuth, Flag.updateFlagStatus);
//admin user delete flag
route.delete('/auth/admin/flags/:flag-id', verifyAuth, Flag.deleteFlag);
//delete a car ad
route.delete('/auth/admin/cars/:carId', verifyAuth, carController.deleteCar);



//CAR ENDPOINTS

//view all unsold cars within price range
route.get('/car/price/', carController.getCarPriceRange);
//seller post car sale ad
route.post('/car', verifyAuth, validate.Car, carController.createAd);
//mark posted car ad as sold
route.patch('/car/:id/status', verifyAuth, validate.Email, validate.PassWord, validate.Order, carController.updateCarAd);
//update the car price
route.patch('/car/:id/price', verifyAuth, validate.Email, validate.PassWord, validate.Order, carController.updateCarAd);
//get a specific car
route.get('/car/:id', carController.findCarAd);
//view all unsold cars
route.get('/cars/status/available', carController.getAllUnsoldCars);
//view all cars of a state (new or used)
route.get('/car/state/:state', carController.getCarByProp);
//view all car ads whether sold or available
route.get('/cars', carController.getAllCars);
//view all cars of a specific manufacturer
route.get('/car/manufacturer/:manufacturer', carController.getCarByProp);
// view all cars of a specific bodytype
route.get('/car/bodytype/:body_type', carController.getCarByProp);




//ORDER ENDPOINTS

//buyer post car purchase order
route.post('/order', verifyAuth, validate.CarId, validate.Order, orderController.createOrder);
//update price of purchase order
route.patch('/order', verifyAuth, validate.NewPrice, orderController.updatePrice);
// view an order detail
route.get('/orders/:orderId', verifyAuth, orderController.getAnOrder);
// delete order seller and admin can delete
route.delete('/orders/:orderId', verifyAuth, orderController.deleteAnOrder);

//FLAG ENDPOINTS

//flag an ad
route.post('/flag/report', verifyAuth, validate.CarId, validate.Flag, Flag.createFlag);


//automart root route
route.get('/', (req, res) =>{
	res.send({
		status: 'Successful',
		data:'Welcome to Automart API'
	});
});

export default route;