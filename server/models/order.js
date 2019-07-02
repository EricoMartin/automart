import orderData from '../test/mock_db/orders';

class Order{
	constructor(){
		this.orders = orderData;
	}

	createOrder(data){
		const orderdata = {
			id  = parseInt(this.orders.length + 1, 10); 
			car_id: 12354,
			buyer_id: 10,
			owner_id: 4,
			email: 'jackson@gmail.com',
			createdOn: '5/15/2018',
			manufacturer: 'Honda',
			model: 'Civic',
			price: 5500000, 
			status: 'available',
			state: 'used',
			body_type: 'Sedan',
			priceOffered: 3000000
		}

		orderData.push(orderdata);
		return orderdata;
 	}
}