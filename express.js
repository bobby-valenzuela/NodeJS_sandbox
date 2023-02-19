const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;  // In prod, will usually use port 80

// Start Server / Listen to incoming requests 
// app.listen(port) causes event loop to keep running since we don't stop listening ( process.exit() would manually stop event loop )
// second (optional) arg is callback defining what to do when server is started
app.listen( port, ()=>
{
    console.log(`Listening on ${port}...`);
} );


// Using http core module
// const server = http.createServer(app);
// server.listen(3000, 'localhost',()=>{

//     console.log('listening to request on port 3000');

// });


// Handle incoming requests 

// HEADERS (mostly assumed by Express)

// We can chain after res.status() because res.status() returns the response object itself
// res.status(200).sendFile('./cool.html', { root: __dirname});


// NO ROUTING -  app.use - applies to every request - Can be used multiple times [MIDDLEWARE]

    // app.use( (req, res, next )=>{

    //     // REQUEST: req - Object containing info about the request
    //     console.log("Got a request! Pathname: ", req.path);
    
    //     // RESPONSE : res - Object allowing us to respond 
    
    //     // Send back a response
    //     res.send('<h1>This is a response!</h1>'); // Header defaults to text/html
    
    // } );
    
// ROUTING
    
// Root - Handle GET request
app.get( '/' , ( req, res, next ) => {
        
    // REQUEST: req - Object containing info about the request - console.dir(req);
    console.log("Got a request! Pathname: ", req.path);
    console.log("Hostname: ", req.hostname);
    console.log("URL: ", req.url);
    console.log("Headers: ", req.headers);
    console.log("Method: ", req.method);
    console.log("Params: ", req.query);             // local/param1/param1/
    console.log("Query String: ", req.query);      // local/param1/param1/?query1=yes&query2=no -> {query1 : 'yes', query2 : 'no' }
    console.log("Req Params: ", req.params);       // similar to req.query but used for matched routed -> https://stackoverflow.com/questions/18524125/req-query-and-req-param-in-expressjs
    console.log("Req Body: ", req.body);            // Available on some requests only, like POST for example 

    const { name = 'stranger'} = req.query;
    
    // RESPONSE : res - Object allowing us to respond 
    res.send(`<h1>Welcome home ${name}!</h1>`); // Respond with string - text/html - http://localhost:3000/?name=John
    // Note: instead of using res.write() and res.end() Express allows us to simply use res.send() - headers are assumed/detected
    // res.send() seems to end script execution as well

    // Reponse with HTML file
    // res.sendFile(`./index.html`, { root: __dirname } ); // Respond with html file - text/html
    
    // the next() should only bse used when we aren't sending a response in the current middleware
    // check out 3rd-party middleware mods to run tasks on data before sending a response

} );

// Cats - Handle GET request
app.get( '/cats' , ( req, res, next ) => {

    res.send('<h1>Meow!</h1>'); // Respond with string - text/html


} );

// Cats Sub dirs ( 'size' serves as a wildcard, can be anything)
app.get( '/cats/:size' , ( req, res, next ) => {
    // Matches paths with '/cats/Large/' or '/cats/Small/' for example
    // Does not match paths with '/cats/Large/...'
    const { size } = req.params; // equiv. to req.params.size
    res.send(`<h1>You are in the ${size} Cats dir! Choose a color!</h1>`); // Respond with string - text/html - http://localhost:3000/cats/large/
} );

// Cats Sub-sub dirs
app.get( '/cats/:size/:color' , ( req, res, next ) => {
    // Matches paths with '/cats/Large/Black/'
    // Does not match paths with '/cats/Black/'
    const { size, color } = req.params; // equiv. to req.params.size in this case / req.params.color
    res.send(`<h1>You are in the ${size} Cats dir! ${color} choosen! Age : ${req.query.age}</h1>`); // Respond with string - text/html - http://localhost:3000/cats/Large/black/?age=10
} );

// Redirect
app.get('/aboutcats', (req, res) => {
    res.redirect('/cats');  // this sets proper status code automatically
} );

// Send a file that will download from browser
app.get('/download', (req, res) => {
    res.download('somedata.txt');  // this sets proper status code automatically
} );

// Cats - Handle POST request
app.post( '/cats' , ( req, res, next ) => {

    res.send('<h1>Meow! Post Received!</h1>'); // Respond with string - text/html


} );

app.post( '*' , ( req, res, next ) => {

    res.send('<h1>Oops! Cannot find what you\'re looking for</h1>'); // Respond with string - text/html

} );

///// Fallbacks - execute for every request (if match not found)

// Not Found - '*' matches any request - so keep this last like an else statement
app.get( '*' , ( req, res, next ) => {

    res.send('<h1>Oops! Cannot find what you\'re looking for</h1>'); // Respond with string - text/html

} );

// Not Found (alternative) - app.use() executes on any request - so long as res.send() hasn't already been executed
app.use((req, res, next)=> {
    // We can chain after res.status() because res.status() returns the response object itself
    res.status(404).sendFile('./404.html', { root: __dirname});
    // res.status(404).send('Something went wrong!');
    // res.status(404).json({message: "Error"});
    next(); // Next() allows script to also enter into next middleware
});

app.use((req, res, next)=> {
    // We can chain after res.status() because res.status() returns the response object itself
    console.log("In the next middleware");
});


///// Serving Static Assets - express native middleware
// app.use() is also used to serve static assets - place near top
// nodejs protects files from being access directly - we need this middle to define which paths are public
app.use( express.static('assets') );    // Can bse used more than once - based off the num of folders containing static assets you which to serve
// reference in your html where the forward slash represents the "assests" folder - this is the ROOT of the public folder
// example: <link rel='stylesheet' href='/styles.css' />
// where your file is ine assests/styles.css


////////// Parsing request data
// place the bleow on top of the script so we can parse every response
app.use(express.json());                            // Parsing application/json
app.use(express.urlencoded( {extended: true } ));   // Parsing aaplication/x-www-form-urlencoded

// ^ the above populates  req.body
app.post('/somesubmission', (req, res, next)=>{

    console.log(req.body);
    res.json(req.body);

} );

// another example showing the req.body object carries properties all inputs
app.post('/signup', function (req, res) {
    var data = req.body;
    
    console.log("Name: ", data.name);
    console.log("Age: ", data.age);
    console.log("Gender: ", data.gender);
      
    res.send();
  });
    


  ////////////////// NOTEABLES ///////////////////
  // Method overide pckg - allow all requests from clients that only suppoer GET/POST (browser) - see Colt Steels web dev bootcamp -> middleware app.use
  // UUID - pckg to get universal unique ID
