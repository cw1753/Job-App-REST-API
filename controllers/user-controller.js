const JWT = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv').config();

// Use to sign the token
signToken = (user) => {
    return JWT.sign({
        iss: 'Job-App-REST-API',
        sub: user.id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead
    }, process.env.JWT_SECRET);
}

module.exports = {
    googleOAuth: (req, res, next) => {
        console.log('In googleOAuth user controller');
        const token = signToken(req.user);
        res.status(200).json({token});
    }
}