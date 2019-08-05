import dotenv from 'dotenv';

dotenv.config();


module.exports = {

DATABASE_URL: `postgres://cbtlmfbkvgfefs:70a1eabefa35530bfd95e14e49d8ebddba04abf27d502778e8265874f74058fb@ec2-174-129-209-212.compute-1.amazon
aws.com:5432/d85anph206i4nr`;
  development: {
    database: 'automart',
    username: 'admin',
    password: 'admin1234',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },

  production: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres'
  }
};
