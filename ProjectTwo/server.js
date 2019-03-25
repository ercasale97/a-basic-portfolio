////////// DEPENDENCIES

var express = require('express');
require("dotenv").config();
const db = require("./models");

///////// INITIALIZE EXPRESS

var app = express();

// SET UP PORT
var PORT = process.env.PORT || 8080;

// EXPRESS DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC DIRECTORY
app.use(express.static('public'));

console.log(process.env.JWT_SECRET_KEY)
//tell express to use JSON WebTokens. JWT-Express will autofill req.user with the user details



/////////// ROUTES

require("./routes/html-routes.js")(app);
let apiRoutes = require("./routes/api-routes.js");
app.use('/api', apiRoutes)

//////////// SYNC SEQUELIZE AND USE EXPRESS APP

db.sequelize.sync()
    .then(function () {
        app.listen(PORT, function () {
            console.log("App listening...")
        })
    })