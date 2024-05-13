const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('post', postSchema);