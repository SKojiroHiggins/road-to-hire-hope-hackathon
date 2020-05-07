const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const profileData = require('./public/profileData.json')
const fs = require("fs");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public')); // render static files


// render html and css
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// main page
app.get('/match', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/match.html'));
});

// sends all profile data
app.get('/profiles', (req, res) => { 
    res.send(profiles);
});

app.post('/profile', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/profile.html'));
});

// creates a new profile
app.post('/match', (req, res) => {  
    profileData.push( {
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        type: "student",
        looking: req.body.looking,
        interest: req.body.interest,
        distance: req.body.distance,
        language: req.body.language
    });

    res.sendFile(path.join(__dirname + '/public/maincontent.html'));
});

// match.html utilizes this to get profileData.json
app.get('/api/profiles', (req, res) => {
    if (!profileData) {
        return res.status(404).send("Resource was not found. Please try again.");

    }
    res.send(profileData);
});


















const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
