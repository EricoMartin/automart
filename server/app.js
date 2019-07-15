(function() {
    var childProcess = require("child_process");
    childProcess.spawn = require('cross-spawn');
})();

import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import route from './routes/routes';
import 'regenerator-runtime/runtime';



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', route);



app.listen(port, () => console.log(`Automart server is running on port ${port}`));

 
export default app;