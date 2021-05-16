// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJ9Pgz5P6c07VIB4DBkzOcfENJz1aQPP4",
    authDomain: "web-jordanstore.firebaseapp.com",
    projectId: "web-jordanstore",
    storageBucket: "web-jordanstore.appspot.com",
    messagingSenderId: "201565483159",
    appId: "1:201565483159:web:ba4bd78196d51fcf0df9d2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();


  