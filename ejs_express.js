const express = require("express");
const app = express();
const port = 3000;  // In prod, will usually use port 80

///// Set the view engine
app.set('view engine', 'ejs');  // With this line of native node code, you don't have to 'require' EJS, as a view-engine is being assigned with this code natively

///// Set the 'views' folder location - Option 1 - leave alone
// Defaults to  '/views' relative to where this script is being executed


///// Set the 'views' folder location - Option 2 - Custom Location (Relative)
// app.set('views', '/views');  
// ^ You can change path of views directory, though default is '/views'
// This path ('/views') is relative to where our script is being run - so if you aren't setting a custom path (i.e. if you are using the default setting) make sure you start your server script from the location to which '/views' serves as the appropriate path


///// Set the 'views' folder location - Option 2 - Custom Location (Absolute)
//this way makes sure we can execute this script from any directory, and the 'view's location will be referenced correctly
// basically we're making the path absolute - not relative to where we run the script

const path = require('path');   // Native node module to grab this cwd
app.set('views', path.join(__dirname, '/views') );
// ^ Equivalent of currently working directory in which this file is located + '/views'
// console.log(__dirname) -- this is the absolute location of this file being executed


// Note all ejs files must end with 'ejs' file extension
// Any location in our ejs file which contain JS will be converted to HTML

app.listen( port, ()=>
{
    console.log(`Listening on ${port}...`);
} );

// Root - Handle GET request
app.get( '/' , ( req, res, next ) => {
        
    res.send('hi');
    
} );

app.get( '/home' , ( req, res, next ) => {
    // home or home.ejs works
    res.render('home'); // render() is used to respond with a view template file. Note, we don't need to specify the parent folder as we are already setting that with app.set explxitly or to '/views/ implicitly

} );

app.get( '/passdata' , ( req, res, next ) => {

    const randoNumbo = Math.floor( Math.random() * 10 ) + 1;
    res.render('passdata', { randoNumbo, othernum : 2 }); 
    // ^ 2nd arg is object containing all the vars you want to pass in to be used in this ejs file
} );

// Serve Static Assets
app.use( express.static('assets') ); 
// ^ Note - in our HTML file we don't need to reference 'assets' folder since we are already referencing that here

// END


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RESOURCES

// Tags - taken from site - https://ejs.co/

// Anything within EJS tags will be treated (and thus expressed/executed) as JS

// <% 'Scriptlet' tag, for control-flow, no output
// <%_ ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
// <%= Outputs the value into the template (HTML escaped)
// <%- Outputs the unescaped value into the template
// <%# Comment tag, no execution, no output
// <%% Outputs a literal '<%'
// %> Plain ending tag
// -%> Trim-mode ('newline slurp') tag, trims following newline
// _%> ‘Whitespace Slurping’ ending tag, removes all whitespace after it

