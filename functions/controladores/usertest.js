//const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



// ------------------------------------------
// Son APIs para un request, de un tutorial de Youtube
// ------------------------------------------

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// PAra desarrollar API Functions
const express = require('express');
//const cors = requiere('cors');

const userApp = express();

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
//const { ExportBundleInfo } = require('firebase-functions/lib/providers/analytics');

//admin.initializeApp();

const db = admin.firestore();

userApp.get("/", async (req, res) => {
  const snaphot = await db.collection('users').get();

  let users = [];

  snaphot.forEach( doc => {
    let id = doc.id;
    let data = doc.data();

    users.push({id, ...data});
  })

  res.status(200).send(JSON.stringify(users));
})

userApp.get("/:id", async (req, res) => {
  const snaphot = await db.collection('users').doc(req.params.id).get();

  const userId = snaphot.id;
  const userData = snaphot.data();

  res.status(200).send(JSON.stringify({id: userId, ...userData}));
})


userApp.put("/:id", async (req, res) => {
  const body = req.body;

  await db.collection("users").doc(req.params.id).update(body);

  res.status(200).send();
})


userApp.post("/", async (req, res) => {
  const user = req.body;

  await db.collection('users').add(user);

  res.status(201).send();
})

userApp.delete("/:id", async (req, res) => {
  await db.collection('users').doc(req.params.id).delete();

  res.status(200).send();
})

exports.userTest = functions.https.onRequest(userApp);


//
// Del tutorial de Firebase
//
///////////////////////////////////////////////////////////
//
// Triggers para el Authentication Firebase.
//
// Insertatmos y borramos en Firestore.
//
///////////////////////////////////////////////////////////
/*
exports.newUserSingup = functions.auth.user().onCreate(user => {
    return db.collection("users").doc(user.uid).set({
        email: user.email,
        nombre: ""
    });
});

exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = db.collection("users").doc(user.uid);
    return doc.delete();
});


// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
});


// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
.onCreate((snap, context) => {
  // Grab the current value of what was written to Firestore.
  const original = snap.data().original;

  // Access the parameter `{documentId}` with `context.params`
  functions.logger.log('Uppercasing', context.params.documentId, original);

  const uppercase = original.toUpperCase();

  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to Firestore.
  // Setting an 'uppercase' field in Firestore document returns a Promise.
  return snap.ref.set({uppercase}, {merge: true});
});
*/