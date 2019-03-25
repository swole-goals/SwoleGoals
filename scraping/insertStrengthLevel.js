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
var cmd = " create table strengthlevel( exercise_id INT NOT NULL AUTO_INCREMENT, exercise_link_id INT, performance_metric VARCHAR(10) NOT NULL, performance_a INT NOT NULL, performance_b INT NOT NULL, performance_c INT NOT NULL, performance_d INT NOT NULL, performance_e INT NOT NULL, exercise_family VARCHAR(20) NOT NULL, exercise_name VARCHAR(50) NOT NULL, PRIMARY KEY ( exercise_id ) ) ";
fs.readFile("strengthLevelResults.txt", 'utf8', function(err, contents) {
	//format {user_weight/ignore} p_a p_b p_c p_d p_e exercise_family exercise_name 
   	contents.split('\n').forEach(function(exercise) {
		//console.log(exercise + '\n\n');
		var stats = exercise.split(' ');
		var p_a = parseInt(stats[1]);
		console.log(p_a + " isNan: " + isNaN(p_a));
		if(isNaN(p_a)) {
			p_a = 0;
			console.log("new:" + p_a);
		}
		var p_b = parseInt(stats[2]);
		if(isNaN(p_b)) {
			p_b = 0;
			console.log("new:" + p_a);
		}
		var p_c = parseInt(stats[3]);
		if(isNaN(p_c)) {
			p_c = 0;
		}
		var p_d = parseInt(stats[4]);
		if(isNaN(p_d)) {
			p_d = 0;
		}
		var p_e = parseInt(stats[5]);
		if(isNaN(p_e)) {
			p_e = 0;
		}
		var exercise_family_i = parseInt(stats[6]) - 1;
		var exercise_family = exercise_families[exercise_family_i];
		var performance_metric = performance_metrics[exercise_family_i];
		var exercise_name = stats[7];
		var insert = "insert into strengthlevel " 
		+ " (performance_metric, performance_a, performance_b, performance_c, performance_d, performance_e, exercise_family, exercise_name) values ('" + performance_metric + "', '" + p_a + "', '" + p_b + "', '" + p_c + "', '" + p_d + "', '" + p_e + "', '" + exercise_family + "', '" + exercise_name + "')";
		con.query(insert, function (err, result) {
//			console.log(result);
		});
	});
});
con.query("select count(*) from strengthlevel", function (err, result) {
	console.log(result);
});
