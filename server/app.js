// Require which and child_process
const which = require('which');
const spawn = require('child_process').spawn;
// Find npm in PATH
const npm = which.sync('npm');
// Execute
const noErrorSpawn = spawn(npm, ['install']);

import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import route from './routes/routes';
import 'regenerator-runtime/runtime';



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1', route);



app.listen(port, () => console.log(`Automart server is running on port ${port}`));

 
export default app;
