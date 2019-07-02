import carsData from '../test/mock_db/cars';

class Car {
  constructor() {
    this.cars = carsData;
  }

  newCarAd(data) {
    const id = parseInt(carsData.length + 22000, 10);
    const carData = {
      id,
      owner: data.owner || '',
      created_on: new Date().toLocaleString(),
      state: data.state || '',
      status: data.status || 'available',
      price: data.price || 0,
      manufacturer: data.manufacturer || '',
      model: data.model || '',
      body_type: data.body_type || '',
    };
    this.cars.push(carsData);
    return carData;
  }


  getAllCars() {
    return this.cars;
  }

  findCarAd(id) {
    return this.cars.filter(car => parseInt(car.id, 10) === parseInt(id, 10));
  }

  getAllUnsoldCars() {
    return this.cars.filter(car => car.status === 'available');
  }

  getCarByProp(key, value) {
    return this.cars.find(car => car[key] === value);
  }

  getUnsoldCarByProp(key, value) {
    return this.cars.find(car => car[key] === value && car.status === 'available');
  }

  updateStatus(id, data) {
    const carAd = this.cars.filter(car => parseInt(car.id, 10) === parseInt(id, 10));

    carAd.status = data;

    return carAd;
  }

  updateCarAdPrice(id, data) {
    const carAd = this.cars.filter(car => parseInt(car.id, 10) === parseInt(id, 10));

    carAd.price = parseFloat(data);

    return carAd;
  }

  getCarPriceRange(maxPrice, minPrice) {
    return this.cars.filter(car => car.price <= maxPrice && car.price >= minPrice);
  }

  deleteCar(car) {
    const idx = this.cars.indexOf(car);
    return this.cars.splice(idx, 1);
  }
}
export default new Car();
