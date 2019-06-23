import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {noCarDetail, carDetail, testManufacturerDetail, updatePrice} from './dummy-db';
import cars from './cars';
import 'regenerator-runtime';


chai.use(chaiHttp);


describe('Test car AD endpoint', () => {
  it('should create a car', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg,
      })
      .field('manufacturer', 'Honda')
        .field('model', 'Accord')
        .field('price', '5000000')
        .field('state', 'New')
        .field('year', '2009')
        .field('bodyType', 'Saloon')
        .attach('image', file, 'Car1.jpg')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        expect(res.body.status).to.equal(201);
        expect(res.statusCode).to.equal(201);
        expect(res.body.data).to.be.an('object');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        done();
      });
  });


  it('should return an error if Manufacturer is not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-type': 'multipart/form-data',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .field('manufacturer', '')
        .field('model', 'Accord')
        .field('price', '5000000')
        .field('state', 'New')
        .field('year', '2009')
        .field('bodyType', 'Saloon')
      .end((err, res) => {
       expect(res.body).have.status(400);
   	   expect(res.statusCode).to.equal(400);
       expect(res.body.status).to.equal(400);
       expect(res.body).to.be.an('object');
       expect(res.body.data.Manufacturer).to.be.a('string');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Manufacturer should not be empty',
          'Expect error to be Manufacturer should not be empty');
        assert.isNotNull(err, 'unexpected error');
        done();
      });
  }),   

it('Should return an error message if manufacturer field contains a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-type': 'multipart/form-data',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .send({
        manufacturer: 'Honda5',
        model: 'Accord',
        price: '5000000',
        state: 'new',
        year: '2009',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Manufacturer field cannot contain number(s)');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Manufacturer field cannot contain number(s)',
          'Manufacturer field cannot contain number(s)');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

it('should return an error if model is not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-type': 'multipart/form-data',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .field('manufacturer', 'Honda')
        .field('model', '')
        .field('price', '5000000')
        .field('state', 'New')
        .field('year', '2009')
        .field('bodyType', 'Saloon')
      .end((err, res) => {
       expect(res.body).have.status(400);
   	   expect(res.statusCode).to.equal(400);
       expect(res.body.status).to.equal(300);
       expect(res.body).to.be.an('object');
       expect(res.body.data).to.be.an('object');
       expect(res.body.data.Manufacturer).to.be.a('string');
       expect(res.body.error).to.be.an('object');
       assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Model should not be empty',
          'Expect error to be model should not be empty');
        assert.isNotNull(err, 'unexpected error');
        done();
      });
  }), 
  it('should return an error if incorrect car state is provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-type': 'multipart/form-data',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .field('manufacturer', 'Honda')
        .field('model', 'Accord')
        .field('price', '5000000')
        .field('state', '')
        .field('year', '2009')
        .field('bodyType', 'saloon')
      .end((err, res) => {
        expect(res.body).have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals('Vehicle state cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Vehicle state cannot be empty');
        assert.isNull(err, 'unexpected error');
        done();
      });
  }),
  it('should return an error if incorrect bodytpe is provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .field('manufacturer', 'Honda')
        .field('model', 'Accord')
        .field('price', '5000000')
        .field('state', 'New')
        .field('year', '2009')
        .field('bodyType', '')
      .end((err, res) => {
       expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Body type cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Body type cannot be empty',
          'Expect error to be Body type cannot be empty');
        assert.isNull(err, 'unexpected error');
        done();
      });
    });

  it('Should return an error message if car state contains a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'multipart/form-data',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .field('manufacturer', 'Honda')
        .field('model', 'Accord')
        .field('price', '5000000')
        .field('state', '2341')
        .field('year', '2009')
        .field('bodyType', 'saloon')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Car state field cannot contain number(s)');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Car state field cannot contain number(s)');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if year is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'multipart/form-data',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
     })
      .field('manufacturer', 'Honda')
        .field('model', 'Accord')
        .field('price', '5000000')
        .field('state', 'New')
        .field('year', '')
        .field('bodyType', 'saloon')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Enter a valid year');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error, 'Enter a valid year');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if year is more or less than 4 digits', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'multipart/form-data',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
            })
      .field('manufacturer', 'Honda')
        .field('model', 'Accord')
        .field('price', '5000000')
        .field('state', 'New')
        .field('year', '200923')
        .field('bodyType', 'saloon')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Input a valid year');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Input a valid year');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
}); 


describe('Get a car', () => {
  it('should get an available car present in db', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .send({
        car_id: 20926,
        createdOn: '5/15/2018',
        manufacturer: 'Honda',
        model: 'Accord',
        price: '5000000',
        state: 'New',
        bodyType: 'saloon',
        year: 2009,
        status: 'available'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('Manufacturer');
        expect(res.body.data).to.have.property('model');
        expect(res.body.data).to.have.property('price');
        expect(res.body.data).to.have.property('state');
        expect(res.body.data).to.have.property('bodyType');
        expect(res.body.data).to.have.property('year');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });
  it('should return an error if the car is not in the db', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .send({
        car_id: 22760,
        createdOn: '5/23/2017',
        manufacturer: 'Mercedes Benz',
        model: 'Accord',
        price: 'Five hundred',
        state: '',
        bodyType: 'saloon',
        year: '',
        status: 'available'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal("The requested car is not available");
        assert.isNull(err, 'unexpected error');
        done();
      });
  });
  it('should return an error if the ID is not correct', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .send(testManufacturerDetail[2])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not equal to No record found');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });
  it('Should return all unsold cars within a price range', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .query({
        status: 'available',
        min_price: '100000',
        max_price: '1600000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});

describe('Get all cars', () => {
  it('should get all the cars in the db', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .end((err, res) => {

       	expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });



  it('should display error message if car not available', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car/190')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.be.equal('The requested car is not available');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Should return all unsold cars with status available', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
       status: 'available'
        })
      .set({'Content-Type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
         })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });


it('Should return an error message if price is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'multipart/form-data',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })

      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Enter a valid price');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error, 'Enter a valid price');
        assert.isNull(err, 'Unexpected error');
        done();
      });
  });

it('Should update car AD price', (done) => {
    chai
      .request(app)
      .patch('/api/v1/car/carDetail/price')
      .set({
        'Content-Type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .send({
        price: '4250000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.created_on).to.be.a('string');
        expect(res.body.data.email).to.be.a('string');
        expect(res.body.data.Manufacturer).to.be.a('string');
        expect(res.body.data.model).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.status).to.equal('available');
        expect(res.body.data.year).to.be.a('number');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.strictEqual(res.body.status, 200, 'Status is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.created_on, 'Date is not a string');
        assert.isString(res.body.data.manufacturer, 'Manufacturer is not a string');
        assert.isString(res.body.data.model, 'Model is not a string');
        assert.strictEqual(res.body.data.status, 'available', 'Status is not available');
        assert.isNumber(res.body.data.price, 'Price is not a number');
        assert.isString(res.body.data.state, 'State is not a string');
        assert.isNumber(res.body.data.year, 'Year is not a number');
        assert.isNull(err, 'Unexpected error');
        done();
      });
});

it('Should return a message if no AD with queried status and price is found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=unknown&min_price=unknown&max_price=unknown')
      .set({
        'Content-Type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not equal to No record found');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

it('Should return all unsold cars of a specific manufacturer', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
        status: 'available',
        manufacturer: 'Honda',
      })
      .set({
        'Content-Type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
        })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'unexpected error');
        done();
      });
});
it('Should delete an AD if user is an admin', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car/cars.car[carId]')
      .set({
        'Content-Type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
         })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('Car Ad successfully deleted');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'Car Ad successfully deleted',
          'Data is not equal to Car Ad successfully deleted');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if record is not found', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car/11111045')
      .set({
        'Content-Type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
    	})
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200);
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not available');
        assert.isNull(err, 'Unexpected error');
        done();
      });
  });

  it('Should return an error if user is not an admin', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car/cars.car[car_id]')
      .set({
        'Content-Type': 'application/json',
        Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdE5hbWUiOiJFcmljIiwibGFzdE5hbWUiOiJJYnUiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRwZ0xwMThFQTJQbXBhMzAvR3VuVzFPcFQ2LkhyM2NDRi8wUjk1UGRxNzBXQ1RKNTRXdUtBRyIsImFkZHJlc3MiOiIxMDAgd2VzdHdheSBCZXN0d2F5IiwiZW1haWwiOiJtYXJ0aW5pcmV4QHlhaG9vLmNvLnVrIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTI2MzY0NCwiZXhwIjoxNTYxNDM2NDQ0fQ.Ad6FM0hE-y41gBlDURfMVR9eLh0-fV5PmwVzXO2hthg
      })

      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.equal('Forbidden: Only Admin can delete an AD');
        expect(res.body.error).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 403);
        assert.isString(res.body.error, 'Data is not a string');
        assert.strictEqual(res.body.error,
          'Forbidden: Only Admin user can delete an AD',
          'Only Admin user can delete an AD');
        assert.isNull(err, 'Unexpected error');
        done();
      });
  });
});

describe('DELETE a car', () => {
  it('should remove a car and display a success message', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car3')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data).to.have.property('car');
        expect(res.body.data.message).to.equal('Car Ad has been deleted succesfully');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('owner');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('Manufacturer');
        expect(res.body.data).to.have.property('model');
        expect(res.body.data).to.have.property('price');
        expect(res.body.data).to.have.property('state');
        expect(res.body.data).to.have.property('bodyType');
        expect(res.body.data).to.have.property('year');
        done();
      });
  });
});
  



