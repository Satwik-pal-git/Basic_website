const router = require("express").Router();
const passport = require("passport");

//auth logout
router.get("/auth/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// auth with google
router.get("/google", passport.authenticate("google", {
    scope: ['profile']
}));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // console.log("session in callback", req.session);
        // console.log(req.isAuthenticated());
        res.status(200).redirect('/home');
    }
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    // console.log("new request", req.user);
    res.redirect("/home");
});

module.exports = router;
