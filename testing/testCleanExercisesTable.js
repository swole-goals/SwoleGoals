// run this
//./cloud_sql_proxy -instances=swolegoalsdatabase:us-central1:swolegoalsdb=tcp:3307
// make sure you have node mysql installed with "npm install mysql"
// run this as "node server.js"
var fs = require('fs');
var assert = require('assert');
 
var mysql = require('mysql');	
var con = mysql.createConnection({
     host     : 'localhost',
     port     : 3307,
     user     : 'root',
     password : 'swolegoals',
     database : 'exercises'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//var cmd = " create table clean_exercises( id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100), type VARCHAR(100), muscles VARCHAR(100), equipment VARCHAR(100), level VARCHAR(100), review VARCHAR(100), instructions VARCHAR(5000), image1 VARCHAR(100), image2 VARCHAR(100), PRIMARY KEY ( id ) ) ";
var testSelectNoFilters = function() {
	var cmd = "select * from clean_exercises";
	con.query(cmd, function (err, result) {
		assert(result.length > 0);
	});
	console.log("successfully tested selectNoFilters");
}
var testSelectFilteredByName = function() {
	var cmd = "select name from clean_exercises";
	con.query(cmd, function (err, result) {
		assert(result.length > 0);
	});
	console.log("successfully tested selectFilteredByName");
}
var testSelectBadFilter = function() {
	var cmd = "select fake from clean_exercises";
	con.query(cmd, function (err, result) {
		assert(result == null);
	});
	console.log("successfully tested selectBadFilter");
	
}
var testNamesAreDistinct = function() {
	var cmd = "select name from clean_exercises";
	var names = [];
	con.query(cmd, function (err, result) {
		result.forEach(function(name) {
			names.forEach(function(n) {
				assert(name !== n);
			});
			names.push(name);
		});
	});
	console.log("successfully tested selectNamesAreDistinct");
}
var testExercisesContainMuscles = function() {
	var cmd = "select * from clean_exercises";
	con.query(cmd, function (err, result) {
		result.forEach(function(exercise) {
			assert(exercise.muscles !== null);
		});
	});
	console.log("successfully tested exercisesContainMuscles");
}
var testPrimaryKeysAreDistinct = function() {
	var cmd = "select id from clean_exercises";
	var ids = [];
	con.query(cmd, function (err, result) {
		result.forEach(function(id) {
			ids.forEach(function(n) {
				assert(id !== n);
			});
			ids.push(id);
		});
	});
	console.log("successfully tested primaryKeysAreDistinct");
}

testSelectNoFilters(); 
testSelectFilteredByName();
testSelectBadFilter();
testNamesAreDistinct(); 
testExercisesContainMuscles();
testPrimaryKeysAreDistinct();

