import Orders from '../models/order';
import Car from '../models/car';
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
      res.status(error.statusCode || 500).json(error.message);
    }
  }

  static updatePrice(req, res) {
    const requiredParams = ['orderId', 'newPrice'];

    const order = Orders.getOrder(req.body.orderId);
    if (!order || order.status.toLowerCase() !== 'pending') {
      return res.status(400).json({
        status: 404,
        message: 'Check that the order is still pending'
      });
    }

    const buyer = req.userId;

    if (parseInt(buyer, 10) !== parseInt(order.buyerId, 10)) {
      return res.status(403).json({
        status: 403,
        message: 'You dont have the permission to modify this order'
      });
    }

    if (parseFloat(req.body.newPrice) === parseFloat(order.priceOffered)) {
      return res.status(400).json({
        status: 400,
        message: 'The new offered price and the old are the same'
      }); 
    }

    const updatedPriceOrder = Orders.updateOrderPrice(req.body.orderId, req.body.newPrice);
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
    const order = Orders.getAnOrder(req.params.orderId);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'Order not found'
      });
    }
    const requester = parseInt(req.userId, 10);
    if ((requester !== parseInt(order.ownerId, 10)) && (requester !== parseInt(order.buyerId, 10))
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
    const order = Orders.getOrder(req.params.orderId);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'The order does not exist'
      }); 
    }
    const seller = parseInt(order.ownerId, 10);

    // seller can deleted a cancelled order
    const requester = parseInt(req.userId, 10);
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
