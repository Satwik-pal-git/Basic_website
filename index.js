const express = require("express")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const session = require("express-session");
var bodyParser = require('body-parser');
const connectDB = require("./configDB/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");
const CookieSession = require("cookie-session")
const MongoStore = require("connect-mongo");
const passport = require("passport");
dotenv.config();
connectDB();

require("./configDB/passport-setup")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(CookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.COOKIE_KEY
}));

app.use(
    session({
        secret: "keyboard_satwik",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
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