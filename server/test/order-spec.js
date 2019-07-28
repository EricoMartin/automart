import { expect } from 'chai';
import orderData from './mock_db/orders';
import Order from '../models/order';


describe('Test Order Endpoint', () => {
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
