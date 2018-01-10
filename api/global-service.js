const passport = require('passport');


let globalVariable = {
    secret: 'this is my secert key !!!!!!',
    authGuard: passport.authenticate('jwt', { session: false }),
    databaseLocal: 'mongodb://localhost:27017/demo'
};


module.exports = { globalVariable };