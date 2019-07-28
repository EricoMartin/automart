import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
