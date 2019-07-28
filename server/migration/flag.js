import pool from './queries';

class Flag {
  static createdFlag(data) {
    const text = 'INSERT INTO flags(car_id, created_on, reason, description, status, flagger) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    return pool.query(text, data);
  }

  static getAllFlags() {
    return pool.query('SELECT * FROM flags GROUP BY status, id');
  }

  static deleteFlag(id) {
    const query = 'DELETE FROM flags WHERE id=$1 RETURNING *';
    return pool.query(query, [id]);
  }

  static updateFlagStatus(id) {
    const text = 'UPDATE flags SET status=\'resolved\' WHERE id=$1 AND status=\'pending\' RETURNING *';
    return pool.query(text, [id]);
  }

  static findFlag(id) {
    const query = 'SELECT id FROM flags WHERE id=$1';
    return pool.query(query, [id]);
  }

  static getOwner(car_id) {
    const text = 'SELECT owner FROM cars WHERE car_id=$1 AND status=\'available\'';
    return pool.query(text, [car_id]);
  }
}

export default Flag;
