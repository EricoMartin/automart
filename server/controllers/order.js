import Orders from '../models/order';
import Car from '../models/car';
import carsData from '../test/mock_db/cars';

class Order {
  static createOrder(req, res) {
    try {
      
      let { car_id, buyer_id, price_offered } = req.body;
      let car = req.body.car_id;


      car_id = parseInt(car_id, 10);
      buyer_id = parseInt(buyer_id, 10);
      const price = parseFloat(carsData.indexOf(car_id).price);
      price_offered = parseFloat(price_offered);

      const createdOrder = Orders.createOrder({
        buyer_id: req.body.buyer_id,
        owner_id: carsData[car - 1].owner,
        car_id,
        price,
        price_offered: req.body.price_offered,
      });

      return res.status(201).json({
        status: 201,
        data: {
          id: createdOrder.id,
          car_id: createdOrder.car_id,
          buyer_id: createdOrder.buyer_id,
          owner_id: createdOrder.owner_id,
          created_on: createdOrder.created_on,
          status: createdOrder.status,
          price: createdOrder.price,
          price_offered: createdOrder.price_offered,
        },
      });
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }

  static updatePrice(req, res) {
    
    const order_id = req.params.id;
    let { price } = req.body;

    const order = Orders.getAnOrder(order_id);
    if (!order || order.status.toLowerCase() !== 'pending') {
      return res.status(404).json({
        status: 404,
        message: 'Check that the order is still pending'
      });
    }

    const buyer = req.body.user_id;

    if (parseInt(buyer, 10) !== parseInt(order.buyer_id, 10)) {
      return res.status(403).json({
        status: 403,
        message: 'You dont have the permission to modify this order'
      });
    }

    if (parseFloat(req.body.price) === parseFloat(order.price_offered)) {
      return res.status(400).json({
        status: 400,
        message: 'The new offered price and the old are the same'
      }); 
    }

    const updatedPriceOrder = Orders.updateOrderPrice(order_id, price);
    return res.status(200).json({
        status: 200,
        data: updatedPriceOrder
      }); 
  }

  static getAllOrders(req, res) {
    const orders = Orders.getAllOrders();
    if (orders < 1) {
     return res.status(404).json({
        status: 404,
        message: 'There are no available orders.'
      }); 
    }
     return res.status(200).json({
        status: 200,
        data: orders
      });  
  }

  static getAnOrder(req, res) {
    const order = Orders.getAnOrder(req.params.order_id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'Order not found'
      });
    }
    const requester = parseInt(req.user_id, 10);
    if ((requester !== parseInt(order.ownerId, 10)) && (requester !== parseInt(order.buyer_id, 10))
      && !req.role) {
      return res.status(403).json({
        status: 403,
        message: 'You not authorized to view this order'
      }); 
    }

    return res.status(200).json({
        status: 200,
        data: order
      });
  }

  static deleteAnOrder(req, res) {
    const order = Orders.getAnOrder(req.params.order_id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'The order does not exist'
      }); 
    }
    const seller = parseInt(order.owner_id, 10);

    // seller can deleted a cancelled order
    const requester = parseInt(req.user_id, 10);
    if (requester !== seller && !req.role) {
      return res.status(403).json({
        status: 403,
        message: 'You dont have permission to delete this resource'
      }); 
    }

    if (order.status.toLowerCase() !== 'cancelled' && requester === seller) {
      return res.status(400).json({
        status: 400,
        message: 'You cannot delete an incomplete transaction'
      }); 
    }

    const deletedOrder = Orders.deleteOrder(order);

    return res.status(200).json({
        status: 200,
        data: deletedOrder[0]
      }); 
  }
}

export default Order;
