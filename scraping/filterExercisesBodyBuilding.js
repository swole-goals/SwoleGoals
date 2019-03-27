// run this
//./cloud_sql_proxy -instances=swolegoalsdatabase:us-central1:swolegoalsdb=tcp:3307
// make sure you have node mysql installed with "npm install mysql"
// run this as "node server.js"
var fs = require('fs');
 
var exercise_families = ['Barbell', 'Bodyweight', 'Olympic', 'Dumbell', 'Machine', 'Cabel'];
var performance_metrics = ['weight', 'reps', 'weight', 'weight', 'weight', 'weight'];
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
var cmd = "select * from bodybuilding_exercises";
con.query(cmd, function (err, result) {
	//console.log(result);
	var exercises = [];
	result.forEach(function(exercise) {
		if(exercise.image1 == null) {
			return;
		}
		var contains = false;
		exercises.forEach(function(item) {
			
			if(item.name === exercise.name) {
				contains = true;
			}
		});
		if(!contains) {
			exercises.push(exercise);
		}
		
	});
	exercises.forEach(function(exercise) {
		var insert = "insert into clean_exercises (name, type, muscles, equipment, level, review, instructions, image1, image2) values ('" + exercise.name + "', '" + exercise.type + "', '" + exercise.muscles + "', '" + exercise.equipment + "', '" + exercise.level + "', '" + exercise.review + "', '" + exercise.instructions + "', '" + exercise.image1 + "', '"+ exercise.image2 + "')"
		con.query(insert, function (err, result) {
		});
	});
});
