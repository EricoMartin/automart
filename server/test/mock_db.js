const cars = [

	
	{
		id:	1,
	  	owner: 1,
	    createdOn: "1/5/2013",
	    manufacturer: "Honda",
	    model: "Accord",
	    price: 5000000,
	    state: "New",
	    bodyType: "saloon",
	    year: 2009,
	    status: "available"
	},
	{
		id:	2,
	  	owner: 2,
	    createdOn: "11/25/2017",
	    manufacturer: "Honda",
	    model: "Accord",
	    price: 4500000,
	    state: "used",
	    bodyType: "wagon",
	    year: 2016,
	    status: "sold"
	},
	{
		id:	3,
	  	owner: 3,
	    createdOn: "7/9/2008",
	    manufacturer: "Mercedes",
	    model: "c300",
	    price: 7500000,
	    state: "used",
	    bodyType: "saloon",
	    year: 2014,
	    status: "available"
	},
	{
		id:	4,
	  	owner: 4,
	    createdOn: "6/13/2015",
	    manufacturer: "Peugot",
	    model: "409",
	    price: 2000000,
	    state: "New",
	    bodyType: "saloon",
	    year: 2009,
	    status: "available"
	}

];

const users = [
	{
	
		id:	1,
		email: "jason@gmail.com",
	    firstName: "Jason",
	    lastName: "Trello",
	    password: "555SSS777",
	    address: "321 upper crest park, New York, USA",
	    is_admin: true
	
	},
	{
	
		id:	2,
		email: "dammy@gmail.com",
	    firstName: "dammy",
	    lastName: "Gonzalez",
	    password: "555SSS777",
	    address: "R280 wood west park, Milwaukee, USA",
	    is_admin: false
	
	}
];
const orders = [
	{
		order_id:	1,
		buyer: 1,
	    car_id: 1,
	    amount: 3500000,
	    status: "avaialble",
	}
];

const flags = [
	{
		flag_id:	1,
		car_id: 3,
	    createdOn: "1st May",
	    reason: "damaged car",
	    description: " ABC Tried to sell a damaged Peugot car to me"
	}
];

 export default {cars, orders, users, flags};