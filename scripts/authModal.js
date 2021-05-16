const authModal = document.createElement('section');
authModal.classList.add('.modalAuth');

authModal.innerHTML=``;






const $btnOpenModal = document.querySelector('.btnOpenModal');
const $btnCloseModal = document.querySelector('.modalAuth__btnCloseModal');

const $modalAuth = document.querySelector('.modalAuth');

$modalAuth.style.display='none';

//Open Modal
function handle_btnOpenModal() {
    $modalAuth.style.display = 'block';
    
    document.body.style.overflowY = 'hidden';
    document.body.style.height = '100vh';
    console.log('Modal is Open')
}

//Close Modal 
function handle_btnCloseModal(){
    $modalAuth.style.display='none';
}

//events
$btnOpenModal.addEventListener('click',handle_btnOpenModal);



