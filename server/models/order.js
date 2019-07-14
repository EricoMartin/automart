import orderData from '../test/mock_db/orders';

  const createOrder =(data) =>{
    const orderdata = {
      id: parseInt(orderData.length + 1, 10),
      car_id: data.carId,
      buyer_id: data.buyerId,
      owner_id: data.ownerId,
      createdOn: new Date().toLocaleString(),
      price: data.price || 0,
      status: 'rejected' || 'pending' || 'accepted',
      body_type: data.body_type || '',
      priceOffered: data.priceOffered || '',
    };

    orderData.push(orderdata);
    return orderdata;
  }

  const getAllOrders = () =>{
    return orderData;
  }

  const getAnOrder = (id) =>{
    return orderData.find(order => order.id === id);
  }

  const updateOrderPrice = (orderId, newPrice) =>{
    const order = orderData.getAnOrder(orderId);
    order.priceOffered = parseFloat(newPrice);
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
