const express = require('express');
const authController = require("../controller/authController");
const routeController = require("../controller/routeController");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

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