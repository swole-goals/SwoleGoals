
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

app.get('/', (req, res) => {
    res.send("Hello from Firestore!");
  });

app.post('/addFriend', bodyparser.json(), (req, res) => {
    console.log(req.body);
    res.json(req.body);
    const userRef = db.collection('users').doc(req.body.email);
    userRef.get().then((docSnapshot) => {
        if (docSnapshot.exists){
	        userRef.set({
	          name: 0,
            email: 0,
            age: 0,
            height: 0,
            weight: 0,
            friends: req.body.friend
	    }).then(() => {
		console.log('save successfully!');
            }).catch((err) => {
		console.log('get an error:', err);
            });
        }else{
            userRef.set({
                name: req.body.name,
                email: req.body.email,
                age: 0,
                height: 0,
                weight: 0,
                friends: []
            }).then(() => {
                console.log('added friend successfully!');
            }).catch((err) => {
                console.log('get an error:', err);
            });
        }
    });
});

app.post('/addUser', bodyparser.json(), (req, res) => {
    console.log(req.body);
    res.json(req.body);
    const userRef = db.collection('users').doc(req.body.email);
    userRef.get().then((docSnapshot) => {
        if (docSnapshot.exists){

        }else{
            userRef.set({
                name: req.body.name,
                email: req.body.email,
                age: 0,
                height: 0,
                weight: 0,
                friends: []
            }).then(() => {
                console.log('save successfully!');
            }).catch((err) => {
                console.log('get an error:', error);
            });
        }
    });
});

// set up the listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
