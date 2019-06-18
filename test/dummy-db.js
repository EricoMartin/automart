 //car details
export const car_id = parseInt(carDetail.length + 1000, 10);
export const carDetail = [
  
  {
  	car_id,
  	createdOn: '1st May',
    manufacturer: 'Honda',
    model: 'Accord',
    price: 5000000,
    state: 'New',
    bodyType: 'saloon',
    year: 2009,
    status: 'available'
  },
];

export const testManufacturerDetail = [

  {
  	car_id: 22560,
  	createdOn: '1st May',
    manufacturer: '5000',
    model: 'Accord',
    price: 5000000,
    state: 'used',
    bodyType: 'saloon',
    year: 2009,
    status: 'available'
  },
  
  {
  	car_id:22560,
  	createdOn: '1st May',
    manufacturer: 'Mercedes Benz',
    model: 'Accord',
    price: 'Five hundred',
    state: 'New',
    bodyType: 'saloon',
    year: 2009,
    status: 'available'
  },

  {
  	car_id: 'abcde',
  	createdOn: '1st May',
    manufacturer: '',
    model: 'Accord',
    price: 'Five hundred',
    state: 'New',
    bodyType: 'wagon',
    year: 2009,
    status: 'available'
  },
];

export const updatePrice = [
  {
    price: 3500000,
  },
];

//user details
const id = parseInt(userDetail.length + 1000, 10);
const findEmail = email => userDetail.find(user => user.email === email);

export const userDetail = [
  
  {
  	id ,
  	owner: '54',
    firstName: 'Jason',
    lastName: 'Trello',
    password: '555SSS',
    email: 'jason@gmail.com',
    address: '321 upper crest park, New York, USA',
    confirmPassword: '555SSS',
    is_admin: false,
  },
  {
    id,
    owner: '54',
    firstName: 'Jacob',
    lastName: 'Adele',
    password: '555SSS',
    email: 'adeleon@gmail.com',
    address: '321 upper crest park, New York, USA',
    confirmPassword: '555SSS',
    is_admin: false,
  },
  {
    id,
    owner: '54',
    firstName: 'Kudi',
    lastName: 'Dominic',
    password: '555SSS',
    email: 'linn@gmail.com',
    address: '321 upper crest park, New York, USA',
    confirmPassword: '555SSS',
    is_admin: false,
  },
  {
    id,
    owner: '54',
    firstName: 'Rob',
    lastName: 'Miles',
    password: '555SSS',
    email: 'miley@gmail.com',
    address: '321 upper crest park, New York, USA',
    confirmPassword: '555SSS',
    is_admin: false,
  },
];

export const incorrectUserDetail = [
  
  {
  	id:23056,
  	owner: '54',
    firstName: 'Js56on',
    lastName: 'Trello',
    password: '555SSS',
    email: 'jason@gmail.com',
    address: '321 upper crest park, New York, USA',
    confirmPassword: '555SSS',
    is_admin: false,
  },
  
 
  {
  	id:'',
  	owner: '54',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    address: '',
    confirmPassword: '',
    is_admin: false,
  },
  
];

export const correctLoginDetail = [
  {
    email: 'jason@gmail.com',
    password: '555SSS',
  },
];

export const incorrectLoginDetail = [
  
  {
    email: 'jason123@gmail.com',
    password: '555SSS',
  },
  
  {
    email: 'jason@gmail.com',
    password: '554%SSS',
  },
  // empty email 
  {
    email: '',
    password: '555SSS',
  },
];

export const CarOrder = [
	{
		id: 22560,
    email: 'jason@gmail.com',
    createdOn: '1st May',
    manufacturer: 'Honda',
    price: 4500000, 
    status: 'available',
    state: 'used',
    body_type: 'Saloon',
    priceOffered: 3500000
	},
	{
		id: 22560,
		email: 'jason@gmail.com',
    createdOn: '1st May',
    manufacturer: 'Honda',
    price: 4500000, 
    status: 'available',
    state: 'used',
    body_type: 'Saloon',
		priceOffered: 'abddef'
	},

	{
		id: 'abcs',
		email: 'jason@gmail.com',
    createdOn: '1st May',
    manufacturer: 'Honda',
    price: 4500000, 
    status: 'available',
    state: 'used',
    body_type: 'Saloon',
    priceOffered: 3500000
	},

	{
		id: 22560,
    car_id: 12354;
    email: 'jason@gmail.com',
    createdOn: '1st May',
    manufacturer: 'Honda',
    price: hbdjhdks, 
    status: 'available',
    state: 'used',
    body_type: 'Saloon',
		priceOffered: 3000000
	}
]

export const flagOrder = [
  
  {
    id: 22560,
    car_id: 12354, 
    reason: 'fraudulent',
    description: 'fake advert'
  },

  {
    id: 22560,
    car_id: 12354,
    reason: 'fraudulent',
    description: 'damaged vehicle'
  }
]