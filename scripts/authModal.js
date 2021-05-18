const authModal = document.createElement('section');
authModal.classList.add('modalAuth');

authModal.innerHTML = `<div class="modalAuth__container">
<img class="modalAuth__btnCloseModal" src="./resources/icons/x-icon.png" alt="">
<img class="modalAuth__logo" src="./resources/icons/jordan-icon-big.png" alt="">
<form action="" class="modalAuth__registerForm">
    <h1 class="modalAuth__title">REGISTER</h1>
    <label class="modalAuth__label">
        Full name
        <input type="text" placeholder="Michael Jordan" class="modalAuth__input">
    </label>

    <label class="modalAuth__label">
        Email
        <input type="text" placeholder ='michael@jordan.com' class="modalAuth__input">
    </label>

    <label class="modalAuth__label">
        Password
        <input type="text" placeholder="password" class="modalAuth__input">
    </label>

    <label class="modalAuth__label">
        Confirm Password
        <input type="text" placeholder="password" class="modalAuth__input">
    </label>
    <span class="modalAuth__goLogin modalAuth__goTo">Don’t have an account? Sign up</span>
    <button type= "submit" class="modalAuth__btn btnRegister">REGISTER</button>
</form>

<form action="" class="modalAuth__loginForm">
    <h1 class="modalAuth__title">LOG IN</h1>
    <label class="modalAuth__label">
        Email
        <input placeholder ='michael@jordan.com' type="text" class="modalAuth__input">
    </label>

    <label class="modalAuth__label">
        Password
        <input placeholder="password" type="text" class="modalAuth__input">
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



$modalAuth.style.display = 'none';

//Open Modal
function handle_btnOpenModal() {
    $modalAuth.style.display = 'block';

    document.body.style.overflowY = 'hidden';
    document.body.style.height = '100vh';
    console.log('Modal is Open')
}

//Close Modal 
function handle_btnCloseModal() {
    $modalAuth.style.display = 'none';
    document.body.style.overflowY = 'scroll';
}


//Change to register
function handle_linkGoLogIn() {
    $formLogIn.style.display = 'flex';
    $formRegister.style.display = 'none';
}
//change to log in
function handle_linkGoRegister() {
    $formLogIn.style.display = 'none';
    $formRegister.style.display = 'flex';
}

//events
$btnOpenModal.addEventListener('click', handle_btnOpenModal);
$btnCloseModal.addEventListener('click', handle_btnCloseModal);

$linkGoLogIn.addEventListener('click', handle_linkGoLogIn);
$linkGoRegister.addEventListener('click', handle_linkGoRegister);