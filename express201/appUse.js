const express = require('express');
const app = express();

// Express is just 2 things
// 1. Router
// 2. Middleware that comprises a web-framework

// Req --> Middleware --> Res
// Middleware function is any function that has access to the req, res and the next object.

// Req comes in
// We need to validate the user sometimes
// We need to store some things in the database
// If there is data from the user, we need to parse that and store it in the db
// Respond to the user

// Let's try to do the validate here
// The thing that makes a function middleware is the list of arguments, req, res and next!
function validateUser(req, res, next) {
    // get info out of the req object
    // do some stuff with the db

    // Assume this locals variable is like the react state.
    // All middleware functions have access to the res object so in-turn they have access to the locals property

    res.locals.validated = true;
    console.log('VALIDATED RAN');
    // Always call next to signify that the middleware has finished running.
    // Essentially it asks express to run the next middleware. If you have no other middleware configured, the callback in the request
    // is the last piece of middleware and that's the one that will run next.
    next();
};

// This means that every request will have to use this.
// app.use('/admin',validateUser); -- App.use doesn't distinguish between the http method used, so it will run the middleware regardless of the type of the request
// if we wanted to run this middleware only for get requests, we could just use app.get!! because app.use is just a fancier version of the same with support for all requests

// The only condition for a middleware is that it should take in req, res and next. Our validate user function already does that. so it qualifies. so you can either write it 
// like this or you can write it like. Also app.get is only invoked for get requests!
app.get('/', validateUser);

// What if we don't want the validateUser middleware to run for the homepage(/) and we only want it to run on the admin page?
app.get('/', (req, res, next) => {
    // Even this callback function in itself is middleware. But it's the last piece of middleware that will run
    // and we're closing out the response to the client.
    res.send('<h1>Main page</h1>');
    console.log(res.locals.validated);
    // Don't call next here..  which means the cycle ends here.
});

app.get('/admin', (req, res, next) => {
    // Even this callback function in itself is middleware. But it's the last piece of middleware that will run
    // and we're closing out the response to the client.
    res.send('<h1>Main page</h1>');
    console.log(res.locals.validated);
    // Don't call next here..  which means the cycle ends here.
});

app.listen(3000, () => {
    console.log('Express is running on port 3000');
});
