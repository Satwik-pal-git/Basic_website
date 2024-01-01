const PostData = require("../models/adminPostModel");

exports.getHomePage = (req, res) => {
    res.render("home", { user_image: "" });
};
exports.getAdmin = async (req, res) => {
    const propertyData = await PostData.find();
    // console.log(propertyData);
    res.render("admin", { propertyData });
};