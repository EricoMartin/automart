import chai, {expect, assert} from 'chai';
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

//const token = process.env.token;

chai.use(chaiHttp);
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJlbWFpbCI6Im1hcnRpbmlyZXhAeWFob28uY28udWsiLCJmaXJzdF9uYW1lIjoiRXJpYyIsImxhc3RfbmFtZSI6IklidSIsInBhc3N3b3JkIjoiIiwiYWRkcmVzcyI6IjExIGFkZHJlc3Mgc3RyZWV0IiwiaXNfYWRtaW4iOmZhbHNlLCJzdGF0dXMiOiJyZWdpc3RlcmVkIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MjcyMDA5NiwiZXhwIjoxNTYyODQ5Njk2fQ.kRa4sajaNalVo75-4T4RpLyz0GtGGBciScP0vm-SwkQ'; 

describe('Test car AD endpoint', () => {
	describe('Cars', () => {
		const carsArray = () => {
			Cars.cars = carsData;
		};
		const usersArray = () => {
			userModel.users = usersData;
		};
  it('should return a 400 error if car ad doesn\'t have all required fields', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .type('form')
      .set({
        'Content-Type': 'application/json',
        Authorization: token 
       })
        .field('manufacturer', 'Honda')
        .field('id', 1)
        .field('model', 'Accord')
        .field('price', 5000000)
        .field('state', 'New')
        .field('year', '2009')
        .field('body_type', 'Saloon')
        .field('status', 'available')
        .field('created_on', '10/09/2018')
        .attach('img', path.join(url, '/server/test/img/car1.jpg'))
        .set('Content-Type', 'image/jpeg')
        .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });




  it('Should return an error if request is not authorized', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
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
      chai.request(app).get('/api/v1/car/manufacturer/xvsvvbxn').end((err, res) => {
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
      chai
      .request(app)
      .get(`/api/v1/car/bodytype/${bodyType[0]}`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('data').to.be.an('Array');
          done();
        });
    });
    it('should return error 404 if cars of given body type are not found', (done) => {
      carsArray();
      chai.request(app)
      .get(`/api/v1/car/bodytype/${bodyType[2]}`)
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
    it('should return all available cars by state -used', (done) => {
      carsArray();
      chai
      .request(app)
      .get(`/api/v1/cars/state/${state[0]}`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('data').to.be.an('ARRAY');
          expect(res.body.data[0]).to.have.property('state').eq('used');
          done();
        });
    });
    it('should return all available cars by state -new', (done) => {
      carsArray();
      chai
      .request(app)
      .get(`/api/v1/cars/state/${state[1]}`)
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
      .get('/api/v1/cars/state/old')
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
      chai.
      request(app)
      .get('/api/v1/cars/status/available')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data').to.be.an('ARRAY');
        done();
      });
    });
    it('should return 404 when there are no unsold cars', (done) => {
      Cars.cars = [];
      chai.request(app)
      .get('/api/v1/cars/status/available').end((err, res) => {
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
      chai.request(app)
      .get(`/api/v1/car/${id}`).end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data.id).to.eq(id);
        done();
      });
    });

    it('should return error 400 with custom message if supplied id is not valid', (done) => {
      carsArray();
      chai.request(app)
      .get('/api/v1/car/12345').end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Invalid Car ad Record');
        done();
      });
    });

    it('should return error 404 with custom message if ad is not found', (done) => {
      carsArray();
      chai.request(app)
      .get('/api/v1/car/9').end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('The ad you are looking for is no longer available');
        done();
      });
    });
  });

describe('Get ads within a price range', () => {
    it('should return an array of ads within a price range', (done) => {
      carsArray();
      chai.request(app).get('/api/v1/car/price/?min=5000000&max=8000000').end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('ARRAY');
        done();
      });
    });

    it('Minimum should default to 0 if not supplied', (done) => {
      carsArray();
      chai.request(app).get('/api/v1/car/price/?max=8000000').end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('ARRAY');
        done();
      });
    });it('Maximum should default to 24000000 if not supplied', (done) => {
      carsArray();
      chai.request(app).get('/api/v1/car/price/?min=2000000').end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('ARRAY');
        done();
      });
    });
    it('Should return error 404 if no ads are found in the given range', (done) => {
      carsArray();
      chai.request(app).get('/api/v1/car/price/?min=12000000&max=24000000').end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('There are no cars within the selected range');
        done();
      });
    });
  });

 describe('admin view all ads', () => {
    it('should return all ads', (done) => {
      const user = usersData[0];
      user.isAdmin = true;
      carsArray();
      chai.request(app).get('/api/v1/car').set({Authorization: token}).end((err, res) => {
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
      chai.request(app).get('/api/v1/auth/admin/cars').set({Authorization: token}).end((err, res) => {
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.eq('There are no cars available now. Check back');
        done();
      });
    });
    it('should return error 401 if user is not logged in', (done) => {
      carsArray();
      chai.request(app).get('/api/v1/car').end((err, res) => {
        expect(res.body.status).to.eq(401);
        expect(res.body.message).to.eq('Authentication failed! Please Login again');
        done();
      });
    });
  });

  // admin can delete any posted ad
  describe('Admin can delete a posted ad', () => {
    it('should delete a posted ad', (done) => {
      const user = usersData[0];
      user.isAdmin = true;
      carsArray();
      chai.request(app).delete(`/api/v1/auth/admin/car/${carsData[0].id}`).set({Authorization: token})
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('Ad successfully deleted');
          done();
        });
    });
    it('should return error 401 if user is not admin or not logged in', (done) => {
      carsArray();
      chai.request(app).delete(`/api/v1/auth/admin/car/${carsData[0].id}`)
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body.message).to.eq('Authentication failed! Please Login again');
          done();
        });
    });
    it('should return error 404 if wrong ad id is given', (done) => {
      const user = usersData[0];
      user.isAdmin = true;
      carsArray();
      const id = carsData[0].id + 1;
      chai.request(app).delete(`/api/v1/auth/admin/car/${id}`).set({Authorization: token})
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('The ad is no longer available');
          done();
        });
    });
    it('should return error 404 if ad is not available', (done) => {
      const user = usersData[0];
      user.isAdmin = true;
      const { id } = carsData[0];
      Cars.cars = [];
      chai.request(app).delete(`/api/v1/auth/admin/car/${id}`).set({Authorization: token})
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('The ad is no longer available');
          done();
        });
    });
});
});
});
