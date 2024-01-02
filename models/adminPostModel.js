const mongoose = require('mongoose');

const postModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide Property Name"]
    },
    location: {
        type: String,
        required: [true, "provide Location"]
    },
    description: {
        type: String,
        required: [true, "provide Description"]
    },
    amount: {
        type: Number,
        required: [true, "provide Expected Amount"]
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('PostModel', postModel);