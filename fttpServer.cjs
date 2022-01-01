const fs = require("fs");
const path = require("path");
const http = require("http");

const filePath1 = path.join(__dirname, 'index.html');
readStream = fs.createReadStream(filePath1);


http.createServer((request, response) => {

    if (request.method === 'GET') {
        //response.setHeader('Content-Type', 'text/html');
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        readStream.pipe(response);

        //response.write('That is all');
        //response.end('That is NOT all...');

    } else {
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        });
        request.on('end', () => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);

            response.writeHead(200, { 'Content-Type': 'json' });
            response.end(data);
        });

        // response.statusCode = 405;
        // response.end('No GET -> no bet');
    }
}).listen(3000, 'localhost');




