//este archivo nos permite conectarnos a la BD
import  firebase from 'firebase/app'
import  'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCoRHvccRiWKxMugLHxaJGfsGT6e4p9TAU",
    authDomain: "crud-962f1.firebaseapp.com",
    projectId: "crud-962f1",
    storageBucket: "crud-962f1.appspot.com",
    messagingSenderId: "553533789711",
    appId: "1:553533789711:web:a015a2c7a29557e629357a"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig) 
  