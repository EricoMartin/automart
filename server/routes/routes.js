import { Router } from 'express';
import carController from '../controllers/car';
import userController from '../controllers/user';
import Flag from '../controllers/flag';
import orderController from '../controllers/order';
import validate from '../middlewares/index';
import verifyAuth from '../middlewares/auth';


const route = Router();

//USER ENDPOINTS

//user signup ////
route.post('/auth/signup', validate.Name, validate.Email, validate.PassWord, userController.createUser);
//user signin ////
route.post('/auth/signin', validate.Email, validate.PassWord, userController.login);
//user signout
route.get('/auth/signout', userController.logout);
// change password
route.patch('/user',  userController.changePassword);

//ADMIN USER

//admin user get all users
route.get('/user', userController.getAll);
//get all flags
route.get('/flag', Flag.getAllFlags);
// update a flag
route.patch('/flag/:flag_id', Flag.updateFlagStatus);
//admin user delete flag
route.delete('/flag/:flag_id', Flag.deleteFlag);
//delete a car ad
route.delete('/car/:car_id', verifyAuth, carController.deleteCar);



//CAR ENDPOINTS

//view all unsold cars within price range ////
route.get('/car/price/', carController.getCarPriceRange);
//seller post car sale ad ////
route.post('/car', verifyAuth, validate.Car, carController.createAd);
//mark posted car ad as sold
route.patch('/car/:car_id/status', verifyAuth, carController.updateCarAd);
//update the car price
route.patch('/car/:car_id/price', verifyAuth, carController.updateCarAd);
//get a specific car
route.get('/car/:car_id', carController.findCarAd);
//view all unsold cars
route.get('/car/status/available', carController.getAllUnsoldCars);
//view all cars of a state (new or used)
route.get('/car/state/:state', carController.getCarByProp);
//view all car ads whether sold or available ////
route.get('/car', verifyAuth, carController.getAllCars);
//view all cars of a specific manufacturer
route.get('/car/manufacturer/:manufacturer',verifyAuth, carController.getCarByProp);
// view all cars of a specific bodytype
route.get('/car/bodytype/:body_type', verifyAuth, carController.getCarByProp);




//ORDER ENDPOINTS

//buyer post car purchase order
route.post('/order', verifyAuth, validate.CarId, validate.Email, validate.Order, orderController.createOrder);

route.get('/order', orderController.getAllOrders);
//update price of purchase order
route.patch('/order/:order_id/price', validate.NewPrice, orderController.updatePrice);
// view an order detail
route.get('/order/:order_id', orderController.getAnOrder);
// delete order seller and admin can delete
route.delete('/order/:order_id', orderController.deleteAnOrder);

//FLAG ENDPOINTS

//flag an ad
route.post('/flag', validate.CarId, validate.Flag, Flag.createFlag);


//automart root route
route.get('/', (req, res) =>{
	res.send({
		status: 'Successful',
		data:'Welcome to Automart API'
	});
});

export default route;