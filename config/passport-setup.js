const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const dotenv = require('dotenv').config();
const User = require('../models/user');


//JSON Web Token Strategy
passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        iss: 'Job-App-REST-API',
        secretOrKey: process.env.JWT_SECRET
    }, (payload, done) => {
        User.findById(payload.sub, function(err, user) {
            if(err) {return done(err, false);}
             
            if(user) {
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }
));

//Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
        //options for the google strat
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
                    googleId: profile.id,
                    email: profile.emails[0].value
                }).save().then( (newUser) => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    })
);