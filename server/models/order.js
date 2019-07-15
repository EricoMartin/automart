import orderData from '../test/mock_db/orders';

  const createOrder =(data) =>{
    const orderdata = {
      id: parseInt(orderData.length + 1, 10),
      car_id: data.car_id,
      buyer_id: data.buyer_id,
      owner_id: data.owner_id,
      created_on: new Date().toLocaleString(),
      price: data.price || 0,
      status: 'rejected' || 'pending' || 'accepted',
      body_type: data.body_type || '',
      price_offered: data.price_offered || '',
    };

    orderData.push(orderdata);
    return orderdata;
  }

  const getAllOrders = () =>{
    return orderData;
  }

  const getAnOrder = (id) =>{
    return orderData.find(order => parseInt(order.id, 10) === parseInt(id, 10));
  }

  const updateOrderPrice = (order_id, price) =>{
    const order = orderData.getAnOrder(order_id);
    order.price_offered = parseFloat(price);
    return order;
  }

  const updateOrder = (id, orderStatus) =>{
    const update = orderData.find(order => order.id === id);
    update.status = orderStatus;
    return update;
  }

  const deleteOrder =(id) =>{
    const idx = orderData.indexOf(id);
    return orderData.splice(idx, 1);
  }


export default{
  createOrder,
  getAllOrders,
  getAnOrder,
  updateOrderPrice,
  updateOrder, 
  deleteOrder
};
