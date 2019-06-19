import Route from './routes/index.js'
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = parseInt(process.env.PORT, 10) || 5000;
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());
app.use('/api/v1/', Route);


app.listen(port, () => console.log(`Automart server is running on port ${port}`));

 
export default app;
