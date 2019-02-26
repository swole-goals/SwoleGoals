var express = require('express');
var mysql = require("mysql");
var app = express();
 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'swolegoals',
    database: 'swolegoals'
});
 
 
app.get('/', function (req, res, next) {
    connection.connect();
    connection.query('SELECT * FROM user;', function(err, rows, fields) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).send(rows);
    });
 
    connection.end();
});
app.listen(3036, function () {
    console.log('Server is running.. on Port 3036');
});