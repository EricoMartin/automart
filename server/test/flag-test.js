/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import carsData from './mock_db/cars';
import app from '../app';
import CarModel from '../models/car';
import UserModel from '../models/user';
import FlagModel from '../models/flag';
import usersData from './mock_db/users';
import flagsData from './mock_db/flags';
import pool from '../migration/queries';


const { expect } = chai;
chai.use(chaiHttp);
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJsYW5pc3RlciIsImlhdCI6MTU2NDU5MDQyOCwiZXhwIjoxNTY1MTk1MjI4fQ.syLUmHaV_NFa2r0Irk6tNjGoJZ5W4K1TS1Q4a3k59p0';


describe('Flags controller', () => {
  describe('Create a flag', () => {
    it('should create a flag on an ad', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.is_admin = true;
      const data = {
        user_id: 3,
        car_id: 1,
        reason: 'Wrong Description',
        description: 'fake car description',

      };
      chai.request(app).post('/api/v1/flag').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('car_id');
          expect(res.body.data.reason).to.eq(data.reason);
          done();
        });
    });

    it('should return 400 error if car id is not stated', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.is_admin = false;
      const data = {
        user_id: user.id,
        car_id: '',
        reason: 'stolen',
        description: 'Bad description of the car ',

      };
      chai.request(app).post('/api/v1/flag').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.car_id).to.equal(undefined);
          expect(res.body.message).to.eq('car id must be a number');
          done();
        });
    });
    it('should return error 400 if reason is not stated', async () => {
      await pool.query(`INSERT INTO cars (manufacturer, model, price, state, status, year,created_on, body_type, owner, img) VALUES  ('Honda', 'Accord', 8000000, 'used', 'available',
      '2017-01-06', '2019-07-26', 'saloon' , 3, 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')`);

      const { rows } = await pool.query('SELECT car_id FROM cars');
      const { car_id } = rows[0];
      const newFlag = {
        user_id: 2,
        car_id,
        reason: '',
        description: 'fake and fraudulent car',
      };
      const res = await chai.request(app).post('/api/v1/flag').set('Authorization', token).send(newFlag);
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq('Reason field cannot be empty');
    });

    it('should return 400 error if user_id is not stated', async () => {
      chai.request(app).post('api/v1/app').set('Authorization', token).send(
        {
          user_id: '',
          car_id: 2,
          reason: 'stolen',
          description: 'Bad description of the car ',

        },
      )
        .then((res) => {
          expect(res.status).to.eq(400);
          expect(res.status.message).to.equal('All fields must be filled');
        });
    });

    it('should return 500 internal server error if details are incorrect', async () => {
      chai.request(app)
        .post('api/v1/flag')
        .set('Authorization', token)
        .then((res) => {
          expect(res.status).to.eq(500);
          expect(res.body).to.equal('internal server error');
        });
    });
  });
  describe('Update a flag', () => {
    it('should return error 404 if flag id is wrong', async () => {
      flagsData[0].status = 'pending';
      const { id } = flagsData[0];
      FlagModel.flags = flagsData;
      UserModel.users = usersData;
      const user = usersData[0];
      user.is_admin = true;
      const res = await chai.request(app).patch(`/api/v1/flag/${id + 1000}`).set('Authorization', token)
        .then((res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.equal('Flag not found');
        });
    });
  });
  describe('Get all flags', () => {
    it('should return all flags', (done) => {
      const user = usersData[0];
      FlagModel.flagdb[0] = flagsData;
      user.isAdmin = true;
      chai.request(app).get('/api/v1/flag').set('Authorization', token).end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.data[0]).to.be.an('Object');
        done();
      });
    });
    it('should return error 404 if flag is not found', async () => {
      const res = await chai.request(app).delete('/api/v1/flags/1271278338293').set('Authorization', token);
      expect(res.status).to.eq(404);
    });
  });
});
