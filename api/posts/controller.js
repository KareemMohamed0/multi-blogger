
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
        let id = req.params.id;
        let post = await Posts.findById(id);
        return res.send({ msg: post });

    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });

    }

}
async function addPost(req, res) {
    try {
        let post = req.body;
        let createdPost = await Posts.create(post);
        return res.redirect('/posts/get')
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.stack || error.message });
    }
}
async function deletePosts(req, res) {
    return res.send(await Posts.remove({}))
}


module.exports = { getPosts, getPost, addPost, deletePosts };