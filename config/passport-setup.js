const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const dotenv = require('dotenv').config();
const User = require('../models/user');


passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.findById(id).then( (user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for the google strat
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        User.findOne({googleId: profile.id}).then( (currentUser) => {
            if(currentUser) {
                console.log("User is: ", currentUser);
                done(null, currentUser);
            }
            else {
                new User({
                    userName: profile.displayName,
                    googleId: profile.id
                }).save().then( (newUser) => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    })
);