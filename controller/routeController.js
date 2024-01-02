const PostData = require("../models/adminPostModel");
const AuthUserData = require("../models/gAuthModel");
const JWTUserData = require("../models/authModel");

exports.getHomePage = async (req, res) => {
    let user, userId;
    if (req.session.user) {
        userId = req.session.user._id;
        user = await JWTUserData.findById({ _id: userId });
    } else if (req.user) {
        userId = req.user;
        user = await AuthUserData.findById({ _id: userId });
    } else {
        res.redirect("/");
    }
    const propertyData = await PostData.find();
    res.render("home", { propertyData, user });
};
exports.getAdmin = async (req, res) => {
    if (req.session.user) {
        userId = req.session.user._id;
        user = await JWTUserData.findById({ _id: userId });
    } else if (req.user) {
        userId = req.user;
        user = await AuthUserData.findById({ _id: userId });
    } else {
        res.redirect("/");
    }
    const propertyData = await PostData.find();
    res.render("admin", { propertyData, user });
};