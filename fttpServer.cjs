const fs = require("fs");
const path = require("path");
const http = require("http");

const filePath1 = path.join(__dirname, 'access1.html');
readStream = fs.createReadStream(filePath1);


http.createServer((request, response) => {

    if (request.method === 'GET') {

        response.setHeader('Content-Type', 'html/javascript');

        response.writeHead(200, {
            'Custom-header-2': 'Custom header value 2',
            'Content-Type': 'text/javascript'
        });
        readStream.pipe(response)

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




