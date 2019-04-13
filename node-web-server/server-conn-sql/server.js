// run this
//./cloud_sql_proxy -instances=swolegoalsdatabase:us-central1:swolegoalsdb=tcp:3307
// make sure you have node mysql installed with "npm install mysql"
// run this as "node server.js"

const express = require('express');

var app = express();

var bodyparser = require('body-parser');
var cors = require('cors');//cors is used to allow cross platform services
app.use(cors());
app.use(bodyparser.json());

var mysql = require('mysql');	
var mysqlConn = mysql.createConnection({
     host     : 'localhost',
     port     : 3307,
     user     : 'root',
     password : 'swolegoals',
     database : 'exercises',
     //socketPath : '/cloudsql/swolegoalsdatabase:us-central1:swolegoalsdb'
});

/*
mysqlConn.connect(function(err) {
  if (err){
    console.log("mysql connect failed \n Error:" + JSON.stringify(err, undefined, 2));
  }else{
    console.log("mysql connect successfully.");
  }
});
*/


app.get('/', (req, res) => {
  res.send("Hello from SwoleGoals!");
});


//get User

app.get('/getUser', (req, res) => {
  mysqlConn.query("select * from users", (err, results, fields) => {
    if (err){
      console.log(err);
    }else{
      console.log("get successfully.");
      res.send(results);
    }
  })
});

app.get('/getUsers/:lastname', (req, res) => {
  var lastname = req.params.lastname;
  console.log(lastname);
  mysqlConn.query("select * from users where LastName = ?", lastname, (err, results, fields) => {
    if (err){
      console.log(err);
    }else{
      console.log(err);
      res.send(results);
    }
  })
});



// get all info from exercises
app.get('/getEx', (req, res) => {
  mysqlConn.query("select * from clean_exercises", (err, results, fields) => {
    if (err){
      console.log(err);
    }else{
      console.log("get ex info successfully.");
      res.send(results);
    }
  })
});

app.get('/getExercises/:name', (req, res) => {
  var name = req.params.name;
  console.log('XXXX????', name);
  mysqlConn.query("select * from clean_exercises name = ?", name, (err, results, fields) => {
    if (err){
      console.log(err);
    }else{
      console.log("get exercises info successfully.");
      res.send(results);
    }
  })
});

//get all the strengthlevel info
app.get('/getStrength', (req, res) => {
  mysqlConn.query("select * from strengthlevel", (err, results, fields) => {
    if (err){
      console.log(err);
    }else{
      console.log("get strenthlevel info successfully.");
      res.send(results);
    }
  })
});


// app.get('*', (req, res) => {
//   res.sendFile('./notFind.html');
// });


/*
app.post('/postUser', (res, req) => {

});
*/

const PORT = process.env.PORT || 4201;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
