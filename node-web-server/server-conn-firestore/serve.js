
// set up the firestore
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();
// // ...


// const admin = require('firebase-admin');

// var serviceAccount = require('./swolegoalsfirestore-43d4fe239158.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

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

app.post('/addUser', bodyparser.json(), (req, res) => {
  console.log(req.body);
  //res.json(req.body);
  const userRef = db.collection('users').doc(req.body.email);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log('document already exists');
      res.json(docSnapshot.data());
    } else {
      userRef.set({
        name: req.body.name,
        email: req.body.email,
        age: 0,
        height: 0,
        weight: 0,
        friends: [],
        groupID: null
      }).then(() => {
        console.log('Added user successfully!');
      }).then(() => userRef.get().then((docSnapshot) => {
        res.json(docSnapshot.data())
      })).catch((err) => {
        console.log('get an error:', err);
      });
    }
  });
});

app.post('/addGroup', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const groupRef = db.collection('groups').doc(req.body.groupName);
  groupRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      groupRef.update({
        users: admin.firestore.FieldValue.arrayUnion(req.body.userEmail)
      })
      console.log('Group already exists');
    } else {
      groupRef.set({
        name: req.body.groupName,
        users: req.body.userEmail
      }).then(() => {
        console.log('Created Group!');
      }).catch((err) => {
        console.log('get an error:', err);
      });
    }
  });
  const userRef = db.collection('users').doc(req.body.userEmail);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      userRef.update({
        groupID: req.body.groupName
      }).then(() => {
        console.log('Added User to Group!');
      }).catch((err) => {
        console.log('get an error:', err);
      });
    }
  });
});

app.post('/updateInfo', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const userRef = db.collection('users').doc(req.body.userEmail);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      userRef.update({
        age: req.body.userAge,
        height: req.body.userHeight,
        weight: req.body.userWeight
      }).then(() => {
        console.log('Added User to Group!');
      }).catch((err) => {
        console.log('get an error:', err);
      });
    }
  });
});

app.post('/addChallenge', bodyparser.json(), (req, res) => {
    console.log(req.body);
    const challengeRef = db.collection('Challenges').doc(req.body.exercises);
    challengeRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            console.log('challenge already exists');
            res.json(docSnapshot.data());
        }else{
            challengeRef.set({
                exercises: req.body.exercises,
                reps: req.body.reps
            }).then(() => {
                console.log('save successfully!');
            }).then(() => {
                challengeRef.get().then((docSnapshot) => {
                    res.json(docSnapshot.data());
                });
            }).catch((err) => {
                console.log('get an error:', err);
            });
        }

    });

});


  //findUser info

  // app.post('/findUser', bodyparser.json(), (req, res) => {
  //     console.log(req.body);
  //     res.json(req.body);
  //     const userRef = db.collection('users').doc(req.body.email);
  //     userRef.get().then((docSnapshot) => {
  //         if (docSnapshot.exists){
  //             res.send('documents exists');
  //         }else{
  //             res.send('documents not exists');
  //         }
  //     });
  // });

  // set up the listening port
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
