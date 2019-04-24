
const admin = require('firebase-admin');
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');

const private_key = `./swolegoalsfirestore-4ad9a0ac617c.json`;
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

// set up the router
const express = require('express');
var app = express();


var bodyparser = require('body-parser');
var cors = require('cors');//cors is used to allow cross platform services
app.use(cors());
app.use(bodyparser.json());

/*
var mongoose = require('mongoose');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo');

mongoose.connect(db_url, function (err) {
    if (err) {
        console.log(err);
    }
});

app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
*/

app.get('/', (req, res) => {
  res.send("Hello from Firestore!");
});

app.post('/getChallengeExerciseList', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const userRef = db.collection('Challenges').doc(req.body.challengeName);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log('Returned Challenge Exercise List');
      res.json(docSnapshot.data());
    } 
  });
});

app.post('/getGroupUsers', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const userRef = db.collection('groups').doc(req.body.groupName);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log('Returned Group Users');
      res.json(docSnapshot.data());
    } 
  });
});

app.post('/getResultObj', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const userRef = db.collection('Results').doc(req.body.groupName);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log('Returned ResultObj');
      res.json(docSnapshot.data());
    } 
  });
});

app.post('/getResultScores', bodyparser.json(), (req, res) => {
  console.log(req.body);
  let data = [];
  const userRef = db.collection('Results').doc(req.body.groupName);
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      /*docSnapshot.get('docData').resultList.forEach(function(doc) {
        data.push(doc.data());
      });*/
      data.push(docSnapshot.get('docData').resultList);
      console.log('Returned ResultObj');
      res.json(data);
    }
  });
});



app.post('/updateChallengeResults', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const resRef = db.collection('Results').doc(req.body.groupName);
  resRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log('document already exists');
      res.json(docSnapshot.data().docData);
      var arrOfResultObj = [];
      var arrOfUserObj = [];

      var resultObj = {
        exerciseName: 'exerciseName',
        userObj: []
      };

      var idx = 0;
      var numUsers = req.body.groupUsers.length;
      for (let i=0; i<req.body.exerciseList.length;i++) {
        var arrOfUserObj = [];
        for (let k=0; k<numUsers;k++) {
          arrOfUserObj.push(req.body.userResultArr[k + idx]);
        }
        idx=idx+req.body.groupUsers.length;

        var resultObj = {
          exerciseName: req.body.exerciseList[i],
          userObj: arrOfUserObj
        };
        arrOfResultObj.push(resultObj);
      }

      var docData = {
        groupID: req.body.groupName,
        challengeName: req.body.challengeName,
        resultList: arrOfResultObj,
      };

      resRef.set({
        docData
      }).then(() => {
        console.log('Created challengeResult successfully!');
      }).then(() => resRef.get().then((docSnapshot) => {
        res.json(docSnapshot.data())
      })).catch((err) => {
        console.log('get an error:', err);
      });
    } else {
      var arrOfResultObj = [];
      var arrOfUserObj = [];

      var resultObj = {
        exerciseName: 'exerciseName',
        userObj: []
      };

      /*for (let k=0; k<req.body.groupUsers.length;k++) {
        groupRef.update({
          arrOfUserObj: admin.firestore.FieldValue.arrayUnion(req.body.userEmail)
        })
      } */

      for (let k=0; k<req.body.groupUsers.length;k++) {
        arrOfUserObj.push(req.body.groupUsers[k]);
      }
      for (let i=0; i<req.body.exerciseList.length;i++) {
        var exName = req.body.exerciseList[i];
        var resultObj = {
          exerciseName: req.body.exerciseList[i],
          userObj: arrOfUserObj
        };
        arrOfResultObj.push(resultObj);
      }
      var docData = {
        groupID: req.body.groupName,
        challengeName: req.body.challengeName,
        resultList: arrOfResultObj,
      };

      resRef.set({
        docData
      }).then(() => {
        console.log('Created challengeResult successfully!');
      }).then(() => resRef.get().then((docSnapshot) => {
        res.json(docSnapshot.data())
      })).catch((err) => {
        console.log('get an error:', err);
      });
    }
  });
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
  console.log(req.body.email);
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

app.post('/updateGroup', bodyparser.json(), (req, res) => {
  console.log(req.body);
  const groupRef = db.collection('groups').doc(req.body.groupName);
  const userRef = db.collection('users').doc(req.body.userEmail);

  //removing user from previous group
/*  userRef.get().then((doc) => {
    const previousGroupRef = db.collection('groups').doc(doc.get('groupID'));
    if(previousGroupRef != null) {
      previousGroupRef.get().then((doc) => {
        if (doc.exists) {
          previousGroupRef.update({
            users: admin.firestore.FieldValue.arrayRemove(req.body.userEmail)
          });
        }
      }).catch((err) => {
        console.log('got an error:', err);
      });
    }
  }).catch((err) => {
    console.log('got and error:', err);
  }) ;*/

  //adding user to group or creating new group
  groupRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      groupRef.update({
        users: admin.firestore.FieldValue.arrayUnion(req.body.userEmail)
      }).then(() => {
        console.log('Group already exists, adding user to group');
        res.json(docSnapshot.data());
      })
    } else {
      console.log("Creating new group")
      groupRef.set({
        name: req.body.groupName,
        challenge: null,
        users: admin.firestore.FieldValue.arrayUnion(req.body.userEmail)
      }).catch((err) => {
        console.log('get an error:', err);
      });
    }
  });
  if(req.body.oldGroup!=null){
    const oldGroupRef = db.collection('groups').doc(req.body.oldGroup);
    oldGroupRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        if(req.body.oldGroupUsers==='[]'){ //if there are no users in the group, delete it.
          oldGroupRef.delete();
        }
        else {
          oldGroupRef.update({
              users: admin.firestore.FieldValue.arrayRemove(req.body.userEmail)
        })}
      }
    });
  }
});

app.post('/getGroup', bodyparser.json(), (req, res) => {
  console.log(req.body.groupName);
  const groupRef = db.collection('groups').doc(req.body.groupName);
  groupRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      res.json(docSnapshot.data());
    } else{
      res.json(null);
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

// app.post('/addClgtoGroup', bodyparser.json(), (req, res) => {
//   console.log(req.body);
//   //res.json(req.body);
//   const clgRef = db.collection('groups').doc(req.body.gname);
//   clgRef.get().then((docSnapshot) => {
//     if (docSnapshot.get('challenge') != null) {
//       console.log('challenge already exist in your group');
//       //res.json('exists');
//       clgRef.set({
//         challenge: 'exists'
//       }).then(() => clgRef.get().then((docSnapshot) => {
//         res.json(docSnapshot.data())
//       })).catch((err) => {
//         console.log('get an error:', err);
//       })
//     } else {
//       clgRef.set({
//         challenge: req.body.cname
//       }).then(() => {
//         console.log('creat challenge in this group');
//       }).then(() => clgRef.get().then((docSnapshot) => {
//         res.json(docSnapshot.data())
//       })).catch((err) => {
//         console.log('get an error:', err);
//       });
//     }
//   });
// });

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

app.get('/getAllUsers', (req, res) => {
  let users = [];
  db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        users.push(doc.data());
    });
    res.json(users);
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

app.get('/getCurrentChallenge/:email', bodyparser.json(), (req, res) => {
  var email = req.params.email;
  defaultRef = db.collection('Challenges').doc('DEFAULT');
  var defaultChallenge;
  defaultRef.get().then((docDefault) => {
    defaultChallenge = docDefault.data();
  })
  const userRef = db.collection('users').doc(email);
  userRef.get().then((docSnapshot1) => {
    var groupID = docSnapshot1.get('groupID');
    if (groupID != null){
      groupRef = db.collection('groups').doc(groupID);
      groupRef.get().then((docSnapshot2) => {
        var challenge = docSnapshot2.get('challenge');
        if (challenge != null){
          challengeRef = db.collection('Challenges').doc(challenge);
          challengeRef.get().then((docSnapshot3) => {
            if (docSnapshot3.exists){
              res.json(docSnapshot3.data());
            }else{
              //res.json('challenge not exisits');
              res.json(defaultChallenge);
            }
          })
        }else{
          //res.json('challenge not exisits');
          res.json(defaultChallenge);
        }
      })
    }else{
      //res.json('user not in group');
      res.json(defaultChallenge);
    }
  })
})

app.get('/getEx/:challenge', bodyparser.json(), (req, res) => {
  var challenge = req.params.challenge;
  challengeRef = db.collection('Challenges').doc(challenge);
  challengeRef.get().then((docSnapshot) =>{
    if (docSnapshot.exists){
      res.json(docSnapshot.data());
    }else{
      console.log('Data not exists.');
    }
  })
})



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
