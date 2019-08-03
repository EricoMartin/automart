import Orders from '../migration/order';

class Order {
  static async createOrder(req, res) {
    try {
      let { buyer_id, price_offered } = req.body;
      const { car_id } = req.body;
      const created_on = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

      if (!car_id || !buyer_id || !price_offered) {
        return res.status(400).json({
          status: 400,
          message: 'Fill all required fields',
        });
      }
      req.body.car_id = parseInt(req.body.car_id, 10);
      buyer_id = parseInt(buyer_id, 10);
      // const price = parseFloat(carsData.indexOf(car_id).price);
      price_offered = parseFloat(price_offered);

      const { rows } = await Orders.getCarDetails(req.body.car_id);
      // eslint-disable-next-line max-len

      if (rows.length < 1 || rows[0].status.toLowerCase() !== 'available') {
        return res.status(400).json({
          status: 400,
          message: 'The car is not available.',
        });
      }

      const validateOrder = await Orders.validOrder([req.body.car_id, req.body.buyer_id]);
      if (validateOrder.rows.length > 0) {
        return res.status(400).json({
          status: 400,
          message: 'This is a completed order ',
        });
      }
      const { email } = req;
      const owner_id = rows[0].owner;
      const amount = price_offered;
      const values = [req.body.car_id, buyer_id, owner_id, email, created_on, rows[0].manufacturer, rows[0].model, rows[0].price, amount];

      const createdOrder = await Orders.createOrder(values);
      return res.status(201).json({
        status: 201,
        data: createdOrder.rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  static async updatePrice(req, res) {
    try {
      const { order_id } = req.params;
      if (!req.body.price || !req.body.status || !req.body.user_id) {
        return res.status(400).json({
          status: 400,
          message: 'user_id, price and status are required',
        });
      }

      const newStatus = req.body.status.toLowerCase();
      const { price } = req.body;

      const { rows } = await Orders.getAnOrder(order_id);
      if (rows.length < 1 || rows.length > 1) {
        return res.status(404).json({
          status: 404,
          message: 'Check that the order is still pending',
        });
      }

      const buyer_id = req.body.user_id;

      if (parseFloat(req.body.price) === parseFloat(rows[0].price_offered)) {
        return res.status(400).json({
          status: 400,
          message: 'The new offered price and the old are the same',
        });
      }

      const val = [price, order_id, buyer_id];
      const values = [newStatus, order_id];
      if (req.params.order_id) {
        const updatedPriceOrder = await Orders.updateOrder(val);
        return res.status(200).json({
          status: 200,
          data: updatedPriceOrder.rows[0],
        });
      }
      const updateStatus = await Orders.updateOrderStatus(values);
      return res.status(200).json({
        status: 200,
        data: updateStatus.rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  static async getAllOrders(req, res) {
    try {
      const { rows } = await Orders.getAllOrders();
      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'There are no available orders.',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  static async getAnOrder(req, res) {
    try {
      const { rows } = await Orders.getAnOrder(req.params.order_id);
      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'Order not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  static async deleteAnOrder(req, res) {
    try {
      const { rows } = await Orders.getAnOrder(req.params.order_id);
      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'The order does not exist',
        });
      }
      const seller = parseInt(rows[0].owner_id, 10);

      const { user_id, role } = req;
      // seller can deleted a cancelled order
      const requester = parseInt(req.user_id, 10);
      if (requester !== seller && !req.role) {
        return res.status(403).json({
          status: 403,
          message: 'You dont have permission to delete this resource',
        });
      }
      const del = (role) ? await Orders.deleteOrderAdmin(req.params.order_id)
        : await Orders.deleteOrderBySeller([req.params.order_id, user_id]);

      return res.status(200).json({
        status: 200,
        data: del.rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }
}

export default Order;
