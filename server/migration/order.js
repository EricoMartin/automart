import pool from './queries';

class Order {

  static async createOrder(data) {
    const text = 'INSERT INTO orders (car_id, buyer_id, owner_id, created_on, price, price_offered) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    return pool.query(text, data);
  }
  static getAllOrders() {
    return pool.query('SELECT * FROM orders ORDER BY updated_at DESC');
  }

  static getAnOrder(id) {
    const text = 'SELECT * FROM orders WHERE id=$1';
    return pool.query(text, [id]);
  }
  static getOrderPrice(data) {
    const text = 'SELECT price_offered FROM orders WHERE id=$1 AND status NOT IN (\'accepted\', \'cancelled\')';
    return pool.query(text, data);
  }
  static async validOrder(data) {
    const text = 'SELECT id FROM orders WHERE car_id=$1 AND buyer_id=$2 AND status NOT IN (\'rejected\', \'cancelled\')';
    return db.query(text, data);
  }

  static updateOrder(data) {
    const query = 'UPDATE orders SET price_offered=$1 WHERE id=$2 AND buyer_id=$3 returning *';
    return pool.query(query, data);
  }

  static updateOrderStatus(data) {
    const text = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
    return pool.query(text, data);
  }

  static deleteOrderAdmin(id) {
    const query = 'DELETE FROM orders WHERE id=$1 RETURNING *';
    return pool.query(query, [id]);
  }

  static deleteOrderBySeller(data) {
    const query = 'DELETE FROM orders WHERE id=$1 AND seller_id=$2 AND status=\'cancelled\' RETURNING *';
    return pool.query(query, data);
  }

  static getCarDetails(car_id) {
    const query = 'SELECT * FROM cars WHERE car_id=$1';
    return pool.query(query, [car_id]);
  }

}

export default Order;
