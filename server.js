const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    // res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'application/json');
    
    res.write(JSON.stringify({
        response: 'This is response...'
    }));
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('server is listening for requests on port 3000');
});