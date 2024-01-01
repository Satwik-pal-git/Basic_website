const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

exports.landingPage = (req, res) => {
    res.render("login");
};

exports.login = async (req, res) => {
    const email = req.body.mail;
    const password = req.body.password;
    // console.log(email, password);

    const olduser = await User.findOne({ email: email }).select("+password");

    const checkPass = await olduser.correctPassword(password, olduser.password);
    if (olduser || checkPass) {
        const Token = jwt.sign({ id: olduser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY
        });
        res.status(200).redirect("/home");
    }
    else {
        res.redirect("/");
    }
};

exports.signUp = async (req, res) => {
    // console.log(req.body);
    const newUser = new User({
        name: req.body.name,
        email: req.body.mail,
        password: req.body.password,
        passwordConfirm: req.body.ConfirmPassword,
    });
    // console.log("New user detail ", newUser);

    //add a check that if a user already exists

    await newUser.save().then(() => {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_expiry
        });
        // console.log("Token ->", token);
        res.status(200).redirect("/home");
    }).catch(err => {
        console.log(err);
        res.redirect("/");
    });
}