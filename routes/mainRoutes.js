const express = require('express');
const authController = require("../controller/authController");
const homeController = require("../controller/homeController");

const router = express.Router();

router
    .route("/")
    .get(authController.landingPage);

router
    .route("/home")
    .get(homeController.homePage);

router
    .route("/login")
    .post(authController.login);

router
    .route("/register").post(authController.signUp);


module.exports = router;