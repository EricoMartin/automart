import pool from './queries';

class User {

  static createUser(data) {
    const text = 'INSERT INTO users (first_name, last_name, address, is_admin, email, status, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING first_name, last_name, address, is_admin, email, status';
    return pool.query(text, data);
  }
  static getAllUsers() {
    return pool.query('SELECT (id, first_name, last_name, address, is_admin, email, status, password) FROM users LIMIT 50');
  }

  static findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email=$1';
    return pool.query(query, [email]);
  }
  static findEmail(email) {
    const query = 'SELECT email FROM users WHERE email=$1';
    return pool.query(query, [email]);
  }
  static findByFirstName(id) {
    const name = 'SELECT first_name FROM users WHERE id=$1';
    return pool.query(name, [id]);
  }

  static findByPass(id) {
    const query = 'SELECT password FROM users WHERE id=$1';
    return pool.query(query, [id]);
  }

  static changePassword(data) {
    const text = 'UPDATE users SET password=$1 WHERE id=$2 RETURNING id, first_name, last_name, email, status';
    return pool.query(text, data);
  }

}

export default User;
