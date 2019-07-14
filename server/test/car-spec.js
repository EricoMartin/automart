import chai from 'chai';
import Car from '../models/car';
import carsData from './mock_db/cars';

const { expect } = chai;

describe('car Endpoint', () => {
  describe('Create a car ad', () => {
    it('should create a car sale ad', () => {
      const newCar = Car.newCarAd({
        owner: 1,
        manufacturer: 'Honda',
        model: 'Accord',
        price: 5000000,
        state: 'New',
        body_type: 'saloon',
        year: '2009',
        status: 'available',
      });
      expect(newCar).to.be.a('object');
      expect(newCar).to.have.property('id');
      expect(newCar).to.have.property('owner');
      expect(newCar).to.have.property('created_on');
      expect(newCar).to.have.property('manufacturer');
      expect(newCar).to.have.property('model');
      expect(newCar).to.have.property('price');
      expect(newCar).to.have.property('state');
      expect(newCar).to.have.property('body_type');
      expect(newCar).to.have.property('status');
    });
  });

  describe('Find a car ad', () => {
    it('should return a car ad', () => {
      Car.cars = carsData;
      const { id } = carsData[0];
      const res = Car.findCarAd(id);
      expect(res).to.be.an('array');
    });
    it('should return an empty array if not found', () => {
      Car.cars = carsData;
      const res = Car.findCarAd('0000000000787888888888');
      expect(res).to.be.an('array');
    });
  });

  describe('Get all ads', () => {
    it('should return all ads', () => {
      Car.cars = carsData;
      const cars = Car.getAllCars();
      expect(cars).to.be.an('array');
      expect(cars[0]).to.have.property('id');
    });
    it('should return an empty array if there are no ads', () => {
      const cars = Car.getAllCars();
      expect(cars).to.be.an('array');
    });
  });

  describe('Get all unsold cars', () => {
    it('should return all usold cars', () => {
      Car.cars = carsData;
      const cars = Car.getAllUnsoldCars();
      expect(cars).to.be.an('array');
      expect(cars[0]).to.have.property('status');
    });
  });
  describe('Get unsold cars by manufacturer', () => {
    it('should return unsold cars by manufacturer', () => {
      Car.cars = carsData;
      const { manufacturer } = carsData[0];
      const res = Car.getUnsoldCarByProp('manufacturer', manufacturer);
      expect(res).to.be.an('object');
    });
  });
  describe('Get unsold cars by body_type', () => {
    it('should return unsold cars by body_type', () => {
      Car.cars = carsData;
      // eslint-disable-next-line camelcase
      const { body_type } = carsData[0];
      const res = Car.getUnsoldCarByProp('body_type', body_type);
      expect(res).to.be.an('object');
    });
  });
  describe('Get unsold cars by State', () => {
    it('should return unsold cars by state', () => {
      Car.cars = carsData;
      const { state } = carsData[0];
      const res = Car.getUnsoldCarByProp('state', state);
      expect(res).to.be.an('object');
    });
  });

  describe('Update car ad', () => {
    it('should return updated car ad', () => {
      Car.cars = carsData;
      const { status } = carsData[1];
      const res = Car.getCarByProp('status', status);
      expect(res).to.be.an('object');
      expect(res.status).to.equal('sold');
    });
  });

  describe('get all unsold cars withn a price range', () => {
    it('should return all car ads within a price range', () => {
      Car.cars = carsData;
      const maxPrice = 10000000;
      const minPrice = 3500000;
      const res = Car.getCarPriceRange(maxPrice, minPrice);
      expect(res).to.be.an('array');
    });
  });


  describe('Delete a car ad', () => {
    it('should delete car ad', () => {
      Car.cars = carsData;
      const { id } = carsData[3];
      const res = Car.deleteCar(id);
      expect(res).to.be.an('array');
    });
  });
});
