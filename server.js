const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    //set header content type
    // res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Content-Type', 'application/json');
    
    // res.write(JSON.stringify({
    //     response: 'This is response...'
    // }));
    // res.end();

    //lodash
    const num = _.random(0,20);
    console.log(num);
    //set header content-type
    res.setHeader('Content-type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            path += 'about.html';
            res.setHeader('Location', '/about')
            res.statusCode = 301;
            break;
        default :
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
            console.error(err);
            res.end();
        }
        // res.write(data);
        res.end(data);
    })
});

server.listen(3000, 'localhost', () => {
    console.log('server is listening for requests on port 3000');
});