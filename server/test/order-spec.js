import { expect } from 'chai';
import orderData from './mock_db/orders';
import Order from '../models/order';
import user from './mock_db/users';
import carsData from './mock_db/cars';


describe('Test Order Endpoint', () => {
  describe('Create a car order', () => {
    it('should create a car purchase order', () => {
      const buyer_id = user[2].id;
      const owner_id = carsData[0].owner;
      const newOrder = {
        car_id: 1,
        buyer_id: buyer_id,
        owner_id: owner_id,
        email: 'jason@gmail.com',
        created_on: '5/15/2018',
        manufacturer: 'Honda',
        price: 4500000,
        status: 'available',
        state: 'used',
        body_type: 'Saloon',
        price_offered: 3500000,
      };
      const order = Order.createOrder(newOrder);
      expect(order).to.have.property('created_on');
      expect(order).to.have.property('price_offered');
      expect(order.owner_id).to.eq(carsData[0].owner);
      expect(order.buyer_id).to.eq(user[2].id);
    });
  });

  describe('Get all orders', () => {
    it('should return all orders', () => {
      Order.orders = orderData;
      const allOrders = Order.getAllOrders();
      expect(allOrders).to.be.an('Array');
      expect(allOrders[0].id).to.eq(orderData[0].id);
    });
  });
  describe('Get a single order', () => {
    it('should return a specific order', () => {
      Order.orders = orderData;
      const getOrder = Order.getAnOrder(orderData[0].id);
      expect(getOrder).to.be.an('object');
      expect(getOrder.id).to.equal(orderData[0].id);
    });
  });
  describe('Update an order', () => {
    it('should update the status of an order', () => {
      orderData[0].status = 'pending';
      Order.orders = orderData;
      const updatedOrder = Order.updateOrder(orderData[0].id, 'sold');
      expect(updatedOrder.status).to.equal('sold');
      expect(updatedOrder.id).to.equal(orderData[0].id);
    });
  });
  describe('Delete an order', () => {
    it('should delete an order', () => {
      Order.orders = orderData;
      const { length } = orderData;
      const order = orderData[0];

      Order.deleteOrder(order);
      const res = Order.getAnOrder(order.id);
      expect(res).to.equal(undefined);
      expect(orderData.length).to.equal(length - 1);
    });
  });
});

