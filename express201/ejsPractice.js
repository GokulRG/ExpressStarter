const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');

// Use helmet for security
app.use(helmet());

// serve up static files
app.use(express.static('public'));

// To parse json in the body
app.use(express.json());

// To parse key-value pair input in the body
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs'); // ejs is an 3rd party npm module

// We need to specify the public folder to the view engine for it to find our html files
// the default is ./views
// This is the same as the default path, but this statement is written explicitly for better understanding
app.set('views', path.join(__dirname, 'views'));

function validateUser(req, res, next) {
    res.locals.userValidated = true;
    next();
}

app.use(validateUser);

app.get('/', (req, res, next) => {
    // the data, in the 2nd arg, is going to be appended to res.locals
    // The 2nd object is what is sent to the templating engine. so the templating engine can directly access properties from
    // this object to display it in the ui
    // Since the object passed in here is appended to locals.. you can do locals.msg in the ejs template!
    res.render("index", {
        msg: "Success!",
        msg2: "Failure!"
    });
});

app.listen(3000);