const $header = document.querySelector('header');
$header.classList.add('header');

$header.innerHTML = `

<a class="header__icon" href="./index.html">
    <img src="../../resources/icons/jordan-icon.png" alt="">
</a>
<nav class="header__navBar">
    <a href="./index.html"  >Home</a>
    <a href="./products.html?newReleases=Yes"  class="hideLoggedAdmin">New Releases</a>
    <a class="showLoggedAdmin hidden" href="./orders.html">Orders</a>
    <a href="./products.html">Products</a>
    <a href="./myCart.html" class="hideLoggedAdmin">My Cart</a>

    <a class="header__login btnOpenModal hideLoggedIn">Log in</a>
    <a class="header__login showLoggedIn btnLogOut">Log out</a>

</nav>
<img class="header__iconMobile" src="../../resources/icons/burgermenu-icon.png" alt="">

<nav class="header__navMobile">

    <a href="./index.html"  >Home</a>
    <a href="./products.html?newReleases=Yes"  class="hideLoggedAdmin">New Releases</a>
    <a class="showLoggedAdmin hidden" href="./orders.html">Orders</a>
    <a href="./products.html">Products</a>
    <a href="./myCart.html" class="hideLoggedAdmin">My Cart</a>

    <a class="header__login btnOpenModalMob hideLoggedIn">Log in</a>
    <a class="header__login showLoggedIn btnLogOut">Log out</a>
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