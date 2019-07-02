import orderData from '../test/mock_db/orders';

class Order {
  constructor() {
    this.orders = orderData;
  }

  createOrder(data) {
    const orderdata = {
      id: parseInt(this.orders.length + 1, 10),
      car_id: data.car_id,
      buyer_id: data.buyer_id,
      owner_id: data.owner_id,
      email: data.email,
      createdOn: new Date().toLocaleString(),
      manufacturer: data.manufacturer || '',
      model: data.model || '',
      price: data.price || '',
      status: 'available' || 'pending' || 'accepted',
      state: data.state || '',
      body_type: data.body_type || '',
      priceOffered: data.priceOffered || '',
    };

    orderData.push(orderdata);
    return orderdata;
  }

  getAllOrders() {
    return this.orders;
  }

  getAnOrder(id) {
    return this.orders.find(order => order.id === id);
  }

  updateOrderPrice(orderId, newPrice) {
    const order = this.getAnOrder(orderId);
    order.priceOffered = parseFloat(newPrice);
    return order;
  }

  updateOrder(id, orderStatus) {
    const update = this.orders.find(order => order.id === id);
    update.status = orderStatus;
    return update;
  }

  deleteOrder(id) {
    const idx = this.orders.indexOf(id);
    return this.orders.splice(idx, 1);
  }
}

export default new Order();
