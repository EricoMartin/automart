import pool from './queries';

const newCar = {
  newCarAd(data) {
    const createCar = `INSERT INTO cars (manufacturer, model, price, state, status, body_type, year, created_on, owner, img) VALUES ( $1, $2,
            $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    return pool.query(createCar, data);
  },

  getAllCars() {
    const allCars = 'SELECT * FROM cars';
    return pool.query(allCars);
  },

  findCarAd(car_id) {
    const aCar = 'SELECT * FROM cars WHERE car_id=$1';
    return pool.query(aCar, [car_id]);
  },

  getAllUnsoldCars() {
    const allUnsoldCars = 'SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars where status=\'available\'';
    return pool.query(allUnsoldCars);
  },

  getCarPriceRange(status, min, max) {
    const range = 'SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars where status=$1 AND price BETWEEN $2 AND $3';
    return pool.query(range, [min, max]);
  },
  getCarByProp(status, param, props) {
    const prop = `SELECT car_id, manufacturer, model, price, state, status, body_type, year, created_on, owner, img FROM cars where status=$1 AND ${param}=$2 LIMIT 9000`;
    return pool.query(prop, [status, props]);
  },

  updateCarAd(prop, value, car_id) {
    const props = `UPDATE cars SET ${prop}=$1 WHERE car_id=$2 RETURNING *`;
    return pool.query(props, [value, car_id]);
  },

  deleteCar(car_id) {
    const del = 'DELETE FROM cars WHERE car_id=$1 RETURNING *';
    return pool.query(del, [car_id]);
  },
};

export default newCar;
