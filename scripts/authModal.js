const authModal = document.createElement('section');
authModal.classList.add('modalAuth');

authModal.innerHTML = `<div class="modalAuth__container">
<img class="modalAuth__btnCloseModal" src="./resources/icons/x-icon.png" alt="">
<img class="modalAuth__logo" src="./resources/icons/jordan-icon-big.png" alt="">
<form action="" class="modalAuth__registerForm">
    <h1 class="modalAuth__title">REGISTER</h1>
    <label class="modalAuth__label">
        Full name
        <input type="text" placeholder="Michael Jordan" name = "fullName" class="modalAuth__input">
    </label>

    <label class="modalAuth__label">
        Email
        <input type="email" name="email" placeholder ='michael@jordan.com' class="modalAuth__input">
    </label>

    <label class="modalAuth__label">
        Password
        <input type="password" name = "password" placeholder="password" class="modalAuth__input">
    </label>

    <label class="modalAuth__label">
        Confirm Password
        <input type="password" name="confirmPassword" placeholder="Confirm password" class="modalAuth__input">
    </label>
    <span class="modalAuth__goLogin modalAuth__goTo">Don’t have an account? Sign up</span>
    <button type= "submit" class="modalAuth__btn btnRegister">REGISTER</button>
</form>

<form action="" class="modalAuth__loginForm">
    <h1 class="modalAuth__title">LOG IN</h1>
    <label class="modalAuth__label">
        Email
        <input placeholder ='michael@jordan.com' type="email" name="email" class="modalAuth__input">
    </label>

    <label class="modalAuth__label">
        Password
        <input placeholder="password" type="password" name ="password" class="modalAuth__input">
    </label>
    <span class="modalAuth__goRegister modalAuth__goTo">Already have account? Login</span>
    <button type= "submit" class="modalAuth__btn btnLogin">LOG IN</button>
</form>
</div>`;


document.body.appendChild(authModal);




const $modalAuth = document.querySelector('.modalAuth');

const $formLogIn = document.querySelector('.modalAuth__loginForm');
const $formRegister = document.querySelector('.modalAuth__registerForm');

const $linkGoLogIn = document.querySelector('.modalAuth__goLogin');
const $linkGoRegister = document.querySelector('.modalAuth__goRegister');

const $btnCloseModal = document.querySelector('.modalAuth__btnCloseModal');
const $btnOpenModal = document.querySelector('.btnOpenModal');
const $btnOpenModalMob = document.querySelector('.btnOpenModalMob');
const $btnLogOut = document.querySelector('.btnLogOut');
const $btnLogOutMob = document.querySelector('.btnLogOutMob');


$modalAuth.style.display = 'none';

//Open Modal

function handle_btnOpenModal() {
    $modalAuth.style.display = 'block';

    document.body.style.overflowY = 'hidden';
    document.body.style.height = '100vh';
    console.log('Modal is Open');
}

//Close Modal 
function handle_btnCloseModal() {
    $modalAuth.style.display = 'none';
    document.body.style.overflowY = 'scroll';
}


//Change to register
function handle_linkGoLogIn() {
    $formRegister.style.display = 'none';
    $formRegister.fullName.value = '';
    $formRegister.email.value = '';
    $formRegister.password.value = '';
    $formRegister.confirmPassword.value = '';
    $formLogIn.style.display = 'flex';
    
}
//change to log in
function handle_linkGoRegister() {
    $formLogIn.style.display = 'none';
    $formLogIn.email.value = '';
    $formLogIn.password.value = '';
    $formRegister.style.display = 'flex';
}

//events

$btnOpenModal.addEventListener('click', handle_btnOpenModal);
$btnCloseModal.addEventListener('click', handle_btnCloseModal);
$btnOpenModalMob.addEventListener('click', handle_btnOpenModal);

$linkGoLogIn.addEventListener('click', handle_linkGoLogIn);
$linkGoRegister.addEventListener('click', handle_linkGoRegister);

//register and login firebase logic

$formRegister.addEventListener('submit', function(event){
    event.preventDefault();

    const fullName = $formRegister.fullName.value;
    const email = $formRegister.email.value;
    const password = $formRegister.password.value;
    const confirmPassword = $formRegister.confirmPassword.value;
    console.log(fullName,email,password,confirmPassword);
    if(password == confirmPassword){
        console.log(email, password);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in 
            let user = userCredential.user;
            console.log(user);
    
            const userDoc = {
              name:fullName,
              email: email,
            };
            db.collection('users').doc(user.uid).set(userDoc);
            
            handle_btnCloseModal();
          })
          .catch((error) => {
            console.log(error.message) ;
          });
    }else{

    }

})

$formLogIn.addEventListener('submit', function(event){
    event.preventDefault();
    const email = $formLogIn.email.value;
    const password = $formLogIn.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        handle_btnCloseModal();
      })
      .catch((error) => {
        console.log(error.message);
      });

    console.log(email,password);
})

function handle_btnLogOut(){
    firebase.auth().signOut();
    window.location='./index.html';
};

$btnLogOut.addEventListener('click', handle_btnLogOut);
$btnLogOutMob.addEventListener('click', handle_btnLogOut);
