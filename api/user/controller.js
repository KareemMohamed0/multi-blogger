const userService = require('./service');
const User = require('./model');

async function register(req, res) {

    try {
        let user = req.body;

        let validUser = userService.userValidation(user);

        if (!validUser)
            return res.status(400).send({ msg: 'please enter valid form ' });

        user.password = await userService.hashPassword(user.password);

        // let token = await userService.generatetoken(user);

        let createdUser = await User.create(user);

        if (!createdUser)
            return res.send({ msg: "faild to create user " });

        return res.status(200).json({ msg: 'User registred', createdUser });


    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });
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


    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });
    }

}


async function userProfile(req, res) {
    try {
        return res.send({ msg: req.user });
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });

    }
}

async function resturnAllusers(req, res) {
    try {
        let users = await User.find({}).select('-password');
        return res.send({ msg: users });

    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });

    }
}

async function returnUserById(req, res) {
    try {
        let id = req.params.id;

        let user = await User.findById(id).select('-password');

        return res.send({ msg: user });

    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });

    }
}


async function updateUserProfile(req, res) {
    try {

        let updateUser = req.body;
        let currentUserId = req.user._id;

        if (!userService.rePasswordComp(updateUser.password, updateUser.rePassword))
            return res.status(400).send({ msg: 'Password does not match the confirm password' });

        updateUser.password = await userService.hashPassword(updateUser.password);

        let newProfile = await User.update({ _id: currentUserId }, updateUser);
        if (!newProfile)
            return res.status(400).send({ msg: 'faild to update your profile' });

        return res.send({ msg: newProfile });

    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });

    }
}

async function assignPost2user(req, res) {
    try {
        let postId = req.query.postId;
        let userId = req.query.userId;

        let assignPost = await User.update({ _id: userId }, { $push: { post: postId } });
        return res.send(assignPost);

    } catch (error) {
        return res.status(500).send({ msg: "sd something went wrong ", error: error.stack || error.message });

    }
}


module.exports = { authenticate, register, userProfile, resturnAllusers, updateUserProfile, returnUserById, assignPost2user };