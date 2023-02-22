const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req,res) => {
    // ### Solution 1: Reading Files (useful maybe for smaller projects)
    // Slow as it requires reading the entire file at once
    

    // fs.readFile('text/start.txt',{ encoding: 'utf-8'},(err,data) => {
    //     if(err) res.end("Could not read file! ERROR MSG: " + err);
    //     res.end(data);
    // } );


    // ### Solution 2: Streams
    // Faster as a file can be read is streamable chunks.

    const readable = fs.createReadStream('text/start.txt');
    // Send each streamable chunk to client
    readable.on('data', chunk => {
        res.write(chunk);
    });
    // Close stream once all data is sent
    readable.on('end', ()=> res.end() )


})

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening...');
} );