<<<<<<< HEAD
import dotenv from 'dotenv';
import Route from './routes/index.js'
const logger = require('morgan');
const express = require('express');

=======
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import route from './routes/routes';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
>>>>>>> code-refactor-travis

dotenv.config();

const app = express();
<<<<<<< HEAD

const port = process.env.PORT || 5000;
app.use(logger('dev'));

app.use(express.json());
app.use('/api/v1/', Route);
=======
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', route);

>>>>>>> code-refactor-travis


app.listen(port, () => console.log(`Automart server is running on port ${port}`));

 
<<<<<<< HEAD
export default app;
=======
export default app;
>>>>>>> code-refactor-travis
