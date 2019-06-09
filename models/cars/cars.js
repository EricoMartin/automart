const allCarAds = [];

let data = null;

const createCarAd = (data) =>{
	if(!data){
		throw new Error("Please enter a car object");
	}

	const id = parseInt(allCarAds.length);

	const cars = {
		id;
		owner = null;
		createdOn = new Date();
		state = null;
		price = null;
		manufacturer = null;
		model = null;
		bodyType = null;
		status = 'available';

	}

	allCarAds.push(cars);
	return cars;
}

const findAd = (id) =>{
	allCarAds.find( carAd){
	return carAd.id === id;
	}
}

const updateStatus = (id, data) => {

	const carAd = findAd(id);
	carAd.status = data;
	return carAd;
}

const updateCarAdPrice = (id, data) => {
  
  const carAd = findAd(id);

  carAd.price = parseFloat(data);

  return carAd;
};

export default {
	
	allCarAds,
  	createCarAd,
  	updateStatus,
  	updateCarAdPrice
  
};