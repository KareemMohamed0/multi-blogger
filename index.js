const express = require('express');

const async_await = require('express-async-await')

const app = async_await(express());

const mongoose = require('mongoose');

const cors = require('cors');

const path = require('path');

const bodyparser = require('body-parser');


const port = process.env.PORT || 3000;
const config = require('./config/database');

/**
 * هimport routes
 */
//delimiter for adding generated module




const user = require('./api/user/route');


app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public/')));




//Data base config
mongoose.connect(config.databaseLocal);

mongoose.connection.on('connected', () => {
    console.log(`connected`)
});


/**
 * main routes will defined here sub route api folder
 */

app.use('/user', user);
//delimiter for adding generated apis


app.listen(port, () => {
    console.log(`server work on port : ${port}`)
});


