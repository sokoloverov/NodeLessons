import fs from 'fs';
import { Transform } from 'stream';

//fs.readFile('./access.log', 'utf8', (err, data) => console.log(data));

// const log1 = '127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"';
// const log2 = '127.0.0.1 - - [30/Jan/2021:11:11:25 -0300] "GET /boo HTTP/1.1" 404 0 "-" "curl/7.47.0"';

// fs.writeFile('./access.log', '\n', { flag: 'a' }, (err) => console.log(err));
// fs.writeFile('./access.log', log1, { flag: 'a' }, (err) => console.log(err));

const readStream = fs.createReadStream('./accessBIG.log', {
    flags: 'r',
    encoding: 'utf-8',
    //start: 0,
    //end: 880000,
    highWaterMark: 88,
});
readStream.on('data', (chunk) => {
    //console.log('Chunk');
    //console.log(chunk);
});
readStream.on('error', () => console.log(err));
readStream.on('end', () => console.log('File reading finished'));

const writeStream = fs.createWriteStream('./%89.123.1.41%_requests.log', { flags: 'a', encoding: 'utf8' });
const writeStream2 = fs.createWriteStream('./%34.48.240.111%_requests.log', { flags: 'a', encoding: 'utf8' });

// writeStream.write(log1);
// writeStream.write('\n');
//writeStream.end(() => console.log('File writing finished'));

//----------------------------------------------------------
//Мое решение
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        //const transformedChunk = chunk.toString().replace(/127.0.0.1/g, '');

        const transformedChunk = chunk.toString();

        const position1 = transformedChunk.indexOf('89.123.1.41');
        if (position1 === 0) {
            //console.log(transformedChunk);
            writeStream.write('\n');
            writeStream.write(transformedChunk);
        }

        const position2 = transformedChunk.indexOf('34.48.240.111');
        if (position2 === 0) {
            //console.log(transformedChunk);
            writeStream2.write('\n');
            writeStream2.write(transformedChunk);
        }


        //this.push(transformedChunk);
        //callback(null, transformedChunk);
        callback(null);
    }
});

readStream.pipe(transformStream);
// readStream.pipe(transformStream).pipe(process.stdout);

//--------------------------------------------------------------------
//РЕшение от преподавателя

// let numStr = 0;

// const rl = readline.createInterface({
//     input: readStream,
//     terminal: true
// });

// rl.on('line', (line) => { //как только читаешь что-гнибудь
//     if (line.includes('89.123.1.41')) { //проверка в каждой линии
//         writeStream.write(line + '\n')
//     }

//     if (line.includes('34.48.240.111')) {
//         writeStream.write(line + '\n')
//     }

//     console.log(++numStr);
// });