const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    image: String
});

module.exports = mongoose.model("user", userSchema);