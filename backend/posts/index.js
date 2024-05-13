require('dotenv').config()

// Create express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Set port
const port = process.env.PORT || 8001;

const {
    getPosts,
    getOnePost,
    createPost,
    deletePost
} = require('./controllers/postController')

app.get('/', getPosts);

// Get one ticket
app.get('/:id', getOnePost);

// Create a new ticket
app.post('/', createPost);

app.delete('/:id', deletePost);



// Connect database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
   .then(() => {
        app.listen(port, () => {
            console.log('Connected to database');
            console.log(`Post service listening at http://localhost:${port}`);
        });
   })
   .catch(err => console.log(err));