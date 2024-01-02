const express = require("express")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const fs = require('fs');
const ejs = require("ejs");
const session = require("express-session");
const CookieSession = require("cookie-session")
const MongoStore = require("connect-mongo");
var bodyParser = require('body-parser');
const connectDB = require("./configDB/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");
const passport = require("passport");
const multer = require("multer");
const PostData = require("./models/adminPostModel");
var flash = require('connect-flash');

dotenv.config();
connectDB();

require("./configDB/passport-setup")(passport);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: "keyboard_satwik",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.post("/admin", upload.single("p_image"), async (req, res) => {

    const newData = new PostData({
        name: req.body.P_name,
        location: req.body.P_location,
        description: req.body.P_desc,
        amount: req.body.P_amount,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    });
    await newData.save().then(() => {
        res.status(200).redirect("/admin");
    }).catch(err => {
        console.log(err);
    });
});
app.use("/", mainRoutes);


app.get("/*", (req, res) => {
    res.status(404).json({
        status: '404 Not Found',
        message: `Can't find the ${req.originalUrl} on the server`
    })
});

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on ${PORT}`));