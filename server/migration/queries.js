import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

pool.connect();

export default {
  query(data, params) {
    return new Promise((resolve, reject) => {
      pool.query(data, params).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};
