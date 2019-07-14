import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../models/user';
import usersData from './mock_db/users';

const { expect } = chai;
const signupUrl = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/signin';


chai.use(chaiHttp);
describe('User', () => {
  const usersArray = () => {
    UserModel.users = usersData;
  };
  describe('User create', () => {
    it('should return a new user with the supplied properties', (done) => {
      const userDetails = {
        email: 'jason@gmail.com',
        firstName: 'Jason',
        lastName: 'Trello',
        password: 'password',
        confirmedPassword: 'password',
        address: '11, address street',
        status: 'registered',
      };
      chai.request(app).post('/api/v1/auth/signup').send(userDetails).end((err, res) => {
        expect(res.status).to.eq(201);
        expect(res.body.data.email).to.eq(userDetails.email);
        expect(res.body.data.address).to.eq(userDetails.address);
        done();
      });
    });

    it('should return error if password and its confirmation does not match', (done) => {
      const data = {
        email: 'James@gmail.com',
        firstName: 'Philip',
        lastName: 'Balarina',
        password: 'power',
        address: 'my address',
        status: 'registered',
        confirmedPassword: 'password',
      };
      chai.request(app).post('/api/v1/auth/signup').send(data).end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Password and confirmation does not match');
        done();
      });
    });

    it('should return error if all required fields are not supplied', (done) => {
      const data = {
        email: 'martin@gmail.com',
        firstName: 'Martin',
        password: 'password',
        address: 'my address',
        status: 'registered',
        confirmedPassword: 'password',
      };
      chai.request(app).post('/api/v1/auth/signup').send(data).end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Fill all required fields with a valid email address');
        done();
      });
    });

    it('should return error if invalid email address is supplied', (done) => {
      const data = {
        email: 'abdhaj.gmail.com',
        firstName: 'Abdallah',
        lastName: 'Hajj',
        password: 'password',
        confirmedPassword: 'password',
        status: 'registered',
        address: 'my address',
      };
      chai.request(app).post('/api/v1/auth/signup').send(data).end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Fill all required fields with a valid email address');
        done();
      });
    });

    it('should return error if length of password is less than 8 characters', (done) => {
      const data = {
        email: 'chris@gmail.com',
        firstName: 'Humphrey',
        lastName: 'Chris',
        password: 'pass',
        address: 'my address',
        status: 'registered',
        confirmedPassword: 'pass',
      };
      chai.request(app).post('/api/v1/auth/signup').send(data).end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Ensure password is atleast 6 characters, name and email not more than 30 characters');
        done();
      });
    });
      });
    });
