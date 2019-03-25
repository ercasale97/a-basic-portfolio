// This file is for routes: displaying and saving data to the db

// Dependencies 
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require("../models");
const axios = require("axios");
const dotenv = require('dotenv');

var jwt_express = require('express-jwt');

router.use(jwt_express({ secret: process.env.JWT_SECRET_KEY }).unless({ path: ['/api/login', '/favicon.ico', '/api/user/new'] }));

// Routes

// login users
router.post("/login", function (req, res) {
    // Fetch user from db
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (result) {
        if (!result) return res.SendStatus(404).send();  //user wasn't found

        // check if user/password is correct
        else if (result.password === req.body.password) {
            let userDetails = {
                name: result.name,
                email: result.email,
                id: result.id,
            };
            return jwt.sign(userDetails, process.env.JWT_SECRET_KEY, { algorithm: "HS256" }, function (err, token) {
                if (err) return res.sendStatus(500).json(err)
                res.json({
                    user: userDetails,
                    token: token,
                })
            })
        }
        else {
            res.sendStatus(401).send(); // wrong password
        }
    })
        .catch(function (err) {
            return res.sendStatus(500).json(err)
        })
})

// POST, create a new user
router.post("/user/new", function (req, res) {
    db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(function (results) {
        console.log(results)
        let userDetails = {
            email: results.email,
            id: results.id,
        };
        return jwt.sign(userDetails, process.env.JWT_SECRET_KEY, { algorithm: "HS256" }, function (err, token) {
            if (err) return res.sendStatus(500).json(err)
            res.json({
                user: userDetails,
                token: token,
            })
        })
    })
        .catch(function (err) {
            res.json(err)
        });
});


// GET PROFILE INFO

router.get("/profile", function (req, res) {
    console.log(req.user)
    let user = {
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
    }

    res.json(user)

})


// --------- EVENTS ----------


// GET, one event
router.get("/event/:id", function (req, res) {
    db.Event.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (results) {
            res.json(results);
        });
});


// GET, all events
router.get("/events", function (req, res) {
    db.Event.findAll({})
        .then(function (results) {
            res.json(results);
        });
});

// GET, MY events
router.get("/events/user", function (req, res) {
    db.Attendee.findAll({
        where: {
            UserId: req.user.id
        }
    })
        .then(function (results) {
            res.json(results);
        });
});

// POST, new event
router.post("/event/new", function (req, res) {
    db.Event.create({
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        artist: req.body.artist,
    })
        .then(function (event) {
            // create record in join table
            return db.Attendee.create({
                UserId: req.user.id,
                EventId: event.dataValues.id
            })
        })
        .then(function (results) {
            res.json(results);
        })
        .catch(function (err) {
            res.json(500, err)
        });
});

// PUT, for updating events
router.put("/event", function (req, res) {
    db.Event.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        }).then(function (results) {
            res.json(results);
        });
});

// POST new attendee (ADD THIS TO MY EVENTS BUTTON)
router.post('/event/add', function (res, res) {
    db.Attendee.create({
        UserId: req.user.id,
        EventId: ''
    })
})





// // --------PREDICT HQ API (to search by area)------- (if song kick comes through -- boot this)

// router.get("/predictHQ", async (req, res) => {
//     // const config = {
//     //     "Authorization": "0akqMCro5pKNYGxlIdwORyhdvUBntq"
//     // }       

//     const token = "0akqMCro5pKNYGxlIdwORyhdvUBntq";

//     const config = {
//         headers: { 'Authorization': "Bearer " + token }
//     }

//     // const agent = new https.Agent(config);

//     const url = "https://api.predicthq.com/v1/events/?place.scope=MSP"

//     try {
//         const predictHQData = await axios.get(url, config);

//         console.log(predictHQData.data.results);
//         const eventsInArea = predictHQData.data.results;

//         for (let i = 0; i < eventsInArea.length; i++) {
//             const artist = eventsInArea[i].title;

//             // --------BANDS IN TOWN API (to search by concert)-------

//             let bandInfo = await axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?router_id=oisacfioqwuuwfcenqou");
//             bandInfo = bandInfo.data[0];

//             console.log("bandinfo: ", bandInfo);
//         }

//         // you might need to look into promise.all for async (may not work with for loop)
//         res.json("predictHQData")

//     } catch (error) {
//     }
// })

// ------- NEWSFEED ---------- 

// GET, add event & users (who are also going) to newsfeed
router.get("/attendee/:event", function (req, res) {
    db.Attendee.findAll({
        include: [{ model: db.attendee }],
        where: {
            id: req.params.event
        }
    }).then(function (results) {
        res.json(results);
    });
});

// GET events current user is attending (for profile)
router.get("/attendee/:user", function (req, res) {
    db.Attendee.findAll({
        include: [{ model: db.attendee }],
        where: {
            UserID: req.params.user
        }
    }).then(function (results) {
        res.json(results);
    })
})

module.exports = router
