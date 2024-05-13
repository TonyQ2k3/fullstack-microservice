const mongoose = require('mongoose');
const Post = require('../models/postModel');


const getPosts = async(req, res) => {
    const posts = await Post.find({});
    res.status(200).json(posts);
}

const getOnePost = async(req, res) => {
    const { id } = req.params;
    let pid = new mongoose.Types.ObjectId(id);
    let post = await Post.findById(pid);
    if (!post) {
        res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
}

const createPost = async(req, res) => {
    const { title, body, username } = req.body;
    try {
        const post = new Post({title, body, username});
        post.save()
        .then(details => {
            res.status(201).json(details);
        }) 
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
    }
    catch (err) {
        console.log(err);
    }
}

const deletePost = async(req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    .then(deletedPost => {
        if (!deletePost)
            res.status(404).send();
        res.send(deletedPost);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

module.exports = {
    getPosts,
    getOnePost,
    createPost,
    deletePost
}