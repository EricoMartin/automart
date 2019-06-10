

export default app;

const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
// import config from 'config';

const app = express();

const port = parseInt(process.env.PORT, 10) || 5000;
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

app.get('/api/v1', (req, res) => {
  console.log(res.status(200).send({
    Success: 'connected successfully',
    Message: 'welcome to Automart app.',

  }));
});

app.listen(port, () => console.log(`Automart server is running on port ${port}`));

 
