// Imported before express because this is a native module.
const path = require('path');

// Nodejs is the language (Express doesn't exist without node)
// Unlike fs and http, express isn't a built-in module in node. It's an external dependency/module
const express = require('express');

// Consistently you'd need this line of code. This happens in all express servers 
const app = express();

// serve up static files!
app.use(express.static('public'));

// All is a method in express that takes 2 arguments
// 1. route
// 2. Callback method that is invoked when a web request hits the route and we've configured it for all routes on the port below.
app.all('/', (req, res) => {
    // Express handles all the basic headers, status codes, mime-types etc.
    // Express handles connection end as well. so no res.end!
    // We just need to do the write part. In express it's called send!
    // res.send('<h1>This is the home page rendered by Express!</h1>');

    // Now let's send a static file
    res.sendFile(path.join(__dirname+'/index.html'));
});

// Express runs from the top to bottom. so if none of the routes above are matched, then only this runs
app.all('*', (req, res) => {
    res.send('<h1>Sorry, this path does not exist!</h1>');
});

app.listen('3000', () => {
    console.log('Express server is listening on port 3000!');
});