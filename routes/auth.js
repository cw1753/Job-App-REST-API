const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {

});

router.get('/logout', (req, res) => {

});

//Auth with google
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}))

//Callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send("Reached the callback URI")
})


module.exports = router;