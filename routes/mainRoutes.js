const express = require('express');
const authController = require("../controller/authController");
const routeController = require("../controller/routeController");
const router = express.Router();

router
    .route("/")
    .get(authController.landingPage);

router
    .route("/home")
    .get(routeController.getHomePage);

router
    .route("/login")
    .post(authController.login);

router
    .route("/admin")
    .get(routeController.getAdmin)
// .post(routeController.postAdmin);

router
    .route("/register").post(authController.signUp);


module.exports = router;