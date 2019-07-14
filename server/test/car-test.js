/*import chai, {expect, assert} from 'chai';
import chaiHttp from 'chai-http';
import 'regenerator-runtime';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import app from '../app';
import carsData from './mock_db/cars';
import Cars from '../models/car';
import userModel from '../models/user';
import usersData from './mock_db/users';

const url = path.resolve('./');

dotenv.config();

chai.use(chaiHttp);
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJJYnUgRXJpYyIsImxhc3ROYW1lIjoiTWFydGluaSIsImFkZHJlc3MiOiIxLCBhZHJlc3Mgc3RyZWV0Iiwic3RhdHVzIjoicmVnaXN0ZXJlZCIsImVtYWlsIjoibWFydGluaXJleEB5YWhvby5jby51ayIsImlzX2FkbWluIjpmYWxzZSwicGFzc3dvcmQiOiIxMTExMTExMSJ9LCJpYXQiOjE1NjMwMjkyNTQsImV4cCI6MTU2MzE1ODg1NH0.hb5yIrzbO_JgBZYzgTyRPn9yriKaVGymKB86kEXkS6s'; 

describe('Test car AD endpoint', () => {
	describe('Cars', () => {
		const carsArray = () => {
			Cars.cars = carsData;
		};
		const usersArray = () => {
			userModel.users = usersData;
		};
  it('should create a new car ad', (done) => {
  	usersArray();
      const user = usersData[0];
    chai
      .request(app)
      .post('/api/v1/car')
      .type('form')
      .set({
        'Content-Type': 'application/json',
        Authorization: token 
       })
      .send(carsData[0])
        .end((err, res) => {
        expect(res.body.status).to.equal(201);
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
    });

it('should return error 400 if there is no image', (done) => {
      usersArray();
      const user = usersData[1];
      user.isAdmin = false;
      /*const data = {
        id: usersData[1].id,
        status: 'available',
        price: 2500000,
        state: 'new',
        model: 'es6 v',
        manufacturer: 'BMW',
        body_type: ' ',
      };
*//*
      chai.request(app).post('/api/v1/car')
      .set({Authorization: token}).send(carsData[2])
        .end((err, res) => {
          expect(res.body.message).to.equal('Fill all required fields');
          expect(res.status).to.eq(400);
          done();
        });
    });

    it('should return error 401 if token is not provided', (done) => {
      const data = {
        owner: 'owner',
        status: 'avaialable',
        price: '2.5m',
        state: 'new',
        manufacturer: 'BMW',
        body_type: 'car',
        description: 'The car is still new',
        img: 'https://mydummyimgurl.com',
      };
      chai
      .request(app)
      .post('/api/v1/car')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
    });
    it('Should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '14,500',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  describe('view available cars by manufacturer', () => {
     const manufacturers = [
      'Honda', 'Mercedes', 'Peugeot',
    ];
    it('should return all unsold cars by a manufacturer', (done) => {
      carsArray();
      chai.request(app).get(`/api/v1/car/manufacturer/${manufacturers[0]}`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('data').to.be.an('Array');
          done();
        });
    });

it('should return a custom error if no vehicle is found for the manufacturer', (done) => {
      carsArray();
      chai.request(app).get('/api/v1/car/manufacturer/tyonum').end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('There are no cars for the selected manufacturer');
        done();
      });
    });
  });

  // unsold cars by body type

  describe('view available cars by body type', () => {
    const bodyType = [
      'saloon', 'suv', 'jeep', 'wagon', 'bus', 
    ];
    it('should return all unsold cars by body type', (done) => {
      carsArray();

      chai.request(app).get(`/api/v1/car/bodytype/${bodyType[0]}`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('data').to.be.an('Array');
          done();
        });
    });
    it('should return error 404 if cars of given body type are not found', (done) => {
      carsArray();
      chai.request(app).get(`/api/v1/car/bodytype/${bodyType[2]}`)
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('There are no cars for the selected body_type');
          done();
        });
    });
  });

  // view available cars by state (used, new)
  describe('view available cars by state', () => {
    const state = [
      'used', 'New',
    ];
    it('should return all available used cars', (done) => {
      carsArray();
      chai
      .request(app)
      .get(`/api/v1/car/state/${state[0]}`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('data').to.be.an('ARRAY');
          expect(res.body.data[0]).to.have.property('state').eq('used');
          done();
        });
    });
    it('should return all available new cars', (done) => {
      carsArray();
      chai
      .request(app)
      .get(`/api/v1/car/state/${state[1]}`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('data').to.be.an('ARRAY');
          expect(res.body.data[0]).to.have.property('state').eq(state[1]);
          done();
        });
    });
    it('should return error 404 if cars are not found for selected state -old', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/car/state/old')
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('There are no cars for the selected state');
          done();
        });
    });
  });

  // view all unsold cars
  describe('view all available cars', () => {
    it('should return all unsold cars', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/cars/status/available')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data').to.be.an('ARRAY');
        done();
      });
    });
    it('should return 404 when there are no unsold cars', (done) => {
      Cars.cars = [];
      chai
      .request(app)
      .get('/api/v1/cars/status/available')
      .end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('No cars available now. Try again later');
        done();
      });
    });
  });
  // get ad by id
  describe('Get ad by id', () => {
    it('should return a single ad details', (done) => {
      carsArray();
      const { id } = carsData[0];
      chai
      .request(app)
      .get(`/api/v1/car/${id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return error 400 with custom message if supplied id is not valid', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/car/12345678901')
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Invalid Car ad Record. id cannot be greater than 10000');
        done();
      });
    });

    it('should return error 404 with custom message if ad is not found', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/car/2598')
      .end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('No Car Record Found');
        done();
      });
    });
  });
  // seller update ad price
  describe('Seller update ad price', () => {

    it('should return error 404 if ad is not found', () => {
      const user = usersData[0];
      user.isAdmin = false;
      Cars.cars = [];
      const reqData = {
        id: 8118,
        price: 2400000,
        email: 'mart@gmail.com',
        password: 'wer3458900fg',
        description: 'This is to add further description',
      };
      chai.request(app).patch(`/api/v1/car/${reqData.id}/price`)
        .set({Authorization: token}).send(reqData)
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('The advert to update is not available');
        });
    });

    it('should return error 401 if another user attempts update an ad', () => {
      carsArray();
      usersArray();
      const user = usersData[0];
      user.isAdmin = false;
      const price = carsData[0].price - 1000000;
      carsData[0].owner = usersData[1].id;
      const reqData = {
        id: carsData[0].id,
        price,
        email: 'mart@gmail.com',
        password: 'wer3458900fg',
        description: 'This is to add further description',
      };
      chai
      .request(app)
      .patch(`/api/v1/car/${reqData.id}/price`)
      .set({Authorization: token})
        .send(reqData)
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body.message).to.eq('You do not have the permission to update this data');
        });
    });
    it('should return error 401 if user is not logged in', () => {
      carsArray();
      const reqData = {
        id: carsData[0].id,
        price: carsData[0].price - 100,
        email: 'mart@gmail.com',
        password: 'wer3458900fg',
        description: 'This is to add further description',
      };
      chai
      .request(app)
      .patch(`/api/v1/car/${reqData.id}/price`)
      .send(reqData)
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body.error).to.eq('Authentication failed! Please Login again');
        });
    });
  });
  // get single ad
  describe('User can view single ad', () => {
    it('should return full details of an ad', (done) => {
      carsArray();
      const { id } = carsData[0];
      chai
      .request(app)
      .get(`/api/v1/car/${id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data.id).to.eq(id);
        done();
      });
    });
    it('should return error 404 if ad is not found', (done) => {
      carsArray();
      const id = carsData[0].id + 150;
      chai
      .request(app)
      .get(`/api/v1/car/${id}`)
      .end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('No Car Record Found');
        done();
      });
    });
    it('should return error 400 if invalid ad id is supplied', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/car/155873165645')
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Invalid Car ad Record. id cannot be greater than 10000');
        done();
      });
    });
  });
  // get ads within a price range
  describe('Get ads within a price range', () => {
    it('should return an array of ads within a price range', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/car/price/?min=2000000&max=8000000')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('ARRAY');
        done();
      });
    });

    it('Minimum should default to 0 if not supplied', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/car/price/?max=8000000')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('ARRAY');
        done();
      });
    });

    it('Maximum should default to 5000000 if not supplied', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/car/price/?min=2000000')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('ARRAY');
        done();
      });
    });
    it('Should return error 404 if no ads are found in the given range', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/car/price/?min=12000000&max=24000000')
      .end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('There are no cars within the selected price range');
        done();
      });
    });
  });

  // admin can view all ads whether sold or available
  describe('admin view all ads', () => {
    it('should return all ads', (done) => {
      const user = usersData[0];
      user.isAdmin = true;
      carsArray();
      chai
      .request(app)
      .get('/api/v1/auth/admin/cars')
      .set({Authorization: token})
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.data[0]).to.be.an('Object');
        done();
      });
    });
    it('should return error 404 if there are no ads available', (done) => {
      const user = usersData[0];
      user.isAdmin = true;
      Cars.cars = [];
      chai
      .request(app)
      .get('/api/v1/auth/admin/cars')
      .set({Authorization: token})
      .end((err, res) => {
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.eq('No Car Record Found. Try again Later');
        done();
      });
    });
    it('should return error 401 if user is not logged in', (done) => {
      carsArray();
      chai
      .request(app)
      .get('/api/v1/auth/admin/cars')
      .end((err, res) => {
        expect(res.body.status).to.eq(401);
        expect(res.body.error).to.eq('Authentication failed! Please Login again');
        done();
      });
    });
  });

  // admin can delete any posted ad
  describe('Admin can delete a posted ad', () => {

    it('should return error 401 if user is not admin or not logged in', (done) => {
      carsArray();
      chai
      .request(app)
      .delete(`/api/v1/auth/admin/cars/${carsData[0].id}`)
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body.error).to.eq('Authentication failed! Please Login again');
          done();
        });
    });

   });
  });
});
*/
