import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDtXCMNTjRTzoqJnTb8ZvdN_MPyGOPtIG4",
    authDomain: "todo-hw3-34188.firebaseapp.com",
    databaseURL: "https://todo-hw3-34188.firebaseio.com",
    projectId: "todo-hw3-34188",
    storageBucket: "todo-hw3-34188.appspot.com",
    messagingSenderId: "1089347511586",
    appId: "1:1089347511586:web:565aaeafeca19dedf5b17b",
    measurementId: "G-ETXE4PEL7N"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;