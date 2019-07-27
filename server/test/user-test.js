 import chaiHttp from 'chai-http';
 import { assert, expect } from 'chai';
 import dotenv from 'dotenv';

 dotenv.config();
chai.use(chaiHttp);

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJEb24iLCJpYXQiOjE1NjM5OTY1MDAsImV4cCI6MTU2NDYwMTMwMH0.SMCMg903d1SDuxRTYBhTWL4KPdxap__UaLUPtisOp3g'; 


 describe(' User Endpoint Test', () => {
 	const myUser = {
 		first_name: 'Jason', 
 	    last_name: 'Trello', 
 	    email: 'jason@gmail.com', 
 	    password: '555SSS777', 
 	    address: '321 upper crest park, New York, USA',
 	    confirmed_password: '555SSS777',
 	    is_admin: true,
 	};

 	const ourUser = {
 		first_name: 'Dammy', 
 	    last_name: 'Gonzalez', 
 	    email: 'dammy@gmail.com',
 	    password: '936379JUI', 
 	    address: 'R280 wood west park, Milwaukee, USA',
 	    confirmed_password: '936379JUI',
 	    is_admin: false,
 	};

 	const aUser = {
 		first_name: 'Sammy', 
 	    last_name: 'Bongo', 
 	    email: 'sammy@gmail.com',
 	    password: '333SSSHHH', 
 	    address: '3600 Pillhamton, Boston, USA',
 	    confirmed_password: '333SSSHHH',
 	    is_admin: false,
 	};
 	describe('user can sign up' () =>{
 		chai.request(app).post('/api/v1/auth/signup').set('authorization', token).send(myUser).then((res) => {
 			expect(res.status).to.eq(201);
 			expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.an('object');
 		});
 	});
 	describe('user can sign in' () =>{
 		
 	});
 	describe('Get all users ' () =>{
 		
 	});
 	describe('user can change password' () =>{
 		
 	});
 });