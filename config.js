
require('dotenv').config();


module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },
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

  test: {
    database: 'book_test',
    username: 'steven',
    password: null,
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
