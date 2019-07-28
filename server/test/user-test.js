 import chai, { assert, expect } from 'chai';
 import chaiHttp from 'chai-http';
 import dotenv from 'dotenv';
 import jwt from 'jsonwebtoken';
 import app from '../app'; 
 import pool from '../migration/queries';
 import { createTables, dropTables, users_seed,
        cars_seed, flags_seed, orders_seed } from '../migration/createTable';

 dotenv.config();
 chai.use(chaiHttp);

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJEb24iLCJpYXQiOjE1NjM5OTY1MDAsImV4cCI6MTU2NDYwMTMwMH0.SMCMg903d1SDuxRTYBhTWL4KPdxap__UaLUPtisOp3g'; 

 before('Create Tables', async () => {
    await pool.query(createTables).then(res => res).catch((err) => { console.log(err); });
    await pool.query(users_seed).then(res => res).catch((err) => { console.log(err); });
    await pool.query(cars_seed).then(res => res).catch((err) => { console.log(err); });
    await pool.query(flags_seed).then(res => res).catch((err) => { console.log(err); });
    await pool.query(orders_seed).then(res => res).catch((err) => { console.log(err); });
 });

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
 	    email: '',
 	    password: '936379JUI', 
 	    address: 'R280 wood west park, Milwaukee, USA',
 	    confirmed_password: '936379JUI',
 	    is_admin: false,
 	};

 	const aUser = {
 		first_name: 'limmy', 
 	    last_name: 'lingo', 
 	    email: 'limmy@gmail.com',
 	    password: '333NLSSSHHH', 
 	    address: '4121 Hillhamton, Boston, USA',
 	    confirmed_password: '333NLSSSHHH',
 	    is_admin: false,
 	};

 	const anUser = {
 		first_name: 'Bammy', 
 	    last_name: 'Dongodongodongodongodongodongodongodongodongo', 
 	    email: 'bammy@gmail.com',
 	    password: '333BSSSHHH', 
 	    address: '3700 Pillhamton, Boston, USA',
 	    confirmed_password: '333BSSSHHH',
 	    is_admin: false,
 	};

 	const badEmailUser = {
 		first_name: 'Gammy', 
 	    last_name: 'Gongo', 
 	    email: 'gammygammygammygammygammygammygammygammy@gmail.com',
 	    password: '333GSSSHHH', 
 	    address: '3800 Pillhamton, Boston, USA',
 	    confirmed_password: '333GSSSHHH',
 	    is_admin: false,
 	};

 	const badPassUser = {
 		first_name: 'Pammy', 
 	    last_name: 'Pongo', 
 	    email: 'pammy@gmail.com',
 	    password: '333PSS', 
 	    address: '3900 Pillhamton, Boston, USA',
 	    confirmed_password: '333PSS',
 	    is_admin: false,
 	};

 	const badManUser = {
 		first_name: 'Mammy', 
 	    last_name: 'Mongo', 
 	    email: 'mammy@gmail.com',
 	    password: '333MSSSHHH', 
 	    address: '3900 Pillhamton, Boston, USA',
 	    confirmed_password: '333MSS',
 	    is_admin: false,
 	};

 	describe('user can sign up', () =>{
<<<<<<< HEAD
 
=======

>>>>>>> ft-posstgresql-endpoints-test-#167553344
 		it('should return 400 error if user is already signed up',  (done) =>{
 		chai.request(app).post('/api/v1/auth/signup').set('authorization', token).send(myUser).then((res) => {
 			expect(res.status).to.eq(400);
 			expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.eq('User Email already exists');
            done();
            });
 		});
 		it('should return 400 error if user does not fill all required fields',  (done) =>{
 		chai.request(app).post('/api/v1/auth/signup').set('authorization', token).send(ourUser).then((res) => {
 			expect(res.status).to.eq(400);
 			expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.eq('Email address is required');
            done();address
            });
 		});
 		it('should return error if password is less than 8 characters', (done) => {
 		chai.request(app).post('/api/v1/auth/signup').set('authorization', token).send(badPassUser).then((res) => {
 			expect(res.status).to.eq(400);
 			expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.eq('Password cannot be less than 8 characters');
            done();
            });
 		});
 		it('should return error if last_name or first_name is more than 30 characters', (done) => {
 		chai.request(app).post('/api/v1/auth/signup').set('authorization', token).send(anUser).then((res) => {
 			expect(res.status).to.eq(400);
 			expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.eq('Ensure password is atleast 8 characters, name and email not more than 30 characters');
            done();
            });
 		});
 		it('should return error if email is more than 30 characters', (done) => {
 		chai.request(app).post('/api/v1/auth/signup').set('authorization', token).send(badEmailUser).then((res) => {
 			expect(res.status).to.eq(400);
 			expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.eq('Ensure password is atleast 8 characters, name and email not more than 30 characters');
            done();
            });
 		});
 		it('should return error if password is not deeply equal to confirmed_password', (done) => {
 		chai.request(app).post('/api/v1/auth/signup').set('authorization', token).send(badManUser).then((res) => {
 			expect(res.status).to.eq(400);
 			expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.eq('Ensure confirmed_password is same as password');
            done();
            });
 		});
 	});
 	describe('User Signin', () => {
    it('should login a user and set token in the header', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin').send(aUser);
      expect(res.status).to.eq(200);
      expect(res).to.have.header('authorization');

    });

    it('should return error 404 if user email is not found', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin').send(badManUser);
      expect(res.status).to.eq(404);
      expect(res.body.error).to.eq('Email not found');
    });

    it('should return error 401 if password is incorrect or not stated', async () => {
      const res = await chai.request(app).post('/api/v1/auth/signin')
      .send({ 
      	email: 'tammy@gmail.com',
 	    password: '333ESS7HHH', 
 	  });
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq('Password is incorrect');
    });
  });

 	describe('user can change password', () =>{
    it('should return 400 if current password is not supplied', async () => {
      const res = await chai.request(app).patch('/api/v1/user').set('authorization', token)
      .send({ newPassword: 'newpassword' });
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq('Fill the required fields');
    });
 	});
});