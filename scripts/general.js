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

  let loggedUser = null;

const setLoggedUser = (info, id) => {
  loggedUser = info;
  loggedUser.uid = id;
  userActiveChanged(true);
  //if(typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
    db.collection('users').doc(user.uid).get().then(function (doc) {
      if(!doc.data()) return;
      console.log(user)
      setLoggedUser(doc.data(), user.uid);
    });
    //getMyCart(user.uid);
  } else {
    loggedUser = null;
    
    userActiveChanged(false);
  }
});

let cart = []; 
const cartBtnNumber = document.querySelector('.btnGoCard span');
const cartBtnNumberMob = document.querySelector('.btnGoCardMob span');
const cartCollection = db.collection('cart');

const addToMyCart = (product) => {
  cart.push(product);
  cartCollection.doc(loggedUser.uid).set({
    cart,
  });
  cartBtnNumber.innerText = cart.length;
  cartBtnNumberMob.innerText = cart.length;
};