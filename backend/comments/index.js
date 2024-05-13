require('dotenv').config()

// Create express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Set port
const port = process.env.PORT || 8002;

const {
    getComments,
    createComment,
    deleteComment
} = require('./controllers/commentController')

app.get('/', (req, res) => {
    res.send("Comment Service online");
})

// Get all comments on a ticket
app.get('/:postId', getComments);

// Create a new ticket
app.post('/', createComment);

// Delete a comment
app.delete('/:id', deleteComment);

// Connect database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
   .then(() => {
        app.listen(port, () => {
            console.log('Connected to database');
            console.log(`Comment service listening at http://localhost:${port}`);
        });
   })
   .catch(err => console.log(err));