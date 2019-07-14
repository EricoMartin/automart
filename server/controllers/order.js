<<<<<<< HEAD
import models from '../models/model/model';
import 'regenerator-runtime';

const { Orders } = models;
/*
  * @description - creates a new order
   * @params {object}
   * @returns {object}
   */

class Order {
  static makeOrder(req, res) {
    try{
    let { carId, price, priceOffered } = req.body;


    carId = parseInt(carId, 10);
    price = parseFloat(price);
    priceOffered = parseFloat(priceOffered);

    const createdOrder = Orders.createOrder({
      carId,
      price,
      priceOffered,
    });

    return res.status(201).json({
      status: 201,
      data: {
        id: createdOrder.id,
        car_id: createdOrder.carId,
        created_on: createdOrder.created_on,
        status: createdOrder.status,
        price: createdOrder.price,
        priceOffered: createdOrder.priceOffered,
      },
    });
  } catch (error) {
=======
import Orders from '../models/order';
import Car from '../models/car';
import APIError from '../helpers/ErrorClass';
import APISuccess from '../helpers/SuccessClass';
import carsData from '../test/mock_db/cars';

class Order {
  static createOrder(req, res) {
    try {
      req.body.buyerId = req.userId;
      let { carId, priceOffered } = req.body;


      carId = parseInt(carId, 10);
      const price = parseFloat(carsData.indexOf(carId).price);
      priceOffered = parseFloat(priceOffered);

      const createdOrder = Orders.createOrder({
        buyer_id: req.body.buyerId,
        owner_id: carsData[carId].owner,
        carId,
        price,
        priceOffered,
      });

      return res.status(201).json({
        status: 201,
        data: {
          id: createdOrder.id,
          car_id: createdOrder.carId,
          buyer_id: createdOrder.buyer_id,
          owner_id: createdOrder.owner_id,
          created_on: createdOrder.createdOn,
          status: createdOrder.status,
          price: createdOrder.price,
          priceOffered: createdOrder.priceOffered,
        },
      });
    } catch (error) {
>>>>>>> code-refactor-travis
      res.status(error.statusCode || 500).json(error.message);
    }
  }

<<<<<<< HEAD
  static updateOrder(req, res) {
    try{
    const id = parseInt(req.params.id, 10);
    const updatedOrder = Orders.updatePrice(id, req.body.newPriceOffered);
    if (updatedOrder === undefined) {
      return res.status(200).json({
        status: 200,
        data: 'No record found',
      });
    }
    if (updatedOrder.status === 'accepted' || updatedOrder.status === 'rejected') {
      return res.status(400).json({
        status: 400,
        error: 'Cannot update price because order status is either accepted or rejected',
      });
    }

    return res.status(200).json({
      status: 200,
      data: {
        id: updatedOrder.id,
        car_id: updatedOrder.carId,
        status: updatedOrder.status,
        old_price_offered: updatedOrder.priceOffered,
        new_price_offered: updatedOrder.newPriceOffered,
      },
    });
  }
  catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
=======
  static updatePrice(req, res) {
    const requiredParams = ['orderId', 'newPrice'];

    const order = Orders.getOrder(req.body.orderId);
    if (!order || order.status.toLowerCase() !== 'pending') {
      return new APIError(404, 'Check that the order is still pending');
    }

    const buyer = req.userId;

    if (parseInt(buyer, 10) !== parseInt(order.buyerId, 10)) {
      return new APIError(403, 'You dont have the permission to modify this order');
    }

    if (parseFloat(req.body.newPrice) === parseFloat(order.priceOffered)) {
      return new APIError(400, 'The new offered price and the old are the same');
    }

    const updatedPriceOrder = Orders.updateOrderPrice(req.body.orderId, req.body.newPrice);
    return new APISuccess(res, 200, updatedPriceOrder);
  }

  static getAllOrders(req, res) {
    const orders = Orders.getAllOrders();
    if (orders < 1) {
      return new APIError(404, 'There are no available orders.');
    }
    return new APISuccess(res, 200, orders);
  }

  static getAnOrder(req, res) {
    const order = Orders.getAnOrder(req.params.orderId);
    if (!order) {
      return new APIError(404, 'Order not found');
    }
    const requester = parseInt(req.userId, 10);
    if ((requester !== parseInt(order.ownerId, 10)) && (requester !== parseInt(order.buyerId, 10))
      && !req.role) {
      return new APIError(403, 'You not authorized to view this order');
    }

    return new APISuccess(res, 200, order);
  }

  static deleteAnOrder(req, res) {
    const order = Orders.getOrder(req.params.orderId);
    if (!order) {
      return new APIError(404, 'The order does not exist');
    }
    const seller = parseInt(order.ownerId, 10);

    // seller can deleted a cancelled order
    const requester = parseInt(req.userId, 10);
    if (requester !== seller && !req.role) {
      return new APIError(403, 'You dont have permission to delete this resource');
    }

    if (order.status.toLowerCase() !== 'cancelled' && requester === seller) {
      return new APIError(res, 400, 'You cannot delete an incomplete transaction');
    }

    const deletedOrder = Orders.deleteOrder(order);

    return new APISuccess(res, 200, deletedOrder[0]);
>>>>>>> code-refactor-travis
  }
}

export default Order;
