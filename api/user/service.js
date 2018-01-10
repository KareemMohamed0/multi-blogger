const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gb = require('../global-service').globalVariable;


function userValidation(user) {
    if (!user.username || !user.password)
        return false;
    return true;
}

async function hashPassword(password) {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
async function generatetoken(user) {
    return await JWT.sign({ user: user }, gb.secret, { expiresIn: '20 days' });
}
async function compareHashPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

function rePasswordComp(password1, password2) {
    if (password1 != password2)
        return false;
    return true;
}

/**
 * test pasport js 
 */


module.exports = { compareHashPassword, userValidation, hashPassword, generatetoken, rePasswordComp };