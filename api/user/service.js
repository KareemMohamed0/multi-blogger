const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');


function vertifyToken(req, res, next) {
    let barerHeader = req.headers['authorization'];

    if (!barerHeader)
        return res.status(403).send(`you havn't access to this route`);
    req.token = barerHeader.split(' ')[1];
    next();

}

async function currentUser(token) {
    return await JWT.verify(token, 'secretkey-encoding');
}


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
    return await JWT.sign({ user: user }, 'secretkey-encoding', { expiresIn: '20 days' });
}
async function compareHashPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = { compareHashPassword, userValidation, hashPassword, vertifyToken, generatetoken, currentUser };