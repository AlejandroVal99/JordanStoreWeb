const $header = document.querySelector('header');
$header.classList.add('header');

$header.innerHTML=`
<a class="header__icon" href="#">
    <img src="../../resources/icons/jordan-icon.png" alt="">
</a>
<nav class="header__navBar">
    <a href="">Home</a>
    <a href="">New Releases</a>
    <a href="">Products</a>
    <a href="">My Cart</a>
    <a href="" class="header__login">Log in</a>

</nav>
<img class="header__iconMobile" src="../../resources/icons/burgermenu-icon.png" alt="">

<nav class="header__navMobile">

    <a href="">Home</a>
    <a href="">New Releases</a>
    <a href="">Products</a>
    <a href="">My Cart</a>
    <a href="" class="header__login">Log in</a>
</nav>
`;


$navBar = document.querySelector(".header__navBar");
$icon_navBar = document.querySelector(".header__iconMobile");
$navBar_mobile = document.querySelector(".header__navMobile");

let isOpen = false;
$navBar_mobile.style.display = 'none';

function handle_iconNavBar() {
    if (isOpen) {
        $navBar_mobile.style.display = 'none';
        document.body.style.overflowY = 'scroll';
    } else {
        $navBar_mobile.style.display = 'flex';
        document.body.style.overflow = 'hidden';

    }
    isOpen = !isOpen;
}

$icon_navBar.addEventListener('click', handle_iconNavBar);
console.log($navBar);
console.log($icon_navBar);