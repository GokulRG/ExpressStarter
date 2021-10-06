const path = require('path');
const express = require('express');
const app = express();

const helmet = require('helmet');

// security
app.use(helmet());

// to serve up static content easily
app.use(express.static('public'));

// To parse req.body to meaningful json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// view engines and path
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {
    res.send('Sanity Check');
});

app.get('/login', (req, res, next) => {
    res.render('login');
});

app.post('/process_login', (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;

    // check the db to see if the user creds are valid.
    // if they are valid
    //      save their username in a cookie
    //      send them to the welcome page
    if (password === "x") {
        // res.cookie takes 2 args:
        // 1. name of the cookie
        // 2. value to set it to
        res.cookie('username', username);

        // it takes one arg, where to take the user next
        res.redirect('/welcome');
    } else {
        res.redirect('/login?msg=fail');
    }
});

app.get('/welcome', (req, res, next) => {
    res.send('<h1>Welcome</h1>');
});

app.listen(3000);