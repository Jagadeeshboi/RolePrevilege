const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const fileUpload = require("express-fileupload");
const flash = require('connect-flash');
const hbs = require("hbs");
const cors = require("cors");
const mongoDBSession = require("connect-mongodb-session")(expressSession);
require("dotenv").config();

const connectDB = require("./config/dbConnect.js");
const authRoute = require("./routes/authRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const rolesRouter = require("./routes/rolesRouter.js");
// const registerHelpers = require("./helpers/helpers.js");
// const errorHandler = require("./middleWare/errorHandler.js");



const app = express();


connectDB();
// registerHelpers();

const store = new mongoDBSession({
    uri: process.env.MONGO_URI,
    collection: "userSessions",
});

const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, HEAD, PATCH, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(fileUpload());
//these session should be dynamic
app.use(expressSession({
    secret: "thisIsHeallTTthClliIIKKSecretKey!",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 29
    },
    resave: false,
    saveUninitialized: false,
    store: store,
}));


//TEMPLATE ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("html", hbs.__express);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use('/uploads', express.static(path.join(__dirname, "uploads")));
hbs.registerPartials(path.join(__dirname, "views", "partials"));
// app.use("/", async (req, res) => {
//     return res.render("index")
// })

app.use("/", authRoute);
app.use("/", adminRoute);
app.use("/admin", rolesRouter);

// Global error handler middleware (MUST be at the end)
// app.use(errorHandler);

app.listen(process.env.PORT, async (req, res) => {
    console.log(`Server listening to port....${process.env.PORT}`);
});

process.env.TZ = "Asia/Calcutta";