const express = require('express');

const app = express();

// app comes with a use method -- This is used to invoke middleware
// the use method takes 1 arg (for now), which is the middleware you want to run
// Here in this example we will use express.static(middleware built-in with express) to serve static files
// Anytime anyone wants to see anything in the public directory, this will allow it. So basically this could be done for static files
// html files, images, css files. We don't have to worry about the endpoints. express will allow access to those files automatically to anyone who knows the path/filename
app.use(express.static('public'))

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
