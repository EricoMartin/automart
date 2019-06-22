const allCarAds = [];

let data = null;

const createCarAd = (data) =>{
	if(!data){
		throw new Error('Please enter car details');
	}

	const id = parseInt(allCarAds.length, 10);

	const cars = {
		id,
		owner : data.owner,
		createdOn : new Date().toISOString(),
		state : data.state,
		price : data.price,
		manufacturer : data.manufacturer,
		model : data.model,
		bodyType : data.bodyType,
		status : 'available'

	}

	allCarAds.push(cars);
	return cars;
}

const findAd = (id) =>{
	allCarAds.find((carAd) => carAd.id === id);
	
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
  	updateCarAdPrice,
  	
};