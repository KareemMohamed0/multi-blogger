const userService = require('./service');
const User = require('./model');

async function register(req, res) {

    try {
        let user = req.body;

        let validUser = userService.userValidation(user);

        if (!validUser)
            return res.status(400).send({ msg: 'please enter valid form ' });

        user.password = await userService.hashPassword(user.password);

        let token = await userService.generatetoken(user);

        let createdUser = await User.create(user);

        if (!createdUser)
            return res.send({ msg: "faild to create user " });

        return res.status(200).json({ token: `Bearer ${token}`, msg: 'User registred', createdUser });


    } catch (err) {
        return res.status(500).send({ msg: "something went wrong ", error: err.stack || err.message });
    }

}

async function authenticate(req, res) {

    try {
        let user = req.body;

        let validUser = userService.userValidation(user);

        if (!validUser)
            return res.status(400).send({ msg: 'please enter valid form ' });

        let userFound = await User.findOne({ username: user.username });

        if (!userFound)
            return res.status(400).send({ msg: "email not found " });

        let passwordMatche = await userService.compareHashPassword(user.password, userFound.password);

        if (!passwordMatche)
            return res.status(400).send({ msg: "wrong password " });


        let token = await userService.generatetoken(userFound);

        return res.status(200).json({ token: `Bearer ${token}`, msg: 'User authenticated' });


    } catch (err) {
        return res.status(500).send({ msg: "something went wrong ", error: err.stack || err.message });
    }

}


async function demoProfile(req, res) {
    try {
        let user = await userService.currentUser(req.token);
        if (!user)
            throw 'you are not authenticated';

        return res.send(user);
    } catch (err) {
        return res.status(500).send({ msg: "something went wrong ", error: err.stack || err.message });

    }

}

async function resturnAllusers(req, res) {
    return res.send(await User.find({}).select('-password'));
}
module.exports = { authenticate, register, demoProfile, resturnAllusers };