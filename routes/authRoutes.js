const router = require("express").Router();
const passport = require("passport");

//auth logout
router.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
});

// auth with google
router.get("/google", passport.authenticate("google", {
    scope: ['profile']
}));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // let user = req.user;
        // req.flash("UserData", user);
        res.status(200).redirect('/home');
    }
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/home");
});

module.exports = router;
