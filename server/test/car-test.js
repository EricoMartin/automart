import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'regenerator-runtime';
import dotenv from 'dotenv';
import app from '../app';
import pool from '../migration/queries';


dotenv.config();

chai.use(chaiHttp);
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJsYW5pc3RlciIsImlhdCI6MTU2NDU5MDQyOCwiZXhwIjoxNTY1MTk1MjI4fQ.syLUmHaV_NFa2r0Irk6tNjGoJZ5W4K1TS1Q4a3k59p0';

describe('Test car AD endpoint', () => {
  describe('Cars', () => {
    const carAd = {
      manufacturer: 'Mercedes',
      model: 'E500',
      price: 6000000,
      state: 'New',
      status: 'available',
      body_type: 'Saloon',
      year: '2019-07-19',
      owner: 2,
      img: 'C:/Users/Eric Ibu/Desktop/automart.github.io-gh-pages/server/test/img/car1.jpg',
    };
    it('should create a new car ad', () => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set(
          'Authorization', token,
        )
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('manufacturer', carAd.manufacturer)
        .field('model', carAd.model)
        .field('price', carAd.price)
        .field('state', carAd.state)
        .field('status', carAd.status)
        .field('year', carAd.year)
        .field('body_type', carAd.body_type)
        .field('owner', 1)
        .field('img', carAd.img)
        .then((res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
        });
    });
    it('should return 400 error if invalid field data is supplied', () => {
      chai.request(app)
        .post('/api/v1/car')
        .set('authorization', token)
        .set('Content-Type', 'Multipart/form-data')
        .field('status', 'available')
        .field('price', '')
        .field('image_url', 'img.jpg')
        .field('model', 'E350')
        .field('manufacturer', 'BMW')
        .field('body_type', 'car')
        .field('description', 'This is additional description')
        .then((res) => {
          expect(res.body.status).to.eq(400);
          expect(res.body.error).to.eq('Manufacturer cannot be empty');
        });
    });
    it('should return error 401 if user is not logged in', async () => {
      const data = carAd;
      const res = await chai.request(app).post('/api/v1/car').send(data);
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq('Authentication failed! Please Login again');
    });

    describe('Test available cars by manufacturer', () => {
      it('should return all available cars', async () => {
        const { rows } = await pool.query('SELECT manufacturer FROM cars LIMIT 1');
        const res = await chai.request(app).get(`/api/v1/car?status=available&manufacturer=${rows[0].manufacturer}`).set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
      });

      it('should return error  404 if there are no unsold cars for a selected manufacturer', async () => {
        const res = await chai.request(app).get('/api/v1/car/manufacturer/subaru').set('authorization', token);
        expect(res.status).to.eq(404);
        expect(res.body.error).to.eq('There are no cars for the selected manufacturer');
      });

      it('should return error 401 if user is not logged in', async () => {
        const { rows } = await pool.query('SELECT manufacturer FROM cars LIMIT 1');
        const res = await chai.request(app).get(`/api/v1/car/manufacturer/${rows[0].manufacturer}`);
        expect(res.status).to.eq(401);
        expect(res.body.error).to.eq('Authentication failed! Please Login again');
      });
    });
    describe('view available cars by body type', () => {
      it('should return all unsold cars by body type', async () => {
        const { rows } = await pool.query('SELECT body_type FROM cars LIMIT 1');
        const res = await chai.request(app).get(`/api/v1/car?status=available&body_type=${rows[0].body_type}`).set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data').to.be.an('Array');
      });

      it('should return error 404 if cars of given body type are not found', async () => {
        const res = await chai.request(app).get('/api/v1/car/body_type/truck').set('authorization', token);
        expect(res.status).to.eq(404);
        expect(res.body.error).to.eq('There are no cars for the selected body_type');
      });

      it('should return all available cars by state', async () => {
        const { rows } = await pool.query('SELECT state FROM cars LIMIT 1');
        const res = await chai.request(app).get(`/api/v1/car?status=available&state=${rows[0].state}`).set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data').to.be.an('ARRAY');
      });

      it('should return error 404 if cars are not found for selected state', async () => {
        const res = await chai.request(app).get('/api/v1/car/5/available').set('authorization', token);
        expect(res.status).to.eq(404);
        expect(res.body.error).to.eq(undefined);
      });
    });
    describe('view all available cars', () => {
      it('should return all unsold car ads', async () => {
        const res = await chai.request(app).get('/api/v1/car?status=available').set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data').to.be.an('ARRAY');
      });
    });


    describe('view car ad by id', () => {
      it('should return a car ad detail', async () => {
        const { rows } = await pool.query('SELECT car_id FROM cars limit 1');
        const res = await chai.request(app).get(`/api/v1/car/${rows[0].car_id}`).set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body.data.car_id).to.eq(rows[0].car_id);
      });
      it('should return error 400 if ad id is greater than 10000', async () => {
        const res = await chai.request(app).get('/api/v1/car/9293837414384').set('authorization', token);
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Invalid Car ad Record. id cannot be greater than 10000');
      });

      it('should return error 404 if ad is not found', async () => {
        const res = await chai.request(app).get('/api/v1/car/9299').set('authorization', token);
        expect(res.status).to.eq(404);
        expect(res.body.error).to.eq('No Car Record Found');
      });
    });

    describe('view all available cars', () => {
      it('should return all unsold cars', async () => {
        const res = await chai.request(app).get('/api/v1/car?status=available').set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data').to.be.an('ARRAY');
      });
    });

    describe('update car ad price', () => {
      it('should return success 200 with updated price', async () => {
        await pool.query(`INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)
     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')`);
        const { rows } = await pool.query('SELECT car_id, owner FROM cars LIMIT 1');
        const res = await chai.request(app).patch(`/api/v1/car/${rows[0].car_id}/price`).set('authorization', token).send({ price: 6500000, user_id: rows[0].id, status: 'available' });
        expect(res.status).to.eq(200);
      });

      it('should return error if user is not the owner', async () => {
        await pool.query(`INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)
     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')`);
        const { rows } = await pool.query('SELECT car_id FROM cars LIMIT 1');
        const res = await chai.request(app).patch(`/api/v1/car/${rows[0].car_id}/price`).set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg').send({ price: 7800000 });
        expect(res.status).to.eq(401);
        expect(res.body.error).to.eq('Authentication failed! Please Login again');
      });

      it('should return error 401 if user is not logged in', async () => {
        const { rows } = await pool.query('SELECT car_id FROM cars limit 1');
        const res = await chai.request(app).patch(`/api/v1/car/${rows[0].car_id}/price`).send({ price: 6000000 });
        expect(res.status).to.eq(401);
        expect(res.body.error).to.eq('Authentication failed! Please Login again');
      });
    });

    describe('User can view car ad', () => {
      it('should return full details of an ad', async () => {
        const { rows } = await pool.query('SELECT car_id FROM cars limit 1');

        const res = await chai.request(app).get(`/api/v1/car/${rows[0].car_id}`).set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data.id).to.eq(rows[0].id);
      });

      it('should return error 404 if ad is not found', async () => {
        const res = await chai.request(app).get('/api/v1/car/12').set('authorization', token);
        expect(res.status).to.eq(404);
        expect(res.body.error).to.eq('No Car Record Found');
      });

      it('should return error 500 internal server error if car ad is invalid ', async () => {
        const res = await chai.request(app).get('/api/v1/car/aaa').set('authorization', token);
        expect(res.status).to.eq(500);
        expect(res.body.message).to.eq(undefined);
      });
    });
    // get ads within a price range
    describe('Get ads within a price range', () => {
      it('should return an array of ads within a price range', async () => {
        const res = await chai.request(app).get('/api/v1/car?status=available&min=1000000&max=12000000').set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('ARRAY');
      });
      it('should return ads within price range if max and min are not supplied', async () => {
        const res = await chai.request(app).get('/api/v1/car?status=available&min=&max=').set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('ARRAY');
      });
    });

    // admin can view all ads whether sold or available
    describe('User view all ads', () => {
      it('should return all cars', async () => {
        const res = await chai.request(app).get('/api/v1/car').set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.data[0]).to.be.an('Object');
      });
      it('should return error 404 if there are no ads available', async () => {
        await pool.query('DELETE FROM cars');
        const res = await chai.request(app).get('/api/v1/car').set('authorization', token);
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.eq('No Car Record Found. Try again Later');
      });
    });

    // admin can delete any posted ad
    describe('Owner can delete his/her posted ad', () => {
      it('should delete a posted ad', async () => {
        await pool.query(`INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)
     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'BMW', 'I-8', '4500000', 'used', 'available', 'wagon', '2016-01-04', '2017-05-11', '2', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'Mercedes', 'E300', '7500000', 'used', 'available', 'saloon', '2014-01-01', '2008-09-07', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'Peugot', '409', '2000000', 'New', 'available', 'saloon', '2009-01-01', '2015-06-13', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')`);
        const { rows } = await pool.query('SELECT car_id FROM cars LIMIT 1');
        const res = await chai.request(app).delete(`/api/v1/car/${rows[0].car_id}`).set('authorization', token);
        expect(res.status).to.eq(200);
        expect(res.body.data.car_id).to.eq(rows[0].car_id);
      });
      it('should return error 401 if user is not logged in', async () => {
        await pool.query(`INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)
     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'BMW', 'I-8', '4500000', 'used', 'available', 'wagon', '2016-01-04', '2017-05-11', '2', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'Mercedes', 'E300', '7500000', 'used', 'available', 'saloon', '2014-01-01', '2008-09-07', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'Peugot', '409', '2000000', 'New', 'available', 'saloon', '2009-01-01', '2015-06-13', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')`);

        const { rows } = await pool.query('SELECT car_id FROM cars LIMIT 1');
        const res = await chai.request(app).delete(`/api/v1/car/${rows[0].car_id}`);
        expect(res.status).to.eq(401);
        expect(res.body.error).to.eq('Authentication failed! Please Login again');
      });
      it('should return error 404 if ad is not found', async () => {
        const res = await chai.request(app).delete('/api/v1/car/13').set('authorization', token);
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('This ad is not available');
      });
    });
  });
});
