const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        unique: [true, 'This email has been registered'],
        lowercase: true,
        trim: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: 6,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please enter a valid username'],
        unique: [true, 'Your username has been taken'],
        trim: true
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        else {
            throw new Error({ message: 'Invalid password' });
        }
    }
    else {
        throw new Error({ message: 'Invalid email' });
    }
} 

const User = mongoose.model('User', userSchema);
module.exports = User;