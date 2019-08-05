import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: true,
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
