import dotenv from 'dotenv';
import Route from './routes/index.js'
const logger = require('morgan');
const express = require('express');

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
app.use(logger('dev'));

app.use(express.json());
app.use('/api/v1/', Route);


app.listen(port, () => console.log(`Automart server is running on port ${port}`));

 
export default app;
