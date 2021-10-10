const mysql = require('mysql');         // npm install mysql

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pimaster01",
  database: 'Sandbox'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!"); 
});




con.query('SELECT * FROM Books;', function (err, result, fields) {
    if (err) throw err;
    // console.log(fields);                    // Contains info about the result
    // console.dir(result);

    for (let entry of result){

        console.log(entry.name, entry.author);

    }

});

console.log('Synchronous!');



// Examples
let adr = 'Mountain 21';
const sql_test = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);   // char-escaped

const bookName = 'Paradise Lost';
const pages = 200;
const sql = 'SELECT * FROM Books WHERE name = ? AND pages = ?';                   // Results t0 : SELECT * FROM Books WHERE name = 'Paradise Lost' AND pages = 200
con.query(sql, [bookName, pages], function (err, result) {
  if (err) throw err;
  console.log(result);
});