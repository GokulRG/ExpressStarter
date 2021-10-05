const express = require('express');
const app = express();

// app object has a few methods
// get - default request for all browsers
// post - create new
// put - update
// delete - remove 
// patch - partial update
// all - an express method that accepts all types of requests!


// All these methods below take in 2 args
// 1. path
// 2. callback fn that's invoked when an http request is received

// app.all('/', (req, res) => {
//     res.send('<h1>Welcome to the home page!</h1>');
// });

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the homepage - GET</h1>');
});

app.post('/', (req, res) => {
    res.send('<h1>Welcome to the homepage - POST</h1>');
});

app.put('/', (req, res) => {
    
});

app.delete('/', (req, res) => {
    
});

app.listen(3000, () => {
    console.log("The express server is running on port 3000");
});
