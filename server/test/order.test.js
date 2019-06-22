import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {userDetail, carDetail, noCarDetail, carOrder } from './dummy-db';


chai.use(chaiHttp);

describe('Test for create order endpoint', () => {
  it('Test Should create an order', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .set({
        'Content-Type': 'application/json'
      })
      .send(
        carDetail[0]
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.car_id).to.be.a('number');
        expect(res.body.data.created_on).to.be.a('string');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.priceOffered).to.be.a('number');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isNumber(res.body.data.car_id, 'ID is not a number');
        assert.isString(res.body.data.created_on, 'Date is not a string');
        assert.isString(res.body.data.status, 'Status is not a string');
        assert.isNumber(res.body.data.price, 'Price is not a number');
        assert.isNumber(res.body.data.priceOffered, 'Price is not a number');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Test Should return an error message if price is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .set({
        'Content-Type': 'application/json'
      })
      .send(
        noCarDetail[0]
      )
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Enter a valid price');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Enter a valid price',
          'Expect error to be Enter a valid price');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Test Should return an error if request is not authorized', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .set({
        'Content-Type': 'application/json',
      })
      .send(
       carDetail[0]
     )
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
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Test should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .set({
        'Content-Type': 'application/json'
      })
      .send(
        carDetail[0],
      )
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
        assert.isNull(err, 'unexpected error');
        done();
      });
  });
});

describe('Test for update order price', () => {
  // Create an order
  let order;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .set({
        'Content-Type': 'application/json'
      })
      .send(
        carDetail[0]
      )
      .end((err, res) => {
        order = res.body.data;
        done();
      });
  });

  it('Test should update price of purchase order', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/order/${carOrder.id}/price`)
      .set({
        'Content-Type': 'application/json'
         })
      .send(carDetail[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.car_id).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.old_price_offered).to.be.a('number');
        expect(res.body.data.new_price_offered).to.be.a('number');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.strictEqual(res.body.status, 200, 'Status is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isNumber(res.body.data.car_id, 'ID is not a number');
        assert.isNumber(res.body.data.old_price_offered, 'Price is not a number');
        assert.isNumber(res.body.data.new_price_offered, 'Price is not a number');
        assert.isString(res.body.data.status, 'Status is not a string');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Test should return a message if no order with the id is found', (done) => {
    chai
      .request(app)
      .patch('/api/v1/order/1234354/price')
      .set({
        'Content-Type': 'application/json'
      })
      .send(
        carDetail[0],
      )
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
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Test should return an error message if id is not a number', (done) => {
    chai
      .request(app)
      .patch('/api/v1/order/1234354/price')
      .set({
        'Content-Type': 'application/json'
      })
      .send(
        carDetail[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.equal('Invalid ID');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 200');
        assert.isString(res.body.error, 'ID is not valid');
        assert.strictEqual(res.body.error,
          'ID is not valid',
          'Expected error to be a valid ID');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Test should return an error message if price is not a number', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/order/${carDetail.id}/price`)
      .set({
        'Content-Type': 'application/json',
        })
      .send(carDetail[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Enter a valid price');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Enter a valid price',
          'Expected error to be a valid price');
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Test should return an error if request is not authorized', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/order/${carOrder.id}/price`)
      .set({
        'Content-Type': 'application/json'
      })
      .send(carDetail[0])
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
        assert.isNull(err, 'unexpected error');
        done();
      });
  });

  it('Test should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/order/${carOrder.id}/price`)
      .set({
        'Content-Type': 'application/json'
      })
      .send(carDetail[2])
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
        assert.isNull(err, 'unexpected error');
        done();
      });
  });
});