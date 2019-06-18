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

app.get('/api/v1', (req, res) => {
  console.log(res.status(200).send({
    Success: 'connected successfully',
    Message: 'welcome to Automart app. Kindly use the routes auth/signup, to signup or auth/signin, to signin',

  }));
});

app.listen(port, () => console.log(`Automart server is running on port ${port}`));

 
export default app;
