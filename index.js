const express = require('express');

const async_await = require('express-async-await')

const app = async_await(express());

const mongoose = require('mongoose');

const cors = require('cors');

const path = require('path');

const bodyparser = require('body-parser');


const port = process.env.PORT || 3000;
const dbConfig = require('./api/global-service').globalVariable.databaseLocal;

const passport = require('passport');

/**
 * هimport routes
 */
//delimiter for adding generated module
const comments = require('./api/comments/route');
const posts = require('./api/posts/route');
const user = require('./api/user/route');


app.use(cors());
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));
app.use(passport.initialize());
require('./config/passport')(passport);



//Data base config
mongoose.connect(dbConfig);

mongoose.connection.on('connected', () => {
    console.log(`connected`)
});


/**
 * main routes will defined here sub route api folder
 */

app.use('/user', user);
//delimiter for adding generated apis
app.use('/comments', comments);
app.use('/posts', posts);


app.listen(port, () => {
    console.log(`server work on port : ${port}`)
});


