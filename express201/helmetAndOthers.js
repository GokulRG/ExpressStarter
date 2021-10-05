const express = require('express');
const app = express();
const helmet = require('helmet');

// Voila, security is taken care of!
app.use(helmet());

// As usual, we make the public directory public by using the express.static middleware
app.use(express.static('public'));

// If you don't add this middleware, then the json body sent by the client in the request payload will not be parsed and you won't 
// receive anything with the request. Once the request passes through this middleware, then you can easily access the payload using
// req.body
app.use(express.json()) // if you use url-encoded and don't use the below middleware to process url-encoded key value pairs, you'll get an empty object ({}) because json parser puts it there.
// But if you don't have this middleware also, then you get undefined.

// This is for form data. Whenever there is a form that's filled out. You need this. So basically if the request header has a content-type of "application/x-www-form-urlencoded"
// Involves sending key value pair inputs (you can find this as an input type in postman)
// This middleware handles that use case.
app.use(express.urlencoded({extended: false}));

// So we saw the following 3 middleware
// 1. static
// 2. json
// 3. urlencoded
// These 3 are gonna be included in all the apps we develop using express.

// Another very important middleware that we will learn about is called helmet
// It exists to prevent our app from being vulnerable to security threats. It performs all the security checks for us like XSS etc.
// We will also have to npm install and use that middleware for every single app.

app.post('/ajax', (req, res) => {
    console.log(req.body);
    // Need to do this for express to convert the response to the content-type application/json
    res.json('Test');
});

app.listen(3000);

// res.render (Server itself creates html, css and js)
// res.json (for apis, there's a separate front-end consuming the backend apis)