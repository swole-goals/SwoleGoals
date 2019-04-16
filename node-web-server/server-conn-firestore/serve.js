
// // set up the firestore
// const admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });

// const db = admin.firestore();
// // ...

const admin = require('firebase-admin');
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');

const private_key = `./swolegoalsFirestore-a6f94cd05c59.json`;
if(!fs.existsSync(private_key)){
  const projectId = 'swolegoalsFirestore';
  const storage = new Storage({
    projectId: projectId,
  });
  const bucketName = 'sg-storage';
  storage
    .bucket(bucketName)
    .file(private_key)
    .download({ destination: private_key })
    .then(() => {
      console.info('Private key downloaded successfully')
    })
    .catch(e => {
      console.error(`serve.js: There was an error: ${JSON.stringify(e, undefined, 2)}`)
    })
}

var serviceAccount = require(private_key);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

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
  const userRef = db.collection('users').doc(req.body.email);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log('Logging in user, ',req.body.name);
      res.json(docSnapshot.data());
    } else {
      userRef.set({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        age: 0,
        height: 0,
        weight: 0,
        friends: [],
        groupID: null
      }).then(() => {
        console.log('Creating new user');
      }).then(() => userRef.get().then((docSnapshot) => {
        res.json(docSnapshot.data())
      })).catch((err) => {
        console.log('Error:', err);
      });
    }
  });
});

app.post('/updateUser', bodyparser.json(), (req, res) => {
  // console.log(req.body);
  const userRef = db.collection('users').doc(req.body.email);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      userRef.update({
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        groupID: req.body.groupID
      }).then(() => {
        console.log('Updated user info!');
      }).catch((err) => {
        console.log('Error:', err);
      });
    }
  });
});

app.post('/getUser', bodyparser.json(), (req, res) => {
  const userRef = db.collection('users').doc(req.body.userEmail);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      res.json(docSnapshot.data());
    } else{
      console.log('User does not exist!');
    }
  });
});

app.post('/getUsers', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const userRef = db.collection('users').doc(req.body);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      res.json(docSnapshot.data());
    } else{
      console.log('Unable to get users!');
    }
  });
});

app.post('/getGroup', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const groupRef = db.collection('groups').doc(req.body.groupName);
  groupRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      res.json(docSnapshot.data());
    } else{
      console.log('Group does not exist!');
    }
  });
});


app.get('/getChallengeExercises/:name', bodyparser.json(), (req, res) => {
  var challengeName = req.params.name;
  const challengeRef = db.collection('Challenges').doc(challengeName);
  challengeRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log('challenge exists');
      res.json(docSnapshot.data());
    }else{
      console.log('No such challenge exist.');
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
      console.log('Group already exists, adding user to group');
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
});

app.post('/addFriendToGroup', bodyparser.json(), (req, res) => {
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
        users: req.body.userEmail,
        challenge: '' //
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



app.post('/removeFriendFromGroup', bodyparser.json(), (req, res) => {
  const groupRef = db.collection('groups').doc(req.body.groupName);
  groupRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      groupRef.update({
        users: admin.firestore.FieldValue.arrayRemove(req.body.userEmail)
      })
      console.log('Group already exists');
    } else {
      console.log('Group does not exist to delete from.')
    }
  });
  const userRef = db.collection('users').doc(req.body.userEmail);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      userRef.update({
        groupID: admin.firestore.FieldPath.arrayRemove(req.body.groupName)
      }).then(() => {
        console.log('Added User to Group!');
      }).catch((err) => {
        console.log('get an error:', err);
      });
    }
  });
});

app.post('/addClgtoGroup', bodyparser.json(), (req, res) => {
  console.log(req.body);
  //res.json(req.body);
  const clgRef = db.collection('groups').doc(req.body.gname);
  clgRef.get().then((docSnapshot) => {
    if (docSnapshot.get('challenge') != null) {
      console.log('challenge already exist in your group');
      //res.json('exists');
      clgRef.set({
        challenge: 'exists'
      }).then(() => clgRef.get().then((docSnapshot) => {
        res.json(docSnapshot.data())
      })).catch((err) => {
        console.log('get an error:', err);
      })
    } else {
      clgRef.set({
        challenge: req.body.cname
      }).then(() => {
        console.log('creat challenge in this group');
      }).then(() => clgRef.get().then((docSnapshot) => {
        res.json(docSnapshot.data())
      })).catch((err) => {
        console.log('get an error:', err);
      });
    }
  });
});




app.post('/addChallenge', bodyparser.json(), (req, res) => {
    console.log(req.body);
    const challengeRef = db.collection('Challenges').doc(req.body[0]);
    challengeRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        console.log('challenge already exists');
        res.json("exists")
      }else {
        challengeRef.set({
          challengeName: req.body[0],
          exercises: "1",
          createdByGroup: req.body[3]
        });
        for (let i = 0; i < req.body[1].length; i++) {
          console.log(req.body[1][i]);
          console.log(req.body[2][i]);
          challengeRef.update({
            exercises: admin.firestore.FieldValue.arrayUnion('[' + req.body[1][i] + ']{' + String(req.body[2][i]) + '}')
          })/*.then(() => {
                    challengeRef.get().then((docSnapshot) => {
                        res.json(docSnapshot.data());
                    });
                })*/.catch((err) => {
            console.log('get an error:', err);
          });
        }
        challengeRef.get().then((docSnapshot) => {
          console.log('save successfully!');
          res.json(docSnapshot.data())
        });
      }

    });

});

app.get('/getChallenges', (req, res) => {
  let challenges = [];
  db.collection("Challenges").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var challenge = [String(doc.id), doc.get("createdByGroup")];
      console.log(challenge);
      challenges.push(challenge);
     // console.log(doc.id);
    });
    res.json(challenges);
  });
});

app.post('/setGroupChallenge', bodyparser.json(), (req, res) => {
  console.log(req.body.group);
  console.log(req.body.challenge);
  const userRef = db.collection('groups').doc(req.body.group);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      userRef.update({
        challenge: req.body.challenge
      }).then(() => {
        console.log('Updated challenge!');
        res.json(req.body.challenge);
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
  const PORT = process.env.PORT || 4202;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
