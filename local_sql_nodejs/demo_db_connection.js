var mysql = require('mysql');

var con = mysql.createConnection({
  host: 3306,
  user: root,
  password: swolegoals
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});