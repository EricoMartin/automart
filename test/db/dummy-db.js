 //car details

export const carDetail = [
  
  {
  	id: 0012,
  	createdOn: '1st May',
    make: 'Honda',
    model: 'Accord',
    price: 5000000,
    state: 'New',
    bodyType: 'saloon',
    year: 2009
  },
];

export const testMakeDetail = [

  {
  	id: 0012,
  	createdOn: '1st May'
    make: '5000',
    model: 'Accord',
    price: 5000000,
    state: 'New',
    bodyType: 'saloon',
    year: 2009
  },
  
  {
  	id: 0012,
  	createdOn: '1st May'
    make: 'Honda',
    model: 'Accord',
    price: 'Five hundred',
    state: 'New',
    bodyType: 'saloon',
    year: 2009
  },

  {
  	id: 0012,
  	createdOn: '1st May'
    make: '',
    model: 'Accord',
    price: 'Five hundred',
    state: 'New',
    bodyType: 'wagon',
    year: 2009
  },
];

export const updatePrice = [
  {
    price: 3500000,
  },
];

//user details

export const userDetail = [
  
  {
  	id: 23056,
  	owner: '54',
    firstName: 'Jason',
    lastName: 'Trello',
    password: '555SSS',
    email: 'jason@gmail.com',
    address: '321 upper crest park, New York, USA',
    confirmPassword: '555SSS',
    is_admin: true;
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
    is_admin: false;
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
    is_admin: false;
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
		id = 0012,
		price = 4500000, 
		priceOffered = 3000000
	},
	{
		id = 0045,
		price = 3200000, 
		priceOffered = abddef
	},

	{
		id = abcs,
		price = 5000000, 
		priceOffered = 3500000
	},

	{
		id = 0045,
		price = hbdjhdks, 
		priceOffered = 3000000
	}
]