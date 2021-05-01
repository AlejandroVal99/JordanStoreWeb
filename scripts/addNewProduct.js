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