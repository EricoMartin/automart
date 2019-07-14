/*import chai from 'chai';
import chaiHttp from 'chai-http';
import carsData from './mock_db/cars';
import app from '../app';
import CarModel from '../models/car';
import UserModel from '../models/user';
import FlagModel from '../models/flag';
import usersData from './mock_db/users';
import flagsData from './mock_db/flags';

const { expect } = chai;
chai.use(chaiHttp);
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJJYnUgRXJpYyIsImxhc3ROYW1lIjoiTWFydGluaSIsImFkZHJlc3MiOiIxLCBhZHJlc3Mgc3RyZWV0Iiwic3RhdHVzIjoicmVnaXN0ZXJlZCIsImVtYWlsIjoibWFydGluaXJleEB5YWhvby5jby51ayIsImlzX2FkbWluIjpmYWxzZSwicGFzc3dvcmQiOiIxMTExMTExMSJ9LCJpYXQiOjE1NjMwMjkyNTQsImV4cCI6MTU2MzE1ODg1NH0.hb5yIrzbO_JgBZYzgTyRPn9yriKaVGymKB86kEXkS6s'; 


describe('Flags controller', () => {
  describe('Create a flag', () => {
    it('should create a flag on an ad', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;
      const data = {
        car_id: 1,
        reason: 'Wrong Description',
        description: 'The car description is misleading',
        user_id: 3
      };
      chai.request(app).post('/api/v1/flag/report').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('car_id').eq(data.car_id);
          expect(res.body.data.reason).to.eq(data.reason);
          done();
        });
    });
    
    it('should return 400 error if car id is not stated', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;;
      const data = {
        car_id: '',
        reason: 'stolen',
        description: 'Bad description of the car ',
        user_id: user.id,
      };
      chai.request(app).post('/api/v1/flag/report').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.car_id).to.equal(undefined);
          expect(res.body.message).to.eq('car id must be a number');
          done();
        });
    });

  });
  describe('Update a flag', () => {
    it('should return error 404 if flag id is wrong', () => {
      flagsData[0].status = 'pending';
      const { id } = flagsData[0];
      FlagModel.flags = flagsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = true;
      chai.request(app).patch(`/api/v1/flag/${id + 1}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(404);
          //expect(res.body.message).to.equal('Flag not found');
        });
    });
  });
  describe('Get all flags', () => {
    it('should return all flags', (done) => {
      const user = usersData[0];
      FlagModel.flags = flagsData;
      user.isAdmin = true;
      chai.request(app).get('/api/v1/auth/admin/flags').set('Authorization', token).end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.data[0]).to.be.an('Object');
        done();
      });
    });
    
});
  
});
  */

