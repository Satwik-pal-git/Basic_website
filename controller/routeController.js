const PostData = require("../models/adminPostModel");

exports.getHomePage = (req, res) => {
    // console.log("this is the session: ", req.session);
    console.log(req);
    req.session.isAuth = true;
    res.render("home", { user_image: "" });
};
exports.getAdmin = async (req, res) => {
    const propertyData = await PostData.find();
    // console.log(propertyData);
    res.render("admin", { propertyData });
};