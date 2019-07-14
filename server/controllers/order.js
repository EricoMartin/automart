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
  }
  

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
  }
}

export default Order;
