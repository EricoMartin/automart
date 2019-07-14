import chaiHttp from 'chai-http';
import chai, { expect, assert } from 'chai';
import app from '../app';
import dotenv from 'dotenv';


dotenv.config();

chai.use(chaiHttp);

const token = process.env.token;

describe('Test flag endpoint', () => {
  it('Should create a flag', (done) => {
    chai
      .request(app)
      .post('/api/v1/flag/report')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        id: 13,
        reason: 'Image not availble',
        description: 'Image not available for the AD',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.car_id).to.be.a('number');
        expect(res.body.data.reason).to.be.a('string');
        expect(res.body.data.description).to.be.a('string');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isNumber(res.body.data.car_id, 'Car ID is not a number');
        assert.isString(res.body.data.reason, 'Reason is not a string');
        assert.isString(res.body.data.description, 'Description is not a string');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if car Id is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/flag/report')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        id: 'bbb10000043',
        reason: 'Image not availble',
        description: 'Image is not available for the AD',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Enter a valid ID');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Enter a valid ID',
          'Expect error to be Enter a valid ID');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if reason is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/flag/report')
      .set({
        'Content-Type': 'application/json',
        Authorization: token,
        
      })
      .send({
        id: 10000043,
        reason: '',
        description: 'Image is not available for the AD',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql(400);
        expect(res.statusCode).to.eql(400);
        expect(res.body.error).to.eql('Reason field cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Reason field cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if description is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/flag/report')
      .set({
        'Content-Type': 'application/json',
        Authorization: token,
      })
      .send({
        id: 13,
        reason: 'Image not availble',
        description: '',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Description field cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Description field cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});
