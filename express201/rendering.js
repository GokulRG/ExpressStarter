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

// What happens if we do server side rendering
// 1. We define a view engine
// Something like EJS, Mustache, Handlebars, Jade/Pug
// 2. Inside one of our routes, we have a res.render
// 3. We pass that res.render 2 things: the file we want to use, the data we want to send to that file
// Express uses the node module for our specified view engine and parses the file. The means, it takes the html/js/css
// and combines it with server side code
// 4. The final result is an HTML, JS, CSS file

// set is a keyword used in express to change various internal settings. If you have to define a view engine on the server side, you have 
// to set the view engine property in express. 
// app.set('view engine', 'ejs'); // ejs is an 3rd party npm module
app.set('view engine', 'hbs'); // hbs (handlebars) is a 3rd party npm module as well

// We need to specify the public folder to the view engine for it to find our html files
// the default is ./views
// This is the same as the default path, but this statement is written explicitly for better understanding
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res, next) => {
    res.render("index");
});

app.listen(3000);
