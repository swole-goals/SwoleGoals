// run this
//./cloud_sql_proxy -instances=swolegoalsdatabase:us-central1:swolegoalsdb=tcp:3307
// make sure you have node mysql installed with "npm install mysql"
// run this as "node server.js"

var mysql = require('mysql');	
var con = mysql.createConnection({
     host     : 'localhost',
     port     : 3307,
     user     : 'root',
     password : 'swolegoals',
     database : 'user'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
con.query("select * from MyGuests", function (err, result) {
	console.log(result);
});
