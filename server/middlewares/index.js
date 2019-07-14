import validateName from './validateName';
import validateEmail from './validateEmail';
import validateCar from './validateCar';
import validateCarId from './validateCarId';
import validateOrder from './validateOrder';
import validateFlag from './validateFlag';
import validateNewPrice from './validateNewPrice';
import validatePassword from './validatePassword';


export default{
  Name: validateName,
  Email: validateEmail,
  PassWord: validatePassword,
  Flag: validateFlag,
  Car: validateCar,
  CarId: validateCarId,
  Order: validateOrder,
  NewPrice: validateNewPrice,

};
