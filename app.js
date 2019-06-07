'use strict';

const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
 //import config from 'config';

const app = express();

const port = parseInt(process.env.PORT,10) || 5000;
app.use(logger('dev'));


app.use(bodyParser.urlencoded({
	extended: false
}));


app.use(bodyParser.json());

app.use('/', (req, res) =>{
	console.log(res.status(200).send(`Automart app is running on port :${port} `));
});

app.listen(5000); 		

export default app;							