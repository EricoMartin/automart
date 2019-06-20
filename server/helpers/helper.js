import userDetail from '../test/dummy-db';
import carDetail from '../test/dummy-db';
import carOrder from '../test/dummy-db';
import fladOrder from '../test/dummy-db';
import jwt from 'jsonwebtoken';
import APIError from './ErrorClass';
import dotenv from 'dotenv';

dotenv.config();
let apiError = new APIError();
const helper = {
	ValidateEmail : (email) =>{
		if(!email){
			apiError(404, 'Email Not Found');
		} else{
			let result = false;
			if(userDetail.email === email){
				result = true;
			} else{
				result = false;
			}
		}
		return result;
	},

	ValidateSignUp : (data, callback) => {
		 let statusCode = 200;
		 let errMsg = '';

		  if(!(userDetail.firstName)){
		  	apiError(400, 'firstName is not a valid input');
		  }
		   if(!(userDetail.lastName)){
		  	apiError(400, 'lastName is not a valid input');
		  }
		   if(!(userDetail.email)){
		  	apiError(400, 'email is not a valid input');
		  }
		   if(!(userDetail.password)){
		  	apiError(400, 'password is a required input');
		  }
		   if(!(userDetail.password === userDetail.confirmPassword)){
		  	apiError(400, 'passwords do not match');
		  }
		  callback(stausCode, errMsg);
	},

	validateUserDetails: (data, callback) => {
		 let statusCode = 200;
		 let errMsg = '';

		 if (!(/^[a-zA-Z -]+$/.test(userDetail.firstName.trim()))) {
      	 apiError(400, 'firstName must be a string');
    	 }
   		 if (!(/^[a-zA-Z -]+$/.test(userDetail.lastName.trim()))) {
     	 apiError(400, 'lastName must be a string');
   		 }
   		 const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if (!(regex.test(userDetail.email.trim()))) {
         apiError(400, 'emailAddress must be an email');
    	 }
    	 if (userDetail.password.trim() === '' || typeof userDetail.password !== 'string') {
      	 apiError(400, 'password must be a string');
    	 }
    	 callback(statusCode, errMsg);
	},

	ValidateLogIn: (data, callback) => {
		 let statusCode = 200;
		 let errMsg = '';
		  if (!(userDetail.email)) {
         apiError(400, 'a valid email address is required');
         }
         if (!(userDetail.password)) {
         apiError(400, 'your password is required');
         }
         if(userDetail.password.length < 5){
         	apiError(422, 'password entry is invalid, enter at least 6 characters')
         }
         callback(statusCode, errMsg);
	},
	validateCarDetails: (data, callback) => {
		 let statusCode = 200;
		 let errMsg = '';

         if(!carDetail.id){
         	apiError(400, 'user id must be a number');
         }
         if(!carDetail.car_id){
         	apiError(400, 'car id must be a number');
         }
         if(!carDetail.created_on){
         	apiError(400, 'date must be a date');
         }
         if(!carDetail.status){
         	apiError(400, 'status is required');
         }
          if(!carDetail.price){
          	apiError(400, 'price is required');
         }
          if(!carDetail.price_offered){
          	apiError(400, 'price-offered is required');
         }
         callback(statusCode, errMsg);
	},

	validateOrderDetails: (data,callback) => {
		 let statusCode = 200;
		 let errMsg = '';

         if(!(carOrder.id)){
         	apiError(400, 'user id must be a number');
         }
         if(!(carOrder.email)){
         	apiError(400, 'email is required');
         }
         if(!carOrder.created_on){
         	apiError(400, 'date must be a date');
         }
         if(!carOrder.manufacturer){
         	apiError(400, 'manufacturer is required');
         }
         if(!carOrder.status){
         	apiError(400, 'status is required');
         }
          if(!carOrder.price){
          	apiError(400, 'price is required');
         }
          if(!carOrderdata.state){
          	apiError(400, 'state of the car is required');
         }
         if(!carOrder.body_type){
          	apiError(400, 'body-type of the car is required');
         }

         callback(statusCode, errMsg);
	},
	validateFlag: (data,callback) => {
		 let statusCode = 200;
		 let errMsg = '';

		 if(!flagOrder.id){
		 	apiError(400, 'id is required')
		 }
		 if(!flagOrder.car_id){
		 	apiError(400, 'car_id is required')
		 }
		 if(!flagOrder.reason){
		 	apiError(400, 'reason is required')
		 }
		 if(!flagOrder.description){
		 	apiError(400, 'description is required')
		 }
		  callback(statusCode, errMsg);
	}
};

export default helper;