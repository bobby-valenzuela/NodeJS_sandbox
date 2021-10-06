const fs = require('fs');

// Note : __dirname === location of this script

///// BLOCKING 

// Read File Synchronously
const textIn = fs.readFileSync(`${__dirname}/text/input.txt`,'utf-8'); // console.log(textIn)

// Write File Synchronously
const textOut = `This is from the input file : ${textIn}`;
fs.writeFileSync(`${__dirname}/text/output.txt`, textOut);              // lunix -> cat text/output.txt


///// NON-BLOCKING

// Read File Asynchronously
fs.readFile(`${__dirname}/text/start.txt`, 'utf-8', (err, data)=> {
    if (err) return console.log('Error Reading File!');
    console.log(data);
});

// Write File Asynchronously
fs.writeFile(`${__dirname}/text/end.txt`,`End...`,'utf-8', (err, data)=> {
    
});

// Read/Write File Asynchronously
fs.readFile(`${__dirname}/text/start.txt`, 'utf-8', (err, data)=> {
    
    // Write File Asynchronously
    fs.writeFile(`${__dirname}/text/end.txt`, `Taken from start file : ${data}`, 'utf-8', (err, data)=> {
        
        console.log('Data from Start has been written to End!');

    });
});
