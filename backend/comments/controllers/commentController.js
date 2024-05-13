const mongoose = require('mongoose');
const Comment = require('../models/commentModel');


const getComments = async(req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({"postId": postId});
    res.status(200).json(comments);
}


const createComment = async(req, res) => {
    const { postId, body, username } = req.body;
    try {
        const comment = new Comment({postId, body, username});
        comment.save()
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

const deleteComment = async(req, res) => {
    await Comment.findByIdAndDelete(req.params.id)
    .then(deleted => {
        if (!deleted)
            res.status(404).send();
        res.send(deleted);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

module.exports = {
    getComments,
    createComment,
    deleteComment
}