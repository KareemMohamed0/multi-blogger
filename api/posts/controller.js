
const postsService = require('./service');
const Posts = require('./model');

async function getPosts(req, res) {

    try {
        let posts = await Posts.find({});
        return res.send({ msg: posts });

    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });

    }
}
async function getPost(req, res) {

    try {
        let _id = req.params._id;
        let posts = await Posts.findById(_id);
        return res.send({ msg: posts });

    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });

    }

}
async function addPost(req, res) {
    try {
        let post = req.body;
        let userId = req.user.id;

        let createdPost = await Posts.create(post);

        return res.redirect(`/user/assignpost?postId=${createdPost.id}&userId=${userId}`);

    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });
    }
}

async function deletePosts(req, res) {
    return res.send(await Posts.remove({}))
}


module.exports = { getPosts, getPost, addPost, deletePosts };