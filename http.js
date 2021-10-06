// CORE MODULES
const http = require('http');   // Creates our web server
const url = require('url');     // Helps parse query string
const fs = require('fs');       // File system
// const { readFile } =         require('fs');

// 3rd Party Modules (NPM Packages)
// const fetch = require('node-fetch');       // File system

// Custom modules
// const mod = require('./abc');

const server = http.createServer((req, res)=>{
    
    // REQUEST: req - Object containing info about the request - console.dir(req);
    console.log("Got a request! Pathname: ", req.path);
    console.log("Hostname: ", req.hostname);
    console.log("URL: ", req.url);
    console.log("Headers: ", req.headers);
    console.log("Method: ", req.method);
    console.log("Params: ", req.query);             // local/param1/param1/
    console.log("Query String: ", req.query);      // local/param1/param1/?query1=yes&query2=no
    
    const body = [];

    req.on('data', chunk =>{
        // read any data received (example - form submission) 
        body.push(chunk);
    });

    req.on('end', chunk =>{
        // when done reading received data
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        // Do something with message
    });


    // use res to get sendback a response
  
    ///// RESPONDING WITH PLAIN TEXT
    
    // res.setHeader('Content-Type','text/plain');
    // res.write('<p>I see yoooou</p>')
    // res.write('<p>aaand welcome!</p>')
    // res.end();
    // Note: There can be multiple res.write() but only one res.end() as res.end() actually sends the response

    // OR pass string in end method - defaults to text/plain
    // res.end('Welcome!');


    ///// RESPONDING WITH HTML
    // res.setHeader('Content-Type','text/html');
    // res.end('<h1>Welcome!<h1>');


    ///// RESPONDING WITH HTML FILE

    // fs.readFile(`${__dirname}/index.html`, (err, data)=> {

    //     if(err) return res.end('<h1>Encountered an Error!<h1>');

    //     res.setHeader('Content-Type','text/html');
    //     res.end(data);

    // } );    

    ///// HEADERS

    // res.writeHead() is preferred over res.setHeader() as it's more robust (see comparison directly below V)
    
    // res.statusCode = 200;
    // res.setHeader('Content-Type','text/html');
    
    // res.writeHead(200, {
    //     // Response Headers go here
    //     'Content-type': 'application/json',
    //     'Custom-header': 'You got your json!' 
    // });
    
    //////////////////////////////
    // ROUTING
    const pathname = req.url.toLowerCase();
    
    if(pathname === '/' || pathname === '/home'){
        
        res.end('<h1>Welcome to Main!<h1>');
        
    }
    else if(pathname === '/about'){
        
        res.end('<h1>Welcome to About!<h1>');
        
    }
    else if(pathname === '/aboutme'){
        // REDIRECT TO ABOUT
        
        // res.statusCode = 301;
        // res.setHeader('Location','/about');
        res.writeHead(301,{
            Location: '/about'    
        });
        res.end();
        
    }
    else if(pathname === '/web'){
        // Respond with data from an HTML file

        fs.readFile(`${__dirname}/index.html`, (err, data)=> {

            if(err) return res.end('<h1>Encountered an Error!<h1>');
    
            res.setHeader('Content-Type','text/html');
            // res.write(data);
            res.end(data);
    
        } );    
        // res.end('<h1>Welcome to About!<h1>');
        
    }
    else if(pathname === '/api'){

        fs.readFile(`${__dirname}/json/api.json`, 'utf-8', (err, data)=> {
            
            res.writeHead(200, {
                // Response Headers go here
                'Content-type': 'application/json',
                'Custom-header': 'You got your json!' 
            });
            res.end(data);

        });

    }
    else{
        res.writeHead(404, {
           // Response Headers go here
           'Content-type': 'text/html',
           'Custom-header': 'Yo!' 
        });
        res.end('<h1>Oops!<h1>');
        
    }


});

// Anytime a request is made on this server - the server() will run
server.listen(3000, 'localhost',()=>{

    console.log('listening to request on port 3000');

});
