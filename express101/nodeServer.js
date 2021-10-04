// Whenever you're working with servers you have to import the http module. This applies to node and not express
// No need to do npm install here, it's already available as a part of nodejs
const http = require('http');

// Whenever you're interacting with the filesystem, remember to use the fs module. It also comes bundled in with node
// so don't worry about installing it with npm or something separately.
const fs = require('fs');

// http module has a create server method. takes 1 arg which is a callback. The callback takes 2 args (one request and one response)
const server = http.createServer((req, res) => {
	// req object can be used to know more information about the request. The payload, the headers, the client etc etc.
	// res object can be used to send responses back to the client. so you add stuff to it

	// The req has a url property, which we can use to send responses to custom endpoints.
	let url = req.url;
    console.log(url);

    if (url && url.trim() === '/assets/Node_logo.png') {
		res.writeHead(200, { 'content-type': 'image/png' });
		const image = fs.readFileSync('../assets/Node_logo.png');
		res.write(image);
        res.end();
	} else if (url && url.trim() === '/styles.css') {
		res.writeHead(200, { 'content-type': 'text/css' });
		const css = fs.readFileSync('../assets/styles.css');
		res.write(css);
        res.end();
	} else if (url && url.trim() !== '/') {
		res.writeHead(404);
		res.end();
		return;
	} else {
		// When dealing with the response, these are the things that we have to keep in mind
		// 1. the start line (node/http module already takes care of that)
		// 2. header (use writeHead)
		// 3. body

		// writeHead takes 2 args. one for status code and one object arg for mime-types
		res.writeHead(200, { 'content-type': 'text/html' });

		// write method is used for returning a body
		// It's quite simple in the sense that you have to construct the entire html response that you want to construct using write
		// Let's read from the file and send the output back.
		fs.Path;
		const htmlResponse = fs.readFileSync('../assets/sampleResponse.html');
		res.write(htmlResponse);

		// You can also chain end method like so.
		// res.write(htmlResponse).end();

		// The end method indicates that the connection can be closed now. you can put in the last piece of html response in here too.
		res.end();
	}
});

// the create server method actually creates a web server with our configuration. We would have configured what to do with req and res
// while creating the server. With the returned server object, you can make that server listen to http requests on a particular port.
// No matter whatever is after that port like localhost:3000/whatever/x/y/z. The server will intercept it and respond. Since we don't have
// any routes configured.
server.listen(3000, () => {
	console.log('Listening on port 3000');
});
