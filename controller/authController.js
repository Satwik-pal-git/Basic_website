const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

exports.landingPage = (req, res) => {
    if (req.session) {
        req.session.destroy();
    }
    res.render("login");
};

exports.login = async (req, res) => {
    const email = req.body.mail;
    const password = req.body.password;
    // console.log(email, password);

    const olduser = await User.findOne({ email: email }).select("+password");

    if (olduser) {
        const checkPass = await olduser.correctPassword(password, olduser.password);
        if (checkPass) {
            const Token = jwt.sign({ id: olduser._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRY
            });
            req.session.user = olduser;
            // req.flash('UserData', olduser);
            res.status(200).redirect("/home");
        } else {
            res.redirect("/");
        }
    }
    else {
        res.redirect("/");
    }
};

exports.signUp = async (req, res) => {
    // console.log(req.body);
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.mail,
            password: req.body.password,
            passwordConfirm: req.body.ConfirmPassword,
        });
        await newUser.save().then(() => {
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_expiry
            });
            // console.log("Token ->", token);
            req.session.user = newUser;
            res.status(200).redirect("/home");
        }).catch(err => {
            console.log(err);
            res.redirect("/");
        });
    } catch (error) {
        console.log("in signUp outer error: ", error);
        res.redirect("/");
    }

}