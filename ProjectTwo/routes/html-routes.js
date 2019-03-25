// dependencies
var path = require("path");

// routes (remember to start with module.exports)
module.exports = function (app) {

    // index route loads view.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/landpage.html"));
    });

    // add route loads the add.html page, where users can enter new books to the db
    app.get("/news", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/newsfeed.html"));
    });

    // all route loads the all.html page, where all books in the db are displayed
    app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/profile.html"));
    });
};