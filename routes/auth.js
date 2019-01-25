const router = require('express').Router();
const passport = require('passport');
const UserController = require('../controllers/user-controller');

const jwtAuthenticate = passport.authenticate('jwt', {session: false});
const googleAuthenticate = passport.authenticate('googleToken', {session: false});


//Auth with google
router.post('/google', googleAuthenticate, UserController.googleOAuth);

router.get('/test-auth', jwtAuthenticate, (req, res, next) => {
    console.log('Passed Auth');
    res.json({secret: "private resource"});
});


module.exports = router;