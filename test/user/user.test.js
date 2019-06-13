import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {userDetail, incorrectUserDetail, correctLoginDetail, incorrectLoginDetail} from '../db/dummy-db';


chai.use(chaiHttp);


describe('Test user signup', () => {
  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send(userDetail)
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
      .send(incorrectUserDetail[0])
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
      .post('/api/v1/auth/login')
      .set({
        'Content-type': 'application/json',
      })
      .send(correctLoginDetail[0])
      .end((err, res) => {
      	expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.equal(`Login Successful, Welcome ${res.body.data.firstName}`);
        done();
     });
    });
});

describe('Test user signup without details', () => {
    it('should return an error message', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badSignUpDetail[1])
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.be.an('object');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
          expect(res.body.error.firstName).to.equal('The firstName field is required.');
          expect(res.body.error.lastName).to.equal('The lastName field is required.');
          expect(res.body.error.email).to.equal('The Email field is required.');
          expect(res.body.error.address).to.equal('The address field is required.');
          expect(res.body.error.password).to.equal('The password field is required.');
          expect(res.body.error.confirmPassword).to
            .equal('The password confirmation field is required.');
          done();
        });
    });
  });

describe('Test user not signed up trying to login', () => {
      it('should return an error message if user attempts to login and  is not signed up', (done) => {
        chai
          .request(app)
          .post('api/v1/auth/login')
          .send(incorrectLoginDetail[0])
          .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.be.an('object')
          expect(res.body.error).to.equal(403);
          expect(res.body.error).to.equal('Invalid username or password');
          done();
          });
      });
    });

describe('Test Signed up user providing empty email', () => {
      it('should return an error message', (done) => {
        chai
          .request(app)
          .post(`api/v1/auth/login`)
          .send(incorrectLoginDetail[2])
          .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.be.an('object')
          expect(res.body.error).to.equal(400);
          expect(res.body.status).to.have.property('email');
          expect(res.body.status).to.equal(400);
          expect(res.body.error.email).to.equal('The email field is required.');
          done();
          });
      });
    });
    describe('Test Signed up user providing wrong password', () => {
      it('should return status code 403 and send an error message', (done) => {
        chai
          .request(app)
          .post(`api/v1/auth/login`)
          .send(incorrectLoginDetail[1])
          .end((err, res) => {

          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.equal(400);
          expect(res.body.status).to.equal(403);
          expect(res.body.error).to.equal('Invalid username or password');
          done();
          });
      });
    });