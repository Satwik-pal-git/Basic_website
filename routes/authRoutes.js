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
        res.redirect("/home");
    }
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/home");
});

module.exports = router;
