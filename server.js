const http = require('http');


let server = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end('HW')
});
server.listen(3001, 'localhost');