const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const url = "http://api.unsplash.com/search/photos?query=face&client_id=kPkqiVr4Rkgy8bXbpk04aSDnygTOzWZZBPI3vjO2ACo"
app.set('view engine', 'ejs'); // ejs is a template engine. allows access to html
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

    res.render(path.join(__dirname + '/public/index.ejs'));
});

// main page
app.get('/match', (req, res) => {
    res.render(path.join(__dirname + '/public/match.ejs'));
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
    
    const profile = {
        name: req.body.name,
        profession: req.body.profession
    };
    profiles.push(profile);

    // res.send(profiles); test to return list of all profiles

    profiles.forEach((cur) => {
        if (cur.profession === userProfession && cur.name !== userName)
        console.log(cur);
    });

    res.sendFile(path.join(__dirname + '/public/match.html'));
});












const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
