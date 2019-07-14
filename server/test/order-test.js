import chai from 'chai';
import chaiHttp from 'chai-http';
import carsData from './mock_db/cars';
import app from '../app';
import CarModel from '../models/car';
import UserModel from '../models/user';
import FlagModel from '../models/flag';
import usersData from './mock_db/users';
import flagsData from './mock_db/flags';
import ordersData from './mock_db/orders';
import OrderModel from '../models/order';

const { expect } = chai;
chai.use(chaiHttp);

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJJYnUgRXJpYyIsImxhc3ROYW1lIjoiTWFydGluaSIsImFkZHJlc3MiOiIxLCBhZHJlc3Mgc3RyZWV0Iiwic3RhdHVzIjoicmVnaXN0ZXJlZCIsImVtYWlsIjoibWFydGluaXJleEB5YWhvby5jby51ayIsImlzX2FkbWluIjpmYWxzZSwicGFzc3dvcmQiOiIxMTExMTExMSJ9LCJpYXQiOjE1NjMwMjkyNTQsImV4cCI6MTU2MzE1ODg1NH0.hb5yIrzbO_JgBZYzgTyRPn9yriKaVGymKB86kEXkS6s';


describe('Order transaction', () => {
  describe('Create order', () => {
    it('should create an order', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;
      const price = parseInt(carsData[0].price, 10) - 500000;
      const data = {
        buyerId: user.id,
        carId: carsData[0].id,
        price: carsData[0].price,
        priceOffered: price,
        sellerId: usersData[1].id,
      };
      chai.request(app).post('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('carId').eq(data.carId);
          expect(res.body.data.price).to.eq(data.price);
          expect(res.body.data.priceOffered).to.eq(data.priceOffered);
          expect(res.body.data.sellerId).to.eq(data.sellerId);
          expect(res.body.data.buyerId).to.eq(data.buyerId);
          done();
        });
    });
    it('should return error 400 if carId or price is not supplied', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;
      const data = {
        buyerId: user.id,
        carId: carsData[0].id,
        price: carsData[0].price,
        priceOffered: '',
        sellerId: usersData[1].id,
      };
      chai.request(app).post('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Select car and state amount you want to pay');
          done();
        });
    });
    it('should return error 400 if car id is invalid', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;
      const price = parseInt(carsData[0].price, 10) - 500000;
      const data = {
        buyerId: user.id,
        carId: 111222333444,
        price: carsData[0].price,
        priceOffered: price,
        sellerId: usersData[1].id,
      };
      chai.request(app).post('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Select car and state amount you want to pay');
          done();
        });
    });
    it('should return error 404 if car is not found', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;
      const price = parseInt(carsData[0].price, 10) - 500000;
      const data = {
        buyerId: user.id,
        carId: 1112223334445,
        price: carsData[0].price,
        priceOffered: price,
        sellerId: usersData[1].id,
      };
      chai.request(app).post('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('This car is not available for purchase');
          done();
        });
    });
    it('should return error 404 if car status is not == available', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;
      carsData[0].status = 'sold';
      const price = parseInt(carsData[0].price, 10) - 500000;
      const data = {
        buyerId: user.id,
        carId: carsData[0].id,
        price: carsData[0].price,
        priceOffered: price,
        sellerId: usersData[1].id,
      };
      chai.request(app).post('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('This car is not available for purchase');
          done();
        });
    });
    it('should return 404 if seller is not active', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;
      usersData[1].status = 'suspended';
      carsData[0].status = 'available';
      const price = parseInt(carsData[0].price, 10) - 500000;
      const data = {
        buyerId: user.id,
        carId: carsData[0].id,
        price: carsData[0].price,
        priceOffered: price,
        sellerId: usersData[1].id,
      };
      chai.request(app).post('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('Unverified seller. Kindly check back');
          done();
        });
    });
    it('should return 401 if user is not logged in', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;

      const user = usersData[0];
      user.isAdmin = false;
      const price = parseInt(carsData[0].price, 10) - 500000;
      const data = {
        buyerId: user.id,
        carId: carsData[0].id,
        price: carsData[0].price,
        priceOffered: price,
        sellerId: usersData[1].id,
      };
      chai.request(app).post('/api/v1/order').send(data)
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body.message).to.eq('No authorization token provided');
          done();
        });
    });
  });
  // seller update order price
  describe('Seller update order price while status is still pending', () => {
    it('should update the order price ', (done) => {
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      ordersData[0].sellerId = user.id;
      ordersData[0].status = 'pending';
      ordersData[0].buyerId = usersData[0].id;

      user.isAdmin = false;
      const newPrice = parseInt(ordersData[0].price, 10) - 100000;
      const data = {
        orderId: ordersData[0].id,
        newPrice,
      };
      chai.request(app).patch('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data.priceOffered).to.eq(data.newPrice);
          expect(res.body.data.buyerId).to.eq(user.id);
          done();
        });
    });
    it('should return error 400 if newprice is not stated ', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      ordersData[0].buyerId = user.id;

      user.isAdmin = false;
      const data = {
        orderId: ordersData[0].id,
        newPrice: '',
      };
      chai.request(app).patch('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Ensure to send the order id and new price');
          done();
        });
    });
    it('should return error 400 if order id is not supplied ', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      ordersData[0].buyerId = user.id;

      user.isAdmin = false;
      const newPrice = parseInt(ordersData[0].price, 10);
      const data = {
        orderId: '',
        newPrice,
      };
      chai.request(app).patch('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Ensure to send the order id and new price');
          done();
        });
    });
    it('should return error 404 if order is not found', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      ordersData[0].buyerId = user.id;

      user.isAdmin = false;
      const newPrice = parseInt(ordersData[0].price, 10);
      const data = {
        orderId: '6667778889990',
        newPrice,
      };
      chai.request(app).patch('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('Check that the order is still pending');
          done();
        });
    });
    it('should return error 404 if order is no longer pending', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      ordersData[0].buyerId = user.id;

      user.isAdmin = false;
      const newPrice = parseInt(ordersData[0].price, 10);
      ordersData[0].status = 'Rejected';
      const data = {
        orderId: ordersData[0].id,
        newPrice,
      };
      chai.request(app).patch('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('Check that the order is still pending');
          done();
        });
    });
    it('should return error 400 if old and new prices are the same ', (done) => {
      carsData[0].owner = usersData[1].id;
      CarModel.cars = carsData;
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];

      user.isAdmin = false;
      ordersData[0].status = 'pending';
      const data = {
        orderId: ordersData[0].id,
        newPrice: ordersData[0].priceOffered,
      };
      chai.request(app).patch('/api/v1/order').set('Authorization', token).send(data)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('The new offered price and the old are the same');
          done();
        });
    });
  });
  
  // view all orders
  describe('View all orders', () => {
    it('should return all orders placed', (done) => {
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = true;

      chai.request(app).get('/api/v1/orders').set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data).to.be.an('Array');
          expect(res.body.data[0]).to.have.property('id').eq(ordersData[0].id);
          done();
        });
    });
    it('should return error 404 if there are no orders', (done) => {
      UserModel.users = usersData;
      OrderModel.orders = [];
      const user = usersData[0];
      user.isAdmin = true;

      chai.request(app).get('/api/v1/orders').set('Authorization', token)
        .end((err, res) => {
          expect(res.body.status).to.eq(404);
          expect(res.body.message).to.eq('There are no orders now. Check back');
          done();
        });
    });
    it('should return error 401 if user is not logged in', (done) => {
      OrderModel.orders = ordersData;

      chai.request(app).get('/api/v1/orders')
        .end((err, res) => {
          expect(res.body.status).to.eq(401);
          expect(res.body.message).to.eq('No authorization token provided');
          done();
        });
    });
    it('should return error 401 if user is not admin', (done) => {
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = false;

      chai.request(app).get('/api/v1/orders').set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body.message).to.eq('You dont have the permission to access this resource');
          done();
        });
    });
  });
  // view a single order
  describe('View a single order', () => {
    it('should return order if it is admin', (done) => {
      UserModel.users = usersData;
      const { id } = ordersData[0];
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = true;

      chai.request(app).get(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data.id).to.eq(id);
          done();
        });
    });
    it('should return order if it is the seller', (done) => {
      UserModel.users = usersData;
      const { id } = ordersData[0];
      ordersData[0].sellerId = usersData[0].id;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = false;

      chai.request(app).get(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data.id).to.eq(id);
          done();
        });
    });
    it('should return order if it is the buyer', (done) => {
      UserModel.users = usersData;
      const { id } = ordersData[0];
      ordersData[0].buyerId = usersData[0].id;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = false;

      chai.request(app).get(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data.id).to.eq(id);
          done();
        });
    });
    it('should return error 404 if order is not found', (done) => {
      UserModel.users = usersData;
      const { id } = ordersData[0] + 1;
      ordersData[0].buyerId = usersData[0].id;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = false;

      chai.request(app).get(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('Order not found');
          done();
        });
    });
    it('should return error 403 if it is not buyer or seller or admin', (done) => {
      UserModel.users = usersData;
      const { id } = ordersData[0];
      ordersData[0].buyerId = usersData[1].id;
      ordersData[0].sellerId = usersData[2].id;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = false;

      chai.request(app).get(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(403);
          expect(res.body.message).to.eq('You dont have the permission to view this resource');
          done();
        });
    });
  });

  // update order status
  describe('Seller and Buyer update order status', () => {
    afterEach(() => {
      UserModel.users = [];
      OrderModel.orders = [];
    });
    it('should update order status by seller when it is pending', (done) => {
      const { id } = ordersData[0];
      ordersData[0].status = 'pending';
      ordersData[0].sellerId = usersData[0].id;
      ordersData[0].buyerId = usersData[1].id;
      usersData[1].status = 'active';
      OrderModel.orders = ordersData;
      UserModel.users = usersData;
      const user = usersData[0];
      user.isAdmin = false;
      chai.request(app).patch(`/api/v1/orders/${id}`).set('Authorization', token).send({ status: 'accepted' })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data.id).to.eq(id);
          expect(res.body.data.status).to.eq('accepted');
          done();
        });
    });
    it('should update order status by buyer if the status is accepted', (done) => {
      const { id } = ordersData[0];
      ordersData[0].status = 'accepted';
      ordersData[0].sellerId = usersData[0].id;
      ordersData[0].buyerId = usersData[1].id;
      OrderModel.orders = ordersData;
      UserModel.users = usersData;
      const user = usersData[1];
      user.isAdmin = false;
      chai.request(app).patch(`/api/v1/orders/${id}`).set('Authorization', token).send({ status: 'completed' })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data.id).to.eq(id);
          expect(res.body.data.status).to.eq('completed');
          done();
        });
    });
    it('should return error 400 if status is not sent', (done) => {
      const { id } = ordersData[0];
      ordersData[0].status = 'accepted';
      ordersData[0].sellerId = usersData[0].id;
      ordersData[0].buyerId = usersData[1].id;
      OrderModel.orders = ordersData;
      UserModel.users = usersData;
      const user = usersData[1];
      user.isAdmin = false;
      chai.request(app).patch(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Invalid input');
          done();
        });
    });
    it('should return error 404 if order id is not found', (done) => {
      const { id } = ordersData[0];
      ordersData[0].status = 'accepted';
      ordersData[0].sellerId = usersData[0].id;
      ordersData[0].buyerId = usersData[1].id;
      OrderModel.orders = ordersData;
      UserModel.users = usersData;
      const user = usersData[1];
      user.isAdmin = false;
      chai.request(app).patch(`/api/v1/orders/${id + 1}`).set('Authorization', token).send({ status: 'completed' })
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('Order details not found');
          done();
        });
    });
    it('should return error 406 if seller or buyer is inactive', (done) => {
      const { id } = ordersData[1];
      ordersData[1].sellerId = usersData[1].id;
      ordersData[1].buyerId = usersData[2].id;
      usersData[2].status = 'disabled';
      OrderModel.orders = ordersData;
      UserModel.users = usersData;
      const user = usersData[1];
      user.isAdmin = false;
      chai.request(app).patch(`/api/v1/orders/${id}`).set('Authorization', token).send({ status: 'completed' })
        .end((err, res) => {
          expect(res.status).to.eq(406);
          expect(res.body.message).to.eq('Seller or buyer inactive');
          done();
        });
    });
    it('should return error 403 if another user/admin attempts to update the order status', (done) => {
      const { id } = ordersData[1];
      ordersData[1].sellerId = usersData[1].id;
      ordersData[1].buyerId = usersData[0].id;
      usersData[0].status = 'active';
      usersData[1].status = 'active';
      OrderModel.orders = ordersData;
      UserModel.users = usersData;
      const user = usersData[2];
      user.isAdmin = true;
      chai.request(app).patch(`/api/v1/orders/${id}`).set('Authorization', token).send({ status: 'completed' })
        .end((err, res) => {
          expect(res.status).to.eq(403);
          expect(res.body.message).to.eq('You dont have the permission to modify this resource');
          done();
        });
    });
    it('should return error 400 if buyer wants to update a pending order', (done) => {
      const { id } = ordersData[1];
      ordersData[1].sellerId = usersData[1].id;
      ordersData[1].buyerId = usersData[0].id;
      usersData[0].status = 'active';
      usersData[1].status = 'active';
      OrderModel.orders = ordersData;
      UserModel.users = usersData;
      const user = usersData[0];
      user.isAdmin = false;
      chai.request(app).patch(`/api/v1/orders/${id}`).set('Authorization', token).send({ status: 'completed' })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('You cannot update the status of this order at its state');
          done();
        });
    });
    it('should return error 400 if seller wants to update a cancelled order', (done) => {
      const { id } = ordersData[1];
      ordersData[1].status = 'cancelled';
      ordersData[1].sellerId = usersData[1].id;
      ordersData[1].buyerId = usersData[0].id;
      usersData[0].status = 'active';
      usersData[1].status = 'active';
      OrderModel.orders = ordersData;
      UserModel.users = usersData;
      const user = usersData[1];
      user.isAdmin = false;
      chai.request(app).patch(`/api/v1/orders/${id}`).set('Authorization', token).send({ status: 'completed' })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('You cannot update the status of this order at its state');
          done();
        });
    });
  });

  // delete an order -  seller and admin can delete a cancelled order
  describe('deletes a cancelled order', () => {
    it('should return error 400 if seller attempts to delete an uncancelled order', (done) => {
      UserModel.users = usersData;
      const { id } = ordersData[0];
      ordersData[0].status = 'rejected';
      ordersData[0].sellerId = usersData[0].id;
      ordersData[0].buyerId = usersData[1].id;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = false;
      chai.request(app).delete(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('You cannot delete an incomplete transaction');
          done();
        });
    });
    it('should return error 404 if order is not found', (done) => {
      UserModel.users = usersData;
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = true;
      chai.request(app).delete('/api/v1/orders/1678787878781').set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(404);
          expect(res.body.message).to.eq('The order does not exist');
          done();
        });
    });
    it('should return error 403 if a logged in user attempts to delete the order', (done) => {
      UserModel.users = usersData;
      const { id } = ordersData[0];
      ordersData[0].sellerId = usersData[0].id;
      ordersData[0].buyerId = usersData[1].id;
      OrderModel.orders = ordersData;
      const user = usersData[2];
      user.isAdmin = false;
      chai.request(app).delete(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(403);
          expect(res.body.message).to.eq('You dont have permission to delete this resource');
          done();
        });
    });

    it('should let admin delete any order', (done) => {
      UserModel.users = usersData;
      const { id } = ordersData[0];
      ordersData[0].status = 'accepted';
      OrderModel.orders = ordersData;
      const user = usersData[0];
      user.isAdmin = true;
      chai.request(app).delete(`/api/v1/orders/${id}`).set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data.id).to.eq(id);
          done();
        });
    });
  });
});

