const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const profileData = require('./public/profileData.json')
const fs = require("fs");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public')); // render static files

const profiles = [
    {
        name: "John Doe",
        profession: "Developer"
    },
    {
        name: "Samantha Marsh",
        profession: "Project Manager"
    }
];

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
    let userName = req.body.name;
    let userProfession = req.body.profession;
    
    // const profile = {
    //     name: req.body.name,
    //     profession: req.body.profession
    // };
    // profiles.push(profile);

    // // res.send(profiles); test to return list of all profiles

    // profiles.forEach((cur) => {
    //     if (cur.profession === userProfession && cur.name !== userName)
    //     console.log(cur);
    // });


    const data = JSON.parse(fs.readFileSync('./public/profileData.json'));
    
    
    data.push( {
        name: userName,
        profession: userProfession,
        interests: {
            interest1: "fake interest1",
            interest2: "fake interest2"
        }
    });

    fs.writeFileSync('./public/profileData.json', JSON.stringify(data));



    console.log(data);


    res.sendFile(path.join(__dirname + '/public/match.html'));
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
