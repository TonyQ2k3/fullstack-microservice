const User = require('../models/User');

const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');


const createToken = (id) => {
    return jwt.sign({ id }, 'motionblogs', {
        expiresIn: 60 * 60 * 24
    });
}

// Sign up service
router.get('/signup', (req, res) => {

});
router.post('/signup', async (req, res) => {
    const {email, password, username} = req.body;

    try {
        const user = await User.create({ email, password, username });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
        res.cookie('username', user.username, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
        res.status(201).json(user._id);
    } 
    catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// Login service
router.get('/login', (req, res) => {});
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
        res.cookie('username', user.username, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
        res.status(200).json(user._id);
    }
    catch (err) {
        res.status(400).json({ message: 'Email or password is incorrect' });
    }
});

router.get('/username', (req, res) => {
    const username = req.cookies.username;
    if (username)
        res.status(200).json(username);
    else res.status(400).json({ message: 'No user' });
});

router.get('/user', (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'motionblogs', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(404).send("Can't verify");
            } else {
                let user = await User.findById(decodedToken.id);
                console.log(user);
                res.status(200).json(user);
            }
        })
    } else {
        res.status(400).json({ message: 'No user' });
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('username', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out' });
});

module.exports = router;