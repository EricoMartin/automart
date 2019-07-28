/* eslint-disable */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJEb24iLCJpYXQiOjE1NjM5OTY1MDAsImV4cCI6MTU2NDYwMTMwMH0.SMCMg903d1SDuxRTYBhTWL4KPdxap__UaLUPtisOp3g';


describe('Orders Test', () => {
  const newOrder = {
    car_id: 30,
    buyer_id: 2,
    owner_id: 1,
    email: 'jason@gmail.com',
    manufacturer: 'Honda',
    model: 'Accord',
    price: 5000000,
    price_offered: 4500000,
  };
  describe('POST /api/v1/order', () => {
    it('should not make a purchase order when one or all the fields are not provided', (done) => {
      chai.request(app)
        .post('/api/v1/order/')
        .set('Authorization', token)
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not make a purchase order if wrong id values are sent', (done) => {
      chai.request(app)
        .post('/api/v1/order/')
        .set('Authorization', token)
        .send({
          car_id: 33,
          price: 1200000,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});

describe('PATCH /api/v1/order/:order_id/price', () => {
  const update = {
    price: 1200000.001,
    user_id: 2,
    status: 'pending',
  };
  it('should update the price of a purchase order', (done) => {
    chai.request(app)
      .patch('/api/v1/order/2/price')
      .set('Authorization', token)
      .send(update)
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should not update the order price if the status is accepted or rejected', (done) => {
    chai.request(app)
      .patch('/api/v1/order/5/price')
      .set('Authorization', token)
      .send(update)
      .end((err, res) => {
        expect(res.status).to.be.eql(404);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('object');
      });
    done();
  });
  it('should not update price if the new price is not a float', (done) => {
    chai.request(app)
      .patch('/api/v1/order/3/price')
      .set('Authorization', token)
      .send({ price: '1222kl' })
      .end((err, res) => {
        expect(res.status).to.be.eql(400);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('object');
        done();
      });
  });
}); '';
