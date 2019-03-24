
// // set up the firestore
// const admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });

// const db = admin.firestore();
// // ...


const admin = require('firebase-admin');

var serviceAccount = require('./swolegoalsdatastore-f42e76e18d90.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();


var docRef = db.collection('users').doc('Kaibo');

var setAda = docRef.set({
  name: 'Kaibo',
  age: '25',
  height: 175,
  weight: 120,
  friends: ['user1', 'user2', 'user3']
});

//console.log(setAda);


// set up the router
const express = require('express');

var app = express();

var bodyparser = require('body-parser');
var cors = require('cors');//cors is used to allow cross platform services
app.use(cors());
app.use(bodyparser.json());



// set up the listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
