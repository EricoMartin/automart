import dotenv from 'dotenv';

dotenv.config();

switch (process.env.NODE_ENV) {
  case 'PROD':
    config.PORT = process.env.PROD_PORT;
    break;

  case 'DEV':
    config.PORT = process.env.DEV_PORT;
    break;
  default:
    export default config;
}
