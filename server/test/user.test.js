import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
//import {userDetail, incorrectUserDetail, correctLoginDetail, incorrectLoginDetail} from './dummy-db';
import user from './users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


chai.use(chaiHttp);


describe('Test user signup', () => {
  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstName: 'Jason',
        lastName: 'Trello',
        password: '555SSS777',
        email: 'jason@gmail.com',
        address: '321 upper crest park, New York, USA'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.an('number');
        expect(res.body.data.first_name).to.be.a('string');
        expect(res.body.data.last_name).to.be.a('string');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isString(res.body.data.token, 'Token is not a string');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.firstName, 'First name is not a string');
        assert.isString(res.body.data.lastName, 'Last name is not a string');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
	});
});

describe('Test existing registered user', () => {
  it('should create an error when email exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstName: 'Jason',
        lastName: 'Trello',
        password: '555SSS777',
        email: 'jason@gmail.com',
        address: '321 upper crest park, New York, USA'
      })
      .end((err, res) => {
      	expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.be.an('object');
         expect(res.body.error).to.equal('Email already exists');
         assert.isNotNull(err);
         done();
     });
    });
});

describe('Test user Login', () => {
  it('should perform a user login when registered email exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        
        password: '555SSS777',
        email: 'jason@gmail.com',
        
      })
      .end((err, res) => {
      	expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.equal('email exists');
        assert.isNotNull(err);
        done();
     });
    });
});

describe('Test for sign up endpoint', () => {
  it('should create an admin', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/admin/signup')
      .set({
        Accept: 'application/json',
      })
      .send({
        firstname: 'Jason',
        lastname: 'Trello',
        password: '555SSS777',
        address: '321, upper crest park, New York, USA',
        email: 'jason@gmail.com',
        isAdmin: 'true'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.an('number');
        expect(res.body.data.first_name).to.be.a('string');
        expect(res.body.data.last_name).to.be.a('string');
        expect(res.body.data.is_admin).to.be.a('boolean');
        expect(res.body.data.is_admin).to.equal(true);
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isString(res.body.data.token, 'Token is not a string');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.first_name, 'Firstname is not a string');
        assert.isString(res.body.data.last_name, 'Last name is not a string');
        assert.isBoolean(res.body.data.is_admin, 'isAdmin type is not boolean');
        assert.strictEqual(res.body.data.is_admin, true, 'isAdmin is not true');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
 it('Should return an error message if firstname is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
      .send({
        firstName: '',
        lastName: 'Trello',
        password: '555SSS777',
        email: 'jason@gmail.com',
        address: '321 upper crest park, New York, USA'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name fields cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name fields cannot be empty',
          'Expect error to be Name fields cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if name contains a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        Accept: 'application/json',
      })
      .send({
        firstName: 'Jason25',
        lastName: 'Trello',
        password: '555SSS777',
        email: 'jason@gmail.com',
        address: '321 upper crest park, New York, USA'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name cannot contain number(s)');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name cannot contain number(s)',
          'Expect error to be Name cannot contain number(s)');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if firstname is less than 2 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
      .send({
        firstName: 'o',
        lastName: 'Trello',
        password: '555SSS777',
        email: 'jason@gmail.com',
        address: '321 upper crest park, New York, USA'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name fields cannot be less than 2 characters');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name fields cannot be less than 2 characters',
          'Expect error to be Name fields cannot be less than 2 characters');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if lastname is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
      
      .field('firstName', 'Jason')
      .field('lastName', '')
      .field(' email', 'jason@gmail.com')
      .field('address', '321 upper crest park, New York, USA')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name fields cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name fields cannot be empty',
          'Expect error to be Name fields cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if lastname is less than 2 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
      .send({
        firstName: 'Jason',
        lastName: 'T',
        password: '555SSS777',
        email: 'jason@gmail.com',
        address: '321 upper crest park, New York, USA'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name fields cannot be less than 2 characters');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name fields cannot be less than 2 characters',
          'Expect error to be Name fields cannot be less than 2 characters');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if password is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
      .send({
        firstName: 'Jason',
        lastName: 'Trello',
        password: '',
        email: 'jason@gmail.com',
        address: '321 upper crest park, New York, USA'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Password field cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Password field cannot be empty',
          'Expect error to be Password field cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if password is less than 8 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
      .send({
        firstName: 'Jason',
        lastName: 'Trello',
        password: '555SS',
        email: 'jason@gmail.com',
        address: '321 upper crest park, New York, USA'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equals(400);
        expect(res.body.error).to.equals('Password cannot be less than 8 characters');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Password cannot be less than 8 characters',
          'Expect error to be Password field cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if email is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
        .field('firstName', 'Jason')
      .field('lastName', 'Trello')
      .field(' email', 'jasoncom')
      .field('address', '321 upper crest park, New York, USA')
      .field(' password', '555SSS777')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Please provide a valid email address');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Please provide a valid email address',
          'Expect error to be Please provide a valid email address');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});

describe('Test sign in endpoint', () => {
  it('should log the user in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set({
        Accept: 'application/json',
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg'
      })
      .send({
       
        password: '555SSS777',
        email: 'jason@gmail.com',
        
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.an('number');
        expect(res.body.data.first_name).to.be.a('string');
        expect(res.body.data.first_name).to.be.a('string');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.strictEqual(res.body.status, 200, 'Status is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isString(res.body.data.token, 'Token is not a string');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.first_name, 'Firstname is not a string');
        assert.isString(res.body.data.first_name, 'Last name is not a string');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('should return an error if email is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
      .send({
        password: '555SSS777',
        email: 'jasc@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Please provide a valid email address');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Please provide a valid email address',
          'Expect error to be Please provide a valid email address');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('should return an error if password is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      })
      .send({
        password: '',
        email: 'jason@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Please provide a valid email address');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Please provide a valid email address',
          'Expect error to be Please provide a valid email address');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});

