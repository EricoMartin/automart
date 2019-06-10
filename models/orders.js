const allOrders = [];

let data = null;

const createOrder = (data) => {
  if (!data) {
    throw new Error('Please provide an object');
  }

  const id = parseInt(allOrders.length);
  const orderData = {
    id,
    buyer = null;
    carId = null;
    amount = null;
    created_on: new Date().toISOString(),
    status: 'pending',
  };

  allOrders.push(orderData);

  return orderData;
};

// Find one order
const findOneOrder = id => allOrders.find(order => order.id === id);

const updatePrice = (id, data) => {
  // Find the order
  const order = findOneOrder(id);

  if (order !== undefined) {
    if (order.status === 'pending') {
      order.newPriceOffered = parseFloat(data);
    }
  }
  return order;
};

export { createOrder, updatePrice, allOrders };