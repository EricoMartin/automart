import carsData from '../test/mock_db/cars';

class Car {
  constructor() {
    this.cars = carsData;
  }

  newCarAd(data) {
    const id = parseInt(carsData.length + 1, 10);
    const carData = {
      id,
      owner_id: data.owner || '',
      created_on: new Date().toLocaleString(),
      state: data.state || '',
      status: data.status || 'available',
      price: data.price || 0,
      manufacturer: data.manufacturer || '',
      year: data.year || '',
      model: data.model || '',
      body_type: data.body_type || '',
      img: data.img || '',
    };
    this.cars.push(carData);
    return carData;
  }


  getAllCars() {
    return this.cars;
  }

  findCarAd(id) {
    return this.cars.find(car => parseInt(car.id, 10) === parseInt(id, 10)) || [];
  }

  getAllUnsoldCars() {
    return this.cars.filter(car => car.status === 'available');
  }

  getCarByProp(props, value) {
    return this.cars.filter(car => car[props].toLowerCase() === value.toLowerCase());
  }

  getUnsoldCarByProp(props, value) {
    return this.cars.filter(car => car.status.toLowerCase() === 'available' && car[props].toLowerCase() === value.toLowerCase());
  }

  updateStatus(id, data) {
    const carAd = this.cars.find(car => parseInt(car.id, 10) === parseInt(id, 10));

    carAd.status = data.status || carAd.status;
    return carAd;
  }

  updateCarAdPrice(id, data) {
    const carAd = this.cars.find(car => parseInt(car.id, 10) === parseInt(id, 10));

    carAd.price = parseInt(data.price, 10) || carAd.price;
    return carAd;
  }

  getCarPriceRange(min, max) {
    return this.cars.filter(car => car.status.toLowerCase() === 'available' && parseInt(car.price, 10) >= parseInt(min, 10) && parseInt(car.price, 10) <= parseInt(max, 10));
  }

  deleteCar(car) {
    const idx = this.cars.indexOf(car);
    return this.cars.splice(idx, 1);
  }
}

export default new Car();
